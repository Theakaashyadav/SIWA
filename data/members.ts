import type { Member, MembershipType } from "@/types";

/**
 * Demonstration directory records only. Names, people, locations and dates are
 * fictional placeholders and must be replaced with administrator-approved data.
 */
export const members: Member[] = [
  {
    id: "demo-member-01",
    companyName: "Demo Industrial Law Chambers",
    initials: "DIL",
    industry: "Industrial & Regulatory Law",
    representative: "[Advocate Name]",
    location: "Delhi NCR — Industrial Practice",
    memberSince: "[Year]",
    membershipType: "General",
    featured: true,
    status: "active",
    isPlaceholder: true,
  },
  {
    id: "demo-member-02",
    companyName: "Sample Labour & Employment Counsel",
    initials: "SLE",
    industry: "Labour & Employment Law",
    representative: "[Advocate Name]",
    location: "Delhi — Industrial Areas",
    memberSince: "[Year]",
    membershipType: "General",
    featured: true,
    status: "active",
    isPlaceholder: true,
  },
  {
    id: "demo-member-03",
    companyName: "Example Tax & Commercial Advisors",
    initials: "ETC",
    industry: "GST, Taxation & Commercial Law",
    representative: "[Legal Professional Name]",
    location: "Delhi NCR — Regional Practice",
    memberSince: "[Year]",
    membershipType: "Associate",
    featured: true,
    status: "active",
    isPlaceholder: true,
  },
  {
    id: "demo-member-04",
    companyName: "Demo Environmental Compliance Law",
    initials: "DEC",
    industry: "Environmental & Pollution Compliance",
    representative: "[Advocate Name]",
    location: "Delhi NCR — Industrial Practice",
    memberSince: "[Year]",
    membershipType: "General",
    featured: false,
    status: "active",
    isPlaceholder: true,
  },
  {
    id: "demo-member-05",
    companyName: "Sample Contracts & Dispute Counsel",
    initials: "SCD",
    industry: "Contracts & Commercial Disputes",
    representative: "[Legal Professional Name]",
    location: "Remote & On-site Consultation",
    memberSince: "[Year]",
    membershipType: "Institutional",
    featured: false,
    status: "active",
    isPlaceholder: true,
  },
  {
    id: "demo-member-06",
    companyName: "Example Land & Property Law Office",
    initials: "ELP",
    industry: "Industrial Land, Lease & Property",
    representative: "[Advocate Name]",
    location: "Delhi — Industrial Areas",
    memberSince: "[Year]",
    membershipType: "Associate",
    featured: false,
    status: "active",
    isPlaceholder: true,
  },
];

export const activeMembers = members.filter((member) => member.status === "active");

export const featuredMembers = activeMembers.filter((member) => member.featured);

const hindiIndustries: Record<string, string> = {
  "Industrial & Regulatory Law": "औद्योगिक एवं नियामक कानून",
  "Labour & Employment Law": "श्रम एवं रोजगार कानून",
  "GST, Taxation & Commercial Law": "जीएसटी, कर एवं वाणिज्यिक कानून",
  "Environmental & Pollution Compliance": "पर्यावरण एवं प्रदूषण अनुपालन",
  "Contracts & Commercial Disputes": "अनुबंध एवं वाणिज्यिक विवाद",
  "Industrial Land, Lease & Property": "औद्योगिक भूमि, पट्टा एवं संपत्ति",
};

const hindiLocations: Record<string, string> = {
  "Delhi NCR — Industrial Practice": "दिल्ली एनसीआर — औद्योगिक विधिक सेवा",
  "Delhi — Industrial Areas": "दिल्ली — औद्योगिक क्षेत्र",
  "Delhi NCR — Regional Practice": "दिल्ली एनसीआर — क्षेत्रीय सेवा",
  "Remote & On-site Consultation": "ऑनलाइन एवं स्थल पर परामर्श",
};

const englishProfessionalTypes: Record<MembershipType, string> = {
  General: "Panel Advocate",
  Associate: "Associate Professional",
  Institutional: "Law Firm / Institution",
};

const hindiProfessionalTypes: Record<MembershipType, string> = {
  General: "पैनल अधिवक्ता",
  Associate: "संबद्ध विधिक विशेषज्ञ",
  Institutional: "विधिक फर्म / संस्था",
};

const hindiNames: Record<string, string> = {
  "Demo Industrial Law Chambers": "नमूना औद्योगिक विधि कार्यालय",
  "Sample Labour & Employment Counsel": "नमूना श्रम एवं रोजगार विधि सलाहकार",
  "Example Tax & Commercial Advisors": "नमूना कर एवं वाणिज्यिक विधि सलाहकार",
  "Demo Environmental Compliance Law": "नमूना पर्यावरण अनुपालन विधि सेवा",
  "Sample Contracts & Dispute Counsel": "नमूना अनुबंध एवं विवाद विधि सलाहकार",
  "Example Land & Property Law Office": "नमूना भूमि एवं संपत्ति विधि कार्यालय",
};

/** Localizes public-facing taxonomy while preserving stable record IDs. */
export function localizeMember(member: Member, locale: string) {
  if (locale !== "hi") {
    return {
      ...member,
      membershipType: englishProfessionalTypes[member.membershipType],
    };
  }

  return {
    ...member,
    companyName: hindiNames[member.companyName] ?? member.companyName,
    industry: hindiIndustries[member.industry] ?? member.industry,
    representative: member.representative ? "[अधिवक्ता / विधिक विशेषज्ञ का नाम]" : undefined,
    location: hindiLocations[member.location] ?? member.location,
    memberSince: member.memberSince ? "[वर्ष]" : member.memberSince,
    membershipType: hindiProfessionalTypes[member.membershipType],
  };
}

export const industryCategories = [
  "All practice areas",
  "Contracts & Commercial Disputes",
  "Environmental & Pollution Compliance",
  "GST, Taxation & Commercial Law",
  "Industrial & Regulatory Law",
  "Industrial Land, Lease & Property",
  "Labour & Employment Law",
] as const;

export const industrialAreas = [
  "All service regions",
  "Delhi — Industrial Areas",
  "Delhi NCR — Industrial Practice",
  "Delhi NCR — Regional Practice",
  "Remote & On-site Consultation",
] as const;

export const membershipTypes = ["All types", "General", "Associate", "Institutional"] as const satisfies readonly (
  | "All types"
  | MembershipType
)[];
