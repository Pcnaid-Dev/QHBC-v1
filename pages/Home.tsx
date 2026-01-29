import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import { ServiceCategory } from '../types';
import { services, offers } from '../data/services';
import { translations } from '../data/i18n';
import { Language } from '../types';
import { ArrowRight, Star, MapPin } from 'lucide-react';
import { businessInfo } from '../data/business';

interface HomeProps {
  lang: Language;
}

const Home: React.FC<HomeProps> = ({ lang }) => {
  const t = translations[lang];
  
  // Get a few featured services
  const featuredServices = services.slice(0, 4);

  return (
    <div className="pb-20">
      <Hero lang={lang} />
      
      {/* Why Us / Categories */}
      <section className="py-20 container mx-auto px-6">
        <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-queen-dark mb-4">{t.whyUs}</h2>
            <div className="w-20 h-1 bg-queen-gold mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
                { icon: "💇‍♀️", titleEn: "Expert Styling", titleAr: "تصفيف احترافي" },
                { icon: "💄", titleEn: "Bridal Glam", titleAr: "مكياج عرائس" },
                { icon: "💅", titleEn: "Nail Artistry", titleAr: "فن الأظافر" },
                { icon: "💆‍♀️", titleEn: "Relaxing Spa", titleAr: "سبا واسترخاء" },
            ].map((item, idx) => (
                <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-xl hover:-translate-y-2 transition duration-300">
                    <div className="text-5xl mb-4">{item.icon}</div>
                    <h3 className="font-bold text-lg text-gray-800">{lang === 'en' ? item.titleEn : item.titleAr}</h3>
                </div>
            ))}
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="flex justify-between items-end mb-12">
                <div>
                    <h2 className="text-3xl font-bold font-serif text-queen-dark">{t.services}</h2>
                    <p className="text-gray-500 mt-2">Discover our royal treatments</p>
                </div>
                <Link to="/services" className="text-queen-rose font-bold hover:underline flex items-center gap-1">
                    {lang === 'en' ? 'View All' : 'عرض الكل'} <ArrowRight size={16} />
                </Link>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
                {featuredServices.map(s => (
                    <div key={s.id} className="group relative overflow-hidden rounded-2xl aspect-[4/5] bg-gray-100 cursor-pointer">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                         {/* Placeholder Image */}
                        <img 
                            src={`https://picsum.photos/seed/${s.id}/400/500`} 
                            alt={s.nameEn} 
                            className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110"
                        />
                        <div className="absolute bottom-0 left-0 p-6 z-20 text-white">
                            <h3 className="text-xl font-bold mb-1">{lang === 'en' ? s.nameEn : s.nameAr}</h3>
                            <p className="text-sm text-gray-300 line-clamp-2">{lang === 'en' ? s.descriptionEn : s.descriptionAr}</p>
                            <span className="inline-block mt-3 text-queen-gold font-bold">{s.priceStart} {t.price}+</span>
                        </div>
                    </div>
                ))}
            </div>
          </div>
      </section>

      {/* AI Teaser */}
      <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-queen-dark"></div>
          <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2 text-white">
                  <span className="text-queen-gold font-bold tracking-widest uppercase text-sm mb-2 block">New Technology</span>
                  <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">{t.aiStudio}</h2>
                  <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                      {lang === 'en' 
                        ? "Not sure about a new hair color or makeup look? Use our AI-powered studio to visualize your transformation before you book." 
                        : "محتارة بلون شعرك الجديد أو لوك المكياج؟ جربي استوديو الذكاء الاصطناعي لتري شكلك الجديد قبل الحجز."}
                  </p>
                  <Link to="/ai-studio" className="inline-flex items-center gap-2 bg-gradient-to-r from-queen-gold to-yellow-600 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-yellow-500/20 transition">
                      <Star fill="white" size={18} /> {t.tryAiStudio}
                  </Link>
              </div>
              <div className="md:w-1/2">
                   <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 rotate-3 hover:rotate-0 transition duration-500">
                       <img src="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="AI Demo" className="w-full" />
                       <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px]">
                           <div className="w-full h-1/2 border-t-2 border-white/50 absolute top-1/2 animate-pulse"></div>
                           <span className="bg-white/90 px-4 py-1 rounded text-xs font-bold shadow">Before / After</span>
                       </div>
                   </div>
              </div>
          </div>
      </section>

      {/* Offers Teaser */}
      {offers.length > 0 && (
          <section className="py-20 bg-queen-pink/5">
              <div className="container mx-auto px-6">
                <h2 className="text-center text-3xl font-serif font-bold text-queen-dark mb-12">{t.offers}</h2>
                <div className="flex flex-wrap justify-center gap-6">
                    {offers.map(offer => (
                        <div key={offer.id} className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-queen-rose w-full md:w-80 relative">
                            <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">{t.limitedTime}</span>
                            <h3 className="font-bold text-xl mb-2">{lang === 'en' ? offer.titleEn : offer.titleAr}</h3>
                            <p className="text-gray-600 text-sm mb-4">{lang === 'en' ? offer.descriptionEn : offer.descriptionAr}</p>
                            <div className="flex items-end gap-2 mb-4">
                                <span className="text-2xl font-bold text-queen-rose">{offer.price} {t.price}</span>
                                {offer.originalPrice && <span className="text-gray-400 line-through text-sm">{offer.originalPrice}</span>}
                            </div>
                            <Link to="/book" className="block w-full text-center border-2 border-queen-rose text-queen-rose font-bold py-2 rounded-lg hover:bg-queen-rose hover:text-white transition">
                                {t.bookNow}
                            </Link>
                        </div>
                    ))}
                </div>
              </div>
          </section>
      )}

      {/* Map Section */}
      <section className="h-[400px] w-full relative">
         <iframe 
            src={businessInfo.mapEmbedUrl} 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale hover:grayscale-0 transition duration-700"
         ></iframe>
         <div className="absolute bottom-8 left-8 bg-white p-6 rounded-xl shadow-xl max-w-sm hidden md:block">
             <div className="flex items-start gap-3">
                 <MapPin className="text-queen-rose mt-1" />
                 <div>
                     <h4 className="font-bold text-lg mb-1">{t.location}</h4>
                     <p className="text-sm text-gray-600 mb-2">{lang === 'en' ? businessInfo.address : businessInfo.addressAr}</p>
                     <a href={`https://www.google.com/maps/dir/?api=1&destination=${businessInfo.coordinates.lat},${businessInfo.coordinates.lng}`} target="_blank" rel="noreferrer" className="text-queen-rose text-sm font-bold hover:underline">
                         Get Directions
                     </a>
                 </div>
             </div>
         </div>
      </section>
    </div>
  );
};

export default Home;
