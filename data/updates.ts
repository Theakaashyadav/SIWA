import type { CategoryOption, IndustryUpdate, UpdateCategory } from "@/types";

/** Sample publication records only. No item below is a current news report. */
export const industryUpdates: IndustryUpdate[] = [
  {
    id: "sample-update-01",
    slug: "sample-policy-update",
    title: "Sample: Labour-law compliance update",
    excerpt: "A placeholder for an officially sourced, editorially reviewed legal update.",
    titleKey: "updates.items.policy.title",
    excerptKey: "updates.items.policy.excerpt",
    category: "policy",
    publishedDate: "2026-09-16",
    image: "/images/siwa-liaison-meeting.webp",
    sourceLabel: null,
    sourceUrl: null,
    contentSections: [
      {
        id: "policy-context",
        heading: {en: "What changed", hi: "क्या बदला"},
        paragraphs: [
          {
            en: "This sample section shows where a plain-language explanation of a labour-law or employment-compliance change may appear after editorial review.",
            hi: "यह नमूना अनुभाग दिखाता है कि संपादकीय समीक्षा के बाद श्रम कानून या रोजगार अनुपालन में बदलाव की सरल व्याख्या कहाँ दिखाई जा सकती है।",
          },
          {
            en: "A production article must identify affected enterprises, jurisdiction, effective dates, the official notification and when professional advice may be needed.",
            hi: "वास्तविक लेख में प्रभावित उद्यम, अधिकार-क्षेत्र, प्रभावी तिथियाँ, आधिकारिक अधिसूचना और पेशेवर सलाह की आवश्यकता स्पष्ट होनी चाहिए।",
          },
        ],
      },
    ],
    featured: true,
    isPlaceholder: true,
  },
  {
    id: "sample-update-02",
    slug: "sample-government-announcement",
    title: "Sample: Pollution-control notification",
    excerpt: "A demonstration entry showing where verified regulatory notifications may appear.",
    titleKey: "updates.items.announcement.title",
    excerptKey: "updates.items.announcement.excerpt",
    category: "government-announcement",
    publishedDate: "2026-09-01",
    sourceLabel: null,
    sourceUrl: null,
    contentSections: [
      {
        id: "announcement-summary",
        heading: {en: "Notification summary", hi: "अधिसूचना का सार"},
        paragraphs: [
          {
            en: "This demonstration section is reserved for a concise summary of a verified pollution-control or environmental notification relevant to industry.",
            hi: "यह प्रदर्शन अनुभाग उद्योगों से संबंधित सत्यापित प्रदूषण नियंत्रण या पर्यावरण अधिसूचना के संक्षिप्त सार के लिए आरक्षित है।",
          },
          {
            en: "The final version should state the issuing authority, applicability, action required and a link to the original notice.",
            hi: "अंतिम संस्करण में जारीकर्ता प्राधिकरण, लागू क्षेत्र, आवश्यक कार्रवाई और मूल सूचना का लिंक दिया जाना चाहिए।",
          },
        ],
      },
    ],
    featured: true,
    isPlaceholder: true,
  },
  {
    id: "sample-update-03",
    slug: "sample-msme-news",
    title: "Sample: MSME delayed-payment remedies",
    excerpt: "A placeholder for general legal information linked to official MSME sources.",
    titleKey: "updates.items.msme.title",
    excerptKey: "updates.items.msme.excerpt",
    category: "msme-news",
    publishedDate: "2026-08-21",
    sourceLabel: null,
    sourceUrl: null,
    contentSections: [
      {
        id: "msme-relevance",
        heading: {en: "Who may be affected", hi: "किस पर प्रभाव पड़ सकता है"},
        paragraphs: [
          {
            en: "This sample area is prepared for sourced, general information that helps small enterprises understand possible delayed-payment remedies.",
            hi: "यह नमूना क्षेत्र स्रोत-समर्थित सामान्य जानकारी के लिए तैयार है, जिससे लघु उद्यम विलंबित भुगतान के संभावित उपाय समझ सकें।",
          },
          {
            en: "Approved content should identify eligibility, limitation considerations, the competent forum, official sources and when to seek matter-specific advice.",
            hi: "स्वीकृत सामग्री में पात्रता, परिसीमा संबंधी विचार, सक्षम मंच, आधिकारिक स्रोत और मामले-विशिष्ट सलाह लेने का समय बताया जाना चाहिए।",
          },
        ],
      },
    ],
    featured: false,
    isPlaceholder: true,
  },
  {
    id: "sample-update-04",
    slug: "sample-regulatory-information",
    title: "Sample: Licence and renewal compliance",
    excerpt: "A demonstration legal-information summary that must be checked against the official notification.",
    titleKey: "updates.items.regulatory.title",
    excerptKey: "updates.items.regulatory.excerpt",
    category: "regulatory",
    publishedDate: "2026-08-06",
    sourceLabel: null,
    sourceUrl: null,
    contentSections: [
      {
        id: "regulatory-guidance",
        heading: {en: "Important dates and next steps", hi: "महत्वपूर्ण तिथियाँ और अगले कदम"},
        paragraphs: [
          {
            en: "This placeholder demonstrates how a regulatory change can be explained in clear language without replacing the official notification.",
            hi: "यह नमूना दिखाता है कि आधिकारिक अधिसूचना का स्थान लिए बिना नियामक बदलाव को सरल भाषा में कैसे समझाया जा सकता है।",
          },
          {
            en: "Production guidance should identify compliance dates, jurisdiction, responsible authorities and any matter-specific professional advice an enterprise may need.",
            hi: "वास्तविक मार्गदर्शन में अनुपालन तिथियाँ, अधिकार-क्षेत्र, जिम्मेदार प्राधिकरण और उद्यम को आवश्यक मामले-विशिष्ट पेशेवर सलाह बताई जानी चाहिए।",
          },
        ],
      },
    ],
    featured: false,
    isPlaceholder: true,
  },
];

export const updateCategories: CategoryOption<UpdateCategory>[] = [
  { value: "policy", labelKey: "updates.categories.policy" },
  { value: "government-announcement", labelKey: "updates.categories.announcements" },
  { value: "msme-news", labelKey: "updates.categories.msme" },
  { value: "industrial-development", labelKey: "updates.categories.development" },
  { value: "regulatory", labelKey: "updates.categories.regulatory" },
  { value: "training", labelKey: "updates.categories.training" },
];
