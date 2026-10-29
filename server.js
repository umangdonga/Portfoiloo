const path = require('path');

// Load settings from .env (Gmail login etc.)
try {
  process.loadEnvFile(path.join(__dirname, '.env'));
} catch {
  /* no .env file */
}

const express = require('express');
const fs = require('fs/promises');
const nodemailer = require('nodemailer');

const site = require('./data/site');
const projects = require('./data/projects');

const app = express();
const PORT = process.env.PORT || 3000;
// Vercel's file system is read-only except /tmp
const MESSAGES_FILE = process.env.VERCEL
  ? path.join('/tmp', 'messages.json')
  : path.join(__dirname, 'data', 'messages.json');

// Email: messages from the contact form are sent to CONTACT_TO via Gmail SMTP
const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_APP_PASSWORD = (process.env.GMAIL_APP_PASSWORD || '').replace(/\s+/g, '');
const CONTACT_TO = process.env.CONTACT_TO || site.email;
const mailer =
  GMAIL_USER && GMAIL_APP_PASSWORD
    ? nodemailer.createTransport({ service: 'gmail', auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD } })
    : null;

const escapeHtml = (s) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

// No Gmail password set? Deliver through FormSubmit (free, no password needed).
// The first message triggers a one-time "Activate Form" email to CONTACT_TO.
async function sendViaFormSubmit({ name, email, message, origin }) {
  const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(CONTACT_TO)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Origin: origin,
      Referer: `${origin}/contact`,
    },
    body: JSON.stringify({
      name,
      email,
      message,
      _replyto: email,
      _subject: `New portfolio message from ${name}`,
      _template: 'table',
      _captcha: 'false',
    }),
    signal: AbortSignal.timeout(20000),
  });
  const body = await res.json().catch(() => ({}));
  if (String(body.success) !== 'true') throw new Error(body.message || `FormSubmit error ${res.status}`);
}

async function sendContactEmail({ name, email, message, origin }) {
  if (!mailer) return sendViaFormSubmit({ name, email, message, origin });
  await mailer.sendMail({
    from: `"Portfolio Contact" <${GMAIL_USER}>`,
    to: CONTACT_TO,
    replyTo: `"${name.replace(/"/g, '')}" <${email}>`,
    subject: `New portfolio message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    html: `
      <div style="font-family:Arial,sans-serif;font-size:15px;color:#121218;line-height:1.6">
        <h2 style="margin:0 0 16px">New message from your portfolio</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}<br>
        <strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
        <p style="white-space:pre-wrap;background:#f4f4f6;padding:16px;border-radius:8px">${escapeHtml(message)}</p>
        <p style="color:#61646b;font-size:13px">Reply to this email to answer ${escapeHtml(name)} directly.</p>
      </div>`,
  });
}

// Register EJS explicitly so bundlers (Vercel) include it
app.engine('ejs', require('ejs').__express);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.disable('x-powered-by');

app.use(express.static(path.join(__dirname, 'public'), { maxAge: '7d' }));
app.use(express.json({ limit: '20kb' }));
app.use(express.urlencoded({ extended: false, limit: '20kb' }));

// Shared locals for every view
// Changes on every deploy/restart so cached CSS and JS are refreshed
const assetVersion = Date.now().toString(36);
app.use((req, res, next) => {
  res.locals.site = site;
  res.locals.assetVersion = assetVersion;
  res.locals.projects = projects;
  res.locals.currentPath = req.path;
  next();
});

app.get('/', (req, res) => res.render('home', { title: `${site.name} — UI/UX Designer` }));
app.get('/about', (req, res) => res.render('about', { title: `About — ${site.name}` }));
app.get('/projects', (req, res) => res.render('projects', { title: `Projects — ${site.name}` }));
app.get('/contact', (req, res) => res.render('contact', { title: `Contact — ${site.name}` }));

app.get('/:slug', (req, res, next) => {
  const index = projects.findIndex((p) => p.slug === req.params.slug);
  if (index === -1) return next();
  const project = projects[index];
  const nextProject = projects[(index + 1) % projects.length];
  res.render('case-study', {
    title: `${project.name} — Case Study — ${site.name}`,
    description: project.summary,
    project,
    nextProject,
  });
});

// Contact form: validates and stores messages in data/messages.json
app.post('/api/contact', async (req, res) => {
  const name = String(req.body.name || '').trim();
  const email = String(req.body.email || '').trim();
  const message = String(req.body.message || '').trim();
  const honeypot = String(req.body.feedback || '').trim();

  if (honeypot) return res.json({ ok: true }); // silently drop bots

  const errors = {};
  if (name.length < 2) errors.name = 'Please enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Please enter a valid email.';
  if (message.length < 10) errors.message = 'Tell me a little more (at least 10 characters).';
  if (Object.keys(errors).length) return res.status(400).json({ ok: false, errors });

  // Keep a local backup copy of every message, even if email fails
  try {
    let messages = [];
    try {
      messages = JSON.parse(await fs.readFile(MESSAGES_FILE, 'utf8'));
    } catch {
      /* file does not exist yet */
    }
    messages.push({ name, email, message, receivedAt: new Date().toISOString() });
    await fs.writeFile(MESSAGES_FILE, JSON.stringify(messages, null, 2));
  } catch (err) {
    console.error('Failed to save message backup', err);
  }

  const proto = req.headers['x-forwarded-proto'] || req.protocol;
  const origin = `${proto}://${req.get('host')}`;

  try {
    await sendContactEmail({ name, email, message, origin });
    console.log(`Emailed message from ${name} <${email}> to ${CONTACT_TO}`);
    res.json({ ok: true });
  } catch (err) {
    console.error('Failed to send email:', err.message);
    res.status(500).json({
      ok: false,
      errors: { form: `Message could not be sent. Please write to ${site.email} directly.` },
    });
  }
});

app.use((req, res) => res.status(404).render('404', { title: `Page not found — ${site.name}` }));

// On Vercel the app is exported and run as a serverless function;
// locally (`npm start`) it starts its own server.
module.exports = app;

if (require.main === module) {
  app.listen(PORT, async () => {
    console.log(`Portfolio running at http://localhost:${PORT}`);
    if (!mailer) {
      console.log(`Contact form email is ON (via FormSubmit): messages go to ${CONTACT_TO}`);
      return;
    }
    try {
      await mailer.verify();
      console.log(`Contact form email is ON: messages go to ${CONTACT_TO}`);
    } catch (err) {
      console.error('Gmail login failed. Check GMAIL_APP_PASSWORD in .env:', err.message);
    }
  });
}
