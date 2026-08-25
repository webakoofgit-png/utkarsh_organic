import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Language = "en" | "mr" | "hi";

const STORAGE_KEY = "utkarsh-site-language";
const LANGUAGE_KEYS = ["en", "mr", "hi"] as const;

type TranslationPair = {
  en: string;
  mr: string;
  hi?: string;
};

const TRANSLATIONS: TranslationPair[] = [
  { en: "English", mr: "इंग्रजी" },
  { en: "Marathi", mr: "मराठी" },
  { en: "Language", mr: "भाषा" },
  { en: "Select language", mr: "भाषा निवडा" },
  { en: "Change language", mr: "भाषा बदला" },

  { en: "Utkarsh Organic Farm", mr: "उत्कर्ष ऑर्गॅनिक फार्म" },
  { en: "UTKARSH ORGANIC FARM", mr: "उत्कर्ष ऑर्गॅनिक फार्म" },
  { en: "Utkarsh Organic", mr: "उत्कर्ष ऑर्गॅनिक" },
  { en: "Organic Farm", mr: "ऑर्गॅनिक फार्म" },
  { en: "Utkarsh Farm", mr: "उत्कर्ष फार्म" },
  { en: "Utkarsh", mr: "उत्कर्ष" },
  { en: "Organic", mr: "ऑर्गॅनिक" },
  { en: "Prafull Chorage", mr: "प्रफुल्ल चोरगे" },

  { en: "Home", mr: "मुख्यपृष्ठ" },
  { en: "About Us", mr: "आमच्याबद्दल" },
  { en: "About", mr: "आमच्याबद्दल" },
  { en: "Products", mr: "उत्पादने" },
  { en: "Product", mr: "उत्पादन" },
  { en: "Shop", mr: "दुकान" },
  { en: "Why Organic", mr: "ऑर्गॅनिक का?" },
  { en: "Farm Gallery", mr: "फार्म गॅलरी" },
  { en: "Gallery", mr: "गॅलरी" },
  { en: "Bulk Orders", mr: "बल्क ऑर्डर" },
  { en: "Bulk Order", mr: "बल्क ऑर्डर" },
  { en: "Contact Us", mr: "संपर्क करा" },
  { en: "Contact", mr: "संपर्क" },
  { en: "Recipes", mr: "रेसिपी" },
  { en: "Blog", mr: "ब्लॉग" },
  { en: "My Account", mr: "माझे खाते" },
  { en: "Track Order", mr: "ऑर्डर ट्रॅक करा" },
  { en: "Contact Support", mr: "सपोर्टशी संपर्क" },
  { en: "Quality & Trust", mr: "गुणवत्ता आणि विश्वास" },
  { en: "Quick Links", mr: "जलद दुवे" },
  { en: "Help", mr: "मदत" },

  { en: "Shop Now", mr: "आता खरेदी करा" },
  { en: "Shop Products", mr: "उत्पादने खरेदी करा" },
  { en: "Browse products", mr: "उत्पादने पाहा" },
  { en: "Browse Shop", mr: "दुकान पाहा" },
  { en: "View cart", mr: "कार्ट पाहा" },
  { en: "Your cart", mr: "तुमचे कार्ट" },
  { en: "Your cart is empty", mr: "तुमचे कार्ट रिकामे आहे" },
  { en: "Your Shopping Cart", mr: "तुमचे शॉपिंग कार्ट" },
  { en: "No products in your cart yet", mr: "अजून कार्टमध्ये उत्पादने नाहीत" },
  { en: "Continue Shopping", mr: "खरेदी सुरू ठेवा" },
  { en: "Proceed to checkout", mr: "चेकआउटकडे जा" },
  { en: "Proceed to Checkout", mr: "चेकआउटकडे जा" },
  { en: "Checkout", mr: "चेकआउट" },
  { en: "Back to Cart", mr: "कार्टकडे परत जा" },
  { en: "Return to shop", mr: "दुकानात परत जा" },
  { en: "Order Summary", mr: "ऑर्डर सारांश" },
  { en: "Summary", mr: "सारांश" },
  { en: "Subtotal", mr: "उपएकूण" },
  { en: "Shipping", mr: "शिपिंग" },
  { en: "Delivery Charge", mr: "डिलिव्हरी शुल्क" },
  { en: "Grand Total", mr: "एकूण रक्कम" },
  { en: "Total Payable", mr: "देय एकूण" },
  { en: "Apply", mr: "लागू करा" },
  { en: "Promo code", mr: "प्रोमो कोड" },
  { en: "Clear all items", mr: "सर्व वस्तू काढा" },
  { en: "FREE", mr: "मोफत" },
  { en: "Free shipping applied!", mr: "मोफत शिपिंग लागू झाले!" },
  { en: "Add", mr: "जोडा" },
  { en: "Add to cart", mr: "कार्टमध्ये जोडा" },
  { en: "Buy now", mr: "आता खरेदी करा" },
  { en: "Best seller", mr: "सर्वाधिक विक्री" },
  { en: "New", mr: "नवीन" },
  { en: "MOQ", mr: "किमान ऑर्डर" },
  { en: "Available for quote", mr: "कोटसाठी उपलब्ध" },
  { en: "Currently unavailable", mr: "सध्या उपलब्ध नाही" },
  { en: "Choose pack size", mr: "पॅक आकार निवडा" },
  { en: "selected", mr: "निवडले" },
  { en: "Official listing", mr: "अधिकृत सूची" },
  { en: "Pan India supply", mr: "संपूर्ण भारतात पुरवठा" },
  { en: "Manufacturer & supplier", mr: "उत्पादक आणि पुरवठादार" },
  { en: "Source specs included", mr: "स्रोत तपशील समाविष्ट" },
  { en: "Why buyers choose it", mr: "खरेदीदार हे का निवडतात" },
  { en: "The essentials", mr: "महत्त्वाचे तपशील" },
  { en: "Raw Material", mr: "कच्चा माल" },
  { en: "Storage", mr: "साठवण" },
  { en: "How to use it", mr: "वापरण्याची पद्धत" },
  { en: "Product specifications", mr: "उत्पादन तपशील" },
  { en: "Based on the official Utkarsh Organic Farm listing", mr: "उत्कर्ष ऑर्गॅनिक फार्मच्या अधिकृत सूचीनुसार" },
  { en: "Keep exploring", mr: "आणखी पाहा" },
  { en: "You may also like", mr: "तुम्हाला हेही आवडू शकते" },
  { en: "All products", mr: "सर्व उत्पादने" },
  { en: "Product Not Found", mr: "उत्पादन सापडले नाही" },
  { en: "Back to Shop", mr: "दुकानात परत जा" },

  { en: "Search products", mr: "उत्पादने शोधा" },
  { en: "Search", mr: "शोधा" },
  { en: "Search organic powders & spices...", mr: "ऑर्गॅनिक पावडर आणि मसाले शोधा..." },
  { en: "Search onion powder, turmeric, moringa tea, bulk packs...", mr: "कांदा पावडर, हळद, मोरिंगा चहा, बल्क पॅक शोधा..." },
  { en: "Clear search", mr: "शोध साफ करा" },
  { en: "Clear filters", mr: "फिल्टर साफ करा" },
  { en: "All Products", mr: "सर्व उत्पादने" },
  { en: "naturally good choices", mr: "नैसर्गिक चांगले पर्याय" },
  { en: "Sort", mr: "क्रम लावा" },
  { en: "Featured", mr: "वैशिष्ट्यीकृत" },
  { en: "Top rated", mr: "उच्च रेटिंग" },
  { en: "Price: low to high", mr: "किंमत: कमी ते जास्त" },
  { en: "Price: high to low", mr: "किंमत: जास्त ते कमी" },
  { en: "Nothing matched that search.", mr: "या शोधाशी काही जुळले नाही." },
  { en: "Try a product name or clear the filters.", mr: "उत्पादनाचे नाव वापरा किंवा फिल्टर साफ करा." },
  { en: "Looking for commercial packs?", mr: "व्यावसायिक पॅक हवे आहेत का?" },
  { en: "Explore bulk orders", mr: "बल्क ऑर्डर पाहा" },

  { en: "OFFICIAL UTKARSH CATALOG", mr: "अधिकृत उत्कर्ष कॅटलॉग" },
  { en: "Wholesale ingredients,", mr: "घाऊक घटक," },
  { en: "source-ready.", mr: "स्रोतासाठी तयार." },
  { en: "Clean, concentrated ingredients for home kitchens, cafés and food businesses.", mr: "घरगुती स्वयंपाकघर, कॅफे आणि फूड व्यवसायांसाठी स्वच्छ, केंद्रित घटक." },
  { en: "DEHYDRATED VEGETABLES & POWDERS", mr: "डिहायड्रेटेड भाज्या आणि पावडर" },
  { en: "Official per-kg quotes,", mr: "अधिकृत प्रति किलो दर," },
  { en: "with MOQ.", mr: "किमान ऑर्डरसह." },
  { en: "Zero peeling, zero chopping. Pure dehydrated powders packed with natural aroma & nutrition.", mr: "साल काढणे नाही, चिरणे नाही. नैसर्गिक सुगंध आणि पोषण असलेल्या शुद्ध डिहायड्रेटेड पावडर." },
  { en: "ORGANIC & AYURVEDIC POWDERS", mr: "ऑर्गॅनिक आणि आयुर्वेदिक पावडर" },
  { en: "Amla, beetroot,", mr: "आवळा, बीट," },
  { en: "ginger & moringa.", mr: "आले आणि शेवगा." },
  { en: "Organic and ayurvedic powders for ingredient buyers and commercial kitchens.", mr: "घटक खरेदीदार आणि व्यावसायिक स्वयंपाकघरांसाठी ऑर्गॅनिक आणि आयुर्वेदिक पावडर." },

  { en: "100% Natural", mr: "१००% नैसर्गिक" },
  { en: "Pure & Clean", mr: "शुद्ध आणि स्वच्छ" },
  { en: "No Additives", mr: "कोणतेही अॅडिटिव्ह नाहीत" },
  { en: "No Shortcuts", mr: "गुणवत्तेत तडजोड नाही" },
  { en: "Farm to Pantry", mr: "शेतापासून पॅन्ट्रीपर्यंत" },
  { en: "Trusted Source", mr: "विश्वसनीय स्रोत" },
  { en: "No Preservatives", mr: "प्रिझर्व्हेटिव्ह नाहीत" },
  { en: "100% Dehydrated", mr: "१००% डिहायड्रेटेड" },
  { en: "Farm Fresh", mr: "फार्म फ्रेश" },
  { en: "Satara Sourced", mr: "सातारा येथून स्रोत" },
  { en: "Hygienic", mr: "हायजीनिक" },
  { en: "Modern Tech", mr: "आधुनिक तंत्रज्ञान" },
  { en: "Moringa Rich", mr: "शेवग्याने समृद्ध" },
  { en: "High Antioxidants", mr: "उच्च अँटिऑक्सिडंट्स" },
  { en: "Pure Energy", mr: "शुद्ध ऊर्जा" },
  { en: "Clean Wellness", mr: "स्वच्छ आरोग्यदायीपणा" },
  { en: "Nutritionist Approved", mr: "पोषणतज्ज्ञांनी मान्य केलेले" },
  { en: "Doctor Formulated", mr: "डॉक्टरांनी तयार केलेले" },
  { en: "100% Pure & Natural", mr: "१००% शुद्ध आणि नैसर्गिक" },

  { en: "Utkarsh Farm - From our farm directly to your kitchen!", mr: "उत्कर्ष फार्म – शेतापासून थेट तुमच्या स्वयंपाकघरापर्यंत!" },
  { en: "From our farm directly to your kitchen!", mr: "शेतापासून थेट तुमच्या स्वयंपाकघरापर्यंत!" },
  { en: "Fresh and vibrant farm", mr: "खेळते आणि ताजे शेत" },
  { en: "Farm-fresh and naturally grown vegetables.", mr: "विषमुक्त आणि नैसर्गिक पद्धतीने पिकवलेल्या ताज्या भाज्या." },
  { en: "Advanced processing", mr: "अद्ययावत प्रक्रिया" },
  { en: "Fully dehydrated and hygienically processed using modern technology.", mr: "आधुनिक तंत्रज्ञानाने पूर्णपणे डीहायड्रेटेड आणि हायजीनिक पद्धतीने केलेली प्रक्रिया." },
  { en: "Dehydrated Products and Powders", mr: "डीहायड्रेटेड उत्पादने आणि पावडर" },
  { en: "Quality dried vegetables and health-friendly pure vegetable powders with long shelf life.", mr: "प्रदीर्घ काळ टिकणाऱ्या दर्जेदार वाळवलेल्या भाज्या आणि आरोग्यासाठी फायदेशीर शुद्ध व्हेजिटेबल पावडर्स." },
  { en: "Quality dried vegetables and pure vegetable powders with long shelf life.", mr: "प्रदीर्घ काळ टिकणाऱ्या दर्जेदार वाळवलेल्या भाज्या आणि शुद्ध व्हेजिटेबल पावडर्स." },
  { en: "Spinach, beetroot, onion, moringa leaves, garlic, ginger and carrot powder.", mr: "पालक, बीट, कांदा, शेवगा आणि पाला, लसूण, आले, गाजर पावडर." },
  { en: "A new modern need - Utkarsh Farm products!", mr: "आधुनिक काळाची नवी गरज – उत्कर्ष फार्म उत्पादने!" },
  { en: "Our special dehydrated vegetables and powders are now available while preserving the taste and nutrition of vegetables. 100% natural, no preservatives, pure products!", mr: "भाज्यांची चव आणि पोषणमूल्ये टिकवून ठेवणारी आमची विशेष Dehydrated Vegetables & Powders आता उपलब्ध. १००% नॅचरल, कोणतीही प्रिझर्व्हेटिव्ह्ज नसलेली शुद्ध उत्पादने!" },
  { en: "Our special dehydrated vegetables and powders are now available while preserving taste and nutrition.", mr: "भाज्यांची चव आणि पोषणमूल्ये टिकवून ठेवणारी आमची विशेष Dehydrated Vegetables & Powders आता उपलब्ध." },
  { en: "100% natural, no preservatives, pure products!", mr: "१००% नॅचरल, कोणतीही प्रिझर्व्हेटिव्ह्ज नसलेली शुद्ध उत्पादने!" },
  { en: "100% natural", mr: "१००% नॅचरल" },
  { en: "Contact 7507379018 Prafull Chorage", mr: "संपर्क ७५०७३७९०१८ प्रफुल्ल चोरगे" },
  { en: "View Products", mr: "उत्पादने पाहा" },
  { en: "Our Process", mr: "आमची प्रक्रिया" },
  { en: "Direct Contact and Orders", mr: "थेट संपर्क आणि ऑर्डर" },
  { en: "Residue-free farming", mr: "विषमुक्त शेती" },
  { en: "Hygienic process", mr: "हायजीनिक प्रक्रिया" },
  { en: "Pure powders", mr: "शुद्ध पावडर्स" },
  { en: "Hygienic processing with modern technology.", mr: "आधुनिक तंत्रज्ञानाने हायजीनिक प्रक्रिया." },
  { en: "WhatsApp Contact", mr: "WhatsApp संपर्क" },
  { en: "Official Products", mr: "अधिकृत उत्पादने" },
  { en: "Minimum Order Quantity", mr: "किमान ऑर्डर प्रमाण" },
  { en: "Team Members", mr: "टीम सदस्य" },
  { en: "Market Coverage", mr: "बाजार कव्हरेज" },
  { en: "Pan India", mr: "संपूर्ण भारत" },
  { en: "Best sellers", mr: "सर्वाधिक विक्री" },
  { en: "Products customers discover first.", mr: "ग्राहक आधी पाहतात अशी उत्पादने." },
  { en: "View all products", mr: "सर्व उत्पादने पाहा" },
  { en: "Our Farm", mr: "आमचा फार्म" },
  { en: "Processing", mr: "प्रक्रिया" },
  { en: "Loved by our customers", mr: "ग्राहकांचा विश्वास" },
  { en: "Customer stories from kitchens and bulk buyers.", mr: "स्वयंपाकघर आणि बल्क खरेदीदारांच्या प्रतिक्रिया." },
  { en: "Visit or order", mr: "भेट द्या किंवा ऑर्डर करा" },

  { en: "Dehydrated Vegetables & Flakes", mr: "डिहायड्रेटेड भाज्या आणि फ्लेक्स" },
  { en: "Dehydrated Vegetable Powders", mr: "डिहायड्रेटेड भाजी पावडर" },
  { en: "Organic & Ayurvedic Powders", mr: "ऑर्गॅनिक आणि आयुर्वेदिक पावडर" },
  { en: "Spice Powders", mr: "मसाला पावडर" },
  { en: "Dried Specialty Ingredients", mr: "विशेष सुकवलेले घटक" },
  { en: "Okra, onion, garlic, carrot, spinach, cluster beans, lemon and moringa sticks", mr: "भेंडी, कांदा, लसूण, गाजर, पालक, गवार, लिंबू आणि शेवगा शेंगा" },
  { en: "White onion, red onion, spinach, carrot and curry leaf powders", mr: "पांढरा कांदा, लाल कांदा, पालक, गाजर आणि कढीपत्ता पावडर" },
  { en: "Amla, beetroot, garlic, ginger and ayurvedic moringa leaf powder", mr: "आवळा, बीट, लसूण, आले आणि आयुर्वेदिक शेवगा पान पावडर" },
  { en: "Turmeric powder and coriander powder for household and commercial kitchens", mr: "घरगुती आणि व्यावसायिक स्वयंपाकघरांसाठी हळद आणि धणे पावडर" },
  { en: "Dried tomato flakes and dried sweet corn for food processors and HoReCa buyers", mr: "फूड प्रोसेसर आणि HoReCa खरेदीदारांसाठी सुकवलेले टोमॅटो फ्लेक्स आणि स्वीट कॉर्न" },

  { en: "Dehydrated White Onion Powder", mr: "डिहायड्रेटेड पांढऱ्या कांद्याची पावडर" },
  { en: "Dehydrated Red Onion Powder", mr: "डिहायड्रेटेड लाल कांद्याची पावडर" },
  { en: "Dehydrated Red Onion Flakes", mr: "डिहायड्रेटेड लाल कांदा फ्लेक्स" },
  { en: "Dehydrated White Onion Flakes", mr: "डिहायड्रेटेड पांढरा कांदा फ्लेक्स" },
  { en: "Dehydrated Garlic Flakes", mr: "डिहायड्रेटेड लसूण फ्लेक्स" },
  { en: "Dehydrated Okra Flakes", mr: "डिहायड्रेटेड भेंडी फ्लेक्स" },
  { en: "Dehydrated Carrot Flakes", mr: "डिहायड्रेटेड गाजर फ्लेक्स" },
  { en: "Dehydrated Spinach Leaves", mr: "डिहायड्रेटेड पालक पाने" },
  { en: "Dehydrated Cluster Beans", mr: "डिहायड्रेटेड गवार" },
  { en: "Dehydrated Lemon Slices", mr: "डिहायड्रेटेड लिंबू स्लाइस" },
  { en: "Dehydrated Moringa Sticks", mr: "डिहायड्रेटेड शेवगा शेंगा" },
  { en: "Dehydrated Spinach Powder", mr: "डिहायड्रेटेड पालक पावडर" },
  { en: "Dehydrated Carrot Powder", mr: "डिहायड्रेटेड गाजर पावडर" },
  { en: "Dehydrated Curry Leaf Powder", mr: "डिहायड्रेटेड कढीपत्ता पावडर" },
  { en: "Organic Amla Powder", mr: "ऑर्गॅनिक आवळा पावडर" },
  { en: "Organic Beetroot Powder", mr: "ऑर्गॅनिक बीट पावडर" },
  { en: "Organic Garlic Powder", mr: "ऑर्गॅनिक लसूण पावडर" },
  { en: "Organic Ginger Powder", mr: "ऑर्गॅनिक आले पावडर" },
  { en: "Ayurvedic Moringa Leaf Powder", mr: "आयुर्वेदिक शेवगा पान पावडर" },
  { en: "Dried Tomato Flakes", mr: "सुकवलेले टोमॅटो फ्लेक्स" },
  { en: "Dried Sweet Corn", mr: "सुकवलेले स्वीट कॉर्न" },
  { en: "Turmeric Powder", mr: "हळद पावडर" },
  { en: "Coriander Powder", mr: "धणे पावडर" },

  { en: "Fine mesh powder made from fresh white onions, with sharp natural onion aroma.", mr: "ताज्या पांढऱ्या कांद्यापासून तयार केलेली बारीक पावडर, तीव्र नैसर्गिक कांदा सुगंधासह." },
  { en: "Fine red onion powder with sweet, pungent flavor and natural onion aroma.", mr: "गोडसर, तिखट चव आणि नैसर्गिक कांदा सुगंध असलेली बारीक लाल कांदा पावडर." },
  { en: "Pinkish red to light purple onion flakes with strong natural onion flavor.", mr: "मजबूत नैसर्गिक कांदा चवीचे गुलाबी-लाल ते हलके जांभळे कांदा फ्लेक्स." },
  { en: "White to off-white onion flakes with fresh, sharp onion aroma.", mr: "ताज्या आणि तीक्ष्ण कांदा सुगंधासह पांढरे ते ऑफ-व्हाइट कांदा फ्लेक्स." },
  { en: "Brown garlic flakes with rich natural garlic aroma and strong pungent flavor.", mr: "समृद्ध नैसर्गिक लसूण सुगंध आणि तीव्र चवीचे तपकिरी लसूण फ्लेक्स." },
  { en: "Light green to green okra flakes made from fresh lady finger.", mr: "ताज्या भेंडीपासून तयार केलेले हलके हिरवे ते हिरवे भेंडी फ्लेक्स." },
  { en: "Bright orange carrot flakes with naturally sweet and mild taste.", mr: "नैसर्गिक गोडसर आणि सौम्य चवीचे तेजस्वी नारिंगी गाजर फ्लेक्स." },
  { en: "Whole or crushed spinach leaves with mild earthy flavor.", mr: "सौम्य मातीसारख्या चवीची पूर्ण किंवा कुटलेली पालक पाने." },
  { en: "Cut green cluster beans with mild, slightly bitter natural taste.", mr: "सौम्य, किंचित कडसर नैसर्गिक चवीची कापलेली हिरवी गवार." },
  { en: "Light yellow to golden lemon slices with tangy natural citrus flavor.", mr: "आंबट नैसर्गिक सिट्रस चवीचे हलके पिवळे ते सोनेरी लिंबू स्लाइस." },
  { en: "Cut moringa pod sticks with mild earthy flavor and natural aroma.", mr: "सौम्य मातीसारखी चव आणि नैसर्गिक सुगंध असलेल्या कापलेल्या शेवगा शेंगा." },
  { en: "Fine spinach powder with natural green color and leafy aroma.", mr: "नैसर्गिक हिरवा रंग आणि पालेभाजीचा सुगंध असलेली बारीक पालक पावडर." },
  { en: "Fine bright orange carrot powder with naturally sweet mild carrot flavor.", mr: "नैसर्गिक गोडसर सौम्य गाजर चवीची तेजस्वी नारिंगी बारीक गाजर पावडर." },
  { en: "Fine green curry leaf powder with aromatic herbal flavor.", mr: "सुगंधी हर्बल चवीची बारीक हिरवी कढीपत्ता पावडर." },
  { en: "Fine organic amla powder with sour, astringent and natural fruity flavor.", mr: "आंबट, तुरट आणि नैसर्गिक फळासारख्या चवीची बारीक ऑर्गॅनिक आवळा पावडर." },
  { en: "Fine organic beetroot powder with deep red to purplish red color.", mr: "गडद लाल ते जांभळट लाल रंगाची बारीक ऑर्गॅनिक बीट पावडर." },
  { en: "Fine off-white organic garlic powder with strong pungent flavor.", mr: "तीव्र चवीची बारीक ऑफ-व्हाइट ऑर्गॅनिक लसूण पावडर." },
  { en: "Fine organic ginger powder with spicy, warm and pungent flavor.", mr: "तिखट, उबदार आणि तीव्र चवीची बारीक ऑर्गॅनिक आले पावडर." },
  { en: "Fine moringa leaf powder with earthy, mildly bitter herbal flavor.", mr: "मातीसारखी, सौम्य कडसर हर्बल चव असलेली बारीक शेवगा पान पावडर." },
  { en: "Bright red tomato flakes with tangy, slightly sweet natural flavor.", mr: "आंबट आणि थोडी गोड नैसर्गिक चव असलेले तेजस्वी लाल टोमॅटो फ्लेक्स." },
  { en: "Whole golden yellow sweet corn kernels with mild sweet natural corn flavor.", mr: "सौम्य गोड नैसर्गिक कॉर्न चवीचे पूर्ण सोनेरी पिवळे स्वीट कॉर्न दाणे." },
  { en: "Fine turmeric powder with bright yellow to deep golden color and natural aroma.", mr: "तेजस्वी पिवळा ते गडद सोनेरी रंग आणि नैसर्गिक सुगंध असलेली बारीक हळद पावडर." },
  { en: "Fine coriander powder with mild, sweet and aromatic flavor.", mr: "सौम्य, गोडसर आणि सुगंधी चवीची बारीक धणे पावडर." },

  { en: "About Utkarsh Organic Farm", mr: "उत्कर्ष ऑर्गॅनिक फार्मबद्दल" },
  { en: "ABOUT US", mr: "आमच्याबद्दल" },
  { en: "Rooted in nature.", mr: "निसर्गात रुजलेले." },
  { en: "Driven by purpose.", mr: "ध्येयाने प्रेरित." },
  { en: "Official Business Profile", mr: "अधिकृत व्यवसाय प्रोफाइल" },
  { en: "Founder & Supply Details", mr: "संस्थापक आणि पुरवठा तपशील" },
  { en: "Founder and Mentor", mr: "संस्थापक आणि मार्गदर्शक" },
  { en: "Prafull Pradeep Chorage (Agricultural Expert)", mr: "प्रफुल्ल प्रदीप चोरगे (कृषी तज्ञ)" },
  { en: "Dr. Padmashri Prafull Chorage (Nutrition Expert)", mr: "डॉ. पद्मश्री प्रफुल्ल चोरगे (पोषण तज्ञ)" },
  { en: "Manufacturer & Supplier", mr: "उत्पादक आणि पुरवठादार" },
  { en: "Our Product Range", mr: "आमची उत्पादन श्रेणी" },
  { en: "Fresh + Dehydrated Foods", mr: "ताजी + डिहायड्रेटेड खाद्य उत्पादने" },
  { en: "Easy to use: ready to cook and ready to use.", mr: "वापरायला अत्यंत सोपे: रेडी टू कूक आणि रेडी टू युज." },
  { en: "Fresh fruits, vegetables and dehydrated processing products", mr: "ताजी फळे, भाजीपाला आणि डिहायड्रेटेड प्रोसेसिंग उत्पादने" },
  { en: "Premium quality dried fruits and vegetables", mr: "प्रीमियम दर्जाची सुकवलेली फळे आणि भाजीपाला" },
  { en: "Different nutritious fruit and vegetable powders", mr: "विविध प्रकारची पोषणयुक्त फळे आणि भाजी पावडर" },
  { en: "Special selected dry fruits and whole spices", mr: "विशेष निवडक सुका मेवा आणि पूर्ण मसाले" },
  { en: "Different nutritious fruit and vegetable powders (Fruit & Veg Powders)", mr: "विविध प्रकारची पोषण-युक्त फळ व भाजी पावडर (Fruit & Veg Powders)" },
  { en: "Certified & Registered", mr: "प्रमाणित आणि नोंदणीकृत" },
  { en: "Enterprise Registration & Licensing", mr: "उद्योग नोंदणी आणि परवाने" },
  { en: "FSSAI License", mr: "FSSAI परवाना" },
  { en: "GSTIN Registration", mr: "GSTIN नोंदणी" },
  { en: "MSME Udyam Reg", mr: "MSME उद्यम नोंदणी" },

  { en: "Why Switch to Utkarsh Organic Powders?", mr: "उत्कर्ष ऑर्गॅनिक पावडर का निवडाव्यात?" },
  { en: "Why Switch to", mr: "का निवडावे" },
  { en: "Powders?", mr: "पावडर?" },
  { en: "FSSAI Certified", mr: "FSSAI प्रमाणित" },
  { en: "GSTIN Registered", mr: "GSTIN नोंदणीकृत" },
  { en: "MSME Udyam Reg.", mr: "MSME उद्यम नोंदणी" },
  { en: "Head to Head", mr: "तुलना" },
  { en: "How Utkarsh Organic Compares", mr: "उत्कर्ष ऑर्गॅनिकची तुलना" },
  { en: "Feature", mr: "वैशिष्ट्य" },
  { en: "Utkarsh Organic Powders", mr: "उत्कर्ष ऑर्गॅनिक पावडर" },
  { en: "Conventional Spice Powders", mr: "सामान्य मसाला पावडर" },
  { en: "Raw Fresh Produce", mr: "ताजा कच्चा भाजीपाला" },
  { en: "Core Value Pillars", mr: "मुख्य मूल्ये" },
  { en: "Built for modern everyday cooking", mr: "आधुनिक रोजच्या स्वयंपाकासाठी तयार" },
  { en: "Got Questions?", mr: "प्रश्न आहेत का?" },
  { en: "Frequently Asked Questions", mr: "वारंवार विचारले जाणारे प्रश्न" },

  { en: "B2B & Commercial Supply", mr: "B2B आणि व्यावसायिक पुरवठा" },
  { en: "B2B & COMMERCIAL SUPPLY", mr: "B2B आणि व्यावसायिक पुरवठा" },
  { en: "Reliable", mr: "विश्वसनीय" },
  { en: "Bulk Dehydrated", mr: "बल्क डिहायड्रेटेड" },
  { en: "Powders for Food Enterprises", mr: "फूड उद्योगांसाठी पावडर" },
  { en: "Who We Serve", mr: "आम्ही कोणासाठी काम करतो" },
  { en: "Tailored Packaging & Volume Pricing", mr: "सानुकूल पॅकेजिंग आणि प्रमाणानुसार दर" },
  { en: "B2B Assurance", mr: "B2B आश्वासन" },
  { en: "Why Food Captains Trust Utkarsh Organic", mr: "फूड व्यवसाय उत्कर्ष ऑर्गॅनिकवर का विश्वास ठेवतात" },
  { en: "Request Sample Kit", mr: "सॅम्पल किट मागवा" },
  { en: "Request Bulk Price Quote", mr: "बल्क दरासाठी चौकशी करा" },
  { en: "Submit Commercial Inquiry", mr: "व्यावसायिक चौकशी पाठवा" },
  { en: "Send Another Inquiry", mr: "आणखी एक चौकशी पाठवा" },
  { en: "Inquiry Sent Successfully!", mr: "चौकशी यशस्वीरीत्या पाठवली!" },

  { en: "Get in Touch with Utkarsh Farm", mr: "उत्कर्ष फार्मशी संपर्क साधा" },
  { en: "Get in", mr: "आमच्याशी" },
  { en: "Touch with Us", mr: "संपर्क साधा" },
  { en: "Direct Farm Unit", mr: "थेट फार्म युनिट" },
  { en: "Contact Person", mr: "संपर्क व्यक्ती" },
  { en: "Farm & Factory Address", mr: "फार्म आणि फॅक्टरी पत्ता" },
  { en: "Direct Call & Support", mr: "थेट कॉल आणि सपोर्ट" },
  { en: "Email Addresses", mr: "ईमेल पत्ते" },
  { en: "WhatsApp Direct Order", mr: "WhatsApp थेट ऑर्डर" },
  { en: "Send Us a Message", mr: "आम्हाला संदेश पाठवा" },
  { en: "Message Received!", mr: "संदेश प्राप्त झाला!" },
  { en: "Send Another Message", mr: "आणखी एक संदेश पाठवा" },
  { en: "Send Message", mr: "संदेश पाठवा" },
  { en: "Your Full Name", mr: "तुमचे पूर्ण नाव" },
  { en: "Email Address", mr: "ईमेल पत्ता" },
  { en: "Phone Number", mr: "फोन नंबर" },
  { en: "Inquiry Subject", mr: "चौकशीचा विषय" },
  { en: "Your Message", mr: "तुमचा संदेश" },
  { en: "General Inquiry", mr: "सामान्य चौकशी" },
  { en: "Product & Usage Guidance", mr: "उत्पादन आणि वापर मार्गदर्शन" },
  { en: "Retail Order Support", mr: "रिटेल ऑर्डर सपोर्ट" },
  { en: "Bulk & Commercial Supply", mr: "बल्क आणि व्यावसायिक पुरवठा" },
  { en: "Distributor Partnership", mr: "डिस्ट्रिब्युटर भागीदारी" },

  { en: "Farm, products and pantry-ready formats", mr: "फार्म, उत्पादने आणि पॅन्ट्री-तयार स्वरूप" },
  { en: "Farm, products and", mr: "फार्म, उत्पादने आणि" },
  { en: "pantry-ready", mr: "पॅन्ट्री-तयार" },
  { en: "formats.", mr: "स्वरूप." },
  { en: "Every image has space to breathe.", mr: "प्रत्येक प्रतिमेला पुरेशी जागा." },
  { en: "Visit and orders", mr: "भेट आणि ऑर्डर" },
  { en: "Connect before visiting the farm unit.", mr: "फार्म युनिटला भेट देण्यापूर्वी संपर्क करा." },
  { en: "Satara Farm Story", mr: "सातारा फार्मची कथा" },
  { en: "Dehydrated Onion Ingredients", mr: "डिहायड्रेटेड कांदा घटक" },
  { en: "Product Flatlay", mr: "उत्पादन फ्लॅटले" },
  { en: "Red Onion Powder", mr: "लाल कांदा पावडर" },
  { en: "Beetroot Powder", mr: "बीट पावडर" },
  { en: "Carrot Powder", mr: "गाजर पावडर" },
  { en: "Bulk Order Ready", mr: "बल्क ऑर्डरसाठी तयार" },
  { en: "Quality Promise", mr: "गुणवत्तेचे आश्वासन" },
  { en: "Contact The Farm", mr: "फार्मशी संपर्क" },

  { en: "Pantry Inspirations", mr: "पॅन्ट्री प्रेरणा" },
  { en: "Kitchen Recipes & Shortcuts", mr: "स्वयंपाकघर रेसिपी आणि शॉर्टकट" },
  { en: "Easy Prep", mr: "सोपे तयारी" },
  { en: "View Step-by-Step", mr: "स्टेप-बाय-स्टेप पाहा" },
  { en: "Get Powders", mr: "पावडर घ्या" },
  { en: "Key Ingredients", mr: "मुख्य घटक" },
  { en: "Instructions", mr: "सूचना" },
  { en: "Close Recipe", mr: "रेसिपी बंद करा" },

  { en: "Field Notes & Kitchen Guides", mr: "फील्ड नोट्स आणि किचन गाइड्स" },
  { en: "The Utkarsh Organic Journal", mr: "उत्कर्ष ऑर्गॅनिक जर्नल" },
  { en: "Featured Story", mr: "वैशिष्ट्यीकृत लेख" },
  { en: "Read Article", mr: "लेख वाचा" },
  { en: "Read full story", mr: "पूर्ण कथा वाचा" },
  { en: "Article Not Found", mr: "लेख सापडला नाही" },
  { en: "Back to Journal", mr: "जर्नलकडे परत जा" },
  { en: "Journal", mr: "जर्नल" },
  { en: "Share", mr: "शेअर करा" },
  { en: "Pantry Shortcut", mr: "पॅन्ट्री शॉर्टकट" },
  { en: "More to Read", mr: "आणखी वाचा" },

  { en: "Welcome back", mr: "पुन्हा स्वागत आहे" },
  { en: "Sign in to track orders and save your favourite items", mr: "ऑर्डर ट्रॅक करण्यासाठी आणि आवडती उत्पादने जतन करण्यासाठी साइन इन करा" },
  { en: "Password", mr: "पासवर्ड" },
  { en: "Forgot?", mr: "पासवर्ड विसरलात?" },
  { en: "Sign In", mr: "साइन इन" },
  { en: "Don't have an account?", mr: "खाते नाही का?" },
  { en: "Create account", mr: "खाते तयार करा" },
  { en: "Page Not Found", mr: "पृष्ठ सापडले नाही" },
  { en: "The page you are looking for does not exist.", mr: "तुम्ही शोधत असलेले पृष्ठ अस्तित्वात नाही." },
];

const HINDI_TRANSLATIONS: Record<string, string> = {
  English: "अंग्रेजी",
  Marathi: "मराठी",
  Hindi: "हिंदी",
  Language: "भाषा",
  "Select language": "भाषा चुनें",
  "Change language": "भाषा बदलें",

  "Utkarsh Organic Farm": "उत्कर्ष ऑर्गेनिक फार्म",
  "UTKARSH ORGANIC FARM": "उत्कर्ष ऑर्गेनिक फार्म",
  "Utkarsh Organic": "उत्कर्ष ऑर्गेनिक",
  "Organic Farm": "ऑर्गेनिक फार्म",
  "Utkarsh Farm": "उत्कर्ष फार्म",
  Utkarsh: "उत्कर्ष",
  Organic: "ऑर्गेनिक",
  "Prafull Chorage": "प्रफुल्ल चोरगे",

  Home: "होम",
  "About Us": "हमारे बारे में",
  About: "हमारे बारे में",
  Products: "उत्पाद",
  Product: "उत्पाद",
  Shop: "दुकान",
  "Why Organic": "ऑर्गेनिक क्यों?",
  "Farm Gallery": "फार्म गैलरी",
  Gallery: "गैलरी",
  "Bulk Orders": "बल्क ऑर्डर",
  "Bulk Order": "बल्क ऑर्डर",
  "Contact Us": "संपर्क करें",
  Contact: "संपर्क",
  Recipes: "रेसिपी",
  Blog: "ब्लॉग",
  "My Account": "मेरा खाता",
  "Track Order": "ऑर्डर ट्रैक करें",
  "Contact Support": "सपोर्ट से संपर्क",
  "Quality & Trust": "गुणवत्ता और भरोसा",
  "Quick Links": "त्वरित लिंक",
  Help: "मदद",

  "Shop Now": "अभी खरीदें",
  "Shop Products": "उत्पाद खरीदें",
  "Browse products": "उत्पाद देखें",
  "Browse Shop": "दुकान देखें",
  "View cart": "कार्ट देखें",
  "Your cart": "आपका कार्ट",
  "Your cart is empty": "आपका कार्ट खाली है",
  "Your Shopping Cart": "आपका शॉपिंग कार्ट",
  "No products in your cart yet": "आपके कार्ट में अभी कोई उत्पाद नहीं है",
  "Continue Shopping": "खरीदारी जारी रखें",
  "Proceed to checkout": "चेकआउट पर जाएं",
  "Proceed to Checkout": "चेकआउट पर जाएं",
  Checkout: "चेकआउट",
  "Back to Cart": "कार्ट पर वापस जाएं",
  "Return to shop": "दुकान पर वापस जाएं",
  "Order Summary": "ऑर्डर सारांश",
  Summary: "सारांश",
  Subtotal: "उप-योग",
  Shipping: "शिपिंग",
  "Delivery Charge": "डिलीवरी शुल्क",
  "Grand Total": "कुल राशि",
  "Total Payable": "देय कुल",
  Apply: "लागू करें",
  "Promo code": "प्रोमो कोड",
  "Clear all items": "सभी आइटम हटाएं",
  FREE: "मुफ्त",
  "Free shipping applied!": "मुफ्त शिपिंग लागू हुई!",
  Add: "जोड़ें",
  "Add to cart": "कार्ट में जोड़ें",
  "Buy now": "अभी खरीदें",
  "Best seller": "बेस्ट सेलर",
  New: "नया",
  MOQ: "न्यूनतम ऑर्डर",
  "Available for quote": "कोट के लिए उपलब्ध",
  "Currently unavailable": "फिलहाल उपलब्ध नहीं",
  "Choose pack size": "पैक साइज चुनें",
  selected: "चयनित",
  "Official listing": "आधिकारिक सूची",
  "Pan India supply": "पूरे भारत में आपूर्ति",
  "Manufacturer & supplier": "निर्माता और आपूर्तिकर्ता",
  "Source specs included": "स्रोत विवरण शामिल",
  "Why buyers choose it": "खरीदार इसे क्यों चुनते हैं",
  "The essentials": "मुख्य जानकारी",
  "Raw Material": "कच्चा माल",
  Storage: "भंडारण",
  "How to use it": "इसे कैसे उपयोग करें",
  "Product specifications": "उत्पाद विवरण",
  "Based on the official Utkarsh Organic Farm listing": "उत्कर्ष ऑर्गेनिक फार्म की आधिकारिक सूची के अनुसार",
  "Keep exploring": "और देखें",
  "You may also like": "आपको यह भी पसंद आ सकता है",
  "All products": "सभी उत्पाद",
  "Product Not Found": "उत्पाद नहीं मिला",
  "Back to Shop": "दुकान पर वापस जाएं",

  "Search products": "उत्पाद खोजें",
  Search: "खोजें",
  "Search organic powders & spices...": "ऑर्गेनिक पाउडर और मसाले खोजें...",
  "Search onion powder, turmeric, moringa tea, bulk packs...": "प्याज पाउडर, हल्दी, मोरिंगा चाय, बल्क पैक खोजें...",
  "Clear search": "खोज साफ करें",
  "Clear filters": "फिल्टर साफ करें",
  "All Products": "सभी उत्पाद",
  "naturally good choices": "प्राकृतिक अच्छे विकल्प",
  Sort: "क्रमबद्ध करें",
  Featured: "चुनिंदा",
  "Top rated": "शीर्ष रेटेड",
  "Price: low to high": "कीमत: कम से ज्यादा",
  "Price: high to low": "कीमत: ज्यादा से कम",
  "Nothing matched that search.": "इस खोज से कुछ मेल नहीं खाया.",
  "Try a product name or clear the filters.": "उत्पाद का नाम आजमाएं या फिल्टर साफ करें.",
  "Looking for commercial packs?": "कमर्शियल पैक चाहिए?",
  "Explore bulk orders": "बल्क ऑर्डर देखें",

  "OFFICIAL UTKARSH CATALOG": "आधिकारिक उत्कर्ष कैटलॉग",
  "Wholesale ingredients,": "थोक सामग्री,",
  "source-ready.": "स्रोत के लिए तैयार.",
  "Clean, concentrated ingredients for home kitchens, cafés and food businesses.": "घर की रसोई, कैफे और फूड बिजनेस के लिए साफ और केंद्रित सामग्री.",
  "DEHYDRATED VEGETABLES & POWDERS": "डिहाइड्रेटेड सब्जियां और पाउडर",
  "Official per-kg quotes,": "आधिकारिक प्रति किलो दर,",
  "with MOQ.": "न्यूनतम ऑर्डर के साथ.",
  "Zero peeling, zero chopping. Pure dehydrated powders packed with natural aroma & nutrition.": "न छीलना, न काटना. प्राकृतिक सुगंध और पोषण से भरपूर शुद्ध डिहाइड्रेटेड पाउडर.",
  "ORGANIC & AYURVEDIC POWDERS": "ऑर्गेनिक और आयुर्वेदिक पाउडर",
  "Amla, beetroot,": "आंवला, चुकंदर,",
  "ginger & moringa.": "अदरक और मोरिंगा.",
  "Organic and ayurvedic powders for ingredient buyers and commercial kitchens.": "सामग्री खरीदारों और कमर्शियल किचन के लिए ऑर्गेनिक और आयुर्वेदिक पाउडर.",

  "100% Natural": "100% प्राकृतिक",
  "Pure & Clean": "शुद्ध और साफ",
  "No Additives": "कोई एडिटिव नहीं",
  "No Shortcuts": "गुणवत्ता में कोई समझौता नहीं",
  "Farm to Pantry": "फार्म से पैंट्री तक",
  "Trusted Source": "विश्वसनीय स्रोत",
  "No Preservatives": "कोई प्रिजर्वेटिव नहीं",
  "100% Dehydrated": "100% डिहाइड्रेटेड",
  "Farm Fresh": "फार्म फ्रेश",
  "Satara Sourced": "सातारा से स्रोत",
  Hygienic: "स्वच्छ",
  "Modern Tech": "आधुनिक तकनीक",
  "Moringa Rich": "मोरिंगा से भरपूर",
  "High Antioxidants": "उच्च एंटीऑक्सिडेंट",
  "Pure Energy": "शुद्ध ऊर्जा",
  "Clean Wellness": "स्वच्छ सेहत",
  "Nutritionist Approved": "पोषण विशेषज्ञ द्वारा स्वीकृत",
  "Doctor Formulated": "डॉक्टर द्वारा तैयार",
  "100% Pure & Natural": "100% शुद्ध और प्राकृतिक",

  "Utkarsh Farm - From our farm directly to your kitchen!": "उत्कर्ष फार्म - हमारे खेत से सीधे आपकी रसोई तक!",
  "From our farm directly to your kitchen!": "हमारे खेत से सीधे आपकी रसोई तक!",
  "Fresh and vibrant farm": "ताजा और जीवंत खेत",
  "Farm-fresh and naturally grown vegetables.": "फार्म-फ्रेश और प्राकृतिक रूप से उगाई गई सब्जियां.",
  "Advanced processing": "उन्नत प्रोसेसिंग",
  "Fully dehydrated and hygienically processed using modern technology.": "आधुनिक तकनीक से पूरी तरह डिहाइड्रेटेड और स्वच्छ तरीके से प्रोसेस किया गया.",
  "Dehydrated Products and Powders": "डिहाइड्रेटेड उत्पाद और पाउडर",
  "Quality dried vegetables and health-friendly pure vegetable powders with long shelf life.": "लंबी शेल्फ लाइफ वाली गुणवत्ता वाली सूखी सब्जियां और स्वास्थ्य-अनुकूल शुद्ध वेजिटेबल पाउडर.",
  "Quality dried vegetables and pure vegetable powders with long shelf life.": "लंबी शेल्फ लाइफ वाली गुणवत्ता वाली सूखी सब्जियां और शुद्ध वेजिटेबल पाउडर.",
  "Spinach, beetroot, onion, moringa leaves, garlic, ginger and carrot powder.": "पालक, चुकंदर, प्याज, मोरिंगा पत्ती, लहसुन, अदरक और गाजर पाउडर.",
  "A new modern need - Utkarsh Farm products!": "आधुनिक समय की नई जरूरत - उत्कर्ष फार्म उत्पाद!",
  "Our special dehydrated vegetables and powders are now available while preserving the taste and nutrition of vegetables. 100% natural, no preservatives, pure products!": "सब्जियों का स्वाद और पोषण बनाए रखने वाले हमारे विशेष डिहाइड्रेटेड वेजिटेबल्स और पाउडर अब उपलब्ध हैं. 100% प्राकृतिक, बिना प्रिजर्वेटिव, शुद्ध उत्पाद!",
  "Our special dehydrated vegetables and powders are now available while preserving taste and nutrition.": "स्वाद और पोषण बनाए रखने वाले हमारे विशेष डिहाइड्रेटेड वेजिटेबल्स और पाउडर अब उपलब्ध हैं.",
  "100% natural, no preservatives, pure products!": "100% प्राकृतिक, बिना प्रिजर्वेटिव, शुद्ध उत्पाद!",
  "100% natural": "100% प्राकृतिक",
  "Contact 7507379018 Prafull Chorage": "संपर्क 7507379018 प्रफुल्ल चोरगे",
  "View Products": "उत्पाद देखें",
  "Our Process": "हमारी प्रक्रिया",
  "Direct Contact and Orders": "सीधा संपर्क और ऑर्डर",
  "Residue-free farming": "रेजिड्यू-फ्री खेती",
  "Hygienic process": "स्वच्छ प्रक्रिया",
  "Pure powders": "शुद्ध पाउडर",
  "Hygienic processing with modern technology.": "आधुनिक तकनीक से स्वच्छ प्रोसेसिंग.",
  "WhatsApp Contact": "WhatsApp संपर्क",
  "Official Products": "आधिकारिक उत्पाद",
  "Minimum Order Quantity": "न्यूनतम ऑर्डर मात्रा",

  "Rooted in nature.": "प्रकृति से जुड़ा.",
  "Driven by purpose.": "उद्देश्य से प्रेरित.",
  "About Utkarsh Organic Farm": "उत्कर्ष ऑर्गेनिक फार्म के बारे में",
  "Official Business Profile": "आधिकारिक बिजनेस प्रोफाइल",
  "Founder & Supply Details": "संस्थापक और आपूर्ति विवरण",
  "Leadership Team": "लीडरशिप टीम",
  "Manufacturer & Supplier": "निर्माता और आपूर्तिकर्ता",
  "Our farm story": "हमारी फार्म कहानी",
  "Our Certifications": "हमारे प्रमाणपत्र",
  "Certified & Registered": "प्रमाणित और पंजीकृत",
  "Enterprise Registration & Licensing": "उद्यम पंजीकरण और लाइसेंसिंग",
  "FSSAI License": "FSSAI लाइसेंस",
  "GSTIN Registration": "GSTIN पंजीकरण",
  "MSME Udyam Reg": "MSME उद्यम पंजीकरण",

  "Why Switch to Utkarsh Organic Powders?": "उत्कर्ष ऑर्गेनिक पाउडर क्यों चुनें?",
  "Why Switch to": "क्यों चुनें",
  "Powders?": "पाउडर?",
  "FSSAI Certified": "FSSAI प्रमाणित",
  "GSTIN Registered": "GSTIN पंजीकृत",
  "MSME Udyam Reg.": "MSME उद्यम पंजीकरण",
  "Head to Head": "सीधी तुलना",
  "How Utkarsh Organic Compares": "उत्कर्ष ऑर्गेनिक की तुलना",
  Feature: "विशेषता",
  "Utkarsh Organic Powders": "उत्कर्ष ऑर्गेनिक पाउडर",
  "Conventional Spice Powders": "सामान्य मसाला पाउडर",
  "Raw Fresh Produce": "ताजा कच्ची उपज",
  "Core Value Pillars": "मुख्य मूल्य स्तंभ",
  "Built for modern everyday cooking": "आधुनिक रोजमर्रा की कुकिंग के लिए बनाया गया",
  "Got Questions?": "सवाल हैं?",
  "Frequently Asked Questions": "अक्सर पूछे जाने वाले प्रश्न",

  "B2B & Commercial Supply": "B2B और कमर्शियल सप्लाई",
  "B2B & COMMERCIAL SUPPLY": "B2B और कमर्शियल सप्लाई",
  Reliable: "विश्वसनीय",
  "Bulk Dehydrated": "बल्क डिहाइड्रेटेड",
  "Powders for Food Enterprises": "फूड एंटरप्राइज के लिए पाउडर",
  "Who We Serve": "हम किनके लिए काम करते हैं",
  "Tailored Packaging & Volume Pricing": "कस्टम पैकेजिंग और वॉल्यूम प्राइसिंग",
  "B2B Assurance": "B2B आश्वासन",
  "Why Food Captains Trust Utkarsh Organic": "फूड बिजनेस उत्कर्ष ऑर्गेनिक पर क्यों भरोसा करते हैं",
  "Request Sample Kit": "सैंपल किट मांगें",
  "Request Bulk Price Quote": "बल्क प्राइस कोट मांगें",
  "Submit Commercial Inquiry": "कमर्शियल इन्क्वायरी भेजें",
  "Send Another Inquiry": "एक और इन्क्वायरी भेजें",
  "Inquiry Sent Successfully!": "इन्क्वायरी सफलतापूर्वक भेजी गई!",

  "Get in Touch with Utkarsh Farm": "उत्कर्ष फार्म से संपर्क करें",
  "Get in": "हमसे",
  "Touch with Us": "संपर्क करें",
  "Direct Farm Unit": "डायरेक्ट फार्म यूनिट",
  "Contact Person": "संपर्क व्यक्ति",
  "Farm & Factory Address": "फार्म और फैक्ट्री पता",
  "Direct Call & Support": "सीधा कॉल और सपोर्ट",
  "Email Addresses": "ईमेल पते",
  "WhatsApp Direct Order": "WhatsApp डायरेक्ट ऑर्डर",
  "Send Us a Message": "हमें संदेश भेजें",
  "Message Received!": "संदेश प्राप्त हुआ!",
  "Send Another Message": "एक और संदेश भेजें",
  "Send Message": "संदेश भेजें",
  "Your Full Name": "आपका पूरा नाम",
  "Email Address": "ईमेल पता",
  "Phone Number": "फोन नंबर",
  "Inquiry Subject": "इन्क्वायरी विषय",
  "Your Message": "आपका संदेश",
  "General Inquiry": "सामान्य इन्क्वायरी",
  "Product & Usage Guidance": "उत्पाद और उपयोग मार्गदर्शन",
  "Retail Order Support": "रिटेल ऑर्डर सपोर्ट",
  "Bulk & Commercial Supply": "बल्क और कमर्शियल सप्लाई",
  "Distributor Partnership": "डिस्ट्रिब्यूटर पार्टनरशिप",

  "Farm, products and pantry-ready formats": "फार्म, उत्पाद और पैंट्री-रेडी फॉर्मेट",
  "Farm, products and": "फार्म, उत्पाद और",
  "pantry-ready": "पैंट्री-रेडी",
  "formats.": "फॉर्मेट.",
  "Every image has space to breathe.": "हर तस्वीर को खुली जगह दी गई है.",
  "Visit and orders": "भेंट और ऑर्डर",
  "Connect before visiting the farm unit.": "फार्म यूनिट आने से पहले संपर्क करें.",
  "Satara Farm Story": "सातारा फार्म कहानी",
  "Dehydrated Onion Ingredients": "डिहाइड्रेटेड प्याज सामग्री",
  "Product Flatlay": "उत्पाद फ्लैटले",
  "Red Onion Powder": "लाल प्याज पाउडर",
  "Beetroot Powder": "चुकंदर पाउडर",
  "Carrot Powder": "गाजर पाउडर",
  "Bulk Order Ready": "बल्क ऑर्डर के लिए तैयार",
  "Quality Promise": "गुणवत्ता का वादा",
  "Contact The Farm": "फार्म से संपर्क करें",

  "Pantry Inspirations": "पैंट्री प्रेरणा",
  "Kitchen Recipes & Shortcuts": "किचन रेसिपी और शॉर्टकट",
  "Easy Prep": "आसान तैयारी",
  "View Step-by-Step": "स्टेप-बाय-स्टेप देखें",
  "Get Powders": "पाउडर लें",
  "Key Ingredients": "मुख्य सामग्री",
  Instructions: "निर्देश",
  "Close Recipe": "रेसिपी बंद करें",

  "Field Notes & Kitchen Guides": "फील्ड नोट्स और किचन गाइड",
  "The Utkarsh Organic Journal": "उत्कर्ष ऑर्गेनिक जर्नल",
  "Featured Story": "फीचर्ड स्टोरी",
  "Read Article": "लेख पढ़ें",
  "Read full story": "पूरी कहानी पढ़ें",
  "Article Not Found": "लेख नहीं मिला",
  "Back to Journal": "जर्नल पर वापस जाएं",
  Journal: "जर्नल",
  Share: "शेयर करें",
  "Pantry Shortcut": "पैंट्री शॉर्टकट",
  "More to Read": "और पढ़ें",

  "Welcome back": "वापसी पर स्वागत है",
  "Sign in to track orders and save your favourite items": "ऑर्डर ट्रैक करने और पसंदीदा आइटम सेव करने के लिए साइन इन करें",
  Password: "पासवर्ड",
  "Forgot?": "भूल गए?",
  "Sign In": "साइन इन",
  "Don't have an account?": "खाता नहीं है?",
  "Create account": "खाता बनाएं",
  "Page Not Found": "पेज नहीं मिला",
  "The page you are looking for does not exist.": "आप जिस पेज को खोज रहे हैं वह मौजूद नहीं है.",
};

const localizedTranslations: TranslationPair[] = TRANSLATIONS.map((pair) => {
  const hi = HINDI_TRANSLATIONS[pair.en];
  return hi ? { ...pair, hi } : pair;
});

const translationLength = (pair: TranslationPair) =>
  Math.max(...LANGUAGE_KEYS.map((key) => pair[key]?.length ?? 0));

const sortedTranslations = [...localizedTranslations].sort(
  (a, b) => translationLength(b) - translationLength(a)
);

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  translate: (value: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getInitialLanguage(): Language {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "mr" || stored === "hi" ? stored : "en";
}

function preserveOuterWhitespace(original: string, translated: string) {
  const leading = original.match(/^\s*/)?.[0] ?? "";
  const trailing = original.match(/\s*$/)?.[0] ?? "";
  return `${leading}${translated.trim()}${trailing}`;
}

export function translateValue(value: string, language: Language) {
  if (!value.trim()) return value;

  let translated = value.trim();
  const sourceLanguages = LANGUAGE_KEYS.filter((key) => key !== language);

  for (const pair of sortedTranslations) {
    const target = pair[language];
    if (!target) continue;

    for (const sourceKey of sourceLanguages) {
      const source = pair[sourceKey];
      if (!source || source === target || !translated.includes(source)) continue;
      translated = translated.split(source).join(target);
    }
  }

  return preserveOuterWhitespace(value, translated);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    window.localStorage.setItem(STORAGE_KEY, nextLanguage);
  };

  useEffect(() => {
    document.documentElement.lang =
      language === "mr" ? "mr-IN" : language === "hi" ? "hi-IN" : "en";
  }, [language]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      translate: (text: string) => translateValue(text, language),
    }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}

function shouldSkip(node: Node) {
  const element = node.nodeType === Node.ELEMENT_NODE ? (node as Element) : node.parentElement;
  if (!element) return false;
  if (element.closest("[data-i18n-skip]")) return true;
  return Boolean(element.closest("script, style, noscript, textarea, code, pre"));
}

function translateTextNode(node: Text, language: Language) {
  if (shouldSkip(node) || !node.nodeValue?.trim()) return;
  const nextValue = translateValue(node.nodeValue, language);
  if (nextValue !== node.nodeValue) node.nodeValue = nextValue;
}

function translateElementAttributes(element: Element, language: Language) {
  if (shouldSkip(element)) return;

  for (const attr of ["aria-label", "title", "alt", "placeholder"]) {
    const value = element.getAttribute(attr);
    if (!value?.trim()) continue;
    const nextValue = translateValue(value, language);
    if (nextValue !== value) element.setAttribute(attr, nextValue);
  }
}

function translateTree(root: ParentNode, language: Language) {
  if (root instanceof Element) translateElementAttributes(root, language);

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
  let node = walker.nextNode();

  while (node) {
    if (node.nodeType === Node.TEXT_NODE) {
      translateTextNode(node as Text, language);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      translateElementAttributes(node as Element, language);
    }
    node = walker.nextNode();
  }
}

export function TranslationLayer() {
  const { language } = useLanguage();

  useEffect(() => {
    translateTree(document.body, language);

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "characterData" && mutation.target.nodeType === Node.TEXT_NODE) {
          translateTextNode(mutation.target as Text, language);
        }

        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE) {
            translateTextNode(node as Text, language);
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            translateTree(node as Element, language);
          }
        });

        if (mutation.type === "attributes" && mutation.target.nodeType === Node.ELEMENT_NODE) {
          translateElementAttributes(mutation.target as Element, language);
        }
      }
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["aria-label", "title", "alt", "placeholder"],
      childList: true,
      characterData: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, [language]);

  return null;
}
