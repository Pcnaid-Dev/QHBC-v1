export type Language = 'en' | 'ar';

export interface BusinessInfo {
  nameEn: string;
  nameAr: string;
  manager: string;
  phonePrimary: string;
  phoneSecondary: string;
  address: string;
  addressAr: string;
  coordinates: { lat: number; lng: number };
  googlePlusCode: string;
  mapEmbedUrl: string;
  socials: {
    facebook: string;
    messenger: string;
    instagramMain: string;
    instagramAlt1: string;
    instagramAlt2: string;
    snapchatBiz: string;
    snapchatPublic: string;
    tiktok: string;
  };
}

export interface Service {
  id: string;
  category: ServiceCategory;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  priceStart?: number; // JOD
  image?: string;
}

export enum ServiceCategory {
  Hair = 'hair',
  Makeup = 'makeup',
  Nails = 'nails',
  LashesBrows = 'lashes_brows',
  Skincare = 'skincare',
  Academy = 'academy',
  Bridal = 'bridal'
}

export interface Offer {
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  price: number;
  originalPrice?: number;
  expiryDate?: string;
}

export interface AIModule {
  id: string;
  nameEn: string;
  nameAr: string;
  promptTemplate: string; // Template with {{instruction}} placeholder
  icon: string;
  category: 'face' | 'hair' | 'nails' | 'other' | 'bridal';
}

export interface Testimonial {
  id: string;
  name: string;
  commentEn: string;
  commentAr: string;
  rating: number;
  service?: string;
}