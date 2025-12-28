
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Background from './components/Background';
import CustomCursor from './components/CustomCursor';
import GalleryGrid from './components/GalleryGrid';
import Lightbox from './components/Lightbox';
import Timeline from './components/Timeline';
import Gatekeeper from './components/Gatekeeper';
import PromptGenerator from './components/PromptGenerator';
import { AppView, GalleryImage } from './types';
import { MOCK_CATEGORIES } from './constants';
import { fetchImagesFromCloudinary } from './services/cloudinaryService';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.GALLERY);
  const [selectedCategory, setSelectedCategory] = useState('Tất Cả');
  const [activeImage, setActiveImage] = useState<GalleryImage | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadImages = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedImages = await fetchImagesFromCloudinary();
      setImages(fetchedImages);
      setIsAuthorized(true);
      sessionStorage.setItem('maichi_authorized', 'true');
    } catch (err: any) {
      console.error("App load error:", err);
      setError(err.message);
      setIsAuthorized(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const isAuth = sessionStorage.getItem('maichi_authorized');
    if (isAuth === 'true') {
      loadImages();
    }
  }, [loadImages]);

  const handleUnlock = (passcode: string) => {
    if (passcode.length >= 4) {
      loadImages();
    }
  };

  const filteredImages = useMemo(() => {
    if (selectedCategory === 'Tất Cả') return images;
    return images.filter(img => img.category === selectedCategory);
  }, [selectedCategory, images]);

  if (!isAuthorized && !isLoading) {
    return (
      <>
        <CustomCursor />
        <Background />
        <Gatekeeper onUnlock={handleUnlock} />
        {error && (
          <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[10001] glass px-8 py-5 rounded-3xl border-red-500/50 text-red-400 text-sm font-medium max-w-[90vw] md:max-w-lg shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                </div>
                <span className="font-bold uppercase tracking-wider text-xs text-red-300">Sync Error</span>
              </div>
              <p className="opacity-80 leading-relaxed text-[11px] md:text-xs">
                {error}. Kiểm tra lại cấu hình <b>Vercel Environment</b> hoặc Tag Cloudinary.
              </p>
              <button 
                onClick={() => setError(null)}
                className="text-[9px] uppercase font-bold text-pink-400 hover:text-white transition-colors text-right"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="min-h-screen selection:bg-pink-500/30">
      <CustomCursor />
      <Background />
      <Header currentView={currentView} setView={setCurrentView} />

      <main className="transition-all duration-700 ease-in-out">
        {currentView === AppView.GALLERY ? (
          <>
            <section className="pt-48 px-6 text-center">
              <div className="inline-block px-4 py-1 glass rounded-full mb-6 border-pink-500/20">
                <span className="text-[10px] text-pink-400 font-bold uppercase tracking-[0.4em]">Digital Heritage</span>
              </div>
              <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter mb-8 font-['Montserrat'] animate-reveal leading-none">
                M.CHI <span className="text-gradient">25.</span>
              </h1>
              <p className="text-gray-500 text-sm max-w-lg mx-auto mb-16 opacity-60 font-light tracking-widest uppercase">
                Tag Filtered: maichi • Cloudinary Native
              </p>
              
              <div className="flex flex-wrap justify-center gap-3 mb-20 max-w-2xl mx-auto">
                {MOCK_CATEGORIES.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-8 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500 ${
                      selectedCategory === cat 
                      ? 'bg-white text-black shadow-[0_20px_40px_rgba(255,255,255,0.1)] scale-105' 
                      : 'glass text-gray-500 hover:text-white hover:border-white/20'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </section>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-6 md:px-12 pb-20">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-80 glass rounded-[2rem] animate-pulse"></div>
                ))}
              </div>
            ) : images.length > 0 ? (
              <GalleryGrid 
                images={filteredImages} 
                onImageClick={setActiveImage} 
              />
            ) : (
              <div className="text-center py-40 opacity-20 flex flex-col items-center gap-6">
                <div className="w-20 h-20 rounded-full border border-dashed border-white/10 flex items-center justify-center animate-pulse">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
                </div>
                <p className="text-xs tracking-[0.5em] uppercase font-light">No Assets Synchronized</p>
              </div>
            )}
          </>
        ) : currentView === AppView.TIMELINE ? (
          <Timeline />
        ) : (
          <PromptGenerator />
        )}
      </main>

      <Lightbox image={activeImage} onClose={() => setActiveImage(null)} />

      <footer className="py-20 px-6 flex flex-col items-center justify-center gap-8 border-t border-white/[0.02] mt-20">
        <div className="flex items-center gap-10 opacity-30">
          <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-white"></div>
          <div className="text-[10px] font-bold tracking-[0.5em] uppercase">Archive Core</div>
          <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-white"></div>
        </div>
        <div className="text-center space-y-2">
          <p className="text-[9px] uppercase tracking-[0.4em] text-gray-600">Created with Passion for Mai Chi</p>
          <p className="text-[8px] uppercase tracking-[0.3em] text-gray-700">© 2024-2025 • All Rights Reserved</p>
        </div>
        <button 
          onClick={() => {
            sessionStorage.removeItem('maichi_authorized');
            window.location.reload();
          }}
          className="text-[9px] uppercase tracking-[0.5em] text-pink-500/50 hover:text-pink-500 transition-colors font-bold"
        >
          Relock Gallery
        </button>
      </footer>
      
      <style>{`
        @keyframes reveal {
          from { opacity: 0; transform: translateY(50px); filter: blur(20px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        .animate-reveal { animation: reveal 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};

export default App;
