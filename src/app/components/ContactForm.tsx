"use client";

import { useMemo, useState, type FormEvent } from "react";

type FormFields = Readonly<{
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}>;

type FormErrors = Partial<Record<keyof FormFields, string>>;

type SubmissionState = "idle" | "submitting" | "success" | "error";

const EMPTY_FORM: FormFields = {
  firstName: "",
  lastName: "",
  email: "",
  message: ""
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Formulaire de contact (UI uniquement) avec validation légère côté client.
 */
export default function ContactForm() {
  const [values, setValues] = useState<FormFields>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmissionState>("idle");

  const hasErrors = useMemo(() => Object.keys(errors).length > 0, [errors]);

  const validate = (fields: FormFields): FormErrors => {
    const nextErrors: FormErrors = {};

    if (!fields.firstName.trim()) {
      nextErrors.firstName = "Merci d’indiquer votre prénom.";
    }

    if (!fields.lastName.trim()) {
      nextErrors.lastName = "Merci d’indiquer votre nom.";
    }

    if (!fields.email.trim()) {
      nextErrors.email = "Merci d’indiquer votre email.";
    } else if (!EMAIL_PATTERN.test(fields.email.trim())) {
      nextErrors.email = "Adresse email invalide.";
    }

    if (!fields.message.trim()) {
      nextErrors.message = "Merci de préciser votre message.";
    }

    return nextErrors;
  };

  const handleChange = (field: keyof FormFields) => (value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");

    const nextErrors = validate(values);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus("error");
      return;
    }

    setStatus("success");
    setValues(EMPTY_FORM);
    setErrors({});
  };

  return (
    <form
      className="mt-12 w-full max-w-3xl rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 shadow-[var(--shadow-soft)]"
      onSubmit={handleSubmit}
      noValidate
    >
      <fieldset className="grid gap-6 md:grid-cols-2" disabled={status === "submitting"}>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[var(--color-ink)]" htmlFor="contact-first-name">
            Prénom
          </label>
          <input
            id="contact-first-name"
            type="text"
            name="firstName"
            value={values.firstName}
            onChange={(event) => handleChange("firstName")(event.target.value)}
            placeholder="Votre prénom"
            aria-invalid={errors.firstName ? "true" : "false"}
            aria-describedby={errors.firstName ? "contact-first-name-error" : undefined}
            className="h-12 rounded-lg border border-[var(--color-border)] bg-transparent px-4 text-[var(--color-ink)] transition focus:border-[var(--color-accent-strong)]"
          />
          {errors.firstName ? (
            <p id="contact-first-name-error" className="text-sm text-red-500">
              {errors.firstName}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[var(--color-ink)]" htmlFor="contact-last-name">
            Nom
          </label>
          <input
            id="contact-last-name"
            type="text"
            name="lastName"
            value={values.lastName}
            onChange={(event) => handleChange("lastName")(event.target.value)}
            placeholder="Votre nom"
            aria-invalid={errors.lastName ? "true" : "false"}
            aria-describedby={errors.lastName ? "contact-last-name-error" : undefined}
            className="h-12 rounded-lg border border-[var(--color-border)] bg-transparent px-4 text-[var(--color-ink)] transition focus:border-[var(--color-accent-strong)]"
          />
          {errors.lastName ? (
            <p id="contact-last-name-error" className="text-sm text-red-500">
              {errors.lastName}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="text-sm font-medium text-[var(--color-ink)]" htmlFor="contact-email">
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            value={values.email}
            onChange={(event) => handleChange("email")(event.target.value)}
            placeholder="vous@exemple.com"
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className="h-12 rounded-lg border border-[var(--color-border)] bg-transparent px-4 text-[var(--color-ink)] transition focus:border-[var(--color-accent-strong)]"
          />
          {errors.email ? (
            <p id="contact-email-error" className="text-sm text-red-500">
              {errors.email}
            </p>
          ) : null}
        </div>
      </fieldset>

      <div className="mt-6 flex flex-col gap-2">
        <label className="text-sm font-medium text-[var(--color-ink)]" htmlFor="contact-message">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          value={values.message}
          onChange={(event) => handleChange("message")(event.target.value)}
          placeholder="Décrivez votre projet ou votre demande..."
          rows={6}
          aria-invalid={errors.message ? "true" : "false"}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className="rounded-lg border border-[var(--color-border)] bg-transparent px-4 py-3 text-[var(--color-ink)] transition focus:border-[var(--color-accent-strong)]"
        />
        {errors.message ? (
          <p id="contact-message-error" className="text-sm text-red-500">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent-strong)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-60"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Envoi..." : "Envoyer le message"}
        </button>

        <div className="text-sm text-[var(--color-muted)]">
          {status === "success"
            ? "Merci ! Votre message a été enregistré localement. Je vous répondrai très vite."
            : null}
          {status === "error" && hasErrors
            ? "Veuillez corriger les champs indiqués avant de réessayer."
            : null}
          {status === "idle" ? "Les messages sont envoyés par email à l’étape suivante." : null}
        </div>
      </div>
    </form>
  );
}
