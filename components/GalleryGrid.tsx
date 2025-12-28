
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { GalleryImage } from '../types';
import { getCloudinaryUrl } from '../services/cloudinaryService';

interface GalleryGridProps {
  images: GalleryImage[];
  onImageClick: (image: GalleryImage) => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

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
      className="columns-2 md:columns-2 lg:columns-3 xl:columns-4 gap-2 md:gap-4 px-3 md:px-12 pt-8 md:pt-16 pb-20"
    >
      {images.map((image) => (
        <motion.div 
          key={image.id}
          variants={itemVariants}
          layoutId={`container-${image.id}`}
          className="relative mb-2 md:mb-4 break-inside-avoid group cursor-pointer overflow-hidden rounded-xl md:rounded-2xl bg-gray-900 border border-white/5 shadow-xl transition-all duration-500 hover:border-pink-500/30"
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
            className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent flex flex-col justify-end p-3 md:p-6 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              <span className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] text-pink-400 font-bold">{image.category}</span>
              <h3 className="text-sm md:text-lg font-bold mt-0.5 text-white leading-tight line-clamp-2">{image.title}</h3>
              <p className="text-[9px] md:text-xs text-gray-400 mt-1 opacity-70 italic">by {image.artist}</p>
            </div>
          </motion.div>

          {/* Persistent metadata overlay for mobile touch visibility */}
          <div className="md:hidden absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
             <h3 className="text-[10px] font-bold text-white/90 line-clamp-1 uppercase tracking-wider">{image.title}</h3>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default GalleryGrid;
