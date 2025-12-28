
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
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: { 
      duration: 1.2, 
      ease: [0.16, 1, 0.3, 1] 
    }
  },
};

const GalleryGrid: React.FC<GalleryGridProps> = ({ images, onImageClick }) => {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="columns-2 md:columns-2 lg:columns-3 gap-4 md:gap-10 py-10"
    >
      {images.map((image) => (
        <motion.div 
          key={image.id}
          variants={itemVariants}
          className="relative mb-4 md:mb-10 break-inside-avoid group cursor-pointer overflow-hidden rounded-2xl md:rounded-[2.5rem] border-2 md:border-4 border-white shadow-lg hover:shadow-pink-200/60 transition-all duration-700"
          onClick={() => onImageClick(image)}
        >
          <div className="overflow-hidden aspect-[4/5] relative">
            <motion.img 
              src={getCloudinaryUrl(image.url, { width: 1000 })} 
              alt={image.title}
              className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
              loading="lazy"
            />
            
            {/* Soft pink overlay on hover */}
            <div className="absolute inset-0 bg-pink-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-3 md:p-8 bg-gradient-to-t from-black/70 via-black/20 to-transparent md:translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <span className="text-[7px] md:text-[9px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-pink-300 font-bold">{image.category}</span>
            <h3 className="text-xs md:text-lg font-bold text-white tracking-tight leading-tight">{image.title}</h3>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default GalleryGrid;
