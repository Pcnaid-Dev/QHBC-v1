import { Service, ServiceCategory, Offer, AIModule } from '../types';

export const services: Service[] = [
  // Hair
  {
    id: 'h1',
    category: ServiceCategory.Hair,
    nameEn: 'Haircut & Styling',
    nameAr: 'قص وسشوار',
    descriptionEn: 'Professional cuts tailored to your face shape.',
    descriptionAr: 'قصات احترافية تناسب شكل وجهك.',
    priceStart: 10
  },
  {
    id: 'h2',
    category: ServiceCategory.Hair,
    nameEn: 'Hair Coloring & Highlights',
    nameAr: 'صبغات وهايلايت',
    descriptionEn: 'Premium color using ammonia-free products.',
    descriptionAr: 'ألوان مميزة باستخدام منتجات خالية من الأمونيا.',
    priceStart: 25
  },
  {
    id: 'h3',
    category: ServiceCategory.Hair,
    nameEn: 'Brazilian Protein Treatment',
    nameAr: 'بروتين برازيلي معالج',
    descriptionEn: 'Smooth, shiny, frizz-free hair for months.',
    descriptionAr: 'شعر ناعم ولامع وخالي من النفشة لأشهر.',
    priceStart: 50
  },
  // Bridal
  {
    id: 'b1',
    category: ServiceCategory.Bridal,
    nameEn: 'Full Bridal Package',
    nameAr: 'بكج العروس الملكي',
    descriptionEn: 'Makeup, hair, nails, skincare, and lashes.',
    descriptionAr: 'مكياج، شعر، أظافر، عناية بالبشرة ورموش.',
    priceStart: 150
  },
  {
    id: 'b2',
    category: ServiceCategory.Bridal,
    nameEn: 'Engagement Look',
    nameAr: 'لوك الخطوبة',
    descriptionEn: 'Glamorous yet soft look for your special day.',
    descriptionAr: 'إطلالة ساحرة وناعمة ليومك المميز.',
    priceStart: 80
  },
  // Nails
  {
    id: 'n1',
    category: ServiceCategory.Nails,
    nameEn: 'Gel Extensions',
    nameAr: 'تركيب أظافر جل',
    descriptionEn: 'Long-lasting extensions with custom art.',
    descriptionAr: 'تركيب يدوم طويلاً مع رسم مخصص.',
    priceStart: 25
  },
  {
    id: 'n2',
    category: ServiceCategory.Nails,
    nameEn: 'Russian Manicure',
    nameAr: 'مانيكير روسي',
    descriptionEn: 'Clean, precise cuticle work.',
    descriptionAr: 'تنظيف دقيق ومثالي.',
    priceStart: 15
  },
  // Lashes
  {
    id: 'l1',
    category: ServiceCategory.LashesBrows,
    nameEn: 'Volume Lashes',
    nameAr: 'رموش فوليوم',
    descriptionEn: 'Full, dramatic lash extensions.',
    descriptionAr: 'رموش كثيفة وجذابة.',
    priceStart: 30
  },
  {
    id: 'l2',
    category: ServiceCategory.LashesBrows,
    nameEn: 'Lash Lifting',
    nameAr: 'رفع رموش (ليفتينج)',
    descriptionEn: 'Natural curl for your own lashes.',
    descriptionAr: 'تجعيد طبيعي لرموشك الحقيقية.',
    priceStart: 20
  }
];

export const offers: Offer[] = [
  {
    id: 'o1',
    titleEn: 'Protein Offer - Any Length',
    titleAr: 'عرض البروتين - أي طول شعر',
    descriptionEn: 'Full hair treatment for a fixed price this week only.',
    descriptionAr: 'علاج كامل للشعر بسعر ثابت لهذا الأسبوع فقط.',
    price: 49,
    originalPrice: 80
  },
  {
    id: 'o2',
    titleEn: 'Gel Polish + Manicure',
    titleAr: 'جل بولش + مانيكير',
    descriptionEn: 'Get ready for the weekend with fresh nails.',
    descriptionAr: 'استعدي للويكند بأظافر جذابة.',
    price: 15,
    originalPrice: 25
  }
];

export const aiModules: AIModule[] = [
  {
    id: 'makeup-glam',
    nameEn: 'Glam Makeup',
    nameAr: 'مكياج سهرة',
    category: 'face',
    promptTemplate: 'Apply a glamorous evening makeup look to this person, including defined contour, highlighter on cheekbones, smokey eyeshadow, and {{color}} lipstick. Keep the skin texture realistic.',
    icon: '✨'
  },
  {
    id: 'hair-blonde',
    nameEn: 'Blonde Transformation',
    nameAr: 'تحويل للأشقر',
    category: 'hair',
    promptTemplate: 'Change the hair color of the person in the image to a luxurious honey blonde shade. Keep the hairstyle volume and texture realistic.',
    icon: '👱‍♀️'
  },
  {
    id: 'nails-art',
    nameEn: 'Gel Nail Art',
    nameAr: 'ديزاين أظافر',
    category: 'nails',
    promptTemplate: 'Change the fingernails to have a long coffin shape with a {{color}} glossy gel finish. Ensure the hands look natural.',
    icon: '💅'
  },
  {
    id: 'skin-glow',
    nameEn: 'Glass Skin',
    nameAr: 'بشرة زجاجية',
    category: 'face',
    promptTemplate: 'Retouch the skin to look hydrated, glowing, and smooth (glass skin effect), removing minor blemishes while keeping natural pores visible. Do not alter facial features.',
    icon: '💧'
  },
  {
    id: 'bridal-preview',
    nameEn: 'Bridal Preview',
    nameAr: 'بروفة العروس',
    category: 'bridal',
    promptTemplate: 'Transform this image into a bridal look. Add a soft bridal veil, elegant wedding makeup with soft pink tones, and diamond earrings. Make it look like a wedding day photo.',
    icon: '👰'
  }
];
