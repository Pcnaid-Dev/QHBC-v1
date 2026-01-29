import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Calendar } from 'lucide-react';
import { translations } from '../data/i18n';
import { Language } from '../types';

interface HeroProps {
  lang: Language;
}

const Hero: React.FC<HeroProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <div className="relative w-full h-[600px] md:h-[700px] overflow-hidden flex items-center">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")', // Salon interior or glam model
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-queen-dark/80 via-queen-dark/40 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 text-white pt-20">
        <div className="max-w-2xl animate-fadeIn">
            <div className="inline-flex items-center gap-2 bg-queen-rose/20 backdrop-blur-md border border-queen-rose/40 rounded-full px-4 py-1.5 text-sm font-medium mb-6 text-queen-pink">
                <Sparkles size={14} /> <span>{lang === 'en' ? 'Welcome to Royalty' : 'أهلاً بك في عالم الملكات'}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 font-serif">
                {t.heroTitle}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-lg">
                {t.heroSubtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                    to="/book" 
                    className="bg-queen-rose hover:bg-pink-600 text-white px-8 py-3.5 rounded-full font-bold text-lg shadow-lg shadow-pink-600/30 transition transform hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                    <Calendar size={20} />
                    {t.bookNow}
                </Link>
                <Link 
                    to="/ai-studio" 
                    className="bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/20 text-white px-8 py-3.5 rounded-full font-bold text-lg transition flex items-center justify-center gap-2"
                >
                    <Sparkles size={20} />
                    {t.tryAiStudio}
                </Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
