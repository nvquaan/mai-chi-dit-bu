
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
    <div className="min-h-screen selection:bg-pink-200">
      <CustomCursor />
      <Background />
      <Header currentView={currentView} setView={setCurrentView} />

      <main className="transition-all duration-1000 ease-in-out">
        {currentView === AppView.GALLERY ? (
          <>
            <section className="pt-48 md:pt-64 px-6 text-center max-w-6xl mx-auto">
              <div className="flex flex-col items-center mb-16 md:mb-32">
                <div className="animate-float mb-8">
                   <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="#FF758C"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                </div>
                
                <h1 className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter mb-6 text-serif leading-[0.85] select-none text-romantic drop-shadow-sm">
                  Mai Chi <span className="italic block md:inline font-normal opacity-90 text-script text-pink-400">đít bự</span>
                </h1>
                
                <div className="max-w-xl mx-auto space-y-8 mt-4 animate-reveal" style={{ animationDelay: '0.3s' }}>
                  <p className="text-[10px] md:text-xs uppercase tracking-[0.5em] font-black text-pink-400">
                    Bảo Tàng Kỷ Niệm • Bloom Edition
                  </p>
                  
                  <div className="glass px-10 py-12 rounded-[3rem] border-pink-100/50 shadow-2xl shadow-pink-200/40">
                    <LoveTimer />
                  </div>
                </div>
              </div>
            </section>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-6 md:px-20 pb-20">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="aspect-[3/4] bg-white/40 rounded-[2.5rem] border-4 border-white animate-pulse"></div>
                ))}
              </div>
            ) : images.length > 0 ? (
              <div className="px-6 md:px-20 pb-40">
                <GalleryGrid 
                  images={images} 
                  onImageClick={setActiveImage} 
                />
              </div>
            ) : (
              <div className="text-center py-40 flex flex-col items-center gap-8 animate-reveal">
                <h3 className="text-serif text-3xl italic text-pink-300">Archive is blooming...</h3>
                <button onClick={loadImages} className="px-8 py-3 bg-pink-500 text-white rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:bg-pink-600 shadow-lg transition-all">Reload Collection</button>
              </div>
            )}
          </>
        ) : (
          <Timeline />
        )}
      </main>

      <Lightbox image={activeImage} onClose={() => setActiveImage(null)} />

      {/* Romantic Footer */}
      <footer className="py-32 px-10 flex flex-col items-center glass border-t-2 border-white mt-40 rounded-t-[5rem]">
        <div className="max-w-7xl w-full flex flex-col md:flex-row justify-between items-center gap-12 md:gap-0">
          <div className="text-center md:text-left space-y-3">
             <div className="text-3xl font-black text-script text-pink-500">M.C Archive</div>
             <p className="text-[9px] uppercase tracking-[0.4em] text-pink-300 font-bold italic">Always blooming with love</p>
          </div>
          
          <div className="flex flex-col items-center gap-4">
             <div className="w-16 h-16 rounded-full glass border-2 border-pink-200 flex items-center justify-center animate-float">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#FF758C"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
             </div>
             <p className="text-[10px] uppercase tracking-[0.5em] font-black text-pink-400">Since April 2025</p>
          </div>
          
          <div className="text-center md:text-right text-[10px] uppercase tracking-[0.2em] space-y-2 font-bold text-gray-400">
            <p className="text-pink-400">Made for Mai Chi</p>
            <p>Digital Archive v1.2</p>
          </div>
        </div>
      </footer>
      
      <style>{`
        @keyframes reveal {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-reveal { animation: reveal 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};

export default App;
