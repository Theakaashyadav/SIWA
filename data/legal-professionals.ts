import type {
  LegalProfessional,
  LegalProfessionalRole,
} from "@/types";

/**
 * Fictional demonstration profiles only. These are not real professionals,
 * verified credentials, appointments, or endorsements by SIWA.
 */
export const legalProfessionals: LegalProfessional[] = [
  {
    id: "sample-legal-professional-01",
    name: "[Sample Advocate Profile 01]",
    role: "Advocate",
    organisation: "Demonstration Industrial Law Chambers",
    practiceAreas: [
      "Industrial & Regulatory Law",
      "Government Notices & Representation",
    ],
    location: "Delhi NCR (demonstration)",
    languages: ["Hindi", "English"],
    experience: "[Experience awaiting verification]",
    featured: true,
    status: "active",
    isPlaceholder: true,
  },
  {
    id: "sample-legal-professional-02",
    name: "[Sample Advocate Profile 02]",
    role: "Advocate",
    organisation: "Sample Workforce Legal Desk",
    practiceAreas: ["Labour & Employment Law", "Factory Compliance"],
    location: "Delhi (demonstration)",
    languages: ["Hindi", "English"],
    experience: "[Experience awaiting verification]",
    featured: true,
    status: "active",
    isPlaceholder: true,
  },
  {
    id: "sample-legal-professional-03",
    name: "[Sample Legal Consultant Profile 03]",
    role: "Legal Consultant",
    organisation: "Example Commercial Advisory Practice",
    practiceAreas: ["Contracts & Commercial Law", "Commercial Disputes"],
    location: "Delhi NCR (demonstration)",
    languages: ["Hindi", "English"],
    experience: "[Experience awaiting verification]",
    featured: true,
    status: "active",
    isPlaceholder: true,
  },
  {
    id: "sample-legal-professional-04",
    name: "[Sample Compliance Adviser Profile 04]",
    role: "Compliance Adviser",
    organisation: "Demonstration Compliance Counsel",
    practiceAreas: [
      "Regulatory Compliance & Licensing",
      "Environmental & Factory Compliance",
    ],
    location: "Remote consultation (demonstration)",
    languages: ["Hindi", "English"],
    experience: "[Experience awaiting verification]",
    featured: false,
    status: "active",
    isPlaceholder: true,
  },
  {
    id: "sample-legal-professional-05",
    name: "[Sample Advocate Profile 05]",
    role: "Advocate",
    organisation: "Sample Property & Recovery Practice",
    practiceAreas: ["Land, Lease & Property", "Debt Recovery & Insolvency"],
    location: "Delhi (demonstration)",
    languages: ["Hindi", "English"],
    experience: "[Experience awaiting verification]",
    featured: false,
    status: "active",
    isPlaceholder: true,
  },
  {
    id: "sample-legal-professional-06",
    name: "[Sample Mediator Profile 06]",
    role: "Mediator",
    organisation: "Example Mediation Practice",
    practiceAreas: ["Dispute Resolution & Mediation", "Commercial Disputes"],
    location: "Remote consultation (demonstration)",
    languages: ["Hindi", "English"],
    experience: "[Experience awaiting verification]",
    featured: false,
    status: "active",
    isPlaceholder: true,
  },
];

export const activeLegalProfessionals = legalProfessionals.filter(
  (professional) => professional.status === "active",
);

export const featuredLegalProfessionals = activeLegalProfessionals.filter(
  (professional) => professional.featured,
);

type HindiProfessionalContent = {
  name: string;
  role: string;
  organisation: string;
  practiceAreas: string[];
  location: string;
  languages: string[];
  experience?: string;
};

export type LocalizedLegalProfessional = Omit<LegalProfessional, "role"> & {
  role: string;
};

const hindiRoles: Record<LegalProfessionalRole, string> = {
  Advocate: "अधिवक्ता",
  "Legal Consultant": "विधि सलाहकार",
  "Compliance Adviser": "अनुपालन सलाहकार",
  Mediator: "मध्यस्थ",
};

const hindiPracticeAreas: Record<string, string> = {
  "Industrial & Regulatory Law": "औद्योगिक एवं नियामक विधि",
  "Government Notices & Representation": "सरकारी नोटिस एवं अभ्यावेदन",
  "Labour & Employment Law": "श्रम एवं रोजगार विधि",
  "Factory Compliance": "कारखाना अनुपालन",
  "Contracts & Commercial Law": "अनुबंध एवं वाणिज्यिक विधि",
  "Commercial Disputes": "वाणिज्यिक विवाद",
  "Regulatory Compliance & Licensing": "नियामक अनुपालन एवं लाइसेंसिंग",
  "Environmental & Factory Compliance": "पर्यावरण एवं कारखाना अनुपालन",
  "Land, Lease & Property": "भूमि, पट्टा एवं संपत्ति",
  "Debt Recovery & Insolvency": "ऋण वसूली एवं दिवाला",
  "Dispute Resolution & Mediation": "विवाद समाधान एवं मध्यस्थता",
};

const hindiContent: Record<string, HindiProfessionalContent> = {
  "sample-legal-professional-01": {
    name: "[नमूना अधिवक्ता प्रोफ़ाइल 01]",
    role: "अधिवक्ता",
    organisation: "प्रदर्शन औद्योगिक विधि कार्यालय",
    practiceAreas: ["औद्योगिक एवं नियामक विधि", "सरकारी नोटिस एवं अभ्यावेदन"],
    location: "दिल्ली एनसीआर (प्रदर्शन)",
    languages: ["हिन्दी", "अंग्रेज़ी"],
    experience: "[अनुभव का सत्यापन शेष]",
  },
  "sample-legal-professional-02": {
    name: "[नमूना अधिवक्ता प्रोफ़ाइल 02]",
    role: "अधिवक्ता",
    organisation: "नमूना कार्यबल विधि सेवा",
    practiceAreas: ["श्रम एवं रोजगार विधि", "कारखाना अनुपालन"],
    location: "दिल्ली (प्रदर्शन)",
    languages: ["हिन्दी", "अंग्रेज़ी"],
    experience: "[अनुभव का सत्यापन शेष]",
  },
  "sample-legal-professional-03": {
    name: "[नमूना विधि सलाहकार प्रोफ़ाइल 03]",
    role: "विधि सलाहकार",
    organisation: "उदाहरण वाणिज्यिक विधि परामर्श",
    practiceAreas: ["अनुबंध एवं वाणिज्यिक विधि", "वाणिज्यिक विवाद"],
    location: "दिल्ली एनसीआर (प्रदर्शन)",
    languages: ["हिन्दी", "अंग्रेज़ी"],
    experience: "[अनुभव का सत्यापन शेष]",
  },
  "sample-legal-professional-04": {
    name: "[नमूना अनुपालन सलाहकार प्रोफ़ाइल 04]",
    role: "अनुपालन सलाहकार",
    organisation: "प्रदर्शन अनुपालन विधि परामर्श",
    practiceAreas: [
      "नियामक अनुपालन एवं लाइसेंसिंग",
      "पर्यावरण एवं कारखाना अनुपालन",
    ],
    location: "ऑनलाइन परामर्श (प्रदर्शन)",
    languages: ["हिन्दी", "अंग्रेज़ी"],
    experience: "[अनुभव का सत्यापन शेष]",
  },
  "sample-legal-professional-05": {
    name: "[नमूना अधिवक्ता प्रोफ़ाइल 05]",
    role: "अधिवक्ता",
    organisation: "नमूना संपत्ति एवं वसूली विधि सेवा",
    practiceAreas: ["भूमि, पट्टा एवं संपत्ति", "ऋण वसूली एवं दिवाला"],
    location: "दिल्ली (प्रदर्शन)",
    languages: ["हिन्दी", "अंग्रेज़ी"],
    experience: "[अनुभव का सत्यापन शेष]",
  },
  "sample-legal-professional-06": {
    name: "[नमूना मध्यस्थ प्रोफ़ाइल 06]",
    role: "मध्यस्थ",
    organisation: "उदाहरण मध्यस्थता सेवा",
    practiceAreas: ["विवाद समाधान एवं मध्यस्थता", "वाणिज्यिक विवाद"],
    location: "ऑनलाइन परामर्श (प्रदर्शन)",
    languages: ["हिन्दी", "अंग्रेज़ी"],
    experience: "[अनुभव का सत्यापन शेष]",
  },
};

/** Localizes public profile content while keeping stable record IDs. */
export function localizeLegalProfessional(
  professional: LegalProfessional,
  locale: string,
): LocalizedLegalProfessional {
  if (locale !== "hi") return professional;

  const localized = hindiContent[professional.id];
  if (localized) return {...professional, ...localized};

  return {
    ...professional,
    role: hindiRoles[professional.role],
    practiceAreas: professional.practiceAreas.map(
      (area) => hindiPracticeAreas[area] ?? area,
    ),
  };
}
