import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Instagram, Facebook, MapPin, Globe, Sparkles } from 'lucide-react';
import { businessInfo } from '../data/business';
import { translations } from '../data/i18n';
import { Language } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  lang: Language;
  setLang: (lang: Language) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, lang, setLang }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = translations[lang];
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  const toggleLang = () => {
    const newLang = lang === 'en' ? 'ar' : 'en';
    setLang(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  const navLinks = [
    { path: '/', label: lang === 'en' ? 'Home' : 'الرئيسية' },
    { path: '/services', label: t.services },
    { path: '/offers', label: t.offers },
    { path: '/ai-studio', label: t.aiStudio, icon: <Sparkles className="w-4 h-4 text-queen-gold animate-pulse" /> },
    { path: '/gallery', label: t.gallery },
    { path: '/contact', label: t.contact },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Top Bar */}
      <div className="bg-queen-dark text-queen-cream py-2 px-4 text-xs md:text-sm flex justify-between items-center z-50">
        <div className="flex items-center gap-4">
          <a href={`tel:${businessInfo.phonePrimary}`} className="flex items-center gap-1 hover:text-queen-gold transition">
            <Phone size={14} /> <span>{businessInfo.phonePrimary}</span>
          </a>
          <span className="hidden md:inline">|</span>
          <span className="hidden md:inline flex items-center gap-1">
             {t.daily}
          </span>
        </div>
        <div className="flex items-center gap-3">
            <a href={businessInfo.socials.instagramMain} target="_blank" rel="noreferrer"><Instagram size={16} /></a>
            <a href={businessInfo.socials.facebook} target="_blank" rel="noreferrer"><Facebook size={16} /></a>
            <button onClick={toggleLang} className="flex items-center gap-1 font-bold border border-queen-gold/30 px-2 py-0.5 rounded-full hover:bg-queen-gold/20 transition">
                <Globe size={14} /> {t.selectLanguage}
            </button>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 w-full bg-white/95 backdrop-blur-md shadow-sm z-40 border-b border-queen-gold/20">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex flex-col items-center leading-none group">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 group-hover:text-queen-rose transition font-serif">QUEEN</h1>
            <span className="text-[10px] tracking-[0.2em] text-queen-gold uppercase">Beauty Center</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                className={`text-sm font-medium hover:text-queen-rose transition flex items-center gap-1 ${location.pathname === link.path ? 'text-queen-rose font-bold' : 'text-gray-600'}`}
              >
                {link.icon && link.icon}
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Link to="/book" className="bg-black text-white px-6 py-2 rounded-full font-medium text-sm hover:bg-queen-rose transition shadow-lg transform hover:-translate-y-0.5">
              {t.bookNow}
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden text-gray-800">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 absolute w-full left-0 shadow-xl py-4 px-6 flex flex-col gap-4 animate-fadeIn">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                className="text-lg font-medium text-gray-800 hover:text-queen-rose flex items-center gap-2"
              >
                 {link.icon && link.icon}
                {link.label}
              </Link>
            ))}
            <Link to="/book" className="bg-queen-rose text-white text-center py-3 rounded-xl font-bold mt-2 shadow-md">
              {t.bookNow}
            </Link>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-queen-cream/30">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-queen-dark text-queen-cream pt-16 pb-8">
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-12">
            
            {/* Column 1: Brand */}
            <div>
                <h3 className="text-2xl font-serif font-bold text-queen-gold mb-4">Queen Beauty</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-6 max-w-xs">
                    {lang === 'en' ? 'Where every woman is treated like royalty. Experience luxury, style, and care in the heart of Amman.' : 'حيث تعامل كل امرأة كملكة. تجربة من الفخامة والأناقة والعناية في قلب عمان.'}
                </p>
                <div className="flex gap-4">
                    <a href={businessInfo.socials.instagramMain} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-queen-rose transition"><Instagram size={18} /></a>
                    <a href={businessInfo.socials.facebook} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-600 transition"><Facebook size={18} /></a>
                    <a href={`tel:${businessInfo.phonePrimary}`} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-green-500 transition"><Phone size={18} /></a>
                </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
                <h4 className="text-lg font-bold mb-6 border-b border-queen-gold/30 pb-2 inline-block">{t.services}</h4>
                <ul className="space-y-3 text-gray-300 text-sm">
                    <li><Link to="/services" className="hover:text-queen-gold transition">Hair Styling & Color</Link></li>
                    <li><Link to="/services" className="hover:text-queen-gold transition">Bridal Makeup</Link></li>
                    <li><Link to="/services" className="hover:text-queen-gold transition">Nail Spa</Link></li>
                    <li><Link to="/ai-studio" className="hover:text-queen-gold transition flex items-center gap-2"><Sparkles size={12}/> AI Studio</Link></li>
                </ul>
            </div>

            {/* Column 3: Contact */}
            <div>
                <h4 className="text-lg font-bold mb-6 border-b border-queen-gold/30 pb-2 inline-block">{t.contact}</h4>
                <ul className="space-y-4 text-gray-300 text-sm">
                    <li className="flex items-start gap-3">
                        <MapPin size={18} className="text-queen-gold mt-1 shrink-0" />
                        <span>{lang === 'en' ? businessInfo.address : businessInfo.addressAr}</span>
                    </li>
                    <li className="flex items-center gap-3">
                        <Phone size={18} className="text-queen-gold shrink-0" />
                        <div className="flex flex-col">
                            <a href={`tel:${businessInfo.phonePrimary}`} className="hover:text-white">{businessInfo.phonePrimary}</a>
                            <a href={`tel:${businessInfo.phoneSecondary}`} className="hover:text-white">{businessInfo.phoneSecondary}</a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div className="container mx-auto px-6 mt-12 pt-8 border-t border-white/10 text-center text-xs text-gray-500">
            <p>&copy; {new Date().getFullYear()} Queen Hair Beauty Center. {t.rightsReserved}</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
