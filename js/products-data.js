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
    inStock: true,
    specs: [
      { label: 'القدرة', value: '1.5 حصان' },
      { label: 'النوع', value: 'إنفرتر' },
      { label: 'استهلاك الطاقة', value: 'موفر حتى 60%' },
      { label: 'الضمان', value: '5 سنوات على الكمبروسر' },
      { label: 'مستوى الصوت', value: 'هادئ - أقل من 24 ديسيبل' }
    ]
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
    inStock: true,
    specs: [
      { label: 'القدرة', value: '2.25 حصان' },
      { label: 'النوع', value: 'عادي (غير إنفرتر)' },
      { label: 'الفلتر', value: 'مضاد للبكتيريا' },
      { label: 'الضمان', value: 'سنتان شاملتان' },
      { label: 'يناسب مساحة', value: 'حتى 25 متر مربع' }
    ]
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
    inStock: true,
    specs: [
      { label: 'القدرة', value: '1 حصان' },
      { label: 'النوع', value: 'شباك' },
      { label: 'التحكم', value: 'ريموت لاسلكي' },
      { label: 'الضمان', value: 'سنة شاملة' },
      { label: 'يناسب مساحة', value: 'حتى 15 متر مربع' }
    ]
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
    inStock: true,
    specs: [
      { label: 'النوع', value: 'دكت مخفي' },
      { label: 'القدرة', value: '5 حصان' },
      { label: 'عدد المخارج', value: 'حتى 6 غرف' },
      { label: 'الضمان', value: '5 سنوات على الكمبروسر' },
      { label: 'التحكم', value: 'لوحة تحكم مركزية ذكية' }
    ]
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
    inStock: true,
    specs: [
      { label: 'النوع', value: 'VRF متعدد المناطق' },
      { label: 'عدد الوحدات الداخلية', value: 'حتى 12 وحدة' },
      { label: 'كفاءة الطاقة', value: 'فئة A++' },
      { label: 'الضمان', value: '7 سنوات على الكمبروسر' },
      { label: 'يناسب', value: 'المباني التجارية والإدارية' }
    ]
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
    inStock: true,
    specs: [
      { label: 'النوع', value: 'برج تبريد دائري (FRP)' },
      { label: 'السعة الحرارية', value: 'حتى 150 طن تبريد' },
      { label: 'خامة الهيكل', value: 'فايبر جلاس مقاوم للصدأ' },
      { label: 'الضمان', value: 'سنتان على الموتور والمروحة' },
      { label: 'يناسب', value: 'المصانع والمنشآت الصناعية' }
    ]
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
    inStock: true,
    specs: [
      { label: 'السعة', value: '600 لتر' },
      { label: 'الباب', value: 'زجاجي مزدوج' },
      { label: 'الإضاءة', value: 'LED داخلية' },
      { label: 'درجة الحرارة', value: 'من 2° إلى 8° مئوية' },
      { label: 'الضمان', value: 'سنتان شاملتان' }
    ]
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
    inStock: false,
    specs: [
      { label: 'السعة', value: '500 لتر' },
      { label: 'النوع', value: 'أفقي' },
      { label: 'درجة الحرارة', value: 'حتى -18° مئوية' },
      { label: 'العزل', value: 'عزل حراري عالي الكثافة' },
      { label: 'الضمان', value: 'سنتان شاملتان' }
    ]
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
    inStock: true,
    specs: [
      { label: 'المساحة', value: 'حسب الطلب' },
      { label: 'العزل', value: 'بانوهات عزل 10 سم' },
      { label: 'درجة الحرارة', value: 'من -20° إلى 8° مئوية' },
      { label: 'التركيب', value: 'تصميم وتنفيذ كامل بالموقع' },
      { label: 'الضمان', value: '3 سنوات على وحدات التبريد' }
    ]
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
    inStock: true,
    specs: [
      { label: 'النوع', value: 'روتاري / سكرول' },
      { label: 'التوافق', value: 'معظم موديلات المكيفات التجارية' },
      { label: 'المنشأ', value: 'أصلي بضمان توكيل' },
      { label: 'الضمان', value: 'سنة كاملة' },
      { label: 'التركيب', value: 'متاح مع فني معتمد' }
    ]
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
    inStock: true,
    specs: [
      { label: 'القطر', value: '50 سم' },
      { label: 'قوة الموتور', value: '0.5 حصان' },
      { label: 'الاستخدام', value: 'منشآت صناعية ومخازن' },
      { label: 'خامة الريش', value: 'ألومنيوم مقاوم للصدأ' },
      { label: 'الضمان', value: 'سنة كاملة' }
    ]
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
    inStock: true,
    specs: [
      { label: 'المحتويات', value: 'فلتر هواء + فلتر كربون' },
      { label: 'التوافق', value: 'معظم موديلات المكيفات المنزلية' },
      { label: 'دورة الاستبدال المقترحة', value: 'كل 6 أشهر' },
      { label: 'المنشأ', value: 'قطع أصلية' },
      { label: 'الضمان', value: '3 أشهر' }
    ]
  }
];

function getCategoryLabel(key) {
  const c = CATEGORIES.find(c => c.key === key);
  return c ? c.label : key;
}

function getProductById(id) {
  return PRODUCTS.find(p => p.id === id);
}

function formatPrice(n) {
  return n.toLocaleString('en-US') + ' ج.م';
}
