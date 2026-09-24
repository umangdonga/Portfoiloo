import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, type Plugin } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function devApiPlugin(): Plugin {
  return {
    name: 'dev-api-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/contact' && req.method === 'POST') {
          let rawBody = '';
          req.on('data', (chunk) => {
            rawBody += chunk;
          });
          req.on('end', async () => {
            try {
              const body = JSON.parse(rawBody || '{}');
              const { name, email, websiteUrl, message } = body;

              if (!name || !email || !message) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Name, email, and message are required.' }));
                return;
              }

              const apiKey = process.env.RESEND_API_KEY;
              if (!apiKey) {
                // In dev mode without an environment variable, log the inquiry and return success
                console.log('Dev server received contact form submission:', { name, email, websiteUrl, message });
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true, mocked: true }));
                return;
              }

              const { Resend } = await import('resend');
              const resend = new Resend(apiKey);
              const toEmail = process.env.CONTACT_RECEIVER_EMAIL || 'umangdonga98@gmail.com';
              const fromEmail =
                process.env.RESEND_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>';

              const { data, error } = await resend.emails.send({
                from: fromEmail,
                to: [toEmail],
                replyTo: email,
                subject: `New Portfolio Inquiry from ${name}`,
                text: `Name: ${name}\nEmail: ${email}\nWebsite: ${websiteUrl || 'Not provided'}\n\nMessage:\n${message}`,
                html: `
                  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
                    <div style="background: linear-gradient(135deg, #4181f0, #2563eb); color: white; padding: 24px; text-align: center;">
                      <h2 style="margin: 0; font-size: 20px;">New Message from Portfolio Website</h2>
                      <p style="margin: 6px 0 0; font-size: 13px; opacity: 0.9;">Umang Donga Portfolio Contact Form</p>
                    </div>
                    <div style="padding: 24px;">
                      <p style="margin-bottom: 12px;"><strong>Name:</strong> ${name}</p>
                      <p style="margin-bottom: 12px;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                      <p style="margin-bottom: 12px;"><strong>Portfolio / Link:</strong> ${websiteUrl || 'Not provided'}</p>
                      <div style="margin-top: 16px; padding: 16px; background-color: #f8fafc; border-left: 4px solid #4181f0; border-radius: 4px;">
                        <p style="margin: 0 0 8px; font-weight: bold; color: #334155;">Message:</p>
                        <p style="margin: 0; white-space: pre-wrap; color: #475569;">${message}</p>
                      </div>
                    </div>
                  </div>
                `,
              });

              if (error) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: error.message }));
                return;
              }

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, id: data?.id }));
            } catch (err: any) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err.message || 'Internal server error' }));
            }
          });
          return;
        }
        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), devApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
