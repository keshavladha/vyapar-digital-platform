// Vyapar Digital - Platform Data & Configuration
export const CONFIG = {
  brandName: "Vyapar Digital",
  brandHindi: "व्यापार डिजिटल",
  tagline: "Apne Local Vyapar ko Banayein Digital Brand",
  taglineEn: "Grow Your Local Business into a Digital Powerhouse",
  subTagline: "Websites • Mobile Apps • Festival Posters • Instagram Reels",
  whatsappNumber: "917027340360", // User WhatsApp number
  supportEmail: "keshavladha24@gmail.com",
  supportPhone: "+91 70273 40360",
  instagramHandle: "vyapar_digital_",
  officeLocation: "Ellenabad (125102), Sirsa, Haryana, India",
  serviceArea: "Pan-India Online Delivery & Local Support",
  
  // Real Service Commitments (Zero False Claims)
  trustStats: [
    { number: "48 Hr", labelEn: "Fast First Draft Delivery", labelHi: "48 घंटे में पहला ड्राफ्ट तैयार" },
    { number: "1-on-1", labelEn: "Direct Founder Communication", labelHi: "सीधे फाउंडर से डायरेक्ट सपोर्ट" },
    { number: "₹1,999", labelEn: "Transparent Starting Pricing", labelHi: "₹1,999 से पारदर्शी शुरुआती प्लान" },
    { number: "20%", labelEn: "Only 20% Advance to Start", labelHi: "सिर्फ 20% एडवांस से शुरुआत" }
  ],

  // 4 Core Service Pillars
  services: [
    {
      id: "web-dev",
      icon: "globe",
      titleEn: "Website & Online Dukaan",
      titleHi: "वेबसाइट & ऑनलाइन दुकान",
      shortDescEn: "Modern fast websites & WhatsApp ordering catalogs so your customers can buy easily.",
      shortDescHi: "सुंदर और फास्ट वेबसाइट जिससे आपके ग्राहक सीधे व्हाट्सएप पर आर्डर कर सकें।",
      badge: "Popular / सबसे लोकप्रिय",
      packages: [
        {
          id: "web-starter",
          nameEn: "Digital Visiting Card & 1-Page Website",
          nameHi: "डिजिटल विजिटिंग कार्ड & 1-पेज वेबसाइट",
          price: 1999,
          oldPrice: 3999,
          deliveryDays: "2-3 Days",
          featuresEn: [
            "1-Page Mobile Friendly Website",
            "Click-to-Call & WhatsApp Chat Button",
            "Google Map Location Integration",
            "Product/Service Photos & Price List",
            "1 Year Free Hosting & Subdomain",
            "Fast 48-Hour Delivery"
          ],
          featuresHi: [
            "1-पेज मोबाइल फ्रेंडली वेबसाइट",
            "डायरेक्ट कॉल & व्हाट्सएप बटन",
            "गूगल मैप लोकेशन इंटीग्रेशन",
            "फोटो गैलरी & रेट लिस्ट",
            "1 साल की होस्टिंग शामिल",
            "48 घंटे में लाइव"
          ]
        },
        {
          id: "web-store",
          nameEn: "WhatsApp Catalog & Online Store",
          nameHi: "व्हाट्सएप कैटलॉग & ऑनलाइन स्टोर",
          price: 4999,
          oldPrice: 8999,
          isFeatured: true,
          deliveryDays: "4-5 Days",
          featuresEn: [
            "Full Product Catalog (Up to 50 Products)",
            "Direct 'Order on WhatsApp' with Cart",
            "UPI / QR Code Payment Integration",
            "Customer Review Section & Testimonials",
            "Custom .in / .com Domain Setup",
            "Admin Panel to Change Products on Mobile"
          ],
          featuresHi: [
            "50 प्रोडक्ट्स तक की ऑनलाइन कैटलॉग",
            "कार्ट के साथ डायरेक्ट व्हाट्सएप आर्डर",
            "गूगल पे / फोनपे UPI QR कोड पेमेंट",
            "कस्टमर रिव्यु & रेटिंग सेक्शन",
            "अपना .in या .com डोमेन",
            "मोबाइल से रेट और फोटो बदलने की सुविधा"
          ]
        },
        {
          id: "web-custom",
          nameEn: "Coaching, Hospital & Corporate Website",
          nameHi: "कोचिंग, हॉस्पिटल & बिजनेस पोर्टल",
          price: 8999,
          oldPrice: 14999,
          deliveryDays: "7 Days",
          featuresEn: [
            "5-7 Dynamic Pages (About, Courses/Services, Results, Contact)",
            "Lead Inquiry Form with SMS/Email alerts",
            "Student / Patient Registration Form",
            "Google SEO Setup for Local Search Rankings",
            "Professional Business Email (@yourbusiness.com)",
            "3 Months Free Support & Updates"
          ],
          featuresHi: [
            "5 से 7 पेज की शानदार वेबसाइट",
            "इनक्वायरी फॉर्म (सीधा आपके फोन पर अलर्ट)",
            "एडमिशन / अपॉइंटमेंट बुकिंग सिस्टम",
            "गूगल लोकल सर्च (SEO) सेटअप",
            "ऑफिसियल ईमेल आईडी",
            "3 महीने का फ्री सपोर्ट"
          ]
        }
      ]
    },
    {
      id: "app-build",
      icon: "smartphone",
      titleEn: "Mobile App Development",
      titleHi: "मोबाइल ऐप डेवलपमेंट (Android)",
      shortDescEn: "Custom Android apps for Coaching Institutes, Local Delivery, Grocery & Business.",
      shortDescHi: "कोचिंग, किराना डिलीवरी, क्लिनिक और लोकल शॉप्स के लिए अपना खुद का एंड्रॉइड ऐप।",
      badge: "High Growth",
      packages: [
        {
          id: "app-coaching",
          nameEn: "Coaching Institute & Test Series App",
          nameHi: "कोचिंग & टेस्ट सीरीज ऐप",
          price: 14999,
          oldPrice: 24999,
          isFeatured: true,
          deliveryDays: "10-14 Days",
          featuresEn: [
            "Student Login with Mobile OTP",
            "Online Video Classes & Recorded Lectures",
            "Chapter-wise Mock Tests & Automatic Ranking",
            "PDF Notes Download Protection (Watermarked)",
            "Direct Fee Collection via UPI Payment Gateway",
            "Google Play Store Publication Support"
          ],
          featuresHi: [
            "मोबाइल OTP से छात्र लॉगिन",
            "ऑनलाइन वीडियो क्लास & रिकॉर्डेड लेक्चर्स",
            "ऑनलाइन टेस्ट सीरीज & तुरंत रिजल्ट रैंकिंग",
            "सुरक्षित PDF नोट्स (छात्र डाउनलोड रोक के साथ)",
            "ऑनलाइन फीस कलेक्शन (Google Pay / PhonePe)",
            "गूगल प्ले स्टोर पर लाइव करने में पूरी मदद"
          ]
        },
        {
          id: "app-store",
          nameEn: "Local Grocery, Sweet Shop & Delivery App",
          nameHi: "लोकल डिलीवरी & ई-कॉमर्स ऐप",
          price: 18999,
          oldPrice: 29999,
          deliveryDays: "14 Days",
          featuresEn: [
            "Customer App with Category Browsing & Cart",
            "Delivery Boy Order Assignment System",
            "Admin Management App for Shop Owner (Stock & Price)",
            "Live Order Status Tracking (Accepted, Dispatched, Delivered)",
            "Customer Push Notifications for Daily Offers",
            "Cash on Delivery & Online Payment Options"
          ],
          featuresHi: [
            "ग्राहकों के लिए आसान आर्डरिंग ऐप",
            "दुकानदार के लिए आर्डर मैनेजमेंट पैनल",
            "डिलीवरी बॉय असाइनमेंट सुविधा",
            "लाइव आर्डर ट्रैकिंग",
            "ग्राहकों को नए ऑफर्स के ऑटोमैटिक नोटिफिकेशन",
            "कैश ऑन डिलीवरी & ऑनलाइन पेमेंट"
          ]
        }
      ]
    },
    {
      id: "graphic-design",
      icon: "palette",
      titleEn: "Festival Posters & Branding",
      titleHi: "त्यौहार पोस्टर्स & ग्राफिक डिजाइन",
      shortDescEn: "High quality custom festival posters, flex banners, visiting cards & business logos.",
      shortDescHi: "दीवाली, होली, ईद, न्यू ईयर एवं 50+ त्यौहारों के लिए आपकी दुकान के नाम व फोटो वाले पोस्टर्स।",
      badge: "Daily Essential",
      packages: [
        {
          id: "graphic-monthly",
          nameEn: "Monthly Festival & Business Poster Retainer (20 Posts)",
          nameHi: "मासिक 20 त्यौहार & ऑफर पोस्टर्स",
          price: 14999,
          oldPrice: 2999,
          isFeatured: true,
          deliveryDays: "Monthly Retainer",
          featuresEn: [
            "20 Custom Branded Creatives Every Month",
            "Shop Name, Owner Photo, Phone Number & Logo Embedded",
            "Festival Greetings + Weekly Discount Offer Posts",
            "WhatsApp Status & Instagram/Facebook Sizes",
            "Delivered 2-3 Days in Advance of Every Festival",
            "High Definition (HD) Print & Share Quality"
          ],
          featuresHi: [
            "हर महीने 20 कस्टमाइज्ड डिज़ाइन्स",
            "दुकान का नाम, फोटो, मोबाइल नंबर और लोगो के साथ",
            "त्यौहार बधाई + साप्ताहिक डिस्काउंट ऑफर पोस्टर्स",
            "व्हाट्सएप स्टेटस और फेसबुक/इंस्टाग्राम साइज में",
            "हर त्यौहार से 2-3 दिन पहले व्हाट्सएप पर डिलीवरी",
            "फुल HD प्रिंट और शेयरिंग क्वालिटी"
          ]
        },
        {
          id: "graphic-branding",
          nameEn: "Complete Business Identity & Logo Kit",
          nameHi: "बिजनेस लोगो & ब्रांडिंग किट",
          price: 1999,
          oldPrice: 3999,
          deliveryDays: "2 Days",
          featuresEn: [
            "3 Unique Premium Logo Concepts to Choose From",
            "Print-Ready Visiting Card (Double Sided Design)",
            "Bill Book & Letterhead Design",
            "Shop Flex Board / Hoarding Design",
            "Source Files (.AI, .PSD, .PDF, .PNG Transparent Logo)"
          ],
          featuresHi: [
            "3 अलग-अलग प्रीमियम लोगो डिज़ाइन्स",
            "विजिटिंग कार्ड (आगे-पीछे दोनों साइड का डिजाइन)",
            "दुकान की बिल बुक और लेटरहेड डिजाइन",
            "दुकान के मेन बोर्ड/फ्लेक्स का डिजाइन",
            "सभी ओरिजिनल फाइल्स (HD PNG, PDF, Print Ready)"
          ]
        },
        {
          id: "graphic-flex",
          nameEn: "Single Flex Hoarding / Event Banner",
          nameHi: "सिंगल फ्लेक्स होर्डिंग / इवेंट बैनर",
          price: 599,
          oldPrice: 1199,
          deliveryDays: "24 Hours",
          featuresEn: [
            "High Definition Large Format Print File",
            "Eye-Catching Layout with Offer Highlights",
            "Custom Dimensions (e.g., 10x4 ft, 8x3 ft)",
            "Express 24-Hour WhatsApp Delivery",
            "Print Shop Ready TIFF / PDF format"
          ],
          featuresHi: [
            "बड़े साइज में प्रिंट होने वाली HD फाइल",
            "आकर्षक लेआउट जो दूर से भी साफ दिखे",
            "आपके साइज के अनुसार (10x4 ft, 8x3 ft आदि)",
            "24 घंटे में सीधे व्हाट्सएप पर फाइल",
            "प्रिंटिंग प्रेस के लिए तैयार फॉर्मेट"
          ]
        }
      ]
    },
    {
      id: "video-edit",
      icon: "video",
      titleEn: "Reels & Video Editing",
      titleHi: "इंस्टाग्राम रील्स & वीडियो एडिटिंग",
      shortDescEn: "Viral Reels, shop showcase walk-through videos, YouTube videos & ad creatives.",
      shortDescHi: "दुकान/शोरूम के वायरल रील्स, यूट्यूब वीडियो एडिटिंग, और कस्टमर रिव्यु वीडियो।",
      badge: "Trending / तेजी से बढ़ता",
      packages: [
        {
          id: "video-reel-pack",
          nameEn: "10 Viral Local Reels Package",
          nameHi: "10 वायरल लोकल रील्स पैकेज",
          price: 3999,
          oldPrice: 6999,
          isFeatured: true,
          deliveryDays: "5-7 Days",
          featuresEn: [
            "10 Short-Form Reels / Shorts (30-60 sec each)",
            "Trending Hindi/BGM Music & Sound Effects",
            "Dynamic Animated Hindi/English Captions & Subtitles",
            "High-energy Transitions, Zooms & Color Grading",
            "Product Highlights & Shop Walkthrough Edits",
            "Optimized for Maximum Local Reach on Instagram & Facebook"
          ],
          featuresHi: [
            "10 धमाकेदार रील्स / यूट्यूब शॉर्ट्स (30-60 सेकंड)",
            "ट्रेंडिंग म्यूजिक और साउंड इफेक्ट्स",
            "सुंदर हिंदी/इंग्लिश सबटाइटल्स और टेक्स्ट एनीमेशन",
            "कलर करेक्शन और स्मूथ ट्रांजिशन्स",
            "दुकान और प्रोडक्ट्स का आकर्षक प्रेजेंटेशन",
            "इंस्टाग्राम पर लोकल कस्टमर्स तक पहुंचने के लिए बेस्ट"
          ]
        },
        {
          id: "video-single-reel",
          nameEn: "Single Shop Promo / Ad Reel",
          nameHi: "सिंगल शॉप प्रोमो / ऑफर रील",
          price: 599,
          oldPrice: 1199,
          deliveryDays: "24-48 Hours",
          featuresEn: [
            "1 High-Impact 30-45s Reel for your Offer or Shop Opening",
            "Engaging Voiceover Sync & Background Beat",
            "Animated Logo Outro & Contact Number Display",
            "2 Free Revisions",
            "WhatsApp & Instagram Story Ready (9:16 vertical)"
          ],
          featuresHi: [
            "1 धांसू 30-45 सेकंड की प्रोमो रील (ऑफर या नई ओपनिंग)",
            "बैकग्राउंड म्यूजिक और वॉइस सिंक",
            "लोगो एनीमेशन और फोन नंबर डिस्प्ले",
            "2 फ्री रिवीजन्स",
            "इंस्टाग्राम और व्हाट्सएप स्टेटस फॉर्मेट"
          ]
        },
        {
          id: "video-youtube",
          nameEn: "YouTube Full Video Edit + Clickable Thumbnail",
          nameHi: "यूट्यूब फुल वीडियो एडिट + थंबनेल",
          price: 1199,
          oldPrice: 2199,
          deliveryDays: "2-3 Days",
          featuresEn: [
            "Full Video Edit (Up to 10-15 minutes length)",
            "Noise Reduction, Audio Leveling & Smooth Cuts",
            "B-Rolls, Pop-ups, Lower Thirds & Meme Sound Effects",
            "1 High-CTR Custom YouTube Thumbnail Design",
            "Full HD (1080p / 4K) Export"
          ],
          featuresHi: [
            "10-15 मिनट तक की फुल वीडियो एडिटिंग",
            "आवाज की सफाई (Noise Free) और स्मूथ कटिंग",
            "फोटो/वीडियो पॉपअप और आकर्षक साउंड इफेक्ट्स",
            "1 क्लिक-बढ़ाने वाला एचडी यूट्यूब थंबनेल",
            "फुल एचडी (1080p/4K) एक्सपोर्ट"
          ]
        }
      ]
    }
  ],

  // Portfolio & Client Showcase (Verified Live Client Work)
  caseStudies: [
    {
      id: "cs-windson",
      isLive: true,
      clientName: "Windson Motor (विंडसन मोटर)",
      category: "web-dev",
      city: "Automobile & Spare Parts",
      headline: "Official Custom Business Website + Complete Social Media (Instagram & Facebook) Growth",
      headlineHi: "ऑफिशियल कस्टम वेबसाइट + इंस्टाग्राम और फेसबुक सोशल मीडिया मैनेजमेंट",
      serviceUsed: "Full Website + Instagram & FB Management",
      metrics: ["Official Web Portal Live", "@windsonmotor Social Media", "Lead & Catalog Integration"],
      conceptDescHi: "विंडसन मोटर के लिए आधिकारिक वेबसाइट (www.windsonmotor.com) का निर्माण एवं उनके इंस्टाग्राम व फेसबुक (@windsonmotor) का संपूर्ण डिजिटल मैनेजमेंट।",
      conceptDescEn: "Built official web portal (www.windsonmotor.com) and managing their full social media brand presence across Instagram & Facebook (@windsonmotor).",
      owner: "सत्यापित लाइव क्लाइंट (Verified Live Client)",
      liveUrl: "https://www.windsonmotor.com",
      instagramUrl: "https://www.instagram.com/windsonmotor/",
      facebookUrl: "https://www.facebook.com/windsonmotor"
    }
  ],

  // Frequently Asked Questions for Tier-3 Business Owners
  faqs: [
    {
      qEn: "Who will be working on my project?",
      qHi: "मेरे प्रोजेक्ट पर कौन काम करेगा?",
      aEn: "I handle every project personally with complete focus and dedication. You will communicate directly with me on WhatsApp without any intermediaries or junior delegates.",
      aHi: "मैं खुद व्यक्तिगत रूप से आपके प्रोजेक्ट पर पूरा ध्यान और मेहनत देकर काम करूंगा। आपसे सीधे व्हाट्सएप पर 1-on-1 बातचीत होगी — कोई बिचौलिया या कॉल सेंटर नहीं।"
    },
    {
      qEn: "I don't have technical knowledge. Can I still manage a website or app?",
      qHi: "मुझे कंप्यूटर या टेक्निकल जानकारी नहीं है, क्या मैं इसे आसानी से चला पाऊंगा?",
      aEn: "Yes, 100%! Everything is set up simply so you receive all customer inquiries and orders directly on your personal WhatsApp. No complicated software needed.",
      aHi: "जी बिल्कुल 100%! हम पूरा सिस्टम इतना आसान बनाते हैं कि आपके सारे आर्डर और कस्टमर की इनक्वायरी सीधे आपके पर्सनल व्हाट्सएप पर आती है। आपको कोई झंझट नहीं होगी।"
    },
    {
      qEn: "What are your payment terms?",
      qHi: "पेमेंट की क्या शर्तें हैं?",
      aEn: "We work with complete transparency: only 20% token advance to initiate the project, and the remaining 80% only after you review and approve the final draft.",
      aHi: "हम पूरी ईमानदारी से काम करते हैं: काम शुरू करने के लिए सिर्फ 20% टोकन एडवांस, और बाकी 80% काम पूरा देखने और संतुष्ट होने के बाद।"
    },
    {
      qEn: "How do I share photos, videos, and details with you?",
      qHi: "फोटो, वीडियो और जानकारी आपको कैसे भेजनी होगी?",
      aEn: "Simply send them on WhatsApp! You can send your shop photos, price list, logo, or raw video clips directly via WhatsApp chat.",
      aHi: "बहुत आसान है! आप सीधे हमारे व्हाट्सएप नंबर पर अपनी दुकान के फोटो, रेट लिस्ट या वीडियो भेज सकते हैं।"
    },
    {
      qEn: "How fast will my project be delivered?",
      qHi: "मेरा काम कितने दिनों में तैयार हो जाएगा?",
      aEn: "Reels and Banners: 24 to 48 Hours. Websites: 3 to 5 Days. Android Apps: 10 to 14 Days.",
      aHi: "रील्स और पोस्टर्स: 24 से 48 घंटे। वेबसाइट और ऑनलाइन दुकान: 3 से 5 दिन। मोबाइल ऐप: 10 से 14 दिन।"
    },
    {
      qEn: "Can I get a GST invoice for my business?",
      qHi: "क्या मुझे अपने व्यापार के लिए पक्का GST बिल मिलेगा?",
      aEn: "Yes! If you have a GST number, we provide official GST-compliant tax invoices for your business expenses.",
      aHi: "हाँ! यदि आपके पास GST नंबर है, तो आपको पूरा 100% पक्का GST टैक्स इनवॉइस दिया जाएगा।"
    }
  ],

  // Pre-configured WhatsApp Messages for Instant Routing
  whatsappTemplates: {
    general: "Namaste Vyapar Digital! Mujhe apne business ke liye digital services (Website/App/Design/Video) ki jankari chahiye.",
    web: (pkg, price) => `Namaste! Mujhe apne vyapar ke liye Website (${pkg} - ₹${price}) banwani hai. Kripya details aur process batayein.`,
    app: (pkg, price) => `Namaste! Mujhe apna Android Mobile App (${pkg} - ₹${price}) banwana hai. Demo aur quotation bhejiye.`,
    graphic: (pkg, price) => `Namaste! Mujhe Festival Posts / Graphic Design (${pkg} - ₹${price}) package chahiye. Sampark karein.`,
    video: (pkg, price) => `Namaste! Mujhe Instagram Reels / Video Editing (${pkg} - ₹${price}) karwani hai. Details batayein.`,
    calculator: (businessType, total, items) => 
      `Namaste Vyapar Digital! Maine apne ${businessType} ke liye package calculate kiya hai:\n\n` +
      `📌 Services:\n${items}\n\n` +
      `💰 Total Estimate: ₹${total.toLocaleString('en-IN')}\n\n` +
      `Kripya aage ka process aur timeline batayein.`
  }
};
