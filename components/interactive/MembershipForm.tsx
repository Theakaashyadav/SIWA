"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, LoaderCircle, Send } from "lucide-react";
import { useId, useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export interface MembershipFormValues {
  applicantName: string;
  companyName: string;
  designation: string;
  mobile: string;
  email: string;
  businessType: string;
  address: string;
  industrialArea: string;
  udyamNumber: string;
  gstNumber: string;
  employeeCount: string;
  message: string;
  consent: boolean;
}

export interface MembershipFormLabels {
  applicantName: string;
  companyName: string;
  designation: string;
  mobile: string;
  email: string;
  businessType: string;
  address: string;
  industrialArea: string;
  udyamNumber: string;
  gstNumber: string;
  employeeCount: string;
  message: string;
  consent: string;
  optional: string;
  applicantPlaceholder: string;
  companyPlaceholder: string;
  designationPlaceholder: string;
  mobilePlaceholder: string;
  emailPlaceholder: string;
  businessPlaceholder: string;
  addressPlaceholder: string;
  areaPlaceholder: string;
  udyamPlaceholder: string;
  gstPlaceholder: string;
  employeePlaceholder: string;
  messagePlaceholder: string;
  submit: string;
  submitting: string;
  success: string;
  demoSuccess: string;
  failure: string;
  requiredError: string;
  shortTextError: string;
  mobileError: string;
  emailError: string;
  addressError: string;
  messageError: string;
  udyamError: string;
  gstError: string;
  employeeError: string;
  consentError: string;
}

export interface MembershipFormProps {
  locale?: string;
  labels?: Partial<MembershipFormLabels>;
  businessTypes?: readonly string[];
  industrialAreas?: readonly string[];
  onSubmit?: (values: MembershipFormValues) => void | Promise<void>;
  className?: string;
  simulateDelayMs?: number;
}

const englishLabels: MembershipFormLabels = {
  applicantName: "Applicant name",
  companyName: "Company name",
  designation: "Designation",
  mobile: "Mobile number",
  email: "Email address",
  businessType: "Business / industry type",
  address: "Factory / office address",
  industrialArea: "Industrial area",
  udyamNumber: "MSME / Udyam number",
  gstNumber: "GST number",
  employeeCount: "Number of employees",
  message: "Message",
  consent: "I agree that SIWA may contact me regarding my membership enquiry.",
  optional: "optional",
  applicantPlaceholder: "Applicant's full name",
  companyPlaceholder: "Registered or trading name",
  designationPlaceholder: "Owner, Director, Manager…",
  mobilePlaceholder: "+91 98765 43210",
  emailPlaceholder: "name@company.com",
  businessPlaceholder: "e.g. Engineering components",
  addressPlaceholder: "Complete factory or office address",
  areaPlaceholder: "Industrial area / locality",
  udyamPlaceholder: "UDYAM-DL-00-0000000",
  gstPlaceholder: "15-character GSTIN",
  employeePlaceholder: "e.g. 25",
  messagePlaceholder: "Tell us briefly about your business or membership enquiry",
  submit: "Submit Membership Request",
  submitting: "Submitting…",
  success: "Thank you. Your membership request has been submitted.",
  demoSuccess:
    "Form validated successfully. This website preview has no backend, so no membership request was sent.",
  failure: "We could not submit the membership request. Please try again.",
  requiredError: "This field is required.",
  shortTextError: "Please enter at least 2 characters.",
  mobileError: "Enter a valid mobile number.",
  emailError: "Enter a valid email address.",
  addressError: "Please enter a complete address (at least 10 characters).",
  messageError: "Please enter at least 10 characters.",
  udyamError: "Use a valid format, such as UDYAM-DL-00-0000000.",
  gstError: "Enter a valid 15-character GSTIN.",
  employeeError: "Enter a whole number greater than zero.",
  consentError: "Please agree before submitting.",
};

const hindiLabels: MembershipFormLabels = {
  applicantName: "आवेदक का नाम",
  companyName: "कंपनी का नाम",
  designation: "पद",
  mobile: "मोबाइल नंबर",
  email: "ईमेल पता",
  businessType: "व्यवसाय / उद्योग प्रकार",
  address: "फैक्टरी / कार्यालय का पता",
  industrialArea: "औद्योगिक क्षेत्र",
  udyamNumber: "MSME / उद्यम नंबर",
  gstNumber: "GST नंबर",
  employeeCount: "कर्मचारियों की संख्या",
  message: "संदेश",
  consent: "मैं सहमत हूँ कि SIWA मेरी सदस्यता पूछताछ के संबंध में मुझसे संपर्क कर सकता है।",
  optional: "वैकल्पिक",
  applicantPlaceholder: "आवेदक का पूरा नाम",
  companyPlaceholder: "पंजीकृत या व्यापारिक नाम",
  designationPlaceholder: "स्वामी, निदेशक, प्रबंधक…",
  mobilePlaceholder: "+91 98765 43210",
  emailPlaceholder: "name@company.com",
  businessPlaceholder: "जैसे इंजीनियरिंग कंपोनेंट्स",
  addressPlaceholder: "फैक्टरी या कार्यालय का पूरा पता",
  areaPlaceholder: "औद्योगिक क्षेत्र / इलाका",
  udyamPlaceholder: "UDYAM-DL-00-0000000",
  gstPlaceholder: "15 अक्षरों का GSTIN",
  employeePlaceholder: "जैसे 25",
  messagePlaceholder: "अपने व्यवसाय या सदस्यता पूछताछ के बारे में संक्षेप में बताएँ",
  submit: "सदस्यता अनुरोध भेजें",
  submitting: "भेजा जा रहा है…",
  success: "धन्यवाद। आपका सदस्यता अनुरोध भेज दिया गया है।",
  demoSuccess:
    "फ़ॉर्म सफलतापूर्वक जाँचा गया। यह वेबसाइट पूर्वावलोकन किसी बैकएंड से जुड़ा नहीं है, इसलिए सदस्यता अनुरोध भेजा नहीं गया।",
  failure: "सदस्यता अनुरोध भेजा नहीं जा सका। कृपया दोबारा प्रयास करें।",
  requiredError: "यह जानकारी आवश्यक है।",
  shortTextError: "कम से कम 2 अक्षर दर्ज करें।",
  mobileError: "मान्य मोबाइल नंबर दर्ज करें।",
  emailError: "मान्य ईमेल पता दर्ज करें।",
  addressError: "पूरा पता दर्ज करें (कम से कम 10 अक्षर)।",
  messageError: "कम से कम 10 अक्षर दर्ज करें।",
  udyamError: "मान्य प्रारूप लिखें, जैसे UDYAM-DL-00-0000000।",
  gstError: "मान्य 15 अक्षरों का GSTIN दर्ज करें।",
  employeeError: "शून्य से बड़ी पूर्ण संख्या दर्ज करें।",
  consentError: "भेजने से पहले सहमति दें।",
};

const defaultBusinessTypes = [
  "Manufacturing",
  "Engineering",
  "Textiles & Garments",
  "Printing & Packaging",
  "Electrical & Electronics",
  "Food Processing",
  "Chemicals & Plastics",
  "Trading & Services",
] as const;

function createMembershipSchema(labels: MembershipFormLabels) {
  const shortText = z
    .string()
    .trim()
    .min(2, labels.shortTextError)
    .max(140, labels.shortTextError);

  return z.object({
    applicantName: shortText,
    companyName: shortText,
    designation: shortText,
    mobile: z
      .string()
      .trim()
      .min(1, labels.requiredError)
      .regex(/^(?=(?:\D*\d){7,15}\D*$)[+\d][\d\s()-]*$/, labels.mobileError),
    email: z.string().trim().min(1, labels.requiredError).email(labels.emailError),
    businessType: z.string().trim().min(2, labels.shortTextError).max(140),
    address: z.string().trim().min(10, labels.addressError).max(500),
    industrialArea: shortText,
    udyamNumber: z
      .string()
      .trim()
      .refine(
        (value) => !value || /^UDYAM-[A-Z]{2}-\d{2}-\d{7}$/i.test(value),
        labels.udyamError,
      ),
    gstNumber: z
      .string()
      .trim()
      .refine(
        (value) =>
          !value || /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/i.test(value),
        labels.gstError,
      ),
    employeeCount: z
      .string()
      .trim()
      .refine(
        (value) => !value || (/^\d+$/.test(value) && Number(value) > 0),
        labels.employeeError,
      ),
    message: z.string().trim().min(10, labels.messageError).max(2000),
    consent: z.boolean().refine((value) => value, labels.consentError),
  });
}

function FieldError({ id, children }: { id: string; children?: ReactNode }) {
  if (!children) return null;
  return (
    <span
      className="mt-1.5 flex items-center gap-1.5 text-sm text-red-700"
      id={id}
      role="alert"
    >
      <AlertCircle aria-hidden="true" className="size-4 shrink-0" />
      {children}
    </span>
  );
}

function Optional({ children }: { children: ReactNode }) {
  return (
    <span className="text-xs font-normal text-slate-500">({children})</span>
  );
}

export function MembershipForm({
  locale = "en",
  labels: labelOverrides,
  businessTypes = defaultBusinessTypes,
  industrialAreas = [],
  onSubmit,
  className = "",
  simulateDelayMs = 650,
}: MembershipFormProps) {
  const isHindi = locale.toLowerCase().startsWith("hi");
  const labels = {
    ...(isHindi ? hindiLabels : englishLabels),
    ...labelOverrides,
  };
  const schema = createMembershipSchema(labels);
  const formId = useId();
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">(
    "idle",
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MembershipFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      applicantName: "",
      companyName: "",
      designation: "",
      mobile: "",
      email: "",
      businessType: "",
      address: "",
      industrialArea: "",
      udyamNumber: "",
      gstNumber: "",
      employeeCount: "",
      message: "",
      consent: false,
    },
  });

  async function submit(values: MembershipFormValues) {
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
  const fieldId = (name: keyof MembershipFormValues) => `${formId}-${name}`;
  const errorId = (name: keyof MembershipFormValues) => `${fieldId(name)}-error`;
  const describedBy = (name: keyof MembershipFormValues) =>
    errors[name] ? errorId(name) : undefined;

  return (
    <form
      className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7 lg:p-8 ${className}`}
      noValidate
      onSubmit={handleSubmit(submit)}
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div className="block font-semibold text-[#123B5D]">
          <label htmlFor={fieldId("applicantName")}>
            {labels.applicantName} <span aria-hidden="true" className="text-red-700">*</span>
          </label>
          <input
            {...register("applicantName")}
            aria-describedby={describedBy("applicantName")}
            aria-invalid={Boolean(errors.applicantName)}
            autoComplete="name"
            className={inputClass}
            id={fieldId("applicantName")}
            placeholder={labels.applicantPlaceholder}
            required
          />
          <FieldError id={errorId("applicantName")}>{errors.applicantName?.message}</FieldError>
        </div>

        <div className="block font-semibold text-[#123B5D]">
          <label htmlFor={fieldId("companyName")}>
            {labels.companyName} <span aria-hidden="true" className="text-red-700">*</span>
          </label>
          <input
            {...register("companyName")}
            aria-describedby={describedBy("companyName")}
            aria-invalid={Boolean(errors.companyName)}
            autoComplete="organization"
            className={inputClass}
            id={fieldId("companyName")}
            placeholder={labels.companyPlaceholder}
            required
          />
          <FieldError id={errorId("companyName")}>{errors.companyName?.message}</FieldError>
        </div>

        <div className="block font-semibold text-[#123B5D]">
          <label htmlFor={fieldId("designation")}>
            {labels.designation} <span aria-hidden="true" className="text-red-700">*</span>
          </label>
          <input
            {...register("designation")}
            aria-describedby={describedBy("designation")}
            aria-invalid={Boolean(errors.designation)}
            autoComplete="organization-title"
            className={inputClass}
            id={fieldId("designation")}
            placeholder={labels.designationPlaceholder}
            required
          />
          <FieldError id={errorId("designation")}>{errors.designation?.message}</FieldError>
        </div>

        <div className="block font-semibold text-[#123B5D]">
          <label htmlFor={fieldId("businessType")}>
            {labels.businessType} <span aria-hidden="true" className="text-red-700">*</span>
          </label>
          <input
            {...register("businessType")}
            aria-describedby={describedBy("businessType")}
            aria-invalid={Boolean(errors.businessType)}
            className={inputClass}
            id={fieldId("businessType")}
            list={`${formId}-business-types`}
            placeholder={labels.businessPlaceholder}
            required
          />
          <datalist id={`${formId}-business-types`}>
            {businessTypes.map((type) => (
              <option key={type} value={type} />
            ))}
          </datalist>
          <FieldError id={errorId("businessType")}>{errors.businessType?.message}</FieldError>
        </div>

        <div className="block font-semibold text-[#123B5D]">
          <label htmlFor={fieldId("mobile")}>
            {labels.mobile} <span aria-hidden="true" className="text-red-700">*</span>
          </label>
          <input
            {...register("mobile")}
            aria-describedby={describedBy("mobile")}
            aria-invalid={Boolean(errors.mobile)}
            autoComplete="tel"
            className={inputClass}
            id={fieldId("mobile")}
            inputMode="tel"
            placeholder={labels.mobilePlaceholder}
            required
            type="tel"
          />
          <FieldError id={errorId("mobile")}>{errors.mobile?.message}</FieldError>
        </div>

        <div className="block font-semibold text-[#123B5D]">
          <label htmlFor={fieldId("email")}>
            {labels.email} <span aria-hidden="true" className="text-red-700">*</span>
          </label>
          <input
            {...register("email")}
            aria-describedby={describedBy("email")}
            aria-invalid={Boolean(errors.email)}
            autoComplete="email"
            className={inputClass}
            id={fieldId("email")}
            inputMode="email"
            placeholder={labels.emailPlaceholder}
            required
            type="email"
          />
          <FieldError id={errorId("email")}>{errors.email?.message}</FieldError>
        </div>

        <div className="block font-semibold text-[#123B5D] md:col-span-2">
          <label htmlFor={fieldId("address")}>
            {labels.address} <span aria-hidden="true" className="text-red-700">*</span>
          </label>
          <textarea
            {...register("address")}
            aria-describedby={describedBy("address")}
            aria-invalid={Boolean(errors.address)}
            autoComplete="street-address"
            className={`${inputClass} min-h-28 resize-y`}
            id={fieldId("address")}
            placeholder={labels.addressPlaceholder}
            required
            rows={3}
          />
          <FieldError id={errorId("address")}>{errors.address?.message}</FieldError>
        </div>

        <div className="block font-semibold text-[#123B5D] md:col-span-2">
          <label htmlFor={fieldId("industrialArea")}>
            {labels.industrialArea} <span aria-hidden="true" className="text-red-700">*</span>
          </label>
          <input
            {...register("industrialArea")}
            aria-describedby={describedBy("industrialArea")}
            aria-invalid={Boolean(errors.industrialArea)}
            className={inputClass}
            id={fieldId("industrialArea")}
            list={industrialAreas.length ? `${formId}-industrial-areas` : undefined}
            placeholder={labels.areaPlaceholder}
            required
          />
          {industrialAreas.length ? (
            <datalist id={`${formId}-industrial-areas`}>
              {industrialAreas.map((area) => (
                <option key={area} value={area} />
              ))}
            </datalist>
          ) : null}
          <FieldError id={errorId("industrialArea")}>{errors.industrialArea?.message}</FieldError>
        </div>

        <div className="block font-semibold text-[#123B5D]">
          <label htmlFor={fieldId("udyamNumber")}>
            {labels.udyamNumber} <Optional>{labels.optional}</Optional>
          </label>
          <input
            {...register("udyamNumber")}
            aria-describedby={describedBy("udyamNumber")}
            aria-invalid={Boolean(errors.udyamNumber)}
            className={`${inputClass} uppercase`}
            id={fieldId("udyamNumber")}
            placeholder={labels.udyamPlaceholder}
          />
          <FieldError id={errorId("udyamNumber")}>{errors.udyamNumber?.message}</FieldError>
        </div>

        <div className="block font-semibold text-[#123B5D]">
          <label htmlFor={fieldId("gstNumber")}>
            {labels.gstNumber} <Optional>{labels.optional}</Optional>
          </label>
          <input
            {...register("gstNumber")}
            aria-describedby={describedBy("gstNumber")}
            aria-invalid={Boolean(errors.gstNumber)}
            className={`${inputClass} uppercase`}
            id={fieldId("gstNumber")}
            maxLength={15}
            placeholder={labels.gstPlaceholder}
          />
          <FieldError id={errorId("gstNumber")}>{errors.gstNumber?.message}</FieldError>
        </div>

        <div className="block font-semibold text-[#123B5D]">
          <label htmlFor={fieldId("employeeCount")}>
            {labels.employeeCount} <Optional>{labels.optional}</Optional>
          </label>
          <input
            {...register("employeeCount")}
            aria-describedby={describedBy("employeeCount")}
            aria-invalid={Boolean(errors.employeeCount)}
            className={inputClass}
            id={fieldId("employeeCount")}
            inputMode="numeric"
            min="1"
            placeholder={labels.employeePlaceholder}
            type="number"
          />
          <FieldError id={errorId("employeeCount")}>{errors.employeeCount?.message}</FieldError>
        </div>

        <div className="block font-semibold text-[#123B5D] md:col-span-2">
          <label htmlFor={fieldId("message")}>
            {labels.message} <span aria-hidden="true" className="text-red-700">*</span>
          </label>
          <textarea
            {...register("message")}
            aria-describedby={describedBy("message")}
            aria-invalid={Boolean(errors.message)}
            className={`${inputClass} min-h-36 resize-y`}
            id={fieldId("message")}
            placeholder={labels.messagePlaceholder}
            required
            rows={5}
          />
          <FieldError id={errorId("message")}>{errors.message?.message}</FieldError>
        </div>
      </div>

      <div className="mt-6">
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-slate-700" htmlFor={fieldId("consent")}>
          <input
            {...register("consent")}
            aria-describedby={describedBy("consent")}
            aria-invalid={Boolean(errors.consent)}
            className="mt-1 size-5 shrink-0 rounded border-slate-300 accent-[#176B9C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B9C] focus-visible:ring-offset-2"
            id={fieldId("consent")}
            required
            type="checkbox"
          />
          <span>{labels.consent}</span>
        </label>
        <FieldError id={errorId("consent")}>{errors.consent?.message}</FieldError>
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
