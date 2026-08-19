import onion from "@/assets/p-onion.jpg";
import garlic from "@/assets/p-garlic.jpg";
import ginger from "@/assets/p-ginger.jpg";
import tomato from "@/assets/p-tomato.jpg";
import beetroot from "@/assets/p-beetroot.jpg";
import spinach from "@/assets/p-spinach.jpg";
import carrot from "@/assets/p-carrot.jpg";
import turmeric from "@/assets/p-turmeric.jpg";
import chilli from "@/assets/p-chilli.jpg";
import coriander from "@/assets/p-coriander.jpg";

export const COMPANY_INFO = {
  name: "UTKARSH ORGANIC FARM",
  tradeName: "Utkarsh Organic Farm",
  legalName: "Utkash Food Farm",
  founders: [
    { name: "Prafulla Pradeep Chorge (प्रफुल्ल प्रदीप चोरगे)", role: "Co-Founder & Agricultural Expert (कृषी तज्ञ)" },
    { name: "Dr. Padmashree Prafulla Chorge (डॉ. पद्मश्री प्रफुल्ल चोरगे)", role: "Co-Founder & Nutrition Expert (पोषण तज्ञ)" },
  ],
  contactPerson: "Prafulla & Dr. Padmashree Chorge",
  gstin: "27CKXPB5409F1ZZ",
  fssaiRegNo: "21526039003217",
  udyamRegNo: "UDYAM-MH-30-0197446",
  address: {
    doorNo: "262",
    locality: "Lohare, Menwali Road, Gangapuri",
    taluka: "Taluka Wai",
    city: "Wai",
    district: "Satara",
    state: "Maharashtra",
    pincode: "412803",
    full: "House No. 262, Lohare, Menwali Road, Gangapuri, Wai, District Satara, Maharashtra 412803",
  },
  phonePrimary: "+91 7507379018",
  phoneSecondary: "+91 8830150923",
  email: "hello@utkarshorganic.com",
  officialEmail: "dr.padmashreebhosale@gmail.com",
  marathiHeader: "🌱 उत्कर्ष फार्म – शेतापासून थेट तुमच्या स्वयंपाकघरापर्यंत! 🌱",
  marathiSlogan: "ताजा, सकस, नैसर्गिक – वाई, महाराष्ट्र | From Nature to Your Home",
  marathiDescription: "आधुनिक काळाची नवी गरज – उत्कर्ष फार्म उत्पादने! 🥕✨ भाज्यांची चव आणि पोषणमूल्ये टिकवून ठेवणारी आमची विशेष Dehydrated Vegetables & Powders आता उपलब्ध. १००% नॅचरल, कोणतीही प्रिझर्व्हेटिव्ह्ज नसलेली शुद्ध उत्पादने! वापरायला अत्यंत सोपे: रेडी टू कूक (Ready to Cook) & रेडी टू युज (Ready to Use)!",
};

export type Weight = "100g" | "250g" | "500g" | "1kg";

export const WEIGHTS: Weight[] = ["100g", "250g", "500g", "1kg"];

export const WEIGHT_MULTIPLIER: Record<Weight, number> = {
  "100g": 1,
  "250g": 2.2,
  "500g": 4,
  "1kg": 7.4,
};

export type Category = "vegetable" | "spice" | "wellness" | "ready-to-cook" | "bulk";

export const CATEGORIES: { id: Category; name: string; blurb: string }[] = [
  { id: "vegetable", name: "Vegetable & Fruit Powders", blurb: "Onion, Tomato, Beetroot, Spinach, Carrot, Moringa, Amla, Mango, Banana" },
  { id: "spice", name: "Spice Powders & Dry Spices", blurb: "Turmeric, Chilli, Coriander, Garlic, Ginger" },
  { id: "wellness", name: "Wellness & Herbal Teas", blurb: "Moringa Lemon Tea, Moringa Leaf Powder, Immunity Powders" },
  { id: "ready-to-cook", name: "Ready to Cook & Functional Foods", blurb: "Moringa Soup, Moringa Noodles, Dehydrated Mixed Veggies" },
  { id: "bulk", name: "Bulk & Commercial Packs", blurb: "Hotels, cloud kitchens, exporters and food processors" },
];

export type Product = {
  slug: string;
  name: string;
  marathiName?: string;
  short: string;
  image: string;
  category: Category;
  basePrice: number;
  baseMrp: number;
  rating: number;
  reviews: number;
  bestSeller?: boolean;
  newArrival?: boolean;
  inStock: boolean;
  sku: string;
  highlights: string[];
  description: string;
  benefits: string[];
  ingredients: string;
  usage: string[];
  nutrition: { label: string; value: string }[];
  storage: string;
  gallery?: string[];
};

const nutritionCommon = [
  { label: "Energy", value: "341 kcal / 100g" },
  { label: "Carbohydrates", value: "72 g" },
  { label: "Protein", value: "10 g" },
  { label: "Total Fat", value: "1.2 g" },
  { label: "Dietary Fibre", value: "9 g" },
  { label: "Sodium", value: "52 mg" },
];

export const PRODUCTS: Product[] = [
  {
    slug: "moringa-lemon-tea",
    name: "Utkarsh Moringa Lemon Tea",
    marathiName: "मुलगा लेमन टी (Dehydrated)",
    short: "A healthy fusion of fresh lemon and nutrient-packed Moringa leaves.",
    image: spinach,
    category: "wellness",
    basePrice: 289,
    baseMrp: 349,
    rating: 5.0,
    reviews: 142,
    bestSeller: true,
    newArrival: true,
    inStock: true,
    sku: "UO-MLT-100",
    highlights: ["Healthy Fusion of Lemon & Moringa", "100% Dehydrated Natural Blend", "Rich in Antioxidants", "Instant Rejuvenation"],
    description: "Utkarsh Choice Moringa Lemon Tea combines shade-dried organic Moringa leaves with tangy dehydrated lemon concentrate. Designed by Nutritionist Dr. Padmashree Chorge to boost morning energy, aid digestion, and support natural immunity.",
    benefits: [
      "Instant herbal infusion—just add warm water",
      "Abundant in Vitamin C, Iron, and natural detoxifiers",
      "Zero artificial sugar, flavorings, or preservatives",
      "Formulated by Dr. Padmashree Chorge (Nutrition Expert)",
    ],
    ingredients: "100% dehydrated organic Moringa leaves, natural lemon juice powder.",
    usage: ["Add 1 tsp to a cup of warm water.", "Stir well and let steep for 1 minute.", "Enjoy hot or chilled with honey."],
    nutrition: [
      { label: "Vitamin C", value: "45 mg" },
      { label: "Iron", value: "14 mg" },
      { label: "Antioxidants", value: "High" },
    ],
    storage: "Store in a cool, dry place away from direct sunlight.",
  },
  {
    slug: "moringa-soup-mix",
    name: "Utkarsh Moringa Soup Mix",
    marathiName: "शेवगा सूप प्रॉडक्ट (Ready to Cook)",
    short: "Nutritious and delicious drumstick soup mix—quick to prepare in 3 minutes!",
    image: spinach,
    category: "ready-to-cook",
    basePrice: 249,
    baseMrp: 299,
    rating: 4.9,
    reviews: 118,
    bestSeller: true,
    inStock: true,
    sku: "UO-MSP-100",
    highlights: ["Nutritious & Tasty", "Quick to Prepare (3 min)", "Ready to Cook", "Rich in Calcium & Fibre"],
    description: "A wholesome, ready-to-cook soup blend crafted from dehydrated Moringa leaves, drumstick pulp, garlic, cumin, and sea salt. Gives a warm, comforting bowl of health without any MSG or synthetic thickeners.",
    benefits: [
      "Complete nutritional meal starter in 3 minutes",
      "Gentle on digestion and rich in bio-available Calcium",
      "100% natural dehydrated farm produce",
      "Ideal for all age groups",
    ],
    ingredients: "Dehydrated Moringa leaf powder, drumstick extract, dehydrated garlic, onion, cumin, rock salt.",
    usage: ["Whisk 2 tbsp powder into 250ml water.", "Boil for 3 minutes over medium flame.", "Serve piping hot with whole grain toast."],
    nutrition: nutritionCommon,
    storage: "Airtight pouch, keep away from humidity.",
  },
  {
    slug: "moringa-masala-noodles",
    name: "Utkarsh Moringa Masala Noodles",
    marathiName: "शेवगा मसाला नूडल्स (Dehydrated Veg Mix)",
    short: "Rich in nutrients! Goodness of Moringa infused into delicious family noodles.",
    image: carrot,
    category: "ready-to-cook",
    basePrice: 149,
    baseMrp: 189,
    rating: 4.9,
    reviews: 176,
    newArrival: true,
    inStock: true,
    sku: "UO-MMN-100",
    highlights: ["Rich in Nutrients", "Goodness of Moringa", "No Palm Oil or Maida", "Ready to Cook"],
    description: "Say goodbye to junk instant noodles! Made with whole wheat and organic Moringa leaf powder, served with authentic Satara dehydrated vegetable masala sachets.",
    benefits: [
      "Healthy snack option loved by children and adults",
      "Packed with drumstick leaf nutrition",
      "Comes with 100% natural dehydrated veg masala",
      "Zero synthetic preservatives",
    ],
    ingredients: "Whole wheat flour, organic Moringa powder, dehydrated carrots, peas, beans, spices.",
    usage: ["Boil 300ml water.", "Add noodles and seasoning sachet.", "Cook for 4-5 minutes and serve hot."],
    nutrition: nutritionCommon,
    storage: "Store in a cool dry pantry.",
  },
  {
    slug: "mixed-dehydrated-vegetables",
    name: "Mixed Dehydrated Vegetables",
    marathiName: "मिक्स डिहायड्रेटेड भाज्या (Ready to Cook)",
    short: "Chopped dehydrated carrots, peas, beans & corn—easy & convenient for daily cooking.",
    image: carrot,
    category: "ready-to-cook",
    basePrice: 219,
    baseMrp: 279,
    rating: 4.8,
    reviews: 89,
    inStock: true,
    sku: "UO-MDV-100",
    highlights: ["Ready to Cook (रेडी टू कूक)", "Easy & Convenient", "Zero Chopping Waste", "Rehydrates in 5 Mins"],
    description: "Carefully diced fresh farm carrots, sweet corn, green peas, and French beans dried under hygienic conditions. Soaks back to original texture in warm water in 5 minutes for fried rice, pulao, poha, and curries.",
    benefits: [
      "Saves 20 minutes of daily chopping prep",
      "12+ months shelf life with zero refrigeration required",
      "Retains natural crunchy bite, color, and sweetness",
      "Ideal for cloud kitchens, caterers & daily households",
    ],
    ingredients: "100% dehydrated carrots, green peas, sweet corn, French beans.",
    usage: ["Soak in warm water for 5 mins or add directly into boiling gravy/rice."],
    nutrition: nutritionCommon,
    storage: "Keep sealed in dry airtight jar.",
  },
  {
    slug: "organic-amla-powder",
    name: "Organic Amla Powder",
    marathiName: "आवळा पावडर (Amla Powder)",
    short: "Pure dehydrated Indian gooseberry powder for immunity, digestion & hair health.",
    image: ginger,
    category: "wellness",
    basePrice: 199,
    baseMrp: 249,
    rating: 4.9,
    reviews: 112,
    inStock: true,
    sku: "UO-AMP-100",
    highlights: ["100% Pure Organic Amla", "Ultra High Vitamin C", "Immunity & Hair Health", "Zero Preservatives"],
    description: "Made from fresh wild Amla harvested at peak season, seed-removed, gently dried, and ground. Formulated for daily immunity and digestive wellness.",
    benefits: [
      "20x more Vitamin C than fresh orange juice",
      "Promotes healthy hair growth and glowing skin",
      "Aids natural digestion and gut detox",
    ],
    ingredients: "100% organic dehydrated amla (gooseberry).",
    usage: ["Mix 1/2 tsp with warm water & honey every morning."],
    nutrition: nutritionCommon,
    storage: "Cool, dry cabinet away from steam.",
  },
  {
    slug: "organic-mango-powder-amchur",
    name: "Organic Mango Powder (Amchur)",
    marathiName: "आंबा पावडर (Amchur Powder)",
    short: "Tangy dried raw mango powder that brings authentic chatpata flavor to dishes.",
    image: turmeric,
    category: "vegetable",
    basePrice: 189,
    baseMrp: 239,
    rating: 4.8,
    reviews: 134,
    inStock: true,
    sku: "UO-AMCP-100",
    highlights: ["Sun-Dried Raw Green Mangoes", "Tangy Authentic Flavor", "Essential Indian Seasoning", "100% Pure"],
    description: "Sourced from local Satara orchards, unripe green mangoes are sliced, sun-dried, and stone-milled to add tartness to chole, parathas, and chaat.",
    benefits: [
      "Provides natural sour note without adding liquid",
      "Rich in natural antioxidants and Vitamin A",
    ],
    ingredients: "100% organic dried raw mango.",
    usage: ["Sprinkle 1/2 tsp over chole, bhindi fry, or chaat."],
    nutrition: nutritionCommon,
    storage: "Reseal tightly; store in a dry place.",
  },
  {
    slug: "organic-banana-powder",
    name: "Organic Raw Banana Powder",
    marathiName: "केळी पावडर (Banana Powder)",
    short: "Prebiotic raw banana flour for infant nutrition, smoothies & gluten-free baking.",
    image: ginger,
    category: "wellness",
    basePrice: 229,
    baseMrp: 289,
    rating: 4.8,
    reviews: 78,
    newArrival: true,
    inStock: true,
    sku: "UO-BNP-100",
    highlights: ["Prebiotic Resistant Starch", "Gluten-Free Flour", "Nutritious Baby & Family Food", "Easy to Digest"],
    description: "Raw green bananas dehydrated and milled into a smooth, digestible flour. Excellent natural gut food and baby cereal base.",
    benefits: [
      "Rich in resistant starch that nourishes healthy gut flora",
      "Ideal gluten-free substitute for baking and porridge",
    ],
    ingredients: "100% organic dehydrated green banana.",
    usage: ["Cook 2 tbsp with milk/water into porridge or blend into smoothies."],
    nutrition: nutritionCommon,
    storage: "Store in a dry airtight container.",
  },
  {
    slug: "organic-onion-powder",
    name: "Organic Onion Powder",
    marathiName: "कांदा पावडर (Kanda Powder)",
    short: "100% dehydrated onion with a fine texture and strong natural aroma.",
    image: onion,
    category: "vegetable",
    basePrice: 189,
    baseMrp: 249,
    rating: 4.9,
    reviews: 214,
    bestSeller: true,
    inStock: true,
    sku: "UO-ONP-100",
    highlights: [
      "100% Natural Onion",
      "No Preservatives",
      "No Artificial Colour",
      "Rich Aroma",
      "Long Shelf Life",
      "Easy to Use",
    ],
    description:
      "Made from carefully selected onions grown at our Wai (Satara) farms, gently dehydrated to preserve their authentic flavour, aroma and natural goodness. Ground to a fine, free-flowing texture that blends instantly into gravies, marinades, dry rubs and batters.",
    benefits: [
      "Saves peeling, chopping and prep time in busy kitchens",
      "Consistent flavour in every batch you cook",
      "Blends evenly into wet and dry preparations",
      "Compact storage compared to fresh onion",
    ],
    ingredients: "100% dehydrated organic onion. Nothing else added.",
    usage: [
      "Use 1 tsp powder in place of roughly one medium onion.",
      "Add early to hot oil or gravy so the aroma opens up.",
      "For marinades, mix with curd or oil before applying.",
    ],
    nutrition: nutritionCommon,
    storage: "Store in a cool, dry place away from direct sunlight. Reseal the pack after every use.",
  },
  {
    slug: "organic-garlic-powder",
    name: "Organic Garlic Powder",
    marathiName: "लसूण पावडर (Lassun Powder)",
    short: "Premium dehydrated garlic with a rich aroma, ideal for seasoning.",
    image: garlic,
    category: "spice",
    basePrice: 219,
    baseMrp: 279,
    rating: 4.8,
    reviews: 168,
    bestSeller: true,
    inStock: true,
    sku: "UO-GRP-100",
    highlights: ["Premium dehydrated garlic", "Rich aroma", "Seasoning and food processing", "No additives"],
    description:
      "Sorted, cleaned and gently dehydrated garlic cloves, milled into a fine powder that carries the full pungency of fresh garlic. A workhorse seasoning for kitchens and food processing lines alike.",
    benefits: [
      "Instant garlic flavour without peeling",
      "Ideal for dry rubs, breads and sauces",
      "Uniform particle size for even blending",
      "Stable flavour through long cooking",
    ],
    ingredients: "100% dehydrated organic garlic.",
    usage: ["1/2 tsp replaces about 2 fresh cloves.", "Blend into butter, oil or dressings.", "Add to dough for garlic breads."],
    nutrition: nutritionCommon,
    storage: "Keep sealed in a dry, cool cabinet. Avoid moisture and steam.",
  },
  {
    slug: "organic-ginger-powder",
    name: "Organic Ginger Powder",
    marathiName: "आले पावडर (Aale Powder)",
    short: "Naturally processed ginger with strong flavour for beverages and cooking.",
    image: ginger,
    category: "wellness",
    basePrice: 239,
    baseMrp: 299,
    rating: 4.7,
    reviews: 121,
    inStock: true,
    sku: "UO-GNP-100",
    highlights: ["Naturally processed", "Strong warm flavour", "For beverages and cooking", "Finely milled"],
    description:
      "Mature ginger rhizomes, washed, sliced and slowly dried to hold their warmth and bite. Fine enough to dissolve into tea, milk and batters without grit.",
    benefits: [
      "Warm, clean ginger note in drinks",
      "Convenient for chai and herbal infusions",
      "Consistent strength batch to batch",
      "Easy to portion for commercial recipes",
    ],
    ingredients: "100% dehydrated organic ginger.",
    usage: ["1/4 tsp per cup of tea or milk.", "Add to bakery mixes and marinades.", "Stir into warm water with lemon."],
    nutrition: nutritionCommon,
    storage: "Airtight container, away from heat and sunlight.",
  },
  {
    slug: "organic-beetroot-powder",
    name: "Organic Beetroot Powder",
    marathiName: "बीट पावडर (Beet Powder)",
    short: "Naturally vibrant colour, nutrient-rich, ideal for smoothies.",
    image: beetroot,
    category: "vegetable",
    basePrice: 259,
    baseMrp: 329,
    rating: 4.6,
    reviews: 84,
    newArrival: true,
    inStock: true,
    sku: "UO-BTP-100",
    highlights: ["Naturally vibrant colour", "Nutrient rich", "Smoothies and food applications", "No synthetic colour"],
    description:
      "Fresh beetroot, dried and milled to a fine magenta powder that carries earthy sweetness and natural colour into drinks, batters and food applications.",
    benefits: [
      "Natural colouring for food and bakery",
      "Blends smoothly into smoothies",
      "Earthy sweetness with no aftertaste",
      "Convenient alternative to fresh beetroot",
    ],
    ingredients: "100% dehydrated organic beetroot.",
    usage: ["1 tsp per smoothie or juice.", "Add to dough for natural pink tone.", "Whisk into curd-based dips."],
    nutrition: nutritionCommon,
    storage: "Store cool and dry; colour is light-sensitive.",
  },
  {
    slug: "organic-spinach-powder",
    name: "Organic Spinach Powder",
    marathiName: "पालक पावडर (Palak Powder)",
    short: "Dehydrated spinach with natural green colour for health foods.",
    image: spinach,
    category: "vegetable",
    basePrice: 249,
    baseMrp: 319,
    rating: 4.5,
    reviews: 61,
    inStock: true,
    sku: "UO-SPP-100",
    highlights: ["Dehydrated spinach", "Natural green colour", "Suitable for health foods", "Finely milled"],
    description:
      "Tender spinach leaves washed, dried and ground into a bright green powder that folds easily into doughs, soups and health mixes.",
    benefits: [
      "Adds greens where fresh leaves are impractical",
      "Natural green tone for pasta and rotis",
      "Long shelf life versus fresh spinach",
      "Neutral, mild flavour",
    ],
    ingredients: "100% dehydrated organic spinach.",
    usage: ["1 tbsp per 250g of dough.", "Stir into soups at the end.", "Blend into green smoothies."],
    nutrition: nutritionCommon,
    storage: "Airtight, away from light to protect colour.",
  },
  {
    slug: "organic-carrot-powder",
    name: "Organic Carrot Powder",
    marathiName: "गाजर पावडर (Gajar Powder)",
    short: "Naturally sweet with rich colour, for bakery, soups and beverages.",
    image: carrot,
    category: "vegetable",
    basePrice: 239,
    baseMrp: 299,
    rating: 4.6,
    reviews: 73,
    inStock: true,
    sku: "UO-CRP-100",
    highlights: ["Naturally sweet", "Rich orange colour", "Bakery, soups and beverages", "No added sugar"],
    description:
      "Sweet, deeply coloured carrots dried and milled to a fine powder that lifts bakery mixes, soups and drinks with natural sweetness.",
    benefits: [
      "Natural sweetness without added sugar",
      "Warm orange tone for bakery",
      "Consistent supply through the year",
      "Easy portion control",
    ],
    ingredients: "100% dehydrated organic carrot.",
    usage: ["Add to cake and muffin batters.", "Stir into soups and purées.", "Blend into juices."],
    nutrition: nutritionCommon,
    storage: "Keep sealed in a cool, dry place.",
  },
  {
    slug: "organic-turmeric-powder",
    name: "Organic Turmeric Powder",
    marathiName: "हळद पावडर (Halad Powder)",
    short: "Premium-quality turmeric with natural golden colour and strong aroma.",
    image: turmeric,
    category: "spice",
    basePrice: 179,
    baseMrp: 229,
    rating: 4.9,
    reviews: 302,
    bestSeller: true,
    inStock: true,
    sku: "UO-TRP-100",
    highlights: ["Premium quality turmeric", "Natural golden colour", "Strong aroma", "Lab checked"],
    description:
      "Sun-matured turmeric fingers, cleaned, polished and stone-ground into a golden powder with a warm, earthy aroma and no added colour.",
    benefits: [
      "Rich golden colour in everyday cooking",
      "Warm aroma that holds through cooking",
      "No artificial colour or fillers",
      "Everyday kitchen staple",
    ],
    ingredients: "100% organic turmeric.",
    usage: ["1/2 tsp per dish of curry or dal.", "Add to warm milk.", "Use in marinades for colour."],
    nutrition: nutritionCommon,
    storage: "Cool, dry cabinet. Reseal after use.",
  },
  {
    slug: "organic-chilli-powder",
    name: "Organic Chilli Powder",
    marathiName: "लाल मिरची पावडर (Chilli Powder)",
    short: "Natural dried red chilli with authentic flavour and spice-level options.",
    image: chilli,
    category: "spice",
    basePrice: 199,
    baseMrp: 259,
    rating: 4.7,
    reviews: 147,
    inStock: true,
    sku: "UO-CHP-100",
    highlights: ["Natural dried red chilli", "Authentic flavour", "Multiple spice-level options", "No artificial colour"],
    description:
      "Sun-dried red chillies, destemmed and ground fresh. Available in mild, medium and hot profiles so kitchens can dial in exactly the heat they need.",
    benefits: [
      "Choose the heat level you cook with",
      "Bright natural red without dyes",
      "Even grind for consistent heat",
      "Great for masalas and rubs",
    ],
    ingredients: "100% dried organic red chilli.",
    usage: ["Start with 1/4 tsp and adjust.", "Bloom in hot oil for colour.", "Blend into dry rubs."],
    nutrition: nutritionCommon,
    storage: "Sealed, dry and away from sunlight.",
  },
  {
    slug: "organic-coriander-powder",
    name: "Organic Coriander Powder",
    marathiName: "धना पावडर (Dhana Powder)",
    short: "Fresh natural aroma, finely ground, for household and commercial use.",
    image: coriander,
    category: "spice",
    basePrice: 169,
    baseMrp: 219,
    rating: 4.6,
    reviews: 118,
    inStock: true,
    sku: "UO-CDP-100",
    highlights: ["Fresh natural aroma", "Finely ground", "Household and commercial use", "Single origin seeds"],
    description:
      "Whole coriander seeds cleaned and ground in small batches so the citrusy, fresh aroma reaches your kitchen intact.",
    benefits: [
      "Fresh-ground aroma in every pack",
      "Balances heat in masala blends",
      "Fine grind dissolves into gravies",
      "Suitable for large-batch cooking",
    ],
    ingredients: "100% ground organic coriander seed.",
    usage: ["1-2 tsp per gravy dish.", "Roast lightly before use for depth.", "Pairs with turmeric and chilli."],
    nutrition: nutritionCommon,
    storage: "Airtight jar, cool and dry.",
  },
];

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function priceFor(product: Product, weight: Weight) {
  const m = WEIGHT_MULTIPLIER[weight];
  return {
    price: Math.round((product.basePrice * m) / 5) * 5,
    mrp: Math.round((product.baseMrp * m) / 5) * 5,
  };
}

export function inr(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}

export const RECIPES = [
  { slug: "moringa-lemon-tea-infusion", title: "Moringa Lemon Detox Tea", time: "3 min", level: "Easy", uses: ["Moringa Lemon Tea"] },
  { slug: "moringa-soup-bowl", title: "3-Min Moringa Immunity Soup", time: "3 min", level: "Easy", uses: ["Moringa Soup Mix"] },
  { slug: "moringa-masala-noodles-bowl", title: "Moringa Veggie Masala Noodles", time: "5 min", level: "Easy", uses: ["Moringa Masala Noodles"] },
  { slug: "onion-powder-masala-fries", title: "Onion Powder Masala Fries", time: "20 min", level: "Easy", uses: ["Onion Powder", "Chilli Powder"] },
  { slug: "garlic-herb-pasta", title: "Garlic Herb Pasta", time: "25 min", level: "Easy", uses: ["Garlic Powder"] },
  { slug: "classic-tomato-soup", title: "Tomato Soup", time: "30 min", level: "Easy", uses: ["Tomato Powder", "Garlic Powder"] },
];

export const BLOG_POSTS = [
  {
    slug: "7-ways-to-use-onion-powder",
    title: "7 Ways to Use Onion Powder in Everyday Cooking",
    excerpt: "From marinades to instant gravies, simple swaps that save prep time without losing flavour.",
    date: "12 Aug 2026",
    read: "6 min read",
    body: [
      "Onion powder is the quietest time-saver in a working kitchen. One teaspoon stands in for a medium onion, and it dissolves into whatever you are cooking without the ten minutes of peeling, chopping and crying.",
      "Start with marinades. Mixed into curd or oil, the powder coats meat and vegetables evenly, something chopped onion can never do. Next, dry rubs: onion powder carries savoury depth into anything grilled or roasted.",
      "It also rescues instant gravies. Bloom the powder in hot oil with turmeric and chilli, add tomato powder and water, and you have a base in under five minutes. Dust it over fries, fold it into batters, whisk it into dressings, or stir it into soups at the end for a fresh savoury lift.",
    ],
  },
  {
    slug: "why-moringa-is-the-ultimate-superfood",
    title: "Why Moringa (Shevga) is the Ultimate Daily Superfood",
    excerpt: "Insights from Nutritionist Dr. Padmashree Chorge on incorporating Moringa Lemon Tea & Soup into daily family diets.",
    date: "10 Aug 2026",
    read: "5 min read",
    body: [
      "Moringa oleifera (known as Shevga in Marathi) has been prized in Indian Ayurvedic tradition for centuries. Packed with 92 nutrients, 46 antioxidants, and all 9 essential amino acids, drumstick leaf powder is nature's daily vitamin.",
      "Dr. Padmashree Prafulla Chorge (Nutrition Expert) highlights: 'By gently dehydrating fresh Moringa leaves at low temperatures, we preserve fragile Vitamin C and Chlorophyll. Combining Moringa with natural lemon creates a delicious, refreshing tea that boosts iron absorption.'",
      "From morning Moringa Lemon Tea to 3-minute evening Moringa Soup and child-friendly Moringa Masala Noodles, Utkarsh Organic Farm makes clean nutrition effortless for every Indian home.",
    ],
  },
];
