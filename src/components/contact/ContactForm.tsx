"use client";

import { useState, type FormEvent, type ReactElement } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

interface ContactFormState {
  readonly name: string;
  readonly email: string;
  readonly company: string;
  readonly message: string;
}

interface ContactFormErrors {
  readonly name?: string;
  readonly email?: string;
  readonly message?: string;
}

const EMPTY: ContactFormState = { name: "", email: "", company: "", message: "" };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validate = (state: ContactFormState): ContactFormErrors => {
  const errors: { -readonly [K in keyof ContactFormErrors]: string } = {};
  if (state.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(state.email.trim())) errors.email = "A valid email keeps the loop closed.";
  if (state.message.trim().length < 12) errors.message = "Tell us a little more — at least a sentence.";
  return errors;
};

export const ContactForm = (): ReactElement => {
  const [state, setState] = useState<ContactFormState>(EMPTY);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  const set = <K extends keyof ContactFormState>(key: K, value: ContactFormState[K]): void => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const nextErrors = validate(state);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setStatus("sent");
    setState(EMPTY);
  };

  if (status === "sent") {
    return (
      <div className="border border-ink p-10">
        <p className="label-mono text-signal">↳ Message sent</p>
        <h3 className="display-italic mt-4 text-4xl">Thanks for writing in.</h3>
        <p className="mt-3 max-w-md text-sm text-muted">
          We read every message that lands in this inbox. Expect a reply within two working days,
          from a real person, not a queue.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 font-mono text-[11px] uppercase tracking-wider2 text-ink hover:text-signal"
        >
          ↳ send another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="flex flex-col gap-8 border border-hairline p-8 sm:p-10"
    >
      <div>
        <p className="label-mono">↳ Form</p>
        <h3 className="display-italic mt-3 text-4xl sm:text-5xl">Say hello.</h3>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Input
          label="Your name"
          value={state.name}
          onChange={(e) => set("name", e.target.value)}
          autoComplete="name"
          required
          {...(errors.name ? { error: errors.name } : {})}
        />
        <Input
          label="Email"
          type="email"
          value={state.email}
          onChange={(e) => set("email", e.target.value)}
          autoComplete="email"
          required
          {...(errors.email ? { error: errors.email } : {})}
        />
      </div>

      <Input
        label="Company / studio"
        value={state.company}
        onChange={(e) => set("company", e.target.value)}
        autoComplete="organization"
        hint="optional · who you write from"
      />

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="label-mono">
          Message
        </label>
        <textarea
          id="message"
          value={state.message}
          onChange={(e) => set("message", e.target.value)}
          rows={5}
          required
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="w-full resize-none border-b border-hairline bg-transparent pb-2 font-mono text-[13px] text-ink placeholder:text-muted focus:border-ink focus:outline-none"
          placeholder="Tell us what you're working on."
        />
        {errors.message ? (
          <p id="message-error" className="font-mono text-[11px] text-signal">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-hairline pt-6">
        <p className="font-mono text-[11px] uppercase tracking-wider2 text-muted">
          replies within two working days
        </p>
        <Button type="submit" size="lg" trailing="→">
          send message
        </Button>
      </div>
    </form>
  );
};
