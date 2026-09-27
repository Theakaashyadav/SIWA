import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {LegalPage} from '@/components/LegalPage';

type Props = {params: Promise<{locale: string}>};
export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  return {
    title: locale === 'hi' ? 'नियम और शर्तें' : 'Terms & Conditions',
    description: locale === 'hi'
      ? 'SIWA की कानूनी जानकारी और सहायता-संपर्क वेबसाइट के उपयोग के लिए प्रारंभिक शर्तें।'
      : 'Draft terms for using SIWA legal information and assistance-enquiry website features.',
    alternates: {
      canonical: `/${locale}/terms`,
      languages: {en: '/en/terms', hi: '/hi/terms'},
    },
  };
}

export default async function TermsPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const hi = locale === 'hi';

  return (
    <LegalPage
      locale={locale}
      eyebrow={hi ? 'वेबसाइट उपयोग नीति' : 'Website use policy'}
      title={hi ? 'नियम और शर्तें' : 'Terms & Conditions'}
      description={
        hi
          ? 'SIWA की सामान्य कानूनी जानकारी और सहायता-संपर्क सुविधा के जिम्मेदार उपयोग के लिए प्रारंभिक शर्तें।'
          : 'Draft terms for responsible use of SIWA general legal information and assistance-enquiry features.'
      }
      sections={
        hi
          ? [
              {
                heading: 'उद्देश्य और सेवा की स्थिति',
                paragraphs: [
                  'यह वेबसाइट SIWA से जुड़े उद्योगों के लिए सामान्य कानूनी जानकारी उपलब्ध कराने और संभावित सहायता के लिए प्रारंभिक संपर्क को सुगम बनाने हेतु तैयार की गई है। यह SIWA को विधि फर्म के रूप में प्रस्तुत नहीं करती और वेबसाइट स्वयं कानूनी प्रतिनिधित्व प्रदान नहीं करती।',
                  'यदि किसी स्वतंत्र अधिवक्ता या कानूनी पेशेवर की सेवा उपलब्ध कराई जाती है, तो वह सेवा उस पहचाने गए पेशेवर और उपयोगकर्ता के बीच अलग लिखित शर्तों के अधीन होगी।',
                ],
              },
              {
                heading: 'स्वीकार्य उपयोग और प्रस्तुतियाँ',
                paragraphs: [
                  'वेबसाइट का उपयोग वैध, सद्भावपूर्ण और सटीक पूछताछ के लिए करें। गैरकानूनी, धमकीपूर्ण, अपमानजनक, जानबूझकर झूठी या भ्रामक सामग्री, हानिकारक कोड, अथवा किसी अन्य व्यक्ति की जानकारी बिना उचित अधिकार के जमा न करें।',
                  'आपके द्वारा दी गई जानकारी की सटीकता और उसे साझा करने के अधिकार की जिम्मेदारी आपकी है। प्रारंभिक फॉर्म में संवेदनशील, अनावश्यक या विधिक विशेषाधिकार वाली सामग्री न भेजें।',
                ],
              },
              {
                heading: 'पूछताछ की समीक्षा और पेशेवर नियुक्ति',
                paragraphs: [
                  'पूछताछ भेजने से उत्तर, रेफरल, मामले की स्वीकृति या प्रतिनिधित्व का अधिकार प्राप्त नहीं होता। अनुरोध को उपलब्धता, विषय, अधिकार-क्षेत्र, क्षमता, पहचान सत्यापन और हित-संघर्ष के आधार पर स्वीकार, अस्वीकार या किसी अन्य उपयुक्त पेशेवर की ओर भेजा जा सकता है।',
                  'जब तक किसी विशिष्ट अधिवक्ता या कानूनी पेशेवर से लिखित स्वीकृति और कार्य-क्षेत्र, शुल्क तथा अन्य शर्तों की लिखित पुष्टि न मिले, तब तक कोई अधिवक्ता–मुवक्किल संबंध या कार्रवाई करने का दायित्व नहीं बनता।',
                ],
              },
              {
                heading: 'सलाह, परिणाम और समय-सीमाएँ',
                paragraphs: [
                  'वेबसाइट की सामान्य सामग्री आपके मामले के लिए कानूनी सलाह नहीं है। किसी प्रारंभिक प्रतिक्रिया या सूचीबद्ध प्रोफ़ाइल से परिणाम, लागत, समय या सफलता की गारंटी नहीं मिलती।',
                  'पूछताछ भेजने से कोई कानूनी या नियामक समय-सीमा नहीं रुकती। आपातकाल, आसन्न सुनवाई, हिरासत, तलाशी, धमकी या अन्य समय-संवेदनशील स्थिति में वेबसाइट के उत्तर की प्रतीक्षा न करें; तुरंत स्वतंत्र अधिवक्ता, संबंधित न्यायालय या प्राधिकरण, अथवा लागू आपात सेवा से संपर्क करें।',
                ],
              },
              {
                heading: 'स्रोत, बाहरी सेवाएँ और उपलब्धता',
                paragraphs: [
                  'कानून और आधिकारिक प्रक्रियाएँ बदल सकती हैं; कार्रवाई से पहले नवीनतम आधिकारिक स्रोत जाँचें। बाहरी लिंक और सेवाएँ सुविधा के लिए हो सकती हैं तथा उनकी सामग्री, सुरक्षा या उपलब्धता SIWA के नियंत्रण में नहीं होती।',
                  'वेबसाइट बिना रुकावट या त्रुटि के उपलब्ध रहेगी, इसकी गारंटी नहीं दी जाती। रखरखाव, सुरक्षा या सामग्री समीक्षा के लिए सुविधाएँ बदली, रोकी या हटाई जा सकती हैं।',
                ],
              },
              {
                heading: 'डेमो स्थिति और अंतिम उत्पादन शर्तें',
                paragraphs: [
                  'वर्तमान पूर्वावलोकन में प्रोफ़ाइल, सेवाएँ, लेख, संपर्क विवरण और अन्य सामग्री नमूना या प्लेसहोल्डर हो सकती है, तथा फॉर्म किसी बैकएंड को जानकारी नहीं भेजते। इस डेमो के माध्यम से वास्तविक पेशेवर सेवा का अनुरोध पूर्ण नहीं होता।',
                  'लॉन्च से पहले अंतिम शर्तों में जिम्मेदार संस्था और सत्यापित संपर्क, प्रभावी तिथि, शिकायत प्रक्रिया, लागू कानून या अधिकार-क्षेत्र, बौद्धिक संपदा और उपयुक्त देयता प्रावधानों की प्रशासनिक तथा कानूनी समीक्षा होनी चाहिए।',
                ],
              },
            ]
          : [
              {
                heading: 'Purpose and service status',
                paragraphs: [
                  'This website is intended to provide general legal information for industries connected with SIWA and to facilitate an initial contact for possible assistance. It does not hold SIWA out as a law firm, and the website itself does not provide legal representation.',
                  'If assistance from an independent advocate or legal professional is made available, that service will be governed by separate written terms between the identified professional and the user.',
                ],
              },
              {
                heading: 'Acceptable use and submissions',
                paragraphs: [
                  'Use the website only for lawful, good-faith and accurate enquiries. Do not submit unlawful, threatening, abusive, deliberately false or misleading material, harmful code, or another person’s information without appropriate authority.',
                  'You are responsible for the accuracy of information you provide and your authority to share it. Do not send sensitive, unnecessary or legally privileged material in an initial form.',
                ],
              },
              {
                heading: 'Enquiry review and professional engagement',
                paragraphs: [
                  'Submitting an enquiry does not create an entitlement to a response, referral, acceptance of a matter or representation. A request may be accepted, declined or directed to another suitable professional based on availability, subject matter, jurisdiction, competence, identity verification and conflicts.',
                  'No advocate–client relationship or duty to act arises unless and until a specifically identified advocate or legal professional provides written acceptance and the scope, fees and other terms are confirmed in writing.',
                ],
              },
              {
                heading: 'Advice, outcomes and deadlines',
                paragraphs: [
                  'General website material is not legal advice for your matter. No preliminary response or listed profile guarantees an outcome, cost, timing or success.',
                  'Submitting an enquiry does not stop any legal or regulatory deadline. For an emergency, imminent hearing, detention, search, threat or other time-sensitive situation, do not wait for a website response; promptly contact an independent advocate, the relevant court or authority, or the applicable emergency service.',
                ],
              },
              {
                heading: 'Sources, external services and availability',
                paragraphs: [
                  'Laws and official procedures can change; check the latest official source before acting. External links and services may be provided for convenience, and their content, security or availability is not controlled by SIWA.',
                  'Continuous or error-free website availability is not guaranteed. Features may be changed, suspended or removed for maintenance, security or content review.',
                ],
              },
              {
                heading: 'Demo status and final production terms',
                paragraphs: [
                  'In the current preview, profiles, services, articles, contact details and other content may be samples or placeholders, and forms do not transmit information to a backend. The demo does not complete a request for an actual professional service.',
                  'Before launch, final terms should undergo administrative and legal review and identify the responsible entity and verified contact, effective date, grievance route, applicable law or jurisdiction, intellectual-property position and appropriate liability provisions.',
                ],
              },
            ]
      }
    />
  );
}
