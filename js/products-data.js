/* Product catalog data for Sabra Cooling Systems store */
const CATEGORIES = [
  { key: 'home', label: 'تكييف منزلي' },
  { key: 'central', label: 'تكييف مركزي وتجاري' },
  { key: 'cooling', label: 'تبريد تجاري وصناعي' },
  { key: 'parts', label: 'قطع غيار وملحقات' }
];

const PRODUCTS = [
  {
    id: 'p1',
    name: 'مكيف سبليت انفرتر 1.5 حصان',
    category: 'home',
    price: 18500,
    oldPrice: 21000,
    rating: 4.8,
    reviews: 132,
    badge: 'الأكثر مبيعاً',
    desc: 'تبريد سريع وتوفير في الكهرباء يصل إلى 60% مع تقنية الإنفرتر الذكية وضمان 5 سنوات على الكمبروسر.',
    icon: 'ac',
    grad: 'linear-gradient(135deg,#e6f4fb,#cdeaf8)',
    featured: true,
    inStock: true
  },
  {
    id: 'p2',
    name: 'مكيف سبليت عادي 2.25 حصان',
    category: 'home',
    price: 15200,
    rating: 4.5,
    reviews: 84,
    desc: 'أداء تبريد قوي وموثوق يناسب الغرف المتوسطة والكبيرة مع فلتر مضاد للبكتيريا.',
    icon: 'ac',
    grad: 'linear-gradient(135deg,#eef6fb,#d8ecf6)',
    featured: false,
    inStock: true
  },
  {
    id: 'p3',
    name: 'مكيف شباك 1 حصان',
    category: 'home',
    price: 8900,
    rating: 4.2,
    reviews: 51,
    desc: 'حل اقتصادي وسهل التركيب للغرف الصغيرة والمكاتب مع تحكم عن بعد.',
    icon: 'window',
    grad: 'linear-gradient(135deg,#eaf5fb,#d3e9f5)',
    featured: false,
    inStock: true
  },
  {
    id: 'p4',
    name: 'وحدة تكييف مركزي دكت',
    category: 'central',
    price: 62000,
    rating: 4.9,
    reviews: 47,
    badge: 'جديد',
    desc: 'نظام تكييف مركزي بالدكت يوزع الهواء البارد بالتساوي على كل غرف الفيلا أو المكتب.',
    icon: 'duct',
    grad: 'linear-gradient(135deg,#e6f1fb,#cde3f5)',
    featured: true,
    inStock: true
  },
  {
    id: 'p5',
    name: 'وحدة تكييف VRF متعددة المناطق',
    category: 'central',
    price: 145000,
    rating: 5,
    reviews: 19,
    badge: 'للمشاريع الكبرى',
    desc: 'نظام VRF عالي الكفاءة يخدم عدة مناطق من وحدة خارجية واحدة، مثالي للمباني التجارية.',
    icon: 'vrf',
    grad: 'linear-gradient(135deg,#e8f2fb,#d0e6f6)',
    featured: true,
    inStock: true
  },
  {
    id: 'p6',
    name: 'برج تبريد صناعي',
    category: 'cooling',
    price: 98000,
    rating: 4.6,
    reviews: 22,
    desc: 'أبراج تبريد عالية الكفاءة لتبريد المياه في المصانع والمنشآت الصناعية الكبرى.',
    icon: 'tower',
    grad: 'linear-gradient(135deg,#e9f3fb,#d1e7f4)',
    featured: false,
    inStock: true
  },
  {
    id: 'p7',
    name: 'ثلاجة عرض تجارية',
    category: 'cooling',
    price: 32500,
    rating: 4.4,
    reviews: 38,
    desc: 'ثلاجة عرض زجاجية للمحلات والسوبر ماركت بتبريد متجانس وإضاءة LED داخلية.',
    icon: 'fridge',
    grad: 'linear-gradient(135deg,#eaf4fb,#d6ebf6)',
    featured: false,
    inStock: true
  },
  {
    id: 'p8',
    name: 'فريزر تجاري أفقي',
    category: 'cooling',
    price: 27800,
    rating: 4.3,
    reviews: 29,
    desc: 'فريزر تجاري بسعة كبيرة يحافظ على درجة حرارة ثابتة لتخزين المواد المجمدة.',
    icon: 'freezer',
    grad: 'linear-gradient(135deg,#e7f2fb,#cfe6f4)',
    featured: false,
    inStock: false
  },
  {
    id: 'p9',
    name: 'غرفة تبريد جاهزة (كولد روم)',
    category: 'cooling',
    price: 210000,
    rating: 4.9,
    reviews: 14,
    badge: 'حسب الطلب',
    desc: 'غرف تبريد وتجميد جاهزة بعزل حراري عالي، تصميم وتركيب حسب مساحة ونشاط عميلك.',
    icon: 'coldroom',
    grad: 'linear-gradient(135deg,#e6f1fb,#cde4f4)',
    featured: false,
    inStock: true
  },
  {
    id: 'p10',
    name: 'كمبروسر تبريد أصلي',
    category: 'parts',
    price: 6400,
    rating: 4.5,
    reviews: 66,
    desc: 'كمبروسرات أصلية بضمان توكيل لجميع أنواع المكيفات والثلاجات التجارية.',
    icon: 'compressor',
    grad: 'linear-gradient(135deg,#eef6fb,#dbeef8)',
    featured: false,
    inStock: true
  },
  {
    id: 'p11',
    name: 'مروحة تبريد صناعية',
    category: 'parts',
    price: 3200,
    rating: 4.1,
    reviews: 40,
    desc: 'مراوح تبريد صناعية عالية الأداء للمنشآت والمخازن ومداخن العادم.',
    icon: 'fan',
    grad: 'linear-gradient(135deg,#eaf4fb,#d5ebf7)',
    featured: false,
    inStock: true
  },
  {
    id: 'p12',
    name: 'طقم فلاتر وقطع غيار',
    category: 'parts',
    price: 950,
    rating: 4.6,
    reviews: 97,
    badge: 'عرض خاص',
    desc: 'طقم فلاتر أصلية وقطع غيار متنوعة تناسب معظم موديلات المكيفات المنزلية.',
    icon: 'filter',
    grad: 'linear-gradient(135deg,#eef7fb,#dcf0f8)',
    featured: false,
    inStock: true
  }
];

function getCategoryLabel(key) {
  const c = CATEGORIES.find(c => c.key === key);
  return c ? c.label : key;
}

function formatPrice(n) {
  return n.toLocaleString('en-US') + ' ج.م';
}
