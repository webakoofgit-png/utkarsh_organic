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
  contactPerson: "Praful Chorge (प्रफुल्ल चोरगे)",
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
  marathiDescription: "आधुनिक काळाची नवी गरज – उत्कर्ष फार्म उत्पादने! 🥕✨ भाज्यांची चव आणि पोषणमूल्ये टिकवून ठेवणारी आमची विशेष Dehydrated Vegetables & Powders आता उपलब्ध. १००% नॅचरल, कोणतीही प्रिझर्व्हेटिव्ह्ज नसलेली शुद्ध उत्पादने!",
};

export type Weight = "100g" | "250g" | "500g" | "1kg";

export const WEIGHTS: Weight[] = ["100g", "250g", "500g", "1kg"];

export const WEIGHT_MULTIPLIER: Record<Weight, number> = {
  "100g": 1,
  "250g": 2.2,
  "500g": 4,
  "1kg": 7.4,
};

export type Category = "vegetable" | "spice" | "wellness" | "bulk";

export const CATEGORIES: { id: Category; name: string; blurb: string }[] = [
  { id: "vegetable", name: "Vegetable Powders", blurb: "Onion, Tomato, Beetroot, Spinach, Carrot, Moringa" },
  { id: "spice", name: "Spice Powders", blurb: "Turmeric, Chilli, Coriander, Garlic" },
  { id: "wellness", name: "Wellness Powders", blurb: "Ginger, Moringa / Shevga Leaf Powder" },
  { id: "bulk", name: "Bulk / Commercial Packs", blurb: "Hotels, cloud kitchens and food processors" },
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
    slug: "organic-moringa-leaf-powder",
    name: "Organic Moringa / Shevga Leaf Powder",
    marathiName: "शेवगा पाला पावडर (Shevga Pala Powder)",
    short: "Nutrient-dense drumstick leaf powder for immunity, smoothies & daily meals.",
    image: spinach,
    category: "wellness",
    basePrice: 269,
    baseMrp: 349,
    rating: 4.9,
    reviews: 94,
    newArrival: true,
    bestSeller: true,
    inStock: true,
    sku: "UO-MGP-100",
    highlights: ["100% Pure Shevga / Drumstick Leaves", "Rich in Iron & Calcium", "Superfood Herbal Supplement", "Zero Additives"],
    description:
      "Handpicked organic Moringa (Shevga) leaves harvested from our Satara farms, shadow-dried at low temperatures to lock in chlorophyll, antioxidants, and essential vitamins. A powerful daily green supplement for rotis, dal, teas, and smoothies.",
    benefits: [
      "Natural immunity booster packed with Vitamin C, Iron & Calcium",
      "Easily mixes into roti dough, soup, or morning warm water",
      "100% pure shade-dried leaf powder with vibrant green tone",
      "Zero preservatives or artificial fillers",
    ],
    ingredients: "100% organic dehydrated Moringa (Shevga) leaves.",
    usage: ["Add 1 tsp to wheat flour for nutritious green rotis.", "Stir into warm water or buttermilk.", "Whisk into dals and curries."],
    nutrition: [
      { label: "Energy", value: "320 kcal / 100g" },
      { label: "Protein", value: "27 g" },
      { label: "Iron", value: "28 mg" },
      { label: "Calcium", value: "2000 mg" },
      { label: "Vitamin C", value: "17.3 mg" },
    ],
    storage: "Store in a dark, dry container to protect vitamins.",
  },
  {
    slug: "organic-tomato-powder",
    name: "Organic Tomato Powder",
    marathiName: "टोमॅटो पावडर (Tomato Powder)",
    short: "Natural tomato concentrate with rich colour and taste.",
    image: tomato,
    category: "vegetable",
    basePrice: 229,
    baseMrp: 289,
    rating: 4.7,
    reviews: 96,
    inStock: true,
    sku: "UO-TMP-100",
    highlights: ["Natural tomato concentrate", "Rich colour and taste", "For sauces, soups and snacks", "No colouring agents"],
    description:
      "Ripe tomatoes dried at controlled temperatures and ground into a deep red powder that rebuilds into purée with a splash of water. A clean shortcut for sauces, soups and seasoning blends.",
    benefits: [
      "Deep natural colour without additives",
      "Reconstitutes into purée in seconds",
      "Great dry seasoning for snacks",
      "Reduces cold-storage dependence",
    ],
    ingredients: "100% dehydrated organic tomato.",
    usage: ["Mix 1 part powder with 4 parts warm water for purée.", "Dust over fries and popcorn.", "Add directly to soups and gravies."],
    nutrition: nutritionCommon,
    storage: "Hygroscopic. Keep tightly sealed in a dry place.",
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
  { slug: "onion-powder-masala-fries", title: "Onion Powder Masala Fries", time: "20 min", level: "Easy", uses: ["Onion Powder", "Chilli Powder"] },
  { slug: "garlic-herb-pasta", title: "Garlic Herb Pasta", time: "25 min", level: "Easy", uses: ["Garlic Powder"] },
  { slug: "classic-tomato-soup", title: "Tomato Soup", time: "30 min", level: "Easy", uses: ["Tomato Powder", "Garlic Powder"] },
  { slug: "beetroot-smoothie", title: "Beetroot Smoothie", time: "10 min", level: "Easy", uses: ["Beetroot Powder"] },
  { slug: "moringa-green-roti", title: "Shevga Leaf Health Roti", time: "15 min", level: "Easy", uses: ["Shevga / Moringa Powder"] },
  { slug: "turmeric-milk", title: "Turmeric Milk", time: "10 min", level: "Easy", uses: ["Turmeric Powder", "Ginger Powder"] },
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
    slug: "onion-powder-vs-fresh-onion",
    title: "Onion Powder vs Fresh Onion",
    excerpt: "What changes, what stays the same, and when each one is the right choice.",
    date: "02 Aug 2026",
    read: "5 min read",
    body: [
      "Fresh onion brings moisture, texture and sweetness that develops slowly as it caramelises. Onion powder brings concentrated aroma with none of the water. Neither replaces the other everywhere.",
      "Use fresh when the onion is a texture in the dish: birista, salads, stir fries. Use powder when the onion is a flavour: marinades, batters, sauces, dry blends and high-volume kitchens where consistency matters more than knife work.",
      "As a rule of thumb, one teaspoon of powder is roughly one medium onion by flavour. Add it earlier than you would fresh onion so it has time to open up.",
    ],
  },
  {
    slug: "how-dehydrated-vegetable-powders-are-made",
    title: "How Dehydrated Vegetable Powders Are Made",
    excerpt: "A walk through sorting, washing, slicing, drying, milling and packing.",
    date: "24 Jul 2026",
    read: "7 min read",
    body: [
      "It begins at our Wai (Satara) farms. Produce is harvested at maturity, then sorted by hand so only sound, undamaged pieces move forward.",
      "Washing removes field soil. Slicing follows, because uniform thickness is what makes drying even. The dryers run at controlled temperatures so colour and aroma survive the process instead of being cooked away.",
      "Dried flakes are milled to the requested mesh, checked for moisture and packed in a controlled area. Each batch is sampled before it leaves.",
    ],
  },
  {
    slug: "benefits-of-vegetable-powders-in-your-kitchen",
    title: "Benefits of Keeping Vegetable Powders in Your Kitchen",
    excerpt: "Shelf life, portion control and consistency, explained simply.",
    date: "15 Jul 2026",
    read: "4 min read",
    body: [
      "A shelf of powders takes up less space than a crate of vegetables and does not spoil in a week.",
      "For home cooks, that means fewer wasted vegetables. For commercial kitchens, it means the dish tastes the same on a Tuesday afternoon as it does on a Saturday night.",
      "Powders also make portioning simple, which is where most food cost control actually happens.",
    ],
  },
];
