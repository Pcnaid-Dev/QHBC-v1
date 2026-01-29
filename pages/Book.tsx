import React, { useState } from 'react';
import { businessInfo } from '../data/business';
import { translations } from '../data/i18n';
import { Language, ServiceCategory } from '../types';
import { services } from '../data/services';
import { Calendar, Clock, CheckCircle } from 'lucide-react';

interface BookProps {
  lang: Language;
}

const Book: React.FC<BookProps> = ({ lang }) => {
  const t = translations[lang];
  const [formData, setFormData] = useState({
      name: '',
      phone: '',
      serviceId: '',
      date: '',
      time: '',
      notes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitted(true);
  };

  const selectedService = services.find(s => s.id === formData.serviceId);
  const serviceName = selectedService ? (lang === 'en' ? selectedService.nameEn : selectedService.nameAr) : 'General Inquiry';

  const constructMessage = () => {
      const msg = `Hello Queen Beauty, I would like to book an appointment:
      \nName: ${formData.name}
      \nPhone: ${formData.phone}
      \nService: ${serviceName}
      \nDate: ${formData.date}
      \nTime: ${formData.time}
      \nNotes: ${formData.notes}`;
      return encodeURIComponent(msg);
  };

  const whatsappLink = `https://wa.me/${businessInfo.phonePrimary.replace(/\D/g,'')}?text=${constructMessage()}`;

  return (
    <div className="container mx-auto px-6 py-12 max-w-2xl">
      <div className="text-center mb-10">
          <h1 className="text-4xl font-serif font-bold text-queen-dark mb-4">{t.bookNow}</h1>
          <p className="text-gray-600">{lang === 'en' ? 'Secure your spot for a royal treatment.' : 'احجزي موعدك الآن واستمتعي بخدماتنا الملكية.'}</p>
      </div>

      {!submitted ? (
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
              <div className="space-y-6">
                  {/* Name & Phone */}
                  <div className="grid md:grid-cols-2 gap-6">
                      <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">{t.formName}</label>
                          <input required name="name" onChange={handleChange} className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-queen-gold outline-none" placeholder="Jane Doe" />
                      </div>
                      <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">{t.formPhone}</label>
                          <input required name="phone" type="tel" onChange={handleChange} className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-queen-gold outline-none" placeholder="079 000 0000" />
                      </div>
                  </div>

                  {/* Service */}
                  <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">{t.formService}</label>
                      <select name="serviceId" onChange={handleChange} className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-queen-gold outline-none bg-white">
                          <option value="">{lang === 'en' ? '-- Select Service --' : '-- اختاري الخدمة --'}</option>
                          {services.map(s => (
                              <option key={s.id} value={s.id}>{lang === 'en' ? s.nameEn : s.nameAr} - {s.priceStart} {t.price}+</option>
                          ))}
                      </select>
                  </div>

                  {/* Date & Time */}
                  <div className="grid md:grid-cols-2 gap-6">
                      <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">{t.formDate}</label>
                          <input required name="date" type="date" onChange={handleChange} className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-queen-gold outline-none" />
                      </div>
                      <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">Time (approx)</label>
                          <input name="time" type="time" onChange={handleChange} className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-queen-gold outline-none" />
                      </div>
                  </div>

                   {/* Notes */}
                   <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">{t.formNotes}</label>
                      <textarea name="notes" onChange={handleChange} className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-queen-gold outline-none h-24"></textarea>
                  </div>

                  <button type="submit" className="w-full bg-queen-dark text-white py-4 rounded-xl font-bold text-lg hover:bg-black transition shadow-lg">
                      {t.submitBooking}
                  </button>
              </div>
          </form>
      ) : (
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-green-100 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="text-green-600 w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold mb-4">{lang === 'en' ? 'Almost Done!' : 'باقي خطوة صغيرة!'}</h2>
              <p className="text-gray-600 mb-8">{lang === 'en' ? 'Send the details via WhatsApp to confirm your appointment instantly.' : 'أرسلي التفاصيل عبر واتساب لتأكيد موعدك فوراً.'}</p>
              
              <a href={whatsappLink} target="_blank" rel="noreferrer" className="block w-full bg-[#25D366] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#20bd5a] transition shadow-lg mb-4">
                  {t.sendWhatsapp}
              </a>
               <button onClick={() => setSubmitted(false)} className="text-gray-400 underline hover:text-gray-600 text-sm">
                  {lang === 'en' ? 'Edit Details' : 'تعديل التفاصيل'}
              </button>
          </div>
      )}
    </div>
  );
};

export default Book;
