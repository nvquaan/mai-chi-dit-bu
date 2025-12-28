
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Background from './components/Background';
import CustomCursor from './components/CustomCursor';
import GalleryGrid from './components/GalleryGrid';
import Lightbox from './components/Lightbox';
import Timeline from './components/Timeline';
import LoveTimer from './components/LoveTimer';
import { AppView, GalleryImage } from './types';
import { fetchImagesFromCloudinary } from './services/cloudinaryService';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.GALLERY);
  const [activeImage, setActiveImage] = useState<GalleryImage | null>(null);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadImages = useCallback(async () => {
    setIsLoading(true);
    try {
      const fetchedImages = await fetchImagesFromCloudinary();
      setImages(fetchedImages);
    } catch (err) {
      console.error("Failed to load images");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadImages();
  }, [loadImages]);

  return (
    <div className="min-h-screen selection:bg-pink-500/30">
      <CustomCursor />
      <Background />
      <Header currentView={currentView} setView={setCurrentView} />

      <main className="transition-all duration-700 ease-in-out">
        {currentView === AppView.GALLERY ? (
          <>
            <section className="pt-36 md:pt-56 px-6 text-center">
              {/* Top Badge: Refined & Centered */}
              <div className="inline-flex items-center justify-center gap-4 mb-8 md:mb-12 group animate-reveal">
                <div className="w-10 md:w-16 h-[1px] bg-gradient-to-r from-transparent to-pink-500/50"></div>
                <span className="text-[11px] md:text-[15px] text-white font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] leading-none whitespace-nowrap">
                  Hồ Sơ Cá Biệt Phú Xuyên
                </span>
                <div className="w-10 md:w-16 h-[1px] bg-gradient-to-l from-transparent to-pink-500/50"></div>
              </div>
              
              <h1 className="text-5xl sm:text-7xl md:text-[10rem] font-black tracking-tighter mb-10 md:mb-12 font-['Montserrat'] animate-reveal leading-[1] md:leading-[0.85] select-none">
                Mai Chi <span className="text-gradient block md:inline drop-shadow-[0_0_30px_rgba(251,113,133,0.2)]">đít bự</span>
              </h1>

              {/* Real-time Love Timer */}
              <div className="mb-12 md:mb-20">
                <LoveTimer />
              </div>

              {/* Bottom Badge: Clean Tech Style */}
              <div className="flex justify-center items-center mb-20 md:mb-32 animate-reveal" style={{ animationDelay: '0.2s' }}>
                <div className="relative group">
                   <div className="relative flex flex-col items-center">
                      <div className="relative px-8 md:px-14 py-4 md:py-5 bg-white/[0.03] border-y border-white/10 backdrop-blur-md overflow-hidden">
                        {/* Soft glow background */}
                        <div className="absolute inset-0 bg-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        
                        <span className="relative z-10 text-white text-xs md:text-xl font-black uppercase tracking-[0.5em] md:tracking-[0.8em] italic">
                          {isLoading ? 'Retrieving Data...' : 'NGƯỜI ĐÀN BÀ LỰC ĐIỀN'}
                        </span>
                        
                        {/* Sharp corner markers */}
                        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-pink-500/40"></div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-pink-500/40"></div>
                      </div>
                   </div>
                </div>
              </div>
            </section>

            {isLoading ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-4 md:px-12 pb-20">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-60 md:h-80 glass rounded-2xl animate-pulse"></div>
                ))}
              </div>
            ) : images.length > 0 ? (
              <GalleryGrid 
                images={images} 
                onImageClick={setActiveImage} 
              />
            ) : (
              <div className="text-center py-20 flex flex-col items-center gap-8 max-w-2xl mx-auto px-6">
                <div className="relative">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-pink-500/20 flex items-center justify-center animate-pulse">
                     <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-pink-500 opacity-30 md:w-12 md:h-12"><path d="m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.403a2 2 0 0 0-1.858 1.25L5 10l-2-2"/></svg>
                  </div>
                </div>
                <div className="space-y-6">
                  <h3 className="text-2xl md:text-3xl font-bold font-['Montserrat'] tracking-tight uppercase">Kho ảnh đang trống</h3>
                  <button onClick={loadImages} className="px-10 py-4 bg-white text-black text-[10px] font-bold uppercase tracking-[0.2em] rounded-2xl">Thử lại</button>
                </div>
              </div>
            )}
          </>
        ) : (
          <Timeline />
        )}
      </main>

      <Lightbox image={activeImage} onClose={() => setActiveImage(null)} />

      {/* Modern Refined Footer with ORIGINAL content */}
      <footer className="relative py-24 md:py-32 px-6 flex flex-col items-center justify-center border-t border-white/[0.03] mt-20 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-pink-500/5 blur-[100px] rounded-full"></div>
        
        <div className="relative z-10 flex flex-col items-center gap-10 md:gap-14 w-full max-w-4xl">
          {/* Logo & Divider */}
          <div className="flex items-center justify-center gap-6 md:gap-12 w-full">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/10 to-pink-500/20"></div>
            
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 bg-pink-500/20 blur-xl rounded-full animate-pulse"></div>
              <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full glass border border-pink-500/20 flex items-center justify-center group cursor-help transition-all duration-500 hover:border-pink-500/50">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-pink-500 group-hover:scale-125 transition-transform duration-500 drop-shadow-[0_0_8px_rgba(251,113,133,0.6)]">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
            </div>
            
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-white/10 to-pink-500/20"></div>
          </div>

          {/* Text Content - RESTORED ORIGINAL TEXT */}
          <div className="text-center space-y-4 md:space-y-6">
            <h4 className="text-[11px] md:text-[14px] font-black uppercase tracking-[0.4em] md:tracking-[0.6em] text-white/90">
              THE ETERNAL CHAPTERS • OUR JOURNEY
            </h4>
            <div className="flex flex-col gap-2">
              <p className="text-[10px] md:text-[12px] text-gray-400 font-medium tracking-[0.2em] md:tracking-[0.3em] uppercase max-w-lg mx-auto leading-relaxed italic">
                "CHRONICLING A PATH BUILT ON LOVE, GROWTH, AND ENDLESS MOMENTS TOGETHER."
              </p>
              <div className="w-12 h-[1px] bg-pink-500/30 mx-auto mt-4"></div>
            </div>
          </div>

          {/* Legal/System Info */}
          <div className="flex flex-col items-center gap-4 opacity-30">
            <span className="text-[8px] md:text-[9px] uppercase tracking-[0.4em] text-white font-bold">
              Personal Archive • Established 2025
            </span>
            <div className="flex gap-4">
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-pulse"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      </footer>
      
      <style>{`
        @keyframes reveal {
          from { opacity: 0; transform: translateY(30px); filter: blur(10px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        .animate-reveal { animation: reveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};

export default App;
