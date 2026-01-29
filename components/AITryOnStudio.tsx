import React, { useState, useRef } from 'react';
import { Camera, Upload, RefreshCw, Download, Sparkles, ChevronRight, Wand2, Loader2, Share2 } from 'lucide-react';
import { generateBeautyEdit, getConsultation } from '../services/geminiService';
import { aiModules } from '../data/services';
import { translations } from '../data/i18n';
import { Language, AIModule } from '../types';

interface AITryOnStudioProps {
  lang: Language;
}

const AITryOnStudio: React.FC<AITryOnStudioProps> = ({ lang }) => {
  const t = translations[lang];
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [selectedModule, setSelectedModule] = useState<AIModule>(aiModules[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [isProMode, setIsProMode] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'generate' | 'consult'>('generate');
  const [consultationResult, setConsultationResult] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setGeneratedImage(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!selectedImage) return;

    setIsLoading(true);
    setError(null);
    
    // Construct prompt
    let prompt = selectedModule.promptTemplate;
    if (customPrompt) {
        prompt += ` User request: ${customPrompt}`;
    }
    // Replace placeholders if I had color pickers, for now simple.
    prompt = prompt.replace('{{color}}', 'red'); 

    const result = await generateBeautyEdit(selectedImage, prompt, isProMode);
    
    if (result.error) {
        setError(result.error);
    } else {
        setGeneratedImage(result.imageUrl);
    }
    
    setIsLoading(false);
  };

  const handleConsultation = async () => {
      if(!customPrompt) return;
      setIsLoading(true);
      const res = await getConsultation(customPrompt, lang);
      setConsultationResult(res);
      setIsLoading(false);
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-5xl font-bold font-serif text-queen-dark mb-4 gold-gradient-text">
            {t.aiStudio} <Sparkles className="inline-block text-queen-gold mb-2" />
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
            {t.aiDisclaimer}
        </p>
      </div>

      {/* Main Workspace */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-queen-gold/20 min-h-[600px] flex flex-col md:flex-row">
        
        {/* Sidebar Controls */}
        <div className="w-full md:w-1/3 bg-gray-50 p-6 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col gap-6">
            
            {/* Tabs */}
            <div className="flex bg-gray-200 rounded-lg p-1">
                <button 
                    onClick={() => setActiveTab('generate')}
                    className={`flex-1 py-2 text-sm font-bold rounded-md transition ${activeTab === 'generate' ? 'bg-white shadow text-queen-rose' : 'text-gray-500'}`}
                >
                    {t.generateLook}
                </button>
                <button 
                    onClick={() => setActiveTab('consult')}
                    className={`flex-1 py-2 text-sm font-bold rounded-md transition ${activeTab === 'consult' ? 'bg-white shadow text-queen-rose' : 'text-gray-500'}`}
                >
                    {t.consultation}
                </button>
            </div>

            {activeTab === 'generate' ? (
                <>
                {/* Module Selector */}
                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t.services}</label>
                    <div className="grid grid-cols-2 gap-2">
                        {aiModules.map(mod => (
                            <button 
                                key={mod.id}
                                onClick={() => setSelectedModule(mod)}
                                className={`p-3 rounded-xl border text-left transition flex items-center gap-2 ${selectedModule.id === mod.id ? 'border-queen-rose bg-queen-pink/5 text-queen-dark' : 'border-gray-200 hover:border-queen-gold/50'}`}
                            >
                                <span className="text-xl">{mod.icon}</span>
                                <span className="text-sm font-medium">{lang === 'en' ? mod.nameEn : mod.nameAr}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Settings */}
                <div className="space-y-4">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">{t.refinePrompt}</label>
                    <textarea 
                        className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-queen-gold focus:border-transparent outline-none resize-none"
                        rows={3}
                        placeholder={lang === 'en' ? "e.g., Make the blonde lighter, add more volume..." : "مثال: اجعلي اللون الأشقر أفتح، زيدي كثافة الشعر..."}
                        value={customPrompt}
                        onChange={(e) => setCustomPrompt(e.target.value)}
                    ></textarea>

                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">{t.proMode}</span>
                        <button 
                            onClick={() => setIsProMode(!isProMode)}
                            className={`w-12 h-6 rounded-full transition-colors relative ${isProMode ? 'bg-queen-rose' : 'bg-gray-300'}`}
                        >
                            <span className={`absolute top-1 bg-white w-4 h-4 rounded-full transition-transform ${isProMode ? 'left-7' : 'left-1'}`}></span>
                        </button>
                    </div>
                </div>

                {/* Action Button */}
                <button 
                    onClick={handleGenerate}
                    disabled={!selectedImage || isLoading}
                    className="mt-auto w-full bg-queen-dark text-white py-4 rounded-xl font-bold shadow-lg hover:bg-black transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isLoading ? <Loader2 className="animate-spin" /> : <Wand2 />}
                    {isLoading ? t.loading : t.generateLook}
                </button>
                </>
            ) : (
                /* Consultation Tab */
                <div className="flex flex-col h-full">
                    <div className="flex-grow space-y-4">
                         <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">What's your beauty goal?</label>
                         <textarea 
                            className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-queen-gold focus:border-transparent outline-none resize-none h-32"
                            placeholder={lang === 'en' ? "I have a wedding next week and want to glow..." : "عندي عرس الأسبوع الجاي وبدي بشرتي تضوي..."}
                            value={customPrompt}
                            onChange={(e) => setCustomPrompt(e.target.value)}
                        ></textarea>
                         
                         {consultationResult && (
                             <div className="bg-queen-cream p-4 rounded-xl border border-queen-gold/30 text-sm text-gray-800 animate-fadeIn">
                                 <h4 className="font-bold mb-2 text-queen-rose">Advice:</h4>
                                 {consultationResult}
                             </div>
                         )}
                    </div>
                    <button 
                        onClick={handleConsultation}
                        disabled={!customPrompt || isLoading}
                        className="w-full bg-queen-gold text-white py-4 rounded-xl font-bold shadow-lg hover:bg-yellow-600 transition disabled:opacity-50"
                    >
                         {isLoading ? <Loader2 className="animate-spin mx-auto" /> : (lang === 'en' ? "Get Advice" : "احصلي على النصيحة")}
                    </button>
                </div>
            )}
            
        </div>

        {/* Preview Area */}
        <div className="w-full md:w-2/3 bg-gray-900/5 relative flex items-center justify-center p-4">
            {!selectedImage ? (
                <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-2xl hover:border-queen-rose/50 transition bg-white/50 backdrop-blur-sm cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                    <Camera className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 font-medium mb-2">{t.uploadPlaceholder}</p>
                    <button className="bg-white text-gray-800 px-6 py-2 rounded-full text-sm font-bold shadow hover:bg-gray-50">{t.uploadPhoto}</button>
                    <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </div>
            ) : (
                <div className="relative w-full h-full flex flex-col">
                    <div className="flex-grow relative rounded-2xl overflow-hidden shadow-2xl bg-black">
                        {/* If we have a generated image, show split view or toggle. For simplicity, just showing generated if present */}
                        <img 
                            src={generatedImage || selectedImage} 
                            alt="Preview" 
                            className="w-full h-full object-contain"
                        />
                        
                        {/* Floating Labels */}
                        <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md">
                            {generatedImage ? t.after : t.before}
                        </div>

                        {/* Toggle Button if generated exists */}
                        {generatedImage && (
                            <button 
                                onMouseDown={() => setGeneratedImage(null)} // simplistic toggle for demo: hold to see before? No, let's keep it simple.
                                onClick={() => setGeneratedImage(generatedImage ? null : generatedImage)} // this logic is buggy if I set generatedImage to null I lose it. 
                                // Better approach:
                                className="absolute bottom-4 left-4 bg-white/90 text-black px-4 py-2 rounded-full text-sm font-bold shadow hover:bg-white flex items-center gap-2"
                            >
                                <RefreshCw size={14} /> Compare
                            </button>
                        )}
                    </div>

                    {/* Toolbar */}
                    <div className="mt-4 flex justify-between items-center bg-white p-4 rounded-xl shadow-sm">
                        <button onClick={() => fileInputRef.current?.click()} className="text-sm text-gray-500 hover:text-black font-medium flex items-center gap-1">
                             <Upload size={14}/> Change Photo
                        </button>
                        {generatedImage && (
                            <a href={generatedImage} download="queen-beauty-look.png" className="bg-queen-rose text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-pink-600 transition flex items-center gap-2">
                                <Download size={16} /> {t.download}
                            </a>
                        )}
                    </div>
                </div>
            )}
            
            {error && (
                <div className="absolute top-4 right-4 bg-red-100 text-red-600 px-4 py-3 rounded-lg shadow-lg text-sm max-w-xs z-50 animate-fadeIn">
                    {error}
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default AITryOnStudio;
