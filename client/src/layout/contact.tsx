import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import { sendContact, type ContactPayload } from "../api/contact";
import { useAuth } from "../auth/useAuth";

const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

const EMPTY_CONTACT: ContactPayload = {
  name: "",
  email: "",
  subject: "",
  message: "",
  website: "",
  captcha: "",
};

const sanitizeInput = (value: string) => value.replace(/[<>]/g, "");

const Contact: React.FC = () => {
  const { user } = useAuth();
  const [data, setData] = useState<ContactPayload>({
    ...EMPTY_CONTACT,
    name: user?.email ? user.email.split("@")[0] : "",
    email: user?.email || "",
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (user) {
      setData((prev) => ({
        ...prev,
        name: user.email.split("@")[0],
        email: user.email,
      }));
    }
  }, [user]);

  const valid =
    data.name.trim().length >= 2 &&
    EMAIL_REGEX.test(data.email) &&
    data.subject.trim().length >= 2 &&
    data.message.trim().length >= 10;

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const { name, value } = e.target;
    setData((d) => ({
      ...d,
      [name]:
        name === "email"
          ? sanitizeInput(value).toLowerCase()
          : sanitizeInput(value),
    }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;

    const website = data.website || "";
    if (website.trim() !== "") {
      console.log("🧠 Honeypot triggered, skipping submission");
      return;
    }

    setLoading(true);

    try {
      await new Promise<void>((resolve, reject) => {
        if (!window.grecaptcha) {
          reject(new Error("reCAPTCHA not loaded"));
          return;
        }
        window.grecaptcha.ready(() => resolve());
      });
      const token = await window.grecaptcha.execute(
        "6LdDBqYrAAAAAKftPJnbYXxI5OtNWId3AoG89SIW", 
        { action: "submit" }
      );

      await sendContact({
        ...data,
        website,
        captcha: token,
      });

      setSent(true);
      setData({ ...EMPTY_CONTACT });
    } catch (err) {
      console.error("❌ Error sending contact form:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative flex flex-col items-center justify-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-24 sm:py-28 bg-gradient-to-b from-white to-[#fdfbf9]"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-[#A67665]/10 blur-[160px] rounded-full pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <p className="uppercase text-[10px] sm:text-xs font-semibold text-gray-500 tracking-[0.25em] mb-2">
          Get in Touch
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
          Contact Me
        </h2>
        <div className="mx-auto mt-3 h-[2px] w-12 bg-[#A67665]" />
      </motion.div>
      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        viewport={{ once: true }}
        className="w-full max-w-2xl bg-white/90 backdrop-blur-xl border border-[#e5e5e5]/70 
                   shadow-[0_8px_30px_rgba(0,0,0,0.08)] rounded-3xl p-8 sm:p-10"
      >
        <style>{`.grecaptcha-badge { visibility: hidden; }`}</style>

        <div className="grid gap-5">
          {/* honeypot */}
          <input
            id="website"
            name="website"
            value={data.website}
            onChange={handleChange}
            autoComplete="off"
            tabIndex={-1}
            className="hidden"
          />
          <div className="grid gap-1">
            <label htmlFor="name" className="text-sm text-gray-600">
              Your name
            </label>
            <input
              id="name"
              name="name"
              value={data.name}
              onChange={handleChange}
              autoComplete="off"
              maxLength={100}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#A67665]/40"
              required
              minLength={2}
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="email" className="text-sm text-gray-600">
              Your email
            </label>
            <input
              id="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              autoComplete="email"
              maxLength={150}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#A67665]/40"
              required
              inputMode="email"
            />
            {!EMAIL_REGEX.test(data.email) && data.email.length > 0 && (
              <span className="text-[11px] text-red-600">Invalid email</span>
            )}
          </div>
          <div className="grid gap-1">
            <label htmlFor="subject" className="text-sm text-gray-600">
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              value={data.subject}
              onChange={handleChange}
              placeholder="Freelance project, collaboration, etc."
              autoComplete="off"
              maxLength={150}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#A67665]/40"
              required
              minLength={2}
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="message" className="text-sm text-gray-600">
              Your message
            </label>
            <textarea
              id="message"
              name="message"
              value={data.message}
              onChange={handleChange}
              autoComplete="off"
              maxLength={4000}
              className="min-h-[120px] w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#A67665]/40"
              required
              minLength={10}
            />
            <div className="text-[11px] text-gray-500 text-right">
              {data.message.length}/4000
            </div>
          </div>
          {sent ? (
            <div className="flex items-center justify-center gap-2 text-[#A67665] bg-[#A67665]/10 border border-[#A67665]/30 rounded-full px-4 py-2 text-sm">
              <Mail size={16} />
              <span>Thanks! I’ll get back to you soon.</span>
            </div>
          ) : (
            <button
              type="submit"
              disabled={!valid || loading}
              className="cursor-pointer inline-flex items-center justify-center gap-2 bg-[#A67665]/10 
                         text-[#A67665] hover:bg-[#A67665]/20 font-semibold py-2.5 px-6 rounded-full 
                         shadow-sm transition-all focus:outline-none focus:ring-2 
                         focus:ring-[#A67665]/30 focus:ring-offset-2 disabled:opacity-50"
            >
              {loading ? (
                <span className="animate-pulse">Sending…</span>
              ) : (
                <>
                  <Send size={16} />
                  <span>Send message</span>
                </>
              )}
            </button>
          )}
          <p className="text-[11px] text-gray-500 mt-2 text-center">
            This site is protected by reCAPTCHA and the Google{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-[#A67665]"
            >
              Privacy Policy
            </a>{" "}
            and{" "}
            <a
              href="https://policies.google.com/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-[#A67665]"
            >
              Terms of Service
            </a>{" "}
            apply.
          </p>
        </div>
      </motion.form>
      <div className="mt-20 w-full max-w-5xl">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#A67665]/30 to-transparent" />
      </div>
    </section>
  );
};

export default Contact;
