import { Resend } from 'resend';

export default async function handler(req: any, res: any) {
  // CORS Headers for safety
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, websiteUrl, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY environment variable is not configured.');
      return res.status(500).json({
        error: 'Email service is not configured. Please set RESEND_API_KEY in environment variables.',
      });
    }

    const resend = new Resend(apiKey);
    const toEmail = process.env.CONTACT_RECEIVER_EMAIL || 'umangdonga98@gmail.com';
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>';

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `New Portfolio Inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nWebsite: ${websiteUrl || 'Not provided'}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #4181f0, #2563eb); padding: 24px; text-align: center; color: #ffffff;">
            <h2 style="margin: 0; font-size: 20px; font-weight: 700;">New Message from Portfolio Website</h2>
            <p style="margin: 6px 0 0; font-size: 13px; opacity: 0.9;">Umang Donga Portfolio Contact Form</p>
          </div>
          
          <div style="padding: 24px; color: #334155; font-size: 14px; line-height: 1.6;">
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 8px 0; width: 120px; font-weight: 600; color: #64748b;">Sender Name:</td>
                <td style="padding: 8px 0; font-weight: 600; color: #0f172a;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #64748b;">Email Address:</td>
                <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #64748b;">Portfolio / Link:</td>
                <td style="padding: 8px 0;">${
                  websiteUrl
                    ? `<a href="${websiteUrl}" target="_blank" style="color: #2563eb; text-decoration: none;">${websiteUrl}</a>`
                    : '<span style="color: #94a3b8;">Not provided</span>'
                }</td>
              </tr>
            </table>

            <div style="background-color: #f8fafc; border-left: 4px solid #4181f0; padding: 16px; border-radius: 6px; margin: 16px 0;">
              <p style="margin: 0 0 8px; font-weight: 700; color: #1e293b; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Message Content:</p>
              <p style="margin: 0; white-space: pre-wrap; color: #334155;">${message}</p>
            </div>

            <div style="margin-top: 24px; text-align: center;">
              <a href="mailto:${email}?subject=Re:%20Portfolio%20Inquiry" style="display: inline-block; background-color: #2563eb; color: #ffffff; padding: 10px 24px; border-radius: 9999px; text-decoration: none; font-weight: 600; font-size: 13px;">Reply to ${name}</a>
            </div>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend API error:', error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ success: true, id: data?.id });
  } catch (err: any) {
    console.error('Server error:', err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}
