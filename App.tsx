
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
    // Chỉ cần nhập bất kỳ mã nào >= 4 ký tự để vào
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
                <span className="font-bold uppercase tracking-wider text-xs text-red-300">Hướng dẫn kết nối Cloudinary</span>
              </div>
              <div className="space-y-2 opacity-90 text-[11px] md:text-xs leading-relaxed">
                <p>⚠️ {error}</p>
                <p><strong>Cách sửa:</strong></p>
                <ol className="list-decimal ml-4 space-y-1">
                  <li>Gắn tag <code className="bg-white/10 px-1 rounded">maichi</code> cho các ảnh của bạn.</li>
                  <li>Trong Cloudinary Settings > Security: <strong>Bỏ chọn</strong> mục "Resource list".</li>
                </ol>
              </div>
              <button 
                onClick={() => setError(null)}
                className="text-[10px] uppercase underline mt-2 opacity-60 hover:opacity-100 transition-opacity text-right"
              >
                Đã hiểu
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="min-h-screen">
      <CustomCursor />
      <Background />
      <Header currentView={currentView} setView={setCurrentView} />

      <main className="transition-all duration-700 ease-in-out">
        {currentView === AppView.GALLERY ? (
          <>
            <section className="pt-40 px-6 text-center">
              <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-4 font-['Montserrat'] animate-reveal">
                Mai Chi <span className="text-gradient">Gallery.</span>
              </h1>
              <p className="text-gray-400 text-lg max-w-xl mx-auto mb-10 opacity-70 italic">
                Sử dụng Tag: maichi
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {MOCK_CATEGORIES.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                      selectedCategory === cat 
                      ? 'bg-pink-600 text-white shadow-[0_0_20px_rgba(219,39,119,0.4)] scale-105' 
                      : 'glass text-gray-500 hover:text-white hover:border-pink-500/30'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </section>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-6 md:px-12 pb-20">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-64 glass rounded-2xl animate-pulse bg-white/5"></div>
                ))}
              </div>
            ) : images.length > 0 ? (
              <GalleryGrid 
                images={filteredImages} 
                onImageClick={setActiveImage} 
              />
            ) : (
              <div className="text-center py-20 opacity-30 flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full border border-dashed border-white/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                </div>
                <p className="text-xl tracking-widest uppercase font-light">Chưa có ảnh nào được gắn tag "maichi"</p>
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

      <footer className="py-12 px-6 flex flex-col items-center justify-center gap-6 opacity-40">
        <div className="h-[1px] w-10 bg-pink-500/50"></div>
        <p className="text-[9px] uppercase tracking-widest text-gray-500">Thuộc quyền sở hữu của Anh & Mai Chi • 2024-2025</p>
        <button 
          onClick={() => {
            sessionStorage.removeItem('maichi_authorized');
            window.location.reload();
          }}
          className="text-[10px] uppercase tracking-widest text-pink-400 hover:text-white transition-colors"
        >
          Đăng xuất / Khóa bộ sưu tập
        </button>
      </footer>
      
      <style>{`
        @keyframes reveal {
          from { opacity: 0; transform: translateY(30px); filter: blur(10px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        .animate-reveal { animation: reveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};

export default App;
