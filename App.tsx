import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Book from './pages/Book';
import AITryOnStudio from './components/AITryOnStudio';
import { Language } from './types';

// Placeholder pages for simpler implementation
const PlaceholderPage = ({ title }: { title: string }) => (
    <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl font-serif font-bold text-queen-dark mb-4">{title}</h1>
        <p className="text-gray-500">Content coming soon...</p>
    </div>
);

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('ar');

  return (
    <Router>
      <Layout lang={lang} setLang={setLang}>
        <Routes>
          <Route path="/" element={<Home lang={lang} />} />
          <Route path="/book" element={<Book lang={lang} />} />
          <Route path="/ai-studio" element={<AITryOnStudio lang={lang} />} />
          <Route path="/services" element={<PlaceholderPage title="Services" />} />
          <Route path="/offers" element={<PlaceholderPage title="Offers" />} />
          <Route path="/gallery" element={<PlaceholderPage title="Gallery" />} />
          <Route path="/contact" element={<PlaceholderPage title="Contact" />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
