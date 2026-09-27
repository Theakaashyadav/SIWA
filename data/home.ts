import type { AuthorityCoordination, IndustrialIssue, ServiceItem } from "@/types";

export const services: ServiceItem[] = [
  {
    id: "governmentRepresentation",
    number: "01",
    title: "Legal Consultation & Case Assessment",
    description:
      "Understand the issue, identify immediate legal priorities and plan an appropriate course of action.",
    titleKey: "home.serviceItems.governmentRepresentation.title",
    descriptionKey: "home.serviceItems.governmentRepresentation.description",
    icon: "Scale",
  },
  {
    id: "schemesSubsidies",
    number: "02",
    title: "Regulatory & Compliance Advisory",
    description:
      "Help industrial enterprises understand applicable licences, regulations and compliance obligations.",
    titleKey: "home.serviceItems.schemesSubsidies.title",
    descriptionKey: "home.serviceItems.schemesSubsidies.description",
    icon: "ShieldCheck",
  },
  {
    id: "regulatoryUpdates",
    number: "03",
    title: "Legal Notices & Replies",
    description:
      "Support the review of notices, preparation of replies and organisation of relevant records and deadlines.",
    titleKey: "home.serviceItems.regulatoryUpdates.title",
    descriptionKey: "home.serviceItems.regulatoryUpdates.description",
    icon: "FileSignature",
  },
  {
    id: "industrialInfrastructure",
    number: "04",
    title: "Contracts & Commercial Documentation",
    description:
      "Assist with commercial contracts, notices, representations, settlements and business documentation.",
    titleKey: "home.serviceItems.industrialInfrastructure.title",
    descriptionKey: "home.serviceItems.industrialInfrastructure.description",
    icon: "ScrollText",
  },
  {
    id: "pollutionCompliance",
    number: "05",
    title: "Environmental & Pollution Law",
    description:
      "Provide issue-based guidance on pollution-control directions and environmental compliance matters.",
    titleKey: "home.serviceItems.pollutionCompliance.title",
    descriptionKey: "home.serviceItems.pollutionCompliance.description",
    icon: "Leaf",
  },
  {
    id: "labourSupport",
    number: "06",
    title: "Labour & Employment Advisory",
    description: "Support employers with labour-law queries, workplace documentation and employment disputes.",
    titleKey: "home.serviceItems.labourSupport.title",
    descriptionKey: "home.serviceItems.labourSupport.description",
    icon: "BriefcaseBusiness",
  },
  {
    id: "petitionsRepresentation",
    number: "07",
    title: "Representation & Dispute Support",
    description:
      "Assist with representations, petitions, negotiations and coordination with appropriate counsel or authorities.",
    titleKey: "home.serviceItems.petitionsRepresentation.title",
    descriptionKey: "home.serviceItems.petitionsRepresentation.description",
    icon: "ScrollText",
  },
  {
    id: "networkingDevelopment",
    number: "08",
    title: "Legal Awareness & Professional Network",
    description:
      "Connect industries with legal professionals and share practical legal-awareness resources and sessions.",
    titleKey: "home.serviceItems.networkingDevelopment.title",
    descriptionKey: "home.serviceItems.networkingDevelopment.description",
    icon: "Network",
  },
];

export const industrialIssues: IndustrialIssue[] = [
  { id: "roads", label: "Contract drafting & review", labelKey: "home.issueItems.roads", icon: "ScrollText" },
  { id: "drainage", label: "Recovery & payment disputes", labelKey: "home.issueItems.drainage", icon: "BadgeIndianRupee" },
  { id: "water", label: "Government notices & replies", labelKey: "home.issueItems.water", icon: "FileSignature" },
  { id: "waste", label: "Environmental compliance", labelKey: "home.issueItems.waste", icon: "Leaf" },
  { id: "electricity", label: "Utility & electricity disputes", labelKey: "home.issueItems.electricity", icon: "Zap" },
  { id: "security", label: "Litigation coordination", labelKey: "home.issueItems.security", icon: "Scale" },
  { id: "encroachment", label: "Land, lease & encroachment", labelKey: "home.issueItems.encroachment", icon: "Map" },
  {
    id: "pollution",
    label: "Pollution-control matters",
    labelKey: "home.issueItems.pollution",
    icon: "Leaf",
  },
  { id: "labour", label: "Labour & employment law", labelKey: "home.issueItems.labour", icon: "BriefcaseBusiness" },
  { id: "licensing", label: "Licences & registrations", labelKey: "home.issueItems.licensing", icon: "BadgeCheck" },
  { id: "taxes", label: "GST & taxation", labelKey: "home.issueItems.taxes", icon: "ReceiptIndianRupee" },
  { id: "policies", label: "Policy interpretation", labelKey: "home.issueItems.policies", icon: "ScrollText" },
  {
    id: "infrastructure",
    label: "Industrial-area regulations",
    labelKey: "home.issueItems.infrastructure",
    icon: "Factory",
  },
  { id: "development", label: "Legal due diligence", labelKey: "home.issueItems.development", icon: "ShieldCheck" },
];

/** Coordination does not imply partnership, endorsement or formal affiliation. */
export const authorityCoordination: AuthorityCoordination[] = [
  {
    id: "dda",
    name: "DDA",
    description: "Coordination and representation on relevant industrial-area matters.",
    nameKey: "home.authorityItems.dda.name",
    descriptionKey: "home.authorityItems.dda.description",
    icon: "Landmark",
  },
  {
    id: "mcd",
    name: "MCD",
    description: "Coordination and representation on relevant municipal matters.",
    nameKey: "home.authorityItems.mcd.name",
    descriptionKey: "home.authorityItems.mcd.description",
    icon: "Building2",
  },
  {
    id: "dsidc",
    name: "DSIIDC / relevant industrial agency",
    description: "Communication on matters within the concerned industrial agency's remit.",
    nameKey: "home.authorityItems.dsiidc.name",
    descriptionKey: "home.authorityItems.dsiidc.description",
    icon: "Factory",
  },
  {
    id: "pollution-control",
    name: "Pollution control authorities",
    description: "Information coordination on applicable environmental and pollution-control requirements.",
    nameKey: "home.authorityItems.pollution.name",
    descriptionKey: "home.authorityItems.pollution.description",
    icon: "Leaf",
  },
  {
    id: "labour",
    name: "Labour Department",
    description: "Communication on relevant labour and employer-related industrial matters.",
    nameKey: "home.authorityItems.labour.name",
    descriptionKey: "home.authorityItems.labour.description",
    icon: "Users",
  },
  {
    id: "utilities",
    name: "Electricity & utility departments",
    description: "Representation concerning common electricity, water and utility issues.",
    nameKey: "home.authorityItems.utilities.name",
    descriptionKey: "home.authorityItems.utilities.description",
    icon: "Zap",
  },
  {
    id: "other-authorities",
    name: "Other government & industrial authorities",
    description: "Issue-based coordination with the relevant authority where required.",
    nameKey: "home.authorityItems.other.name",
    descriptionKey: "home.authorityItems.other.description",
    icon: "Network",
  },
];
