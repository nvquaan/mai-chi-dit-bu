
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/95 backdrop-blur-3xl"
            onClick={onClose}
          />
          
          <motion.button 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-8 right-8 z-[110] glass p-3 rounded-full hover:bg-white/10 transition-colors"
            onClick={onClose}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </motion.button>

          <motion.div 
            layoutId={`container-${image.id}`}
            className="relative max-w-6xl w-full h-full flex flex-col md:flex-row gap-8 items-center justify-center z-[105] pointer-events-none"
          >
            <div className="flex-1 h-full max-h-[85vh] flex items-center justify-center pointer-events-auto">
              <motion.img 
                layoutId={`image-${image.id}`}
                src={getCloudinaryUrl(image.url)} 
                alt={image.title} 
                className="max-w-full max-h-full object-contain rounded-xl shadow-2xl border border-white/10"
              />
            </div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: 0.2 }}
              className="w-full md:w-96 space-y-6 pointer-events-auto"
            >
              <div>
                <span className="text-pink-400 font-bold uppercase tracking-widest text-xs">{image.category}</span>
                <h2 className="text-4xl font-extrabold mt-2 tracking-tight font-['Montserrat'] leading-tight">{image.title}</h2>
                <div className="flex items-center gap-3 mt-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 shadow-lg shadow-pink-500/20"></div>
                  <div>
                    <p className="text-sm font-semibold">{image.artist}</p>
                    <p className="text-xs text-gray-500">Bị bắt nạt bởi Mai Chi</p>
                  </div>
                </div>
              </div>

              <div className="p-6 glass rounded-2xl space-y-4 border-white/5">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500 font-medium">Resolution</span>
                  <span className="text-white font-bold">{image.width} × {image.height}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500 font-medium">Status</span>
                  <span className="text-pink-400 font-bold">Cloudinary Optimized</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500 font-medium">Archive Date</span>
                  <span className="text-white font-bold">2024-12-05</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button className="py-4 px-4 bg-white text-black text-xs font-bold rounded-xl hover:bg-pink-400 transition-colors uppercase tracking-widest">
                  Save Image
                </button>
                <button className="py-4 px-4 glass text-white text-xs font-bold rounded-xl hover:bg-white/10 transition-colors uppercase tracking-widest">
                  Share
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
