import redOnionPowderPouch from "@/assets/product-red-onion-powder-pouch.png";
import moringaPowderPouch from "@/assets/product-moringa-powder.png";
import beetrootPowderPouch from "@/assets/product-beetroot-powder.png";
import whiteOnionPowderPouch from "@/assets/product-white-onion-powder-pouch.png";
import mixVegetablesPowderPouch from "@/assets/product-mix-vegetables-powder.png";
import redOnionFlakesPouch from "@/assets/product-red-onion-flakes.png";
import amlaPowderPouch from "@/assets/product-amla-powder.png";
import garlicPowderPouch from "@/assets/product-garlic-powder.png";
import gingerPowderPouch from "@/assets/product-ginger-powder.png";
import turmericPowderPouch from "@/assets/product-turmeric-powder.png";
import corianderPowderPouch from "@/assets/product-coriander-powder.png";
import whiteOnionFlakesPouch from "@/assets/product-white-onion-flakes.png";
import garlicFlakesPouch from "@/assets/product-garlic-flakes.png";
import okraFlakesPouch from "@/assets/product-okra-flakes.png";
import carrotFlakesPouch from "@/assets/product-carrot-flakes.png";
import spinachLeavesPouch from "@/assets/product-spinach-leaves.png";
import lemonSlicesPouch from "@/assets/product-lemon-slices.png";
import clusterBeansPouch from "@/assets/product-cluster-beans.png";
import moringaSticksPouch from "@/assets/product-moringa-sticks.png";
import curryLeafPowderPouch from "@/assets/product-curry-leaf-powder.png";
import tomatoFlakesPouch from "@/assets/product-tomato-flakes.png";
import sweetCornPouch from "@/assets/product-sweet-corn.png";
import spinachPowderPouch from "@/assets/product-spinach-powder.png";
import carrotPowderPouch from "@/assets/product-carrot-powder.png";

export const COMPANY_INFO = {
  name: "UTKARSH ORGANIC FARM",
  tradeName: "Utkarsh Organic Farm",
  legalName: "Utkarsh Organic Farm",
  founders: [{ name: "Mr. Prafull Chorage", role: "Founder and Mentor" }],
  contactPerson: "Prafull Chorage",
  yearEstablished: "2026",
  natureOfBusiness: "Manufacturer & Supplier",
  employees: "15 People",
  marketCovered: "Pan India",
  gstin: "27CKXPB5409F1ZZ",
  fssaiRegNo: "21526039003217",
  udyamRegNo: "UDYAM-MH-30-0197446",
  address: {
    doorNo: "D-31",
    locality: "Near By Atharva Foundry, MIDC",
    taluka: "Satara",
    city: "Satara",
    district: "Satara",
    state: "Maharashtra",
    pincode: "412803",
    full: "D-31 Near By Atharva Foundry, MIDC, Satara, Maharashtra, India - 412803",
  },
  phonePrimary: "+91 7507379018",
  phoneSecondary: "",
  whatsappNumber: "917507379018",
  email: "PrafullChorage143@gmail.com",
  officialEmail: "",
  website: "https://www.utkarshorgfarm.in/",
  marathiHeader: "उत्कर्ष फार्म – शेतापासून थेट तुमच्या स्वयंपाकघरापर्यंत!",
  marathiSlogan: "आधुनिक काळाची नवी गरज – उत्कर्ष फार्म उत्पादने!",
  marathiDescription:
    "भाज्यांची चव आणि पोषणमूल्ये टिकवून ठेवणारी आमची विशेष Dehydrated Vegetables & Powders आता उपलब्ध. १००% नॅचरल, कोणतीही प्रिझर्व्हेटिव्ह्ज नसलेली शुद्ध उत्पादने!",
};

export const MARATHI_PROMO = {
  heroTitle: "शेतापासून थेट तुमच्या स्वयंपाकघरापर्यंत!",
  farmTitle: "खेळते आणि ताजे शेत",
  farmText: "विषमुक्त आणि नैसर्गिक पद्धतीने पिकवलेल्या ताज्या भाज्या.",
  processingTitle: "अद्ययावत प्रक्रिया",
  processingText:
    "आधुनिक तंत्रज्ञानाने पूर्णपणे डीहायड्रेटेड आणि हायजीनिक पद्धतीने केलेली प्रक्रिया.",
  productsTitle: "डीहायड्रेटेड उत्पादने आणि पावडर",
  productsText:
    "प्रदीर्घ काळ टिकणाऱ्या दर्जेदार वाळवलेल्या भाज्या आणि आरोग्यासाठी फायदेशीर शुद्ध व्हेजिटेबल पावडर्स.",
  examples: "पालक, बीट, कांदा, शेवगा आणि पाला, लसूण, आले, गाजर पावडर.",
  campaignTitle: "आधुनिक काळाची नवी गरज – उत्कर्ष फार्म उत्पादने!",
  campaignText:
    "भाज्यांची चव आणि पोषणमूल्ये टिकवून ठेवणारी आमची विशेष Dehydrated Vegetables & Powders आता उपलब्ध.",
  naturalText: "१००% नॅचरल, कोणतीही प्रिझर्व्हेटिव्ह्ज नसलेली शुद्ध उत्पादने!",
  contactLine: "संपर्क ७५०७३७९०१८ प्रफुल्ल चोरगे",
};

export type Weight = "1kg" | "5kg" | "25kg" | "100kg";

export const WEIGHTS: Weight[] = ["1kg", "5kg", "25kg", "100kg"];

export const WEIGHT_MULTIPLIER: Record<Weight, number> = {
  "1kg": 1,
  "5kg": 5,
  "25kg": 25,
  "100kg": 100,
};

export type Category =
  "dehydrated-flakes" | "dehydrated-powders" | "organic-powders" | "spices" | "dried-specialty";

export const CATEGORIES: { id: Category; name: string; blurb: string }[] = [
  {
    id: "dehydrated-flakes",
    name: "Dehydrated Vegetables & Flakes",
    blurb: "Okra, onion, garlic, carrot, spinach, cluster beans, lemon and moringa sticks",
  },
  {
    id: "dehydrated-powders",
    name: "Dehydrated Vegetable Powders",
    blurb: "White onion, red onion, mix vegetables, spinach, carrot and curry leaf powders",
  },
  {
    id: "organic-powders",
    name: "Organic & Ayurvedic Powders",
    blurb: "Amla, beetroot, garlic, ginger and ayurvedic moringa leaf powder",
  },
  {
    id: "spices",
    name: "Spice Powders",
    blurb: "Turmeric powder and coriander powder for household and commercial kitchens",
  },
  {
    id: "dried-specialty",
    name: "Dried Specialty Ingredients",
    blurb: "Dried tomato flakes and dried sweet corn for food processors and HoReCa buyers",
  },
];

export type ProductSpec = { label: string; value: string };

export type Product = {
  slug: string;
  name: string;
  short: string;
  image: string;
  category: Category;
  basePrice: number;
  baseMrp: number;
  priceLabel: string;
  moq: string;
  rating: number;
  reviews: number;
  bestSeller?: boolean;
  newArrival?: boolean;
  inStock: boolean;
  sku: string;
  sourceUrl: string;
  highlights: string[];
  description: string;
  benefits: string[];
  ingredients: string;
  usage: string[];
  specs: ProductSpec[];
  storage: string;
  gallery?: string[];
};

const SITE = "https://www.utkarshorgfarm.in";
const MOQ = "100 Kilogram (MOQ)";

const IMAGES = {
  okraFlakes: okraFlakesPouch,
  redOnionFlakes: redOnionFlakesPouch,
  whiteOnionFlakes: whiteOnionFlakesPouch,
  garlicFlakes: garlicFlakesPouch,
  carrotFlakes: carrotFlakesPouch,
  whiteOnionPowder: whiteOnionPowderPouch,
  redOnionPowder: redOnionPowderPouch,
  mixVegetablesPowder: mixVegetablesPowderPouch,
  spinachPowder: spinachPowderPouch,
  carrotPowder: carrotPowderPouch,
  curryLeafPowder: curryLeafPowderPouch,
  clusterBeans: clusterBeansPouch,
  lemonSlices: lemonSlicesPouch,
  moringaSticks: moringaSticksPouch,
  spinachLeaves: spinachLeavesPouch,
  amlaPowder: amlaPowderPouch,
  beetrootPowder: beetrootPowderPouch,
  organicGarlicPowder: garlicPowderPouch,
  organicGingerPowder: gingerPowderPouch,
  tomatoFlakes: tomatoFlakesPouch,
  sweetCorn: sweetCornPouch,
  turmericPowder: turmericPowderPouch,
  corianderPowder: corianderPowderPouch,
  moringaLeafPowder: moringaPowderPouch,
};

function productUrl(slug: string) {
  return `${SITE}/${slug}.htm`;
}

function quote(price: number, highPrice = price) {
  const label =
    highPrice === price ? `${inr(price)} / kg` : `${inr(price)} - ${inr(highPrice)} / kg`;
  return { basePrice: price, baseMrp: highPrice, priceLabel: label };
}

function product(
  data: Omit<Product, "inStock" | "moq" | "sourceUrl"> & {
    sourceSlug: string;
    moq?: string;
  },
): Product {
  const { sourceSlug, moq = MOQ, ...rest } = data;
  return {
    ...rest,
    moq,
    sourceUrl: productUrl(sourceSlug),
    inStock: true,
  };
}

const commonStorage =
  "Store in a cool, dry and airtight container away from moisture and direct sunlight.";

export const PRODUCTS: Product[] = [
  product({
    slug: "dehydrated-white-onion-powder",
    sourceSlug: "dehydrated-white-onion-powder",
    name: "Dehydrated White Onion Powder",
    short: "Fine mesh powder made from fresh white onions, with sharp natural onion aroma.",
    image: IMAGES.whiteOnionPowder,
    category: "dehydrated-powders",
    ...quote(295),
    rating: 4.9,
    reviews: 214,
    bestSeller: true,
    sku: "UOF-DWOP-001",
    highlights: [
      "Fine powder",
      "White to off-white color",
      "Fresh sharp onion aroma",
      "Below 6-8% moisture",
    ],
    description:
      "Official Utkarsh Organic Farm product made from fresh white onions that are washed, peeled, dehydrated and finely ground. It is suited for seasoning blends, gravies, sauces and commercial food processing.",
    benefits: [
      "Saves peeling and chopping time in bulk kitchens",
      "Fine mesh format blends quickly into sauces and masala mixes",
      "Consistent onion flavor across production batches",
      "Shelf-stable ingredient for HoReCa and food manufacturers",
    ],
    ingredients: "Fresh white onions.",
    usage: [
      "Use in gravies, spice blends, sauces and ready-to-cook mixes.",
      "Specify mesh size when ordering for industrial batches.",
    ],
    specs: [
      { label: "Business Type", value: "Manufacturer, Supplier" },
      { label: "Form", value: "Fine Powder" },
      { label: "Botanical Name", value: "Allium Cepa" },
      { label: "Processing", value: "Washed, peeled, dehydrated and finely ground" },
      { label: "Moisture", value: "Below 6-8%" },
      { label: "Shelf Life", value: "Up to 18-24 months" },
    ],
    storage: commonStorage,
  }),
  product({
    slug: "dehydrated-red-onion-powder",
    sourceSlug: "dehydrated-red-onion-powder",
    name: "Dehydrated Red Onion Powder",
    short: "Fine red onion powder with sweet, pungent flavor and natural onion aroma.",
    image: IMAGES.redOnionPowder,
    category: "dehydrated-powders",
    ...quote(295),
    rating: 4.8,
    reviews: 176,
    bestSeller: true,
    sku: "UOF-DROP-002",
    highlights: [
      "Fine powder",
      "Pinkish red to light purple",
      "Strong sweet onion flavor",
      "Custom fine mesh",
    ],
    description:
      "Prepared from fresh red onions, this dehydrated powder delivers a strong sweet and pungent onion profile for dry seasoning, marinades, curry bases and packaged foods.",
    benefits: [
      "Adds red onion flavor without fresh produce wastage",
      "Useful for dry mixes, rubs and spice blends",
      "Fine mesh particle size can be ordered as required",
      "Long shelf life under proper storage conditions",
    ],
    ingredients: "Fresh red onions.",
    usage: [
      "Blend into dry seasoning or instant gravy bases.",
      "Add gradually to balance sweetness and pungency.",
    ],
    specs: [
      { label: "Business Type", value: "Manufacturer, Supplier" },
      { label: "Form", value: "Fine Powder" },
      { label: "Botanical Name", value: "Allium Cepa" },
      { label: "Processing", value: "Washed, peeled, dehydrated and finely ground" },
      { label: "Moisture", value: "Below 6-8%" },
      { label: "Country of Origin", value: "India" },
    ],
    storage: commonStorage,
  }),
  product({
    slug: "mix-vegetables-powder",
    sourceSlug: "mix-vegetables-powder",
    name: "Mix Vegetables Powder",
    short:
      "A naturally dehydrated mixed vegetable powder for soups, gravies, sauces and nutrition-rich food blends.",
    image: IMAGES.mixVegetablesPowder,
    category: "dehydrated-powders",
    ...quote(650),
    rating: 4.8,
    reviews: 74,
    newArrival: true,
    sku: "UOF-MVP-024",
    highlights: [
      "Mixed vegetable blend",
      "Naturally dehydrated",
      "No preservatives",
      "Rich in nutrients",
    ],
    description:
      "A farm-fresh mix vegetables powder prepared from dehydrated vegetables and ground into a convenient fine powder. It is designed for quick vegetable flavor, natural color and nutrition support in everyday cooking, commercial kitchens and packaged food applications.",
    benefits: [
      "Adds mixed vegetable taste without chopping fresh produce",
      "Convenient for soups, gravies, sauces and instant mixes",
      "Helps reduce prep time and seasonal vegetable wastage",
      "Shelf-stable powder format for home and bulk buyers",
    ],
    ingredients:
      "Dehydrated mixed vegetables such as carrot, spinach, tomato, onion, garlic and green vegetables.",
    usage: [
      "Blend into soups, gravies, sauces, khichdi, paratha dough or seasoning bases.",
      "Start with a small spoonful and adjust based on color, thickness and vegetable flavor.",
    ],
    specs: [
      { label: "Business Type", value: "Manufacturer, Supplier" },
      { label: "Form", value: "Fine Powder" },
      { label: "Product Type", value: "Mixed vegetable powder" },
      { label: "Processing", value: "Washed, dehydrated and finely ground" },
      { label: "Pack Size", value: "100g retail pack shown; bulk packs available on request" },
      { label: "Country of Origin", value: "India" },
    ],
    storage: commonStorage,
  }),
  product({
    slug: "dehydrated-red-onion-flakes",
    sourceSlug: "dehydrated-red-onion-flakes",
    name: "Dehydrated Red Onion Flakes",
    short: "Pinkish red to light purple onion flakes with strong natural onion flavor.",
    image: IMAGES.redOnionFlakes,
    category: "dehydrated-flakes",
    ...quote(460),
    rating: 4.8,
    reviews: 152,
    bestSeller: true,
    sku: "UOF-DROF-003",
    highlights: [
      "Flakes form",
      "Fresh natural onion aroma",
      "Below 6-8% moisture",
      "18-24 month shelf life",
    ],
    description:
      "Fresh red onions are washed, peeled, sliced and dehydrated into flakes for manufacturers, food-service buyers and spice processors.",
    benefits: [
      "Rehydrates well for cooked preparations",
      "Reduces peeling and slicing labor",
      "Convenient for soups, noodles, masala mixes and toppings",
      "Stable ingredient for bulk storage",
    ],
    ingredients: "Fresh red onions.",
    usage: [
      "Use directly in soups, mixes and cooked gravies.",
      "Soak briefly in warm water when a softer texture is needed.",
    ],
    specs: [
      { label: "Form", value: "Flakes" },
      { label: "Color", value: "Pinkish red to light purple" },
      { label: "Botanical Name", value: "Allium Cepa" },
      { label: "Taste", value: "Strong, pungent and sweet onion flavor" },
      { label: "Moisture", value: "Below 6-8%" },
      { label: "Shelf Life", value: "Up to 18-24 months" },
    ],
    storage: commonStorage,
  }),
  product({
    slug: "dehydrated-white-onion-flakes",
    sourceSlug: "dehydrated-white-onion-flakes",
    name: "Dehydrated White Onion Flakes",
    short: "White to off-white onion flakes with fresh, sharp onion aroma.",
    image: IMAGES.whiteOnionFlakes,
    category: "dehydrated-flakes",
    ...quote(460),
    rating: 4.7,
    reviews: 128,
    sku: "UOF-DWOF-004",
    highlights: [
      "White to off-white",
      "Flakes form",
      "Sharp onion aroma",
      "Fresh white onion raw material",
    ],
    description:
      "Made from fresh white onions that are sliced and dehydrated for food manufacturers, restaurant kitchens and packaged food brands.",
    benefits: [
      "Clean white onion profile for lighter recipes",
      "Easy to dose in commercial production",
      "Avoids fresh onion spoilage and prep waste",
      "Useful for soup mixes, snack seasonings and gravies",
    ],
    ingredients: "Fresh white onions.",
    usage: [
      "Use in dry soup mixes, sauces, instant meals and savory snack blends.",
      "Rehydrate before using as a visible onion inclusion.",
    ],
    specs: [
      { label: "Form", value: "Flakes" },
      { label: "Color", value: "White to off-white" },
      { label: "Botanical Name", value: "Allium Cepa" },
      { label: "Processing", value: "Washed, peeled, sliced and dehydrated" },
      { label: "Moisture", value: "Below 6-8%" },
      { label: "Country of Origin", value: "India" },
    ],
    storage: commonStorage,
  }),
  product({
    slug: "dehydrated-garlic-flakes",
    sourceSlug: "dehydrated-garlic-flakes",
    name: "Dehydrated Garlic Flakes",
    short: "Brown garlic flakes with rich natural garlic aroma and strong pungent flavor.",
    image: IMAGES.garlicFlakes,
    category: "dehydrated-flakes",
    ...quote(570),
    rating: 4.8,
    reviews: 141,
    sku: "UOF-DGF-005",
    highlights: [
      "Flakes form",
      "Rich natural garlic aroma",
      "Allium Sativum",
      "Graded after dehydration",
    ],
    description:
      "Fresh garlic bulbs are peeled, sliced, dehydrated and graded to create pungent flakes for spice processors and food-service buyers.",
    benefits: [
      "Strong garlic profile without peeling fresh cloves",
      "Visible garlic inclusion for dry mixes and toppings",
      "Bulk-friendly shelf life",
      "Useful in seasonings, sauces and ready meals",
    ],
    ingredients: "Fresh garlic bulbs.",
    usage: [
      "Use in seasoning blends, sauces and processed foods.",
      "Rehydrate before adding where soft garlic texture is required.",
    ],
    specs: [
      { label: "Color", value: "Brown" },
      { label: "Form", value: "Flakes" },
      { label: "Botanical Name", value: "Allium Sativum" },
      { label: "Processing", value: "Peeled, sliced, dehydrated and graded" },
      { label: "Moisture", value: "Below 6-8%" },
      { label: "Shelf Life", value: "Up to 18-24 months" },
    ],
    storage: commonStorage,
  }),
  product({
    slug: "dehydrated-okra-flakes",
    sourceSlug: "dehydrated-okra-flakes",
    name: "Dehydrated Okra Flakes",
    short: "Light green to green okra flakes made from fresh lady finger.",
    image: IMAGES.okraFlakes,
    category: "dehydrated-flakes",
    ...quote(800),
    rating: 4.6,
    reviews: 96,
    newArrival: true,
    sku: "UOF-DOF-006",
    highlights: [
      "Light green to green",
      "Mild natural taste",
      "Fresh okra aroma",
      "Below 6-8% moisture",
    ],
    description:
      "Fresh okra is washed, sliced and dehydrated into mild vegetal flakes for ready meals, soups and food-service preparations.",
    benefits: [
      "Reduces chopping and trimming time",
      "Shelf-stable lady finger format for seasonal planning",
      "Works in soups, curries and instant meal mixes",
      "Convenient for bulk buyers with limited cold storage",
    ],
    ingredients: "Fresh okra (lady finger).",
    usage: [
      "Add directly to boiling gravies or soups.",
      "Hydrate before frying-style preparations.",
    ],
    specs: [
      { label: "Form", value: "Flakes" },
      { label: "Color", value: "Light green to green" },
      { label: "Botanical Name", value: "Abelmoschus Esculentus" },
      { label: "Processing", value: "Washed, sliced and dehydrated" },
      { label: "Moisture", value: "Below 6-8%" },
      { label: "Country of Origin", value: "India" },
    ],
    storage: commonStorage,
  }),
  product({
    slug: "dehydrated-carrot-flakes",
    sourceSlug: "dehydrated-carrot-flakes",
    name: "Dehydrated Carrot Flakes",
    short: "Bright orange carrot flakes with naturally sweet and mild taste.",
    image: IMAGES.carrotFlakes,
    category: "dehydrated-flakes",
    ...quote(1200),
    rating: 4.7,
    reviews: 108,
    sku: "UOF-DCF-007",
    highlights: ["Bright orange", "Naturally sweet", "Daucus Carota", "Sliced and dehydrated"],
    description:
      "Fresh carrots are washed, peeled, sliced and dehydrated into vibrant flakes for soups, sauces, bakery, snacks and ready meals.",
    benefits: [
      "Adds natural carrot color and sweetness",
      "Quickly rehydrates in cooked applications",
      "Avoids trimming and peeling waste",
      "Ideal for soup and instant meal manufacturers",
    ],
    ingredients: "Fresh carrots.",
    usage: [
      "Use in soups, pulao, dry mixes and instant meals.",
      "Rehydrate in warm water for visible carrot inclusions.",
    ],
    specs: [
      { label: "Form", value: "Flakes" },
      { label: "Color", value: "Bright orange to deep orange" },
      { label: "Botanical Name", value: "Daucus Carota" },
      { label: "Processing", value: "Washed, peeled, sliced and dehydrated" },
      { label: "Taste", value: "Naturally sweet and mild" },
      { label: "Shelf Life", value: "Up to 18-24 months" },
    ],
    storage: commonStorage,
  }),
  product({
    slug: "dehydrated-spinach-leaves",
    sourceSlug: "dehydrated-spinach-leaves",
    name: "Dehydrated Spinach Leaves",
    short: "Whole or crushed spinach leaves with mild earthy flavor.",
    image: IMAGES.spinachLeaves,
    category: "dehydrated-flakes",
    ...quote(1300),
    rating: 4.6,
    reviews: 83,
    sku: "UOF-DSL-008",
    highlights: [
      "Whole or crushed leaves",
      "Natural green to dark green",
      "Mild earthy flavor",
      "Blanched and dehydrated",
    ],
    description:
      "Spinach leaves are washed, blanched and dehydrated for buyers who need shelf-stable leafy inclusions in food applications.",
    benefits: [
      "Visible leafy format for soups and ready meals",
      "Preserves natural green color under proper storage",
      "No cold-chain storage required",
      "Easy to crush or blend into application-specific mixes",
    ],
    ingredients: "Fresh spinach leaves.",
    usage: [
      "Add to soups, noodles, pulao and vegetable mixes.",
      "Crush into smaller pieces when needed for seasoning blends.",
    ],
    specs: [
      { label: "Form", value: "Whole or crushed leaves" },
      { label: "Color", value: "Natural green to dark green" },
      { label: "Botanical Name", value: "Spinacia Oleracea" },
      { label: "Processing", value: "Washed, blanched and dehydrated" },
      { label: "Moisture", value: "Below 6-8%" },
      { label: "Shelf Life", value: "Up to 18-24 months" },
    ],
    storage: commonStorage,
  }),
  product({
    slug: "dehydrated-cluster-beans",
    sourceSlug: "dehydrated-cluster-beans",
    name: "Dehydrated Cluster Beans",
    short: "Cut green cluster beans with mild, slightly bitter natural taste.",
    image: IMAGES.clusterBeans,
    category: "dehydrated-flakes",
    ...quote(651),
    rating: 4.5,
    reviews: 74,
    sku: "UOF-DCB-009",
    highlights: [
      "Cut pieces",
      "Natural green to light green",
      "Fresh vegetable aroma",
      "Below 6-8% moisture",
    ],
    description:
      "Fresh cluster beans are washed, trimmed, cut and dehydrated to create a practical bulk ingredient for vegetable mixes and cooked foods.",
    benefits: [
      "Shelf-stable guar bean format",
      "Useful for institutional kitchens and ready meals",
      "Minimizes trimming waste",
      "Works in regional vegetable preparations",
    ],
    ingredients: "Fresh cluster beans (guar beans).",
    usage: [
      "Hydrate before cooking in sabzis.",
      "Use in vegetable mixes for soups and ready meals.",
    ],
    specs: [
      { label: "Form", value: "Cut pieces" },
      { label: "Botanical Name", value: "Cyamopsis Tetragonoloba" },
      { label: "Processing", value: "Washed, trimmed, cut and dehydrated" },
      { label: "Taste", value: "Mild, slightly bitter and natural" },
      { label: "Moisture", value: "Below 6-8%" },
      { label: "Country of Origin", value: "India" },
    ],
    storage: commonStorage,
  }),
  product({
    slug: "dehydrated-lemon-slices",
    sourceSlug: "dehydrated-lemon-slices",
    name: "Dehydrated Lemon Slices",
    short: "Light yellow to golden lemon slices with tangy natural citrus flavor.",
    image: IMAGES.lemonSlices,
    category: "dehydrated-flakes",
    ...quote(600, 900),
    rating: 4.7,
    reviews: 91,
    sku: "UOF-DLS-010",
    highlights: ["Slices form", "Tangy citrus flavor", "Citrus Limon", "12-18 month shelf life"],
    description:
      "Fresh lemons are washed, sliced and dehydrated into convenient citrus slices for beverages, teas, garnishes and food-service use.",
    benefits: [
      "Ready garnish for beverages and hospitality service",
      "No slicing waste or short fresh-lemon shelf life",
      "Natural citrus aroma and tang",
      "Easy to store for cafe and HoReCa buyers",
    ],
    ingredients: "Fresh lemons.",
    usage: [
      "Use in tea, mocktails, infused water and garnish trays.",
      "Keep sealed after opening to protect aroma.",
    ],
    specs: [
      { label: "Form", value: "Slices" },
      { label: "Color", value: "Light yellow to golden yellow" },
      { label: "Botanical Name", value: "Citrus Limon" },
      { label: "Processing", value: "Washed, sliced and dehydrated" },
      { label: "Moisture", value: "Below 6-8%" },
      { label: "Shelf Life", value: "Up to 12-18 months" },
    ],
    storage: commonStorage,
  }),
  product({
    slug: "dehydrated-moringa-sticks",
    sourceSlug: "dehydrated-moringa-sticks",
    name: "Dehydrated Moringa Sticks",
    short: "Cut moringa pod sticks with mild earthy flavor and natural aroma.",
    image: IMAGES.moringaSticks,
    category: "dehydrated-flakes",
    ...quote(300, 550),
    rating: 4.6,
    reviews: 77,
    sku: "UOF-DMS-011",
    highlights: [
      "Cut sticks",
      "Moringa Oleifera",
      "Natural green to greenish brown",
      "18-24 month shelf life",
    ],
    description:
      "Fresh moringa pods are washed, cut, dehydrated and graded into shelf-stable sticks for food-service and ingredient buyers.",
    benefits: [
      "Convenient drumstick pod format for cooked dishes",
      "Reduces seasonal procurement pressure",
      "Bulk-friendly storage",
      "Useful for soups, curries and institutional kitchens",
    ],
    ingredients: "Fresh moringa pods.",
    usage: [
      "Rehydrate before cooking in soups and curries.",
      "Use as a visible vegetable inclusion in prepared foods.",
    ],
    specs: [
      { label: "Form", value: "Cut sticks" },
      { label: "Color", value: "Natural green to greenish brown" },
      { label: "Botanical Name", value: "Moringa Oleifera" },
      { label: "Processing", value: "Washed, cut, dehydrated and graded" },
      { label: "Moisture", value: "Below 6-8%" },
      { label: "Country of Origin", value: "India" },
    ],
    storage: commonStorage,
  }),
  product({
    slug: "dehydrated-spinach-powder",
    sourceSlug: "dehydrated-spinach-powder",
    name: "Dehydrated Spinach Powder",
    short: "Fine spinach powder with natural green color and leafy aroma.",
    image: IMAGES.spinachPowder,
    category: "dehydrated-powders",
    ...quote(651),
    rating: 4.6,
    reviews: 112,
    sku: "UOF-DSP-012",
    highlights: [
      "Fine powder",
      "Natural green to dark green",
      "Spinacia Oleracea",
      "Fresh green leafy aroma",
    ],
    description:
      "Washed and blanched spinach leaves are dehydrated and finely ground into a green powder for soups, noodles, health food applications and dough mixes.",
    benefits: [
      "Adds vegetable color and leafy flavor",
      "Easy to blend into dry mixes",
      "No refrigeration required",
      "Convenient for bulk food formulation",
    ],
    ingredients: "Fresh spinach leaves.",
    usage: [
      "Blend into soups, pasta dough, roti dough and seasoning blends.",
      "Add gradually to control color intensity.",
    ],
    specs: [
      { label: "Form", value: "Fine Powder" },
      { label: "Color", value: "Natural green to dark green" },
      { label: "Botanical Name", value: "Spinacia Oleracea" },
      { label: "Processing", value: "Washed, blanched, dehydrated and finely ground" },
      { label: "Moisture", value: "Below 6-8%" },
      { label: "Shelf Life", value: "Up to 18-24 months" },
    ],
    storage: commonStorage,
  }),
  product({
    slug: "dehydrated-carrot-powder",
    sourceSlug: "dehydrated-carrot-powder",
    name: "Dehydrated Carrot Powder",
    short: "Fine bright orange carrot powder with naturally sweet mild carrot flavor.",
    image: IMAGES.carrotPowder,
    category: "dehydrated-powders",
    ...quote(1461),
    rating: 4.7,
    reviews: 95,
    sku: "UOF-DCP-013",
    highlights: ["Fine powder", "Bright orange", "Natural carrot flavor", "Daucus Carota"],
    description:
      "Fresh carrots are washed, peeled, sliced, dehydrated and finely ground into a powder for bakery, soups, beverages and processed food applications.",
    benefits: [
      "Adds natural orange color and mild sweetness",
      "Blends easily into dry and wet formulations",
      "Helpful when fresh carrot supply fluctuates",
      "Suitable for industrial and HoReCa buyers",
    ],
    ingredients: "Fresh carrots.",
    usage: [
      "Use in soups, bakery mixes, beverages and seasoning bases.",
      "Test dosage by color and sweetness target.",
    ],
    specs: [
      { label: "Form", value: "Fine Powder" },
      { label: "Color", value: "Bright orange to orange" },
      { label: "Botanical Name", value: "Daucus Carota" },
      { label: "Processing", value: "Washed, peeled, sliced, dehydrated and finely ground" },
      { label: "Moisture", value: "Below 6-8%" },
      { label: "Country of Origin", value: "India" },
    ],
    storage: commonStorage,
  }),
  product({
    slug: "dehydrated-curry-leaf-powder",
    sourceSlug: "dehydrated-curry-leaf-powder",
    name: "Dehydrated Curry Leaf Powder",
    short: "Fine green curry leaf powder with aromatic herbal flavor.",
    image: IMAGES.curryLeafPowder,
    category: "dehydrated-powders",
    ...quote(1400),
    rating: 4.8,
    reviews: 84,
    newArrival: true,
    sku: "UOF-DCLP-014",
    highlights: [
      "Fine powder",
      "Murraya koenigii",
      "Strong fresh curry leaf aroma",
      "Shade dried or dehydrated",
    ],
    description:
      "Fresh curry leaves are washed, shade dried or dehydrated and finely ground into an aromatic herbal powder for spice mixes and processed foods.",
    benefits: [
      "Adds curry leaf aroma without fresh leaf wastage",
      "Useful for chutney powders and spice blends",
      "Fine powder blends evenly",
      "Shelf-stable under airtight storage",
    ],
    ingredients: "Fresh curry leaves.",
    usage: [
      "Add to spice blends, chutney powders, soups and savory snacks.",
      "Keep away from moisture to protect aroma.",
    ],
    specs: [
      { label: "Form", value: "Fine Powder" },
      { label: "Color", value: "Green" },
      { label: "Botanical Name", value: "Murraya koenigii" },
      { label: "Flavor", value: "Aromatic, slightly bitter and herbal" },
      { label: "Moisture", value: "Typically below 6-8%" },
      { label: "Shelf Life", value: "Up to 18-24 months" },
    ],
    storage: commonStorage,
  }),
  product({
    slug: "organic-amla-powder",
    sourceSlug: "organic-amla-powder",
    name: "Organic Amla Powder",
    short: "Fine organic amla powder with sour, astringent and natural fruity flavor.",
    image: IMAGES.amlaPowder,
    category: "organic-powders",
    ...quote(890),
    rating: 4.8,
    reviews: 134,
    bestSeller: true,
    sku: "UOF-OAP-015",
    highlights: [
      "Fine powder",
      "Light brown color",
      "Phyllanthus Emblica",
      "Fresh amla raw material",
    ],
    description:
      "Fresh amla is washed, sliced, dehydrated and finely ground into a fine mesh powder for wellness, food and ingredient applications.",
    benefits: [
      "Clean amla flavor in a shelf-stable format",
      "Easy to blend into powders, beverages and formulations",
      "Fine mesh can be ordered as required",
      "Suitable for commercial ingredient sourcing",
    ],
    ingredients: "Fresh amla (Indian gooseberry).",
    usage: [
      "Use in beverages, functional food blends and culinary applications.",
      "Dose according to the sourness profile needed.",
    ],
    specs: [
      { label: "Form", value: "Fine Powder" },
      { label: "Color", value: "Light brown" },
      { label: "Botanical Name", value: "Phyllanthus Emblica" },
      { label: "Taste", value: "Sour, astringent and natural fruity flavor" },
      { label: "Moisture", value: "Typically below 6-8%" },
      { label: "Shelf Life", value: "Up to 12-24 months" },
    ],
    storage: commonStorage,
  }),
  product({
    slug: "organic-beetroot-powder",
    sourceSlug: "organic-beetroot-powder",
    name: "Organic Beetroot Powder",
    short: "Fine organic beetroot powder with deep red to purplish red color.",
    image: IMAGES.beetrootPowder,
    category: "organic-powders",
    ...quote(2333),
    rating: 4.7,
    reviews: 101,
    sku: "UOF-OBP-016",
    highlights: [
      "Fine powder",
      "Deep red to purplish red",
      "Earthy sweet beet flavor",
      "Customizable mesh",
    ],
    description:
      "Organic beetroot is washed, sliced, dehydrated and pulverized into a fine powder for natural color, beverages, bakery, smoothies and food applications.",
    benefits: [
      "Natural deep red color for formulations",
      "Earthy sweet beet note",
      "Fine mesh powder is easy to blend",
      "Suitable for food manufacturers and suppliers",
    ],
    ingredients: "Organic beetroot.",
    usage: [
      "Use in smoothies, bakery mixes, sauces and natural color applications.",
      "Begin with small doses and adjust for color.",
    ],
    specs: [
      { label: "Type", value: "Organic" },
      { label: "Form", value: "Fine Powder" },
      { label: "Color", value: "Deep red to purplish red" },
      { label: "Flavor", value: "Earthy, sweet and natural beet flavor" },
      { label: "Moisture", value: "Typically below 6-8%" },
      { label: "Shelf Life", value: "Up to 18-24 months" },
    ],
    storage: commonStorage,
  }),
  product({
    slug: "organic-garlic-powder",
    sourceSlug: "organic-garlic-powder",
    name: "Organic Garlic Powder",
    short: "Fine off-white organic garlic powder with strong pungent flavor.",
    image: IMAGES.organicGarlicPowder,
    category: "organic-powders",
    ...quote(2400),
    rating: 4.8,
    reviews: 168,
    bestSeller: true,
    sku: "UOF-OGP-017",
    highlights: [
      "Fine powder",
      "Off-white to light cream",
      "Allium Sativum",
      "Rich fresh garlic aroma",
    ],
    description:
      "Organic fresh garlic is peeled, dehydrated and finely ground into a high-aroma powder for seasoning, food processing and commercial kitchen use.",
    benefits: [
      "Strong garlic impact in powdered format",
      "Convenient for dry rubs and spice mixes",
      "Fine mesh helps even blending",
      "Long shelf life under proper storage",
    ],
    ingredients: "Organic fresh garlic.",
    usage: [
      "Blend into masala mixes, marinades, sauces and soup bases.",
      "Keep sealed after opening to preserve aroma.",
    ],
    specs: [
      { label: "Form", value: "Fine Powder" },
      { label: "Color", value: "Off-white to light cream" },
      { label: "Botanical Name", value: "Allium Sativum" },
      { label: "Processing", value: "Peeled, dehydrated and finely ground" },
      { label: "Moisture", value: "Below 6-8%" },
      { label: "Shelf Life", value: "Up to 18-24 months" },
    ],
    storage: commonStorage,
  }),
  product({
    slug: "organic-ginger-powder",
    sourceSlug: "organic-ginger-powder",
    name: "Organic Ginger Powder",
    short: "Fine organic ginger powder with spicy, warm and pungent flavor.",
    image: IMAGES.organicGingerPowder,
    category: "organic-powders",
    ...quote(2460),
    rating: 4.8,
    reviews: 121,
    sku: "UOF-OGNP-018",
    highlights: [
      "Fine powder",
      "Light yellow to pale brown",
      "Zingiber Officinale",
      "Strong natural ginger aroma",
    ],
    description:
      "Fresh organic ginger is washed, peeled, dried and ground into a fine mesh powder for beverages, seasonings, bakery and food manufacturers.",
    benefits: [
      "Warm ginger profile in a consistent powder",
      "Useful for beverage premixes and spice blends",
      "Fine mesh can be customized",
      "Bulk-supply friendly shelf life",
    ],
    ingredients: "Fresh organic ginger.",
    usage: [
      "Use in tea blends, masala mixes, bakery and sauces.",
      "Specify particle size for production applications.",
    ],
    specs: [
      { label: "Form", value: "Fine Powder" },
      { label: "Color", value: "Light yellow to pale brown" },
      { label: "Botanical Name", value: "Zingiber Officinale" },
      { label: "Flavor", value: "Spicy, warm and pungent" },
      { label: "Moisture", value: "Below 6-8%" },
      { label: "Country of Origin", value: "India" },
    ],
    storage: commonStorage,
  }),
  product({
    slug: "ayurvedic-moringa-leaf-powder",
    sourceSlug: "ayurvedic-moringa-leaf-powder",
    name: "Ayurvedic Moringa Leaf Powder",
    short: "Fine moringa leaf powder with earthy, mildly bitter herbal flavor.",
    image: IMAGES.moringaLeafPowder,
    category: "organic-powders",
    ...quote(1451),
    rating: 4.9,
    reviews: 156,
    bestSeller: true,
    sku: "UOF-AMLP-019",
    highlights: ["Fine powder", "Natural green", "Moringa Oleifera", "Low-temperature dried"],
    description:
      "Fresh moringa leaves are shade dried or low-temperature dried and pulverized into a fine mesh powder for ayurvedic and functional food applications.",
    benefits: [
      "Herbal moringa profile in a fine powder",
      "Suitable for wellness blends and food applications",
      "Fine mesh particle size available as required",
      "Shelf-stable under airtight storage",
    ],
    ingredients: "Fresh moringa leaves.",
    usage: [
      "Use in wellness blends, soups, beverages and dry mixes.",
      "Keep sealed and away from sunlight to protect green color.",
    ],
    specs: [
      { label: "Form", value: "Fine Powder" },
      { label: "Color", value: "Natural green" },
      { label: "Botanical Name", value: "Moringa Oleifera" },
      { label: "Flavor", value: "Earthy, mild bitter and herbal" },
      { label: "Processing", value: "Shade dried or low-temperature dried and pulverized" },
      { label: "Moisture", value: "Below 6-8%" },
    ],
    storage: commonStorage,
  }),
  product({
    slug: "dried-tomato-flakes",
    sourceSlug: "dried-tomato-flakes",
    name: "Dried Tomato Flakes",
    short: "Bright red tomato flakes with tangy, slightly sweet natural flavor.",
    image: IMAGES.tomatoFlakes,
    category: "dried-specialty",
    ...quote(530, 666),
    rating: 4.7,
    reviews: 117,
    sku: "UOF-DTF-020",
    highlights: [
      "Flakes form",
      "Bright red to deep red",
      "Solanum Lycopersicum",
      "Strong tomato aroma",
    ],
    description:
      "Fresh ripe tomatoes are washed, sliced, dehydrated and crushed into flakes for sauces, soups, snacks and food processing.",
    benefits: [
      "Natural tomato flavor without fresh tomato handling",
      "Useful in sauces, soups and snack seasonings",
      "Standard or custom particle grades available",
      "Convenient for bulk food production",
    ],
    ingredients: "Fresh ripe tomatoes.",
    usage: [
      "Use in sauce bases, soups, seasoning blends and ready meals.",
      "Hydrate before using where a softer tomato texture is needed.",
    ],
    specs: [
      { label: "Form", value: "Flakes" },
      { label: "Color", value: "Bright red to deep red" },
      { label: "Botanical Name", value: "Solanum Lycopersicum" },
      { label: "Processing", value: "Washed, sliced, dehydrated and crushed" },
      { label: "Moisture", value: "Below 6-8%" },
      { label: "Shelf Life", value: "Up to 18-24 months" },
    ],
    storage: commonStorage,
  }),
  product({
    slug: "dried-sweet-corn",
    sourceSlug: "dried-sweet-corn",
    name: "Dried Sweet Corn",
    short: "Whole golden yellow sweet corn kernels with mild sweet natural corn flavor.",
    image: IMAGES.sweetCorn,
    category: "dried-specialty",
    ...quote(750, 860),
    rating: 4.6,
    reviews: 102,
    sku: "UOF-DSC-021",
    highlights: [
      "Whole kernels",
      "Yellow to golden yellow",
      "Zea Mays Saccharata",
      "Cleaned, blanched and dehydrated",
    ],
    description:
      "Fresh sweet corn is cleaned, blanched and dehydrated into whole dried kernels for culinary and food manufacturing applications.",
    benefits: [
      "Sweet corn flavor without cold storage",
      "Convenient inclusion for soups and ready meals",
      "Bright golden appearance",
      "Useful for institutional and bulk buyers",
    ],
    ingredients: "Fresh sweet corn.",
    usage: [
      "Hydrate before adding to soups, rice dishes and mixes.",
      "Use as a visible kernel inclusion in ready meals.",
    ],
    specs: [
      { label: "Form", value: "Whole kernels / dried corn" },
      { label: "Color", value: "Yellow to golden yellow" },
      { label: "Botanical Name", value: "Zea Mays Saccharata" },
      { label: "Processing", value: "Cleaned, blanched and dehydrated" },
      { label: "Moisture", value: "Below 8-10%" },
      { label: "Shelf Life", value: "Up to 12-18 months" },
    ],
    storage: "Store in a cool, dry and airtight environment away from moisture.",
  }),
  product({
    slug: "turmeric-powder",
    sourceSlug: "turmeric-powder",
    name: "Turmeric Powder",
    short: "Fine turmeric powder with bright yellow to deep golden color and natural aroma.",
    image: IMAGES.turmericPowder,
    category: "spices",
    ...quote(1221),
    rating: 4.9,
    reviews: 302,
    bestSeller: true,
    sku: "UOF-TP-022",
    highlights: [
      "Fine powder",
      "Curcuma Longa",
      "Strong natural turmeric aroma",
      "Cleaned, dried, ground and sieved",
    ],
    description:
      "Dried turmeric fingers are cleaned, dried, ground and sieved into a fine powder for spice blends, household cooking and food-service sourcing.",
    benefits: [
      "Natural golden color for everyday cooking",
      "Warm earthy turmeric flavor",
      "Fine powder for even blending",
      "Suitable for bulk spice buyers",
    ],
    ingredients: "Dried turmeric fingers.",
    usage: [
      "Use in curry blends, marinades, dals and spice mixes.",
      "Store airtight to protect color and aroma.",
    ],
    specs: [
      { label: "Form", value: "Fine Powder" },
      { label: "Color", value: "Bright yellow to deep golden yellow" },
      { label: "Botanical Name", value: "Curcuma Longa" },
      { label: "Active Compound", value: "Curcumin" },
      { label: "Moisture", value: "Below 8-10%" },
      { label: "Shelf Life", value: "Up to 18-24 months" },
    ],
    storage: commonStorage,
  }),
  product({
    slug: "coriander-powder",
    sourceSlug: "coriander-powder",
    name: "Coriander Powder",
    short: "Fine coriander powder with mild, sweet and aromatic flavor.",
    image: IMAGES.corianderPowder,
    category: "spices",
    ...quote(280),
    rating: 4.7,
    reviews: 118,
    sku: "UOF-CP-023",
    highlights: [
      "Fine powder",
      "Light greenish color",
      "Coriandrum Sativum",
      "Fresh warm coriander aroma",
    ],
    description:
      "Dried coriander seeds are cleaned, dried and ground into a fine mesh powder for spice blends, gravies and commercial kitchen use.",
    benefits: [
      "Fresh coriander aroma in powdered format",
      "Balances spice blends and gravies",
      "Fine mesh can be ordered as required",
      "Bulk-friendly everyday spice ingredient",
    ],
    ingredients: "Dried coriander seeds.",
    usage: [
      "Use in gravies, masala blends and seasoning mixes.",
      "Pair with turmeric and chilli-style blends for balanced flavor.",
    ],
    specs: [
      { label: "Form", value: "Fine Powder" },
      { label: "Color", value: "Light greenish" },
      { label: "Botanical Name", value: "Coriandrum Sativum" },
      { label: "Processing", value: "Cleaned, dried and ground" },
      { label: "Moisture", value: "Below 8-10%" },
      { label: "Shelf Life", value: "Up to 12-18 months" },
    ],
    storage: commonStorage,
  }),
];

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function categoryName(category: Category) {
  return CATEGORIES.find((item) => item.id === category)?.name ?? category;
}

export function priceFor(product: Product, weight: Weight) {
  const m = WEIGHT_MULTIPLIER[weight] ?? 1;
  return {
    price: Math.round(product.basePrice * m),
    mrp: Math.round(product.baseMrp * m),
  };
}

export function inr(value: number) {
  return `Rs. ${value.toLocaleString("en-IN")}`;
}

export const RECIPES = [
  {
    slug: "onion-powder-gravy-base",
    title: "Quick Onion Powder Gravy Base",
    time: "12 min",
    level: "Easy",
    uses: ["Dehydrated White Onion Powder", "Turmeric Powder", "Coriander Powder"],
  },
  {
    slug: "tomato-flake-soup",
    title: "Dried Tomato Flake Soup",
    time: "20 min",
    level: "Easy",
    uses: ["Dried Tomato Flakes", "Organic Garlic Powder"],
  },
  {
    slug: "sweet-corn-veg-mix",
    title: "Sweet Corn Vegetable Mix",
    time: "15 min",
    level: "Easy",
    uses: ["Dried Sweet Corn", "Dehydrated Carrot Flakes", "Dehydrated Spinach Leaves"],
  },
  {
    slug: "moringa-leaf-seasoning",
    title: "Moringa Leaf Seasoning Blend",
    time: "5 min",
    level: "Easy",
    uses: ["Ayurvedic Moringa Leaf Powder", "Coriander Powder"],
  },
  {
    slug: "ginger-garlic-marinade",
    title: "Ginger Garlic Marinade",
    time: "10 min",
    level: "Easy",
    uses: ["Organic Ginger Powder", "Organic Garlic Powder"],
  },
  {
    slug: "beetroot-color-batter",
    title: "Beetroot Natural Color Batter",
    time: "8 min",
    level: "Easy",
    uses: ["Organic Beetroot Powder"],
  },
];

export const BLOG_POSTS = [
  {
    slug: "how-to-use-dehydrated-onion-powder",
    title: "How to Use Dehydrated Onion Powder in Commercial Kitchens",
    excerpt:
      "Practical ways to standardize onion flavor in gravies, sauces, masala blends and ready-to-cook products.",
    date: "12 Aug 2026",
    read: "6 min read",
    body: [
      "Dehydrated onion powder helps commercial kitchens reduce prep time while keeping flavor consistent. It is especially useful in gravies, marinades, instant food bases, snack seasonings and spice blends.",
      "Utkarsh Organic Farm lists both dehydrated white onion powder and dehydrated red onion powder. White onion powder gives a sharper profile, while red onion powder adds a sweeter and stronger onion note.",
      "For best results, blend the powder with oil, water, curd or a dry masala base before scaling a recipe. Keep packs sealed and away from steam to protect aroma and flow.",
    ],
  },
  {
    slug: "dehydrated-flakes-for-food-manufacturing",
    title: "Why Food Manufacturers Use Dehydrated Vegetable Flakes",
    excerpt:
      "A quick guide to okra, onion, garlic, carrot, spinach, tomato and sweet corn formats for bulk buyers.",
    date: "10 Aug 2026",
    read: "5 min read",
    body: [
      "Dehydrated vegetable flakes give food businesses a predictable ingredient format with reduced cleaning, slicing and cold-storage needs.",
      "Utkarsh Organic Farm's catalog includes onion flakes, garlic flakes, carrot flakes, spinach leaves, okra flakes, dried tomato flakes, dried sweet corn and moringa sticks.",
      "Bulk buyers should check the target form, color, moisture range, shelf life, particle size and MOQ before placing a production order.",
    ],
  },
  {
    slug: "choosing-organic-powders-for-products",
    title: "Choosing Organic Powders for New Food Products",
    excerpt: "What to check when sourcing amla, beetroot, garlic, ginger and moringa leaf powders.",
    date: "8 Aug 2026",
    read: "4 min read",
    body: [
      "Organic and ayurvedic powders are useful in beverages, bakery, wellness blends, seasoning bases and functional food applications.",
      "When selecting a powder, compare color, aroma, flavor, moisture content, processing method, particle size and the storage condition recommended by the supplier.",
      "For industrial use, ask for the latest quotation, available mesh size and the production batch details before confirming volume orders.",
    ],
  },
];
