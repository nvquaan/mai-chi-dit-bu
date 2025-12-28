
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { GalleryImage } from '../types';
import { getCloudinaryUrl } from '../services/cloudinaryService';

interface GalleryGridProps {
  images: GalleryImage[];
  onImageClick: (image: GalleryImage) => void;
}

// Explicitly type container variants to ensure compatibility with motion components
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Explicitly type item variants and cast ease array to tuple to resolve 'number[]' vs 'Easing' mismatch
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number] 
    }
  },
};

const GalleryGrid: React.FC<GalleryGridProps> = ({ images, onImageClick }) => {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 px-6 md:px-12 pt-32 pb-20"
    >
      {images.map((image) => (
        <motion.div 
          key={image.id}
          variants={itemVariants}
          layoutId={`container-${image.id}`}
          className="relative mb-4 break-inside-avoid group cursor-pointer overflow-hidden rounded-2xl bg-gray-900 border border-white/5 shadow-2xl transition-all duration-500 hover:border-pink-500/30"
          onClick={() => onImageClick(image)}
        >
          <motion.img 
            layoutId={`image-${image.id}`}
            src={getCloudinaryUrl(image.url, { width: 800 })} 
            alt={image.title}
            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6"
          >
            <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              <span className="text-[10px] uppercase tracking-[0.2em] text-pink-400 font-bold">{image.category}</span>
              <h3 className="text-lg font-bold mt-1 text-white leading-tight">{image.title}</h3>
              <p className="text-xs text-gray-400 mt-1 opacity-70">by {image.artist}</p>
            </div>
            
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
              <div className="glass p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default GalleryGrid;
