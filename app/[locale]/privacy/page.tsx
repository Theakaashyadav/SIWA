import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {LegalPage} from '@/components/LegalPage';

type Props = {params: Promise<{locale: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  return {
    title: locale === 'hi' ? 'गोपनीयता नीति' : 'Privacy Policy',
    description: locale === 'hi'
      ? 'SIWA वेबसाइट पर कानूनी सहायता संबंधी पूछताछ में साझा जानकारी के लिए प्रारंभिक गोपनीयता सूचना।'
      : 'Draft privacy information for data shared through legal-support enquiries on the SIWA website.',
    alternates: {
      canonical: `/${locale}/privacy`,
      languages: {en: '/en/privacy', hi: '/hi/privacy'},
    },
  };
}

export default async function PrivacyPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const hi = locale === 'hi';

  return (
    <LegalPage
      locale={locale}
      eyebrow={hi ? 'डेटा और गोपनीयता' : 'Data and privacy'}
      title={hi ? 'गोपनीयता नीति' : 'Privacy Policy'}
      description={
        hi
          ? 'यह प्रारंभिक सूचना बताती है कि कानूनी सहायता संबंधी पूछताछ में कम-से-कम जानकारी कैसे माँगी और संभाली जानी चाहिए।'
          : 'This draft notice explains how legal-support enquiries should request and handle only the minimum necessary information.'
      }
      sections={
        hi
          ? [
              {
                heading: 'दायरा और डेटा न्यूनतमकरण',
                paragraphs: [
                  'प्रारंभिक संपर्क में केवल वह जानकारी माँगी जानी चाहिए जो अनुरोध को समझने और उचित अगला कदम तय करने के लिए आवश्यक हो—जैसे आपका नाम, संगठन, संपर्क विवरण, समस्या की सामान्य श्रेणी, संक्षिप्त विवरण और संपर्क की पसंद।',
                  'अनावश्यक व्यक्तिगत डेटा एकत्र नहीं किया जाना चाहिए। उत्पादन सेवा को प्रत्येक फ़ील्ड का स्पष्ट उद्देश्य तय करना चाहिए और जो जानकारी आवश्यक न हो उसे वैकल्पिक बनाना या हटाना चाहिए।',
                ],
              },
              {
                heading: 'प्रारंभिक फॉर्म में संवेदनशील या गोपनीय दस्तावेज़ न भेजें',
                paragraphs: [
                  'प्रारंभिक फॉर्म में आधार, पैन, बैंक विवरण, पासवर्ड, स्वास्थ्य रिकॉर्ड, व्यापार रहस्य, मूल दस्तावेज़, पूरे मामले की फ़ाइल या ऐसी सामग्री न भेजें जिसे आप गोपनीय अथवा विधिक विशेषाधिकार से संरक्षित मानते हैं। प्रारंभिक प्रस्तुति से अधिवक्ता–मुवक्किल संबंध या विधिक विशेषाधिकार अपने-आप स्थापित नहीं होता।',
                  'किसी अधिवक्ता द्वारा मामला लिखित रूप से स्वीकार किए जाने और सुरक्षित माध्यम के बारे में निर्देश दिए जाने के बाद ही आवश्यक दस्तावेज़ साझा करें। जहाँ संभव हो, अनावश्यक पहचान संख्या और तीसरे पक्ष की जानकारी को छिपाएँ।',
                ],
              },
              {
                heading: 'जानकारी का उपयोग और सीमित साझाकरण',
                paragraphs: [
                  'दी गई जानकारी का उपयोग पूछताछ को छाँटने, उत्तर देने, आपकी संपर्क पसंद का पालन करने और यह आकलन करने के लिए किया जा सकता है कि किस प्रकार की सहायता उपयुक्त हो सकती है। इसे विज्ञापन हेतु बेचा या सार्वजनिक निर्देशिका में प्रकाशित नहीं किया जाना चाहिए।',
                  'यदि किसी उपयुक्त स्वतंत्र अधिवक्ता या कानूनी पेशेवर से संपर्क कराना आवश्यक हो, तो जानकारी केवल उचित वैधानिक आधार पर तथा जहाँ आवश्यक हो आपकी सूचित सहमति लेने के बाद, उद्देश्य के लिए आवश्यक सीमा तक साझा की जानी चाहिए। कोई भी पेशेवर अपनी स्वतंत्र पहचान और हित-संघर्ष जाँच पूरी कर सकता है।',
                ],
              },
              {
                heading: 'वर्तमान डेमो में कोई बैकएंड नहीं',
                paragraphs: [
                  'इस वर्तमान प्रदर्शन संस्करण में फॉर्म की प्रविष्टियाँ ब्राउज़र से किसी सर्वर, ईमेल इनबॉक्स या केस-प्रबंधन प्रणाली को प्रेषित नहीं होतीं और सर्वर पर संग्रहीत नहीं की जातीं। फॉर्म भरना वास्तविक पूछताछ पहुँचने का प्रमाण नहीं है; प्रकाशित और सत्यापित संपर्क माध्यम उपलब्ध होने तक किसी आवश्यक या समय-संवेदनशील संदेश के लिए इस पर निर्भर न रहें।',
                ],
              },
              {
                heading: 'उत्पादन से पहले आवश्यक विवरण',
                paragraphs: [
                  'लाइव डेटा संग्रह शुरू होने से पहले अंतिम नीति में सत्यापित डेटा नियंत्रक या डेटा फिड्यूशियरी की पहचान और संपर्क विवरण, प्रत्येक उपयोग का उद्देश्य और वैधानिक आधार, प्राप्तकर्ता श्रेणियाँ, लागू स्थानांतरण व्यवस्था, कुकी या विश्लेषिकी व्यवहार तथा व्यक्तियों के उपलब्ध अधिकार स्पष्ट होने चाहिए।',
                  'नीति में श्रेणी-वार प्रतिधारण अवधि, हटाने की प्रक्रिया, वास्तविक तकनीकी और संगठनात्मक सुरक्षा उपाय, घटना-प्रतिक्रिया प्रक्रिया तथा नामित गोपनीयता संपर्क और शिकायत निवारण विवरण भी शामिल होने चाहिए। इन व्यवस्थाओं की पुष्टि और क्रियान्वयन होने तक इस पाठ को अंतिम उत्पादन गोपनीयता नीति नहीं माना जाना चाहिए।',
                ],
              },
            ]
          : [
              {
                heading: 'Scope and data minimisation',
                paragraphs: [
                  'An initial contact should request only the information needed to understand the request and identify an appropriate next step, such as your name, organisation, contact details, a broad issue category, a short summary and communication preference.',
                  'Unnecessary personal data should not be collected. The production service should define a clear purpose for every field and make optional, or remove, information that is not necessary.',
                ],
              },
              {
                heading: 'Do not send sensitive or privileged material initially',
                paragraphs: [
                  'Do not place Aadhaar or PAN numbers, bank details, passwords, health records, trade secrets, original documents, a complete case file, or material you consider confidential or legally privileged in the initial form. An initial submission does not by itself create an advocate–client relationship or legal professional privilege.',
                  'Share necessary documents only after an advocate has accepted the matter in writing and provided instructions for a secure channel. Where possible, redact unnecessary identification numbers and third-party information.',
                ],
              },
              {
                heading: 'Use and limited sharing of information',
                paragraphs: [
                  'Information provided may be used to triage and respond to the enquiry, follow your communication preference and assess what kind of assistance may be suitable. It should not be sold for advertising or published in a public directory.',
                  'If an introduction to a suitable independent advocate or legal professional is necessary, information should be shared only on an appropriate lawful basis and, where required, after obtaining your informed consent, limited to what is necessary for that purpose. Any professional may conduct separate identity and conflict checks.',
                ],
              },
              {
                heading: 'No backend in the current demo',
                paragraphs: [
                  'In this current demonstration version, form entries are not transmitted from the browser to a server, email inbox or case-management system, and are not stored on a server. Completing a form is not proof that an enquiry has been received; do not rely on it for an essential or time-sensitive message until a published, verified contact channel is available.',
                ],
              },
              {
                heading: 'Information required before production',
                paragraphs: [
                  'Before live data collection begins, the final policy must identify and provide verified contact details for the data controller or data fiduciary, explain each purpose and lawful basis, recipient categories, any applicable transfer arrangements, cookie or analytics practices, and the rights available to individuals.',
                  'It must also state category-specific retention periods, deletion procedures, actual technical and organisational security measures, incident-response arrangements, and a named privacy contact and grievance route. This text should not be treated as a final production privacy policy until those arrangements are confirmed and implemented.',
                ],
              },
            ]
      }
    />
  );
}
