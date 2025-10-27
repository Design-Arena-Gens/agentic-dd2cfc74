import { FormEvent, useId, useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success">("idle");
  const nameId = useId();
  const emailId = useId();
  const messageId = useId();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    if (!name || !email || !message) {
      setStatus("idle");
      return;
    }

    form.reset();
    setStatus("success");
    window.setTimeout(() => setStatus("idle"), 5000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-lg sm:p-10"
      aria-labelledby="contact-heading"
      noValidate
    >
      <div>
        <h2 id="contact-heading" className="text-3xl font-semibold text-slate-900">
          Contact Our Career Guides
        </h2>
        <p className="mt-2 text-base text-slate-600 sm:text-lg">
          Ask questions, request personalized feedback, or let us know how we can support your career journey.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label
            htmlFor={nameId}
            className="text-sm font-medium text-slate-900"
          >
            Full name
          </label>
          <input
            id={nameId}
            name="name"
            type="text"
            required
            autoComplete="name"
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
            placeholder="Alex Kim"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor={emailId}
            className="text-sm font-medium text-slate-900"
          >
            Email address
          </label>
          <input
            id={emailId}
            name="email"
            type="email"
            required
            autoComplete="email"
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
            placeholder="you@example.com"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label
          htmlFor={messageId}
          className="text-sm font-medium text-slate-900"
        >
          How can we help?
        </label>
        <textarea
          id={messageId}
          name="message"
          rows={4}
          required
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
          placeholder="Share your goals or questions..."
        />
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-200 transition hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
        >
          Send Message
          <span aria-hidden="true">→</span>
        </button>
        <span
          role="status"
          aria-live="polite"
          className={`text-sm font-medium text-emerald-600 transition-opacity ${
            status === "success" ? "opacity-100" : "opacity-0"
          }`}
        >
          Message sent! Our team will reach out soon.
        </span>
      </div>
    </form>
  );
}
