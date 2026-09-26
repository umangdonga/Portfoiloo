import React, { useState } from 'react';
import {
  Send,
  Mail,
  CheckCircle2,
  Globe,
  User,
  MessageSquare,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import emailjs from '@emailjs/browser';

interface ContactProps {
  cardImageUrl: string;
  email: string;
  behanceUrl: string;
  linkedinUrl: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export const Contact: React.FC<ContactProps> = ({
  cardImageUrl,
  email,
  behanceUrl,
  linkedinUrl,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    websiteUrl: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Validate form fields according to requirements
  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    // 1. Name is required
    if (!formData.name.trim()) {
      errors.name = 'Name is required.';
    }

    // 2. Email must be valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'Email is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }

    // 3. Message is required
    if (!formData.message.trim()) {
      errors.message = 'Message is required.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for field once user starts typing
    if (formErrors[field as keyof FormErrors]) {
      setFormErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Run client-side validation
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Retrieve EmailJS configuration from environment variables
    const serviceId =
      import.meta.env.VITE_EMAILJS_SERVICE_ID ||
      (import.meta.env as unknown as Record<string, string>)?.EMAILJS_SERVICE_ID;
    const templateId =
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID ||
      (import.meta.env as unknown as Record<string, string>)?.EMAILJS_TEMPLATE_ID;
    const publicKey =
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY ||
      (import.meta.env as unknown as Record<string, string>)?.EMAILJS_PUBLIC_KEY;

    try {
      let sentSuccessfully = false;
      let detailedError = '';

      // Check if keys are present
      if (!serviceId || !templateId || !publicKey) {
        detailedError =
          'Vercel Redeploy Required: EmailJS keys were not found in this build. In Vercel, please go to the "Deployments" tab, click the 3 dots (...) on your latest deployment, and click "Redeploy" so the environment variables are bundled.';
      } else {
        // 1. Try sending through EmailJS
        try {
          const templateParams = {
            name: formData.name.trim(),
            from_name: formData.name.trim(),
            email: formData.email.trim(),
            from_email: formData.email.trim(),
            reply_to: formData.email.trim(),
            website: formData.websiteUrl.trim() || 'Not provided',
            website_url: formData.websiteUrl.trim() || 'Not provided',
            message: formData.message.trim(),
            to_email: email,
          };

          const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
          if (result.status === 200 || result.text === 'OK') {
            sentSuccessfully = true;
          } else {
            detailedError = `EmailJS error: ${result.text || 'Status ' + result.status}`;
          }
        } catch (emailjsErr: unknown) {
          const errObj = emailjsErr as { text?: string; message?: string };
          console.warn('EmailJS error:', emailjsErr);
          detailedError = `EmailJS error: ${errObj?.text || errObj?.message || 'Check your Service ID, Template ID, or Public Key'}`;
        }
      }

      // 2. Direct backup delivery to umangdonga98@gmail.com
      if (!sentSuccessfully) {
        try {
          const response = await fetch(`https://formsubmit.co/ajax/${email}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({
              Name: formData.name.trim(),
              Email: formData.email.trim(),
              'Website / Link': formData.websiteUrl.trim() || 'Not provided',
              Message: formData.message.trim(),
              _subject: `New Portfolio Inquiry from ${formData.name.trim()}`,
              _template: 'table',
              _captcha: 'false',
            }),
          });

          const data = await response.json().catch(() => null);
          if (response.ok || (data && (data.success === 'true' || data.success === true))) {
            sentSuccessfully = true;
          }
        } catch (backupErr) {
          console.warn('Backup fetch failed:', backupErr);
        }
      }

      if (sentSuccessfully) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', websiteUrl: '', message: '' });
        setFormErrors({});
        setErrorMessage(null);
      } else {
        setErrorMessage(detailedError || 'Something went wrong. Please try again.');
      }
    } catch (error: unknown) {
      const errObj = error as { message?: string };
      console.error('Submission Error:', error);
      setErrorMessage(errObj?.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-16 sm:py-24 px-3 sm:px-6 md:px-8">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-2.5 sm:space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Ready to Build <span className="text-[#4181f0]">Something Great ?</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed">
            I'm currently available for freelance work and collaborations
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Left Column: Visual Card & Direct Contacts */}
          <div className="lg:col-span-5 rounded-2xl sm:rounded-3xl p-4 sm:p-7 md:p-8 bg-[#0d1322]/80 border border-[#2a3050] flex flex-col justify-between backdrop-blur-xl relative overflow-hidden group">
            <div className="space-y-5 sm:space-y-6">
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-blue-500/20 bg-slate-950 shadow-xl">
                <img
                  src={cardImageUrl}
                  alt="Contact Graphic"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Let's talk design</h3>
                <p className="text-slate-300 text-xs sm:text-sm mt-1.5 sm:mt-2 leading-relaxed">
                  Have a project in mind, an opportunity, or just want to chat about product design and UI/UX? Feel
                  free to reach out.
                </p>
              </div>
            </div>

            {/* Direct Social / Email Links */}
            <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-slate-800/80 space-y-2.5 sm:space-y-3">
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-slate-900/60 hover:bg-blue-600/20 border border-slate-800 hover:border-blue-500/40 text-slate-200 hover:text-white transition-all text-xs sm:text-sm group/link"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-950/80 border border-blue-500/30 flex items-center justify-center text-[#4181f0] shrink-0 group-hover/link:scale-110 transition-transform">
                  <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <span className="truncate font-medium">{email}</span>
              </a>

              <div className="flex gap-2 sm:gap-3">
                <a
                  href={behanceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 px-3 sm:px-4 rounded-xl bg-slate-900/60 hover:bg-blue-600/20 border border-slate-800 hover:border-blue-500/40 text-slate-300 hover:text-white transition-all text-xs font-semibold group"
                >
                  <svg className="w-3.5 h-3.5 fill-[#0057ff] group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                    <path d="M16.969 16.927a2.561 2.561 0 0 0 1.901.677 2.501 2.501 0 0 0 1.531-.475c.362-.235.636-.584.779-.99h2.585a5.091 5.091 0 0 1-1.9 2.896 5.292 5.292 0 0 1-3.091.88 5.839 5.839 0 0 1-2.284-.433 4.871 4.871 0 0 1-1.723-1.211 5.657 5.657 0 0 1-1.08-1.874 7.057 7.057 0 0 1-.383-2.393c-.005-.8.129-1.595.396-2.349a5.313 5.313 0 0 1 5.088-3.604 4.87 4.87 0 0 1 2.376.563c.661.362 1.231.87 1.668 1.485a6.2 6.2 0 0 1 .943 2.133c.194.821.263 1.666.205 2.508h-7.699c-.063.79.184 1.574.688 2.187ZM6.947 4.084a8.065 8.065 0 0 1 1.928.198 4.29 4.29 0 0 1 1.49.638c.418.303.748.711.958 1.182.241.579.357 1.203.341 1.83a3.506 3.506 0 0 1-.506 1.961 3.726 3.726 0 0 1-1.503 1.287 3.588 3.588 0 0 1 2.027 1.437c.464.747.697 1.615.67 2.494a4.593 4.593 0 0 1-.423 2.032 3.945 3.945 0 0 1-1.163 1.413 5.114 5.114 0 0 1-1.683.807 7.135 7.135 0 0 1-1.928.259H0V4.084h6.947Zm-.235 12.9c.308.004.616-.029.916-.099a2.18 2.18 0 0 0 .766-.332c.228-.158.411-.371.534-.619.142-.317.208-.663.191-1.009a2.08 2.08 0 0 0-.642-1.715 2.618 2.618 0 0 0-1.696-.505h-3.54v4.279h3.471Zm13.635-5.967a2.13 2.13 0 0 0-1.654-.619 2.336 2.336 0 0 0-1.163.259 2.474 2.474 0 0 0-.738.62 2.359 2.359 0 0 0-.396.792c-.074.239-.12.485-.137.734h4.769a3.239 3.239 0 0 0-.679-1.785l-.002-.001Zm-13.813-.648a2.254 2.254 0 0 0 1.423-.433c.399-.355.607-.88.56-1.413a1.916 1.916 0 0 0-.178-.891 1.298 1.298 0 0 0-.495-.533 1.851 1.851 0 0 0-.711-.274 3.966 3.966 0 0 0-.835-.073H3.241v3.631h3.293v-.014ZM21.62 5.122h-5.976v1.527h5.976V5.122Z" />
                  </svg>
                  <span>Behance</span>
                </a>
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 px-3 sm:px-4 rounded-xl bg-slate-900/60 hover:bg-blue-600/20 border border-slate-800 hover:border-blue-500/40 text-slate-300 hover:text-white transition-all text-xs font-semibold group"
                >
                  <svg className="w-3.5 h-3.5 fill-[#0a66c2] group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.778-.773 1.778-1.729V1.73C24 .774 23.205 0 22.225 0z" />
                  </svg>
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 bg-[#0d1322]/80 border border-[#2a3050] backdrop-blur-xl flex flex-col justify-center">
            {isSubmitted ? (
              <div className="py-16 text-center space-y-5 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-blue-500/20 border border-[#4181f0] flex items-center justify-center text-[#4181f0] mx-auto shadow-lg shadow-blue-500/20">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                {/* Specific requirement 7: On successful submission, show: "Thank you! Your message has been sent successfully." */}
                <h3 className="text-2xl font-bold text-white">Thank you! Your message has been sent successfully.</h3>
                <p className="text-slate-300 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                  Your message has been delivered to{' '}
                  <span className="text-[#4181f0] font-semibold">{email}</span>. I'll get back to you soon.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setErrorMessage(null);
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-950/60 hover:bg-blue-900/60 border border-blue-500/30 text-blue-300 text-xs sm:text-sm font-semibold transition-all hover:scale-105"
                  >
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Error Banner */}
                {errorMessage && (
                  <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs sm:text-sm space-y-2.5 shadow-sm">
                    <div className="flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <div className="leading-relaxed flex-1 text-red-200">{errorMessage}</div>
                    </div>
                    <div className="pt-1 flex flex-wrap items-center justify-between gap-2 border-t border-red-900/50">
                      <span className="text-[11px] text-red-300/80">Never lose your inquiry:</span>
                      <a
                        href={`mailto:${email}?subject=${encodeURIComponent(
                          `Portfolio Inquiry from ${formData.name.trim() || 'Client'}`
                        )}&body=${encodeURIComponent(
                          `Name: ${formData.name.trim()}\nEmail: ${formData.email.trim()}\nWebsite: ${formData.websiteUrl.trim() || 'Not provided'}\n\nMessage:\n${formData.message.trim()}`
                        )}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Send via Email Client</span>
                      </a>
                    </div>
                  </div>
                )}

                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Name <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="name"
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`w-full px-3.5 sm:px-4 py-3 sm:py-3.5 pl-10 sm:pl-11 rounded-xl bg-[#080c16] border ${
                        formErrors.name ? 'border-red-500/80 focus:border-red-500' : 'border-[#2a3050] focus:border-[#4181f0]'
                      } focus:outline-none focus:ring-1 ${
                        formErrors.name ? 'focus:ring-red-500' : 'focus:ring-[#4181f0]'
                      } text-white placeholder-slate-500 text-base sm:text-sm transition-all`}
                    />
                    <User className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                  {formErrors.name && (
                    <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                      <span>{formErrors.name}</span>
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Email <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      placeholder="Your email address"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full px-3.5 sm:px-4 py-3 sm:py-3.5 pl-10 sm:pl-11 rounded-xl bg-[#080c16] border ${
                        formErrors.email ? 'border-red-500/80 focus:border-red-500' : 'border-[#2a3050] focus:border-[#4181f0]'
                      } focus:outline-none focus:ring-1 ${
                        formErrors.email ? 'focus:ring-red-500' : 'focus:ring-[#4181f0]'
                      } text-white placeholder-slate-500 text-base sm:text-sm transition-all`}
                    />
                    <Mail className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                  {formErrors.email && (
                    <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                      <span>{formErrors.email}</span>
                    </p>
                  )}
                </div>

                {/* Website Url (Optional) */}
                <div>
                  <label htmlFor="website" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Website Url <span className="text-slate-500 text-[11px] font-normal lowercase">(optional)</span>
                  </label>
                  <div className="relative">
                    <input
                      id="website"
                      type="url"
                      placeholder="https://yourwebsite.com"
                      value={formData.websiteUrl}
                      onChange={(e) => handleInputChange('websiteUrl', e.target.value)}
                      className="w-full px-3.5 sm:px-4 py-3 sm:py-3.5 pl-10 sm:pl-11 rounded-xl bg-[#080c16] border border-[#2a3050] focus:border-[#4181f0] focus:outline-none focus:ring-1 focus:ring-[#4181f0] text-white placeholder-slate-500 text-base sm:text-sm transition-all"
                    />
                    <Globe className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      rows={4}
                      placeholder="Tell me about your project or inquiry..."
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className={`w-full px-3.5 sm:px-4 py-3 sm:py-3.5 pl-10 sm:pl-11 rounded-xl bg-[#080c16] border ${
                        formErrors.message ? 'border-red-500/80 focus:border-red-500' : 'border-[#2a3050] focus:border-[#4181f0]'
                      } focus:outline-none focus:ring-1 ${
                        formErrors.message ? 'focus:ring-red-500' : 'focus:ring-[#4181f0]'
                      } text-white placeholder-slate-500 text-base sm:text-sm transition-all resize-none`}
                    />
                    <MessageSquare className="w-4 h-4 text-slate-500 absolute left-4 top-4 pointer-events-none" />
                  </div>
                  {formErrors.message && (
                    <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                      <span>{formErrors.message}</span>
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#4181f0] to-[#2563eb] hover:from-[#3575e6] hover:to-[#1d4ed8] text-white font-bold text-sm tracking-wide shadow-lg shadow-blue-500/25 transition-all duration-200 hover:scale-[1.01] active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Sending message...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
