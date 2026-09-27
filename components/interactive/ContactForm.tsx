"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, LoaderCircle, Send } from "lucide-react";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export interface ContactFormValues {
  name: string;
  company: string;
  mobile: string;
  email: string;
  subject: string;
  message: string;
  consent: boolean;
}

export interface ContactSubjectOption {
  value: string;
  label: string;
}

export interface ContactFormLabels {
  name: string;
  company: string;
  mobile: string;
  email: string;
  subject: string;
  message: string;
  consent: string;
  namePlaceholder: string;
  companyPlaceholder: string;
  mobilePlaceholder: string;
  emailPlaceholder: string;
  subjectPlaceholder: string;
  messagePlaceholder: string;
  optional: string;
  submit: string;
  submitting: string;
  success: string;
  demoSuccess: string;
  failure: string;
  requiredError: string;
  nameError: string;
  mobileError: string;
  emailError: string;
  messageError: string;
  consentError: string;
}

export interface ContactFormProps {
  locale?: string;
  labels?: Partial<ContactFormLabels>;
  subjectOptions?: readonly ContactSubjectOption[];
  onSubmit?: (values: ContactFormValues) => void | Promise<void>;
  className?: string;
  simulateDelayMs?: number;
}

const englishLabels: ContactFormLabels = {
  name: "Name",
  company: "Company",
  mobile: "Mobile number",
  email: "Email address",
  subject: "Subject",
  message: "Message",
  consent: "I agree that SIWA may contact me regarding this enquiry. I understand that this form does not create an advocate–client relationship.",
  namePlaceholder: "Your full name",
  companyPlaceholder: "Company or organisation",
  mobilePlaceholder: "+91 98765 43210",
  emailPlaceholder: "name@company.com",
  subjectPlaceholder: "Select a subject",
  messagePlaceholder: "Tell us what information or service you are looking for",
  optional: "optional",
  submit: "Send Enquiry",
  submitting: "Sending…",
  success: "The form has been checked successfully.",
  demoSuccess:
    "Form validated successfully. This website preview has no backend, so no enquiry was sent.",
  failure: "We could not submit the enquiry. Please try again.",
  requiredError: "This field is required.",
  nameError: "Please enter at least 2 characters.",
  mobileError: "Enter a valid mobile number.",
  emailError: "Enter a valid email address.",
  messageError: "Please enter at least 10 characters.",
  consentError: "Please agree before submitting.",
};

const hindiLabels: ContactFormLabels = {
  name: "नाम",
  company: "कंपनी",
  mobile: "मोबाइल नंबर",
  email: "ईमेल पता",
  subject: "विषय",
  message: "संदेश",
  consent: "मैं सहमत हूँ कि SIWA इस पूछताछ के संबंध में मुझसे संपर्क कर सकता है। मैं समझता/समझती हूँ कि इस फ़ॉर्म से अधिवक्ता–मुवक्किल संबंध स्थापित नहीं होता।",
  namePlaceholder: "आपका पूरा नाम",
  companyPlaceholder: "कंपनी या संस्था",
  mobilePlaceholder: "+91 98765 43210",
  emailPlaceholder: "name@company.com",
  subjectPlaceholder: "विषय चुनें",
  messagePlaceholder: "आप किस जानकारी या सेवा के बारे में जानना चाहते हैं?",
  optional: "वैकल्पिक",
  submit: "पूछताछ भेजें",
  submitting: "भेजा जा रहा है…",
  success: "फ़ॉर्म की जाँच सफल रही।",
  demoSuccess:
    "फ़ॉर्म सफलतापूर्वक जाँचा गया। यह वेबसाइट पूर्वावलोकन किसी बैकएंड से जुड़ा नहीं है, इसलिए पूछताछ भेजी नहीं गई।",
  failure: "पूछताछ भेजी नहीं जा सकी। कृपया दोबारा प्रयास करें।",
  requiredError: "यह जानकारी आवश्यक है।",
  nameError: "कम से कम 2 अक्षर दर्ज करें।",
  mobileError: "मान्य मोबाइल नंबर दर्ज करें।",
  emailError: "मान्य ईमेल पता दर्ज करें।",
  messageError: "कम से कम 10 अक्षर दर्ज करें।",
  consentError: "भेजने से पहले सहमति दें।",
};

const englishSubjects: readonly ContactSubjectOption[] = [
  { value: "legal-assistance", label: "Legal Assistance" },
  { value: "legal-network", label: "Legal Professionals Network" },
  { value: "legal-information", label: "Legal Information or Correction" },
  { value: "government-scheme", label: "Government Scheme Information" },
  { value: "event", label: "Legal Awareness Programme" },
  { value: "general", label: "General Enquiry" },
  { value: "other", label: "Other" },
];

const hindiSubjects: readonly ContactSubjectOption[] = [
  { value: "legal-assistance", label: "विधिक सहायता" },
  { value: "legal-network", label: "विधिक पेशेवर नेटवर्क" },
  { value: "legal-information", label: "विधिक जानकारी या सुधार" },
  { value: "government-scheme", label: "सरकारी योजना संबंधी जानकारी" },
  { value: "event", label: "विधिक जागरूकता कार्यक्रम" },
  { value: "general", label: "सामान्य पूछताछ" },
  { value: "other", label: "अन्य" },
];

function createContactSchema(labels: ContactFormLabels) {
  return z.object({
    name: z.string().trim().min(2, labels.nameError).max(80, labels.nameError),
    company: z.string().trim().max(120),
    mobile: z
      .string()
      .trim()
      .min(1, labels.requiredError)
      .regex(/^(?=(?:\D*\d){7,15}\D*$)[+\d][\d\s()-]*$/, labels.mobileError),
    email: z.string().trim().min(1, labels.requiredError).email(labels.emailError),
    subject: z.string().trim().min(1, labels.requiredError),
    message: z.string().trim().min(10, labels.messageError).max(2000),
    consent: z.boolean().refine((value) => value, labels.consentError),
  });
}

export function ContactForm({
  locale = "en",
  labels: labelOverrides,
  subjectOptions,
  onSubmit,
  className = "",
  simulateDelayMs = 550,
}: ContactFormProps) {
  const isHindi = locale.toLowerCase().startsWith("hi");
  const labels = {
    ...(isHindi ? hindiLabels : englishLabels),
    ...labelOverrides,
  };
  const subjects = subjectOptions ?? (isHindi ? hindiSubjects : englishSubjects);
  const schema = createContactSchema(labels);
  const formId = useId();
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">(
    "idle",
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      company: "",
      mobile: "",
      email: "",
      subject: "",
      message: "",
      consent: false,
    },
  });

  async function submit(values: ContactFormValues) {
    setSubmitState("idle");
    try {
      if (onSubmit) {
        await onSubmit(values);
      } else {
        await new Promise((resolve) => window.setTimeout(resolve, simulateDelayMs));
      }
      setSubmitState("success");
      reset();
    } catch {
      setSubmitState("error");
    }
  }

  const inputClass =
    "mt-2 min-h-12 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-500 focus:border-[#176B9C] focus:ring-2 focus:ring-[#176B9C]";
  const errorClass = "mt-1.5 flex items-center gap-1.5 text-sm text-red-700";
  const fieldId = (name: keyof ContactFormValues) => `${formId}-${name}`;
  const errorId = (name: keyof ContactFormValues) => `${fieldId(name)}-error`;

  return (
    <form
      className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7 ${className}`}
      noValidate
      onSubmit={handleSubmit(submit)}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="block font-semibold text-[#123B5D]" htmlFor={fieldId("name")}>
            {labels.name} <span aria-hidden="true" className="text-red-700">*</span>
          </label>
          <input
            {...register("name")}
            aria-describedby={errors.name ? errorId("name") : undefined}
            aria-invalid={Boolean(errors.name)}
            autoComplete="name"
            className={inputClass}
            id={fieldId("name")}
            placeholder={labels.namePlaceholder}
            required
          />
          {errors.name ? (
            <span className={errorClass} id={errorId("name")} role="alert">
              <AlertCircle aria-hidden="true" className="size-4 shrink-0" />
              {errors.name.message}
            </span>
          ) : null}
        </div>

        <div>
          <label className="block font-semibold text-[#123B5D]" htmlFor={fieldId("company")}>
            {labels.company}{" "}
            <span className="text-xs font-normal text-slate-500">({labels.optional})</span>
          </label>
          <input
            {...register("company")}
            autoComplete="organization"
            className={inputClass}
            id={fieldId("company")}
            placeholder={labels.companyPlaceholder}
          />
        </div>

        <div>
          <label className="block font-semibold text-[#123B5D]" htmlFor={fieldId("mobile")}>
            {labels.mobile} <span aria-hidden="true" className="text-red-700">*</span>
          </label>
          <input
            {...register("mobile")}
            aria-describedby={errors.mobile ? errorId("mobile") : undefined}
            aria-invalid={Boolean(errors.mobile)}
            autoComplete="tel"
            className={inputClass}
            id={fieldId("mobile")}
            inputMode="tel"
            placeholder={labels.mobilePlaceholder}
            required
            type="tel"
          />
          {errors.mobile ? (
            <span className={errorClass} id={errorId("mobile")} role="alert">
              <AlertCircle aria-hidden="true" className="size-4 shrink-0" />
              {errors.mobile.message}
            </span>
          ) : null}
        </div>

        <div>
          <label className="block font-semibold text-[#123B5D]" htmlFor={fieldId("email")}>
            {labels.email} <span aria-hidden="true" className="text-red-700">*</span>
          </label>
          <input
            {...register("email")}
            aria-describedby={errors.email ? errorId("email") : undefined}
            aria-invalid={Boolean(errors.email)}
            autoComplete="email"
            className={inputClass}
            id={fieldId("email")}
            inputMode="email"
            placeholder={labels.emailPlaceholder}
            required
            type="email"
          />
          {errors.email ? (
            <span className={errorClass} id={errorId("email")} role="alert">
              <AlertCircle aria-hidden="true" className="size-4 shrink-0" />
              {errors.email.message}
            </span>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <label className="block font-semibold text-[#123B5D]" htmlFor={fieldId("subject")}>
            {labels.subject} <span aria-hidden="true" className="text-red-700">*</span>
          </label>
          <select
            {...register("subject")}
            aria-describedby={errors.subject ? errorId("subject") : undefined}
            aria-invalid={Boolean(errors.subject)}
            className={inputClass}
            id={fieldId("subject")}
            required
          >
            <option value="">{labels.subjectPlaceholder}</option>
            {subjects.map((subject) => (
              <option key={subject.value} value={subject.value}>
                {subject.label}
              </option>
            ))}
          </select>
          {errors.subject ? (
            <span className={errorClass} id={errorId("subject")} role="alert">
              <AlertCircle aria-hidden="true" className="size-4 shrink-0" />
              {errors.subject.message}
            </span>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <label className="block font-semibold text-[#123B5D]" htmlFor={fieldId("message")}>
            {labels.message} <span aria-hidden="true" className="text-red-700">*</span>
          </label>
          <textarea
            {...register("message")}
            aria-describedby={errors.message ? errorId("message") : undefined}
            aria-invalid={Boolean(errors.message)}
            className={`${inputClass} min-h-36 resize-y`}
            id={fieldId("message")}
            placeholder={labels.messagePlaceholder}
            required
            rows={5}
          />
          {errors.message ? (
            <span className={errorClass} id={errorId("message")} role="alert">
              <AlertCircle aria-hidden="true" className="size-4 shrink-0" />
              {errors.message.message}
            </span>
          ) : null}
        </div>
      </div>

      <div className="mt-5">
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-slate-700" htmlFor={fieldId("consent")}>
          <input
            {...register("consent")}
            aria-describedby={errors.consent ? errorId("consent") : undefined}
            aria-invalid={Boolean(errors.consent)}
            className="mt-1 size-5 shrink-0 rounded border-slate-300 accent-[#176B9C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B9C] focus-visible:ring-offset-2"
            id={fieldId("consent")}
            required
            type="checkbox"
          />
          <span>{labels.consent}</span>
        </label>
        {errors.consent ? (
          <p className={errorClass} id={errorId("consent")} role="alert">
            <AlertCircle aria-hidden="true" className="size-4 shrink-0" />
            {errors.consent.message}
          </p>
        ) : null}
      </div>

      {submitState === "success" ? (
        <div
          className="mt-5 flex items-start gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-3.5 text-sm font-medium text-emerald-900"
          role="status"
        >
          <CheckCircle2 aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
          {onSubmit ? labels.success : labels.demoSuccess}
        </div>
      ) : null}
      {submitState === "error" ? (
        <div
          className="mt-5 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3.5 text-sm font-medium text-red-900"
          role="alert"
        >
          <AlertCircle aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
          {labels.failure}
        </div>
      ) : null}

      <button
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#F28C28] px-6 py-3 font-bold text-[#102F47] transition hover:bg-[#E77E18] disabled:cursor-wait disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B9C] focus-visible:ring-offset-2 sm:w-auto"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? (
          <LoaderCircle aria-hidden="true" className="size-5 animate-spin" />
        ) : (
          <Send aria-hidden="true" className="size-5" />
        )}
        {isSubmitting ? labels.submitting : labels.submit}
      </button>
    </form>
  );
}
