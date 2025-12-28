
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GalleryImage } from '../types';
import { getCloudinaryUrl } from '../services/cloudinaryService';

interface LightboxProps {
  image: GalleryImage | null;
  onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ image, onClose }) => {
  useEffect(() => {
    if (image) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [image]);

  return (
    <AnimatePresence>
      {image && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto overflow-x-hidden md:overflow-hidden bg-black/95 md:backdrop-blur-3xl">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
            onClick={onClose}
          />
          
          <motion.button 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed top-4 right-4 md:top-8 md:right-8 z-[110] glass p-2.5 md:p-3 rounded-full hover:bg-white/10 transition-colors"
            onClick={onClose}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-6 md:h-6"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </motion.button>

          <motion.div 
            layoutId={`container-${image.id}`}
            className="relative w-full min-h-full flex flex-col md:flex-row gap-6 md:gap-12 items-center justify-center p-6 md:p-12 z-[105]"
          >
            {/* Image Section */}
            <div className="w-full flex-1 flex items-center justify-center">
              <motion.img 
                layoutId={`image-${image.id}`}
                src={getCloudinaryUrl(image.url)} 
                alt={image.title} 
                className="max-w-full max-h-[70vh] md:max-h-[85vh] object-contain rounded-xl shadow-2xl border border-white/10"
              />
            </div>

            {/* Info Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.15 }}
              className="w-full md:w-[400px] space-y-5 md:space-y-8 bg-black/40 md:bg-transparent p-4 md:p-0 rounded-3xl md:rounded-none backdrop-blur-md md:backdrop-blur-none"
            >
              <div className="space-y-2 md:space-y-3">
                <span className="text-pink-400 font-bold uppercase tracking-widest text-[10px] md:text-xs">{image.category}</span>
                <h2 className="text-2xl md:text-5xl font-extrabold tracking-tight font-['Montserrat'] leading-tight">{image.title}</h2>
                <div className="flex items-center gap-3 pt-2">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 shadow-lg shadow-pink-500/20"></div>
                  <div>
                    <p className="text-xs md:text-sm font-semibold">{image.artist}</p>
                    <p className="text-[10px] md:text-xs text-gray-500 italic">"Người đàn bà lực điền"</p>
                  </div>
                </div>
              </div>

              <div className="p-5 md:p-6 glass rounded-2xl space-y-3 md:space-y-4 border-white/5 bg-white/[0.01]">
                <div className="flex justify-between text-[10px] md:text-xs">
                  <span className="text-gray-500 font-medium">Kích thước</span>
                  <span className="text-white font-bold">{image.width} × {image.height}</span>
                </div>
                <div className="flex justify-between text-[10px] md:text-xs">
                  <span className="text-gray-500 font-medium">Trạng thái</span>
                  <span className="text-pink-400 font-bold">Cloudinary Optimized</span>
                </div>
                <div className="flex justify-between text-[10px] md:text-xs">
                  <span className="text-gray-500 font-medium">Lưu trữ lúc</span>
                  <span className="text-white font-bold">Tháng 12, 2024</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pb-8 md:pb-0">
                <button className="py-3.5 md:py-4 px-4 bg-white text-black text-[10px] md:text-xs font-black rounded-xl hover:bg-pink-400 transition-colors uppercase tracking-widest shadow-xl">
                  Lưu ảnh
                </button>
                <button className="py-3.5 md:py-4 px-4 glass text-white text-[10px] md:text-xs font-black rounded-xl hover:bg-white/10 transition-colors uppercase tracking-widest">
                  Chia sẻ
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Lightbox;
