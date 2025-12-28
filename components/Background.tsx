
import React from 'react';

const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-[#FFF5F7] overflow-hidden pointer-events-none">
      {/* Moving Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-[#FFD1DC] blur-[120px] rounded-full opacity-60 animate-pulse" style={{ animationDuration: '8s' }}></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#E6E6FA] blur-[100px] rounded-full opacity-60 animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }}></div>
      <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-[#FFFACD] blur-[130px] rounded-full opacity-40 animate-pulse" style={{ animationDuration: '12s', animationDelay: '4s' }}></div>
      
      {/* Sparkles Overlay */}
      <div className="absolute inset-0 opacity-[0.2]" style={{ 
        backgroundImage: 'radial-gradient(circle, #FFB6C1 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }}></div>
    </div>
  );
};

export default Background;
