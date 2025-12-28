
import React, { useEffect, useState } from 'react';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('.interactive') ||
        target.closest('button') ||
        target.closest('a')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <div 
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] transition-transform duration-300 ease-out flex items-center justify-center"
        style={{ 
          transform: `translate(${position.x - 16}px, ${position.y - 16}px) scale(${isHovering ? 2.5 : 1})`,
        }}
      >
        <div className={`w-3 h-3 rounded-full bg-pink-400 shadow-[0_0_15px_rgba(255,182,193,0.8)] transition-all duration-300 ${isHovering ? 'opacity-20' : 'opacity-100'}`}></div>
        <div className={`absolute w-full h-full rounded-full border-2 border-pink-300/30 transition-all duration-300 ${isHovering ? 'opacity-100 scale-100 bg-pink-200/20' : 'opacity-0 scale-0'}`}></div>
        
        {/* Magic Sparkle for hovering */}
        {isHovering && (
           <div className="absolute animate-ping">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="#FFB6C1"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
           </div>
        )}
      </div>
    </>
  );
};

export default CustomCursor;
