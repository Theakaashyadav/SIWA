"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  CheckCircle2,
  LoaderCircle,
  Send,
  ShieldCheck,
} from "lucide-react";
import { useId, useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export interface LegalAssistanceFormValues {
  contactName: string;
  organization: string;
  designation: string;
  cityState: string;
  mobile: string;
  email: string;
  issueCategory: string;
  urgency: string;
  otherParties: string;
  preferredLanguage: string;
  referenceNumber: string;
  responseDeadline: string;
  summary: string;
  consent: boolean;
}

export interface LegalAssistanceFormProps {
  locale?: string;
  onSubmit?: (values: LegalAssistanceFormValues) => void | Promise<void>;
  className?: string;
  simulateDelayMs?: number;
}

const issueCategories = {
  en: [
    "Government notice or show-cause notice",
    "Regulatory or licence compliance",
    "Contract drafting or review",
    "Payment recovery or commercial dispute",
    "Labour or employment matter",
    "GST or taxation matter",
    "Pollution or environmental compliance",
    "Industrial land, lease or property",
    "Representation before an authority",
    "Other legal issue",
  ],
  hi: [
    "सरकारी नोटिस या कारण बताओ नोटिस",
    "नियामक या लाइसेंस अनुपालन",
    "अनुबंध तैयार करना या समीक्षा",
    "भुगतान वसूली या वाणिज्यिक विवाद",
    "श्रम या रोजगार संबंधी मामला",
    "जीएसटी या कर संबंधी मामला",
    "प्रदूषण या पर्यावरण अनुपालन",
    "औद्योगिक भूमि, पट्टा या संपत्ति",
    "प्राधिकरण के समक्ष प्रतिनिधित्व",
    "अन्य कानूनी समस्या",
  ],
} as const;

const urgencyOptions = {
  en: ["General guidance", "Time-sensitive matter", "Notice received", "Hearing or deadline approaching"],
  hi: ["सामान्य मार्गदर्शन", "समय-संवेदनशील मामला", "नोटिस प्राप्त हुआ है", "सुनवाई या समय-सीमा निकट है"],
} as const;

const copy = {
  en: {
    contactName: "Contact person",
    organization: "Enterprise / organisation",
    designation: "Designation",
    cityState: "City / state",
    mobile: "Mobile number",
    email: "Email address",
    issueCategory: "Legal issue category",
    urgency: "Urgency",
    otherParties: "Other party / authority involved",
    preferredLanguage: "Preferred language",
    referenceNumber: "Notice / reference number",
    responseDeadline: "Response deadline",
    summary: "Brief description of the issue",
    optional: "optional",
    select: "Select an option",
    contactPlaceholder: "Full name",
    organizationPlaceholder: "Registered or trading name",
    designationPlaceholder: "Owner, Director, Manager…",
    cityStatePlaceholder: "City, State",
    mobilePlaceholder: "+91 98765 43210",
    emailPlaceholder: "name@company.com",
    referencePlaceholder: "Notice, case or file reference",
    otherPartiesPlaceholder: "For an initial conflict check",
    summaryPlaceholder: "Describe what happened, the authority or other party involved, and any deadline you are facing.",
    consent: "I agree that the legal-support team may contact me about this request. I understand that submitting this form does not create an advocate–client relationship or confirm representation.",
    privacy: "Do not include passwords, bank details or privileged documents in this initial request. A secure document-sharing method can be arranged after review.",
    submit: "Request Legal Assistance",
    submitting: "Submitting…",
    success: "The form has been checked successfully.",
    demoSuccess: "This preview has no connected backend, so no information was transmitted. Connect an approved secure workflow before launch.",
    failure: "The request could not be submitted. Please try again.",
    required: "This field is required.",
    short: "Please enter at least 2 characters.",
    mobileError: "Enter a valid mobile number.",
    emailError: "Enter a valid email address.",
    summaryError: "Please provide at least 20 characters.",
    consentError: "Please confirm before submitting.",
  },
  hi: {
    contactName: "संपर्क व्यक्ति",
    organization: "उद्यम / संस्था",
    designation: "पद",
    cityState: "शहर / राज्य",
    mobile: "मोबाइल नंबर",
    email: "ईमेल पता",
    issueCategory: "कानूनी समस्या की श्रेणी",
    urgency: "तात्कालिकता",
    otherParties: "संबंधित अन्य पक्ष / प्राधिकरण",
    preferredLanguage: "पसंदीदा भाषा",
    referenceNumber: "नोटिस / संदर्भ संख्या",
    responseDeadline: "जवाब देने की अंतिम तिथि",
    summary: "समस्या का संक्षिप्त विवरण",
    optional: "वैकल्पिक",
    select: "एक विकल्प चुनें",
    contactPlaceholder: "पूरा नाम",
    organizationPlaceholder: "पंजीकृत या व्यापारिक नाम",
    designationPlaceholder: "स्वामी, निदेशक, प्रबंधक…",
    cityStatePlaceholder: "शहर, राज्य",
    mobilePlaceholder: "+91 98765 43210",
    emailPlaceholder: "name@company.com",
    referencePlaceholder: "नोटिस, मामला या फ़ाइल संदर्भ",
    otherPartiesPlaceholder: "प्रारंभिक हित-संघर्ष जाँच के लिए",
    summaryPlaceholder: "क्या हुआ, संबंधित प्राधिकरण या पक्ष और लागू समय-सीमा का संक्षिप्त विवरण दें।",
    consent: "मैं सहमत हूँ कि विधिक सहायता टीम इस अनुरोध के संबंध में मुझसे संपर्क कर सकती है। मैं समझता/समझती हूँ कि यह फ़ॉर्म भेजने से अधिवक्ता–मुवक्किल संबंध या प्रतिनिधित्व स्वतः स्थापित नहीं होता।",
    privacy: "इस प्रारंभिक अनुरोध में पासवर्ड, बैंक विवरण या गोपनीय दस्तावेज़ शामिल न करें। समीक्षा के बाद सुरक्षित दस्तावेज़ साझा करने की व्यवस्था की जा सकती है।",
    submit: "कानूनी सहायता का अनुरोध करें",
    submitting: "भेजा जा रहा है…",
    success: "फ़ॉर्म की जाँच सफल रही।",
    demoSuccess: "यह पूर्वावलोकन किसी बैकएंड से जुड़ा नहीं है, इसलिए कोई जानकारी प्रेषित नहीं हुई। लॉन्च से पहले अनुमोदित सुरक्षित प्रक्रिया जोड़ें।",
    failure: "अनुरोध भेजा नहीं जा सका। कृपया दोबारा प्रयास करें।",
    required: "यह जानकारी आवश्यक है।",
    short: "कम से कम 2 अक्षर दर्ज करें।",
    mobileError: "मान्य मोबाइल नंबर दर्ज करें।",
    emailError: "मान्य ईमेल पता दर्ज करें।",
    summaryError: "कम से कम 20 अक्षरों में विवरण दें।",
    consentError: "भेजने से पहले पुष्टि करें।",
  },
} as const;

export function LegalAssistanceForm({
  locale = "hi",
  onSubmit,
  className = "",
  simulateDelayMs = 550,
}: LegalAssistanceFormProps) {
  const language = locale.toLowerCase().startsWith("hi") ? "hi" : "en";
  const labels = copy[language];
  const formId = useId();
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">("idle");
  const schema = z.object({
    contactName: z.string().trim().min(2, labels.short).max(100),
    organization: z.string().trim().min(2, labels.short).max(160),
    designation: z.string().trim().max(100),
    cityState: z.string().trim().min(2, labels.short).max(120),
    mobile: z
      .string()
      .trim()
      .min(1, labels.required)
      .regex(/^(?=(?:\D*\d){7,15}\D*$)[+\d][\d\s()-]*$/, labels.mobileError),
    email: z.string().trim().min(1, labels.required).email(labels.emailError),
    issueCategory: z.string().trim().min(1, labels.required),
    urgency: z.string().trim().min(1, labels.required),
    otherParties: z.string().trim().max(300),
    preferredLanguage: z.string().trim().min(1, labels.required),
    referenceNumber: z.string().trim().max(120),
    responseDeadline: z.string().trim().max(20),
    summary: z.string().trim().min(20, labels.summaryError).max(3000),
    consent: z.boolean().refine(Boolean, labels.consentError),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LegalAssistanceFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      contactName: "",
      organization: "",
      designation: "",
      cityState: "",
      mobile: "",
      email: "",
      issueCategory: "",
      urgency: "",
      otherParties: "",
      preferredLanguage: locale.toLowerCase().startsWith("hi") ? "हिन्दी" : "English",
      referenceNumber: "",
      responseDeadline: "",
      summary: "",
      consent: false,
    },
  });

  async function submit(values: LegalAssistanceFormValues) {
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
    "mt-2 min-h-12 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-500 focus:border-industry-600 focus:ring-2 focus:ring-industry-600";
  const id = (name: keyof LegalAssistanceFormValues) => `${formId}-${name}`;

  return (
    <form className={`space-y-6 ${className}`} noValidate onSubmit={handleSubmit(submit)}>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={labels.contactName} required error={errors.contactName?.message} htmlFor={id("contactName")}>
          <input {...register("contactName")} className={inputClass} id={id("contactName")} placeholder={labels.contactPlaceholder} />
        </Field>
        <Field label={labels.organization} required error={errors.organization?.message} htmlFor={id("organization")}>
          <input {...register("organization")} className={inputClass} id={id("organization")} placeholder={labels.organizationPlaceholder} />
        </Field>
        <Field label={labels.designation} optional={labels.optional} error={errors.designation?.message} htmlFor={id("designation")}>
          <input {...register("designation")} className={inputClass} id={id("designation")} placeholder={labels.designationPlaceholder} />
        </Field>
        <Field label={labels.cityState} required error={errors.cityState?.message} htmlFor={id("cityState")}>
          <input {...register("cityState")} className={inputClass} id={id("cityState")} placeholder={labels.cityStatePlaceholder} />
        </Field>
        <Field label={labels.mobile} required error={errors.mobile?.message} htmlFor={id("mobile")}>
          <input {...register("mobile")} className={inputClass} id={id("mobile")} inputMode="tel" placeholder={labels.mobilePlaceholder} />
        </Field>
        <Field label={labels.email} required error={errors.email?.message} htmlFor={id("email")}>
          <input {...register("email")} className={inputClass} id={id("email")} inputMode="email" placeholder={labels.emailPlaceholder} type="email" />
        </Field>
        <Field label={labels.issueCategory} required error={errors.issueCategory?.message} htmlFor={id("issueCategory")}>
          <select {...register("issueCategory")} className={inputClass} id={id("issueCategory")}>
            <option value="">{labels.select}</option>
            {issueCategories[language].map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </Field>
        <Field label={labels.urgency} required error={errors.urgency?.message} htmlFor={id("urgency")}>
          <select {...register("urgency")} className={inputClass} id={id("urgency")}>
            <option value="">{labels.select}</option>
            {urgencyOptions[language].map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </Field>
        <Field label={labels.otherParties} optional={labels.optional} error={errors.otherParties?.message} htmlFor={id("otherParties")}>
          <input {...register("otherParties")} className={inputClass} id={id("otherParties")} placeholder={labels.otherPartiesPlaceholder} />
        </Field>
        <Field label={labels.preferredLanguage} required error={errors.preferredLanguage?.message} htmlFor={id("preferredLanguage")}>
          <select {...register("preferredLanguage")} className={inputClass} id={id("preferredLanguage")}>
            <option value="हिन्दी">हिन्दी</option>
            <option value="English">English</option>
          </select>
        </Field>
        <Field label={labels.referenceNumber} optional={labels.optional} error={errors.referenceNumber?.message} htmlFor={id("referenceNumber")}>
          <input {...register("referenceNumber")} className={inputClass} id={id("referenceNumber")} placeholder={labels.referencePlaceholder} />
        </Field>
        <Field label={labels.responseDeadline} optional={labels.optional} error={errors.responseDeadline?.message} htmlFor={id("responseDeadline")}>
          <input {...register("responseDeadline")} className={inputClass} id={id("responseDeadline")} type="date" />
        </Field>
      </div>

      <Field label={labels.summary} required error={errors.summary?.message} htmlFor={id("summary")}>
        <textarea {...register("summary")} className={`${inputClass} min-h-40 resize-y`} id={id("summary")} placeholder={labels.summaryPlaceholder} rows={6} />
      </Field>

      <div className="flex gap-3 rounded-xl border border-sky-200 bg-sky-50 p-4 text-sm leading-6 text-navy-800">
        <ShieldCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-industry-600" />
        <p>{labels.privacy}</p>
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm leading-6 text-slate-700" htmlFor={id("consent")}>
          <input {...register("consent")} className="mt-1 size-4 shrink-0 accent-industry-600" id={id("consent")} type="checkbox" />
          <span>{labels.consent}</span>
        </label>
        {errors.consent?.message ? <ErrorMessage message={errors.consent.message} /> : null}
      </div>

      {submitState === "success" ? (
        <div className="flex gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-emerald-950" role="status">
          <CheckCircle2 aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
          <p><strong className="block">{labels.success}</strong>{labels.demoSuccess}</p>
        </div>
      ) : null}
      {submitState === "error" ? (
        <div className="flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-900" role="alert">
          <AlertCircle aria-hidden="true" className="size-5 shrink-0" />
          <p>{labels.failure}</p>
        </div>
      ) : null}

      <button
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] bg-accent-500 px-6 py-3 text-sm font-extrabold text-navy-950 shadow-[0_10px_25px_-14px_rgba(242,140,40,.8)] transition hover:-translate-y-0.5 hover:bg-accent-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-industry-600 focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-70"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? <LoaderCircle aria-hidden="true" className="size-4 animate-spin" /> : <Send aria-hidden="true" className="size-4" />}
        {isSubmitting ? labels.submitting : labels.submit}
      </button>
    </form>
  );
}

function Field({
  label,
  required = false,
  optional,
  error,
  htmlFor,
  children,
}: {
  label: string;
  required?: boolean;
  optional?: string;
  error?: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="font-semibold text-navy-800" htmlFor={htmlFor}>
        {label}{required ? <span className="ml-1 text-red-700" aria-hidden="true">*</span> : null}
        {!required && optional ? <span className="ml-1 font-normal text-slate-500">({optional})</span> : null}
      </label>
      {children}
      {error ? <ErrorMessage message={error} /> : null}
    </div>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <p className="mt-1.5 flex items-center gap-1.5 text-sm text-red-700" role="alert">
      <AlertCircle aria-hidden="true" className="size-4 shrink-0" />
      {message}
    </p>
  );
}
