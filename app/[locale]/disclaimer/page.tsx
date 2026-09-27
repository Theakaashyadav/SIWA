import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {LegalPage} from '@/components/LegalPage';

type Props = {params: Promise<{locale: string}>};
export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  return {
    title: locale === 'hi' ? 'कानूनी अस्वीकरण' : 'Legal Disclaimer',
    description: locale === 'hi'
      ? 'SIWA वेबसाइट पर उपलब्ध कानूनी जानकारी, संपर्क अनुरोध और प्रदर्शन सामग्री से संबंधित महत्वपूर्ण सीमाएँ।'
      : 'Important limitations concerning legal information, enquiries and demonstration content on the SIWA website.',
    alternates: {
      canonical: `/${locale}/disclaimer`,
      languages: {en: '/en/disclaimer', hi: '/hi/disclaimer'},
    },
  };
}

export default async function DisclaimerPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const hi = locale === 'hi';

  return (
    <LegalPage
      locale={locale}
      eyebrow={hi ? 'महत्वपूर्ण कानूनी सूचना' : 'Important legal information'}
      title={hi ? 'कानूनी अस्वीकरण' : 'Legal Disclaimer'}
      description={
        hi
          ? 'वेबसाइट की जानकारी और संपर्क सुविधा की प्रकृति तथा सीमाएँ समझने के लिए यह सूचना पढ़ें।'
          : 'Please read this notice to understand the nature and limits of the website information and enquiry facility.'
      }
      sections={
        hi
          ? [
              {
                heading: 'सामान्य जानकारी, व्यक्तिगत कानूनी सलाह नहीं',
                paragraphs: [
                  'इस वेबसाइट पर लेख, चेकलिस्ट, अपडेट, सामान्य उत्तर और अन्य सामग्री केवल सामान्य जानकारी एवं जागरूकता के लिए हैं। वे किसी व्यक्ति, उद्योग, विवाद या लेन-देन की परिस्थितियों के अनुसार तैयार की गई कानूनी सलाह नहीं हैं।',
                  'केवल वेबसाइट की सामग्री के आधार पर कोई कदम न उठाएँ और न ही किसी आवश्यक कदम को टालें। अपने तथ्य, दस्तावेज़ और उस समय लागू कानून की समीक्षा के लिए उपयुक्त रूप से योग्य अधिवक्ता से स्वतंत्र सलाह लें।',
                ],
              },
              {
                heading: 'अधिवक्ता–मुवक्किल संबंध अपने-आप नहीं बनता',
                paragraphs: [
                  'वेबसाइट देखना, सामग्री डाउनलोड करना, SIWA से संपर्क करना या प्रारंभिक पूछताछ भेजना किसी अधिवक्ता–मुवक्किल संबंध, प्रतिनिधित्व, गोपनीयता के पेशेवर दायित्व या आपके मामले में कार्रवाई करने की जिम्मेदारी को अपने-आप स्थापित नहीं करता। यह वेबसाइट SIWA को विधि फर्म के रूप में प्रस्तुत नहीं करती।',
                  'किसी विशिष्ट अधिवक्ता या कानूनी पेशेवर द्वारा पहचान और हित-संघर्ष जाँच पूरी करने, मामले को लिखित रूप से स्वीकार करने तथा कार्य-क्षेत्र, शुल्क और अन्य शर्तों पर लिखित सहमति होने के बाद ही कोई पेशेवर नियुक्ति मानी जाएगी।',
                ],
              },
              {
                heading: 'परिणाम की कोई गारंटी नहीं',
                paragraphs: [
                  'किसी उदाहरण, सामान्य टिप्पणी, प्रारंभिक प्रतिक्रिया या पेशेवर प्रोफ़ाइल को परिणाम, लागत, समय-सीमा या सफलता की गारंटी न समझें। परिणाम तथ्यों, साक्ष्यों, लागू कानून, संबंधित प्राधिकरण या न्यायालय और अन्य परिस्थितियों पर निर्भर करते हैं।',
                ],
              },
              {
                heading: 'समय-सीमाएँ और आपात स्थिति',
                paragraphs: [
                  'ऑनलाइन पूछताछ या दस्तावेज़ भेजने से परिसीमा अवधि, जवाब, दाखिला, सुनवाई, अपील या किसी अन्य कानूनी अथवा नियामक समय-सीमा पर रोक नहीं लगती। लिखित स्वीकृति मिलने तक यह न मानें कि कोई आपके मामले या समय-सीमा की निगरानी कर रहा है।',
                  'तत्काल जोखिम, हिरासत, तलाशी, दुर्घटना, धमकी, आसन्न सुनवाई या समय-संवेदनशील मामले में इस वेबसाइट पर निर्भर न रहें। तुरंत किसी स्वतंत्र अधिवक्ता, संबंधित न्यायालय या प्राधिकरण, अथवा लागू आपात सेवा से संपर्क करें।',
                ],
              },
              {
                heading: 'आधिकारिक स्रोत और बाहरी लिंक',
                paragraphs: [
                  'कानून, नियम, परिपत्र, सरकारी योजना, पात्रता और प्रक्रिया बदल सकती है। कार्रवाई से पहले संबंधित न्यायालय, सरकारी विभाग, राजपत्र या अन्य आधिकारिक स्रोत से नवीनतम जानकारी सत्यापित करें।',
                  'तृतीय-पक्ष वेबसाइटों के लिंक केवल सुविधा के लिए दिए जा सकते हैं। जब तक स्पष्ट रूप से न कहा जाए, SIWA उनकी सामग्री, उपलब्धता, सुरक्षा या सेवाओं को नियंत्रित, अनुमोदित या गारंटीकृत नहीं करता।',
                ],
              },
              {
                heading: 'प्रदर्शन और प्लेसहोल्डर सामग्री',
                paragraphs: [
                  'इस वर्तमान वेबसाइट पूर्वावलोकन में अधिवक्ता या पेशेवर प्रोफ़ाइल, अनुभव विवरण, लेख, मामले के उदाहरण, सेवाएँ, स्रोत, संपर्क विवरण और अन्य प्रविष्टियाँ नमूना या प्लेसहोल्डर हो सकती हैं। सत्यापित पहचान, योग्यता, प्राधिकरण और लिखित स्वीकृति के बिना किसी प्रोफ़ाइल या सामग्री पर भरोसा न करें।',
                ],
              },
            ]
          : [
              {
                heading: 'General information, not case-specific legal advice',
                paragraphs: [
                  'Articles, checklists, updates, general answers and other material on this website are provided for general information and awareness only. They are not legal advice tailored to any person, enterprise, dispute or transaction.',
                  'Do not act, or refrain from taking a necessary step, solely on the basis of website content. Obtain independent advice from a suitably qualified advocate who can review your facts, documents and the law in force at the relevant time.',
                ],
              },
              {
                heading: 'No automatic advocate–client relationship',
                paragraphs: [
                  'Viewing the website, downloading material, contacting SIWA or submitting an initial enquiry does not by itself create an advocate–client relationship, legal representation, a professional duty of confidentiality or a duty to act on your matter. This website does not hold SIWA out as a law firm.',
                  'A professional engagement exists only after a specifically identified advocate or legal professional has completed required identity and conflict checks, expressly accepted the matter in writing, and agreed the scope, fees and other terms in writing.',
                ],
              },
              {
                heading: 'No guarantee of outcome',
                paragraphs: [
                  'No example, general statement, preliminary response or professional profile is a guarantee of outcome, cost, timing or success. Results depend on the facts, evidence, applicable law, the relevant authority or court, and other circumstances.',
                ],
              },
              {
                heading: 'Deadlines and emergencies',
                paragraphs: [
                  'Sending an online enquiry or document does not pause any limitation period, response, filing, hearing, appeal or other legal or regulatory deadline. Until written acceptance is received, do not assume that anyone is monitoring your matter or its deadlines.',
                  'Do not rely on this website for an urgent risk, detention, search, accident, threat, imminent hearing or other time-sensitive matter. Contact an independent advocate, the relevant court or authority, or the applicable emergency service promptly.',
                ],
              },
              {
                heading: 'Official sources and third-party links',
                paragraphs: [
                  'Laws, rules, circulars, government schemes, eligibility criteria and procedures can change. Before acting, verify current information through the relevant court, government department, gazette or other official source.',
                  'Links to third-party websites may be provided for convenience. Unless expressly stated, SIWA does not control, endorse or guarantee their content, availability, security or services.',
                ],
              },
              {
                heading: 'Demonstration and placeholder content',
                paragraphs: [
                  'In this current website preview, advocate or professional profiles, experience details, articles, case examples, services, sources, contact details and other entries may be samples or placeholders. Do not rely on a profile or item until its identity, qualifications, authority and publication approval have been verified.',
                ],
              },
            ]
      }
    />
  );
}
