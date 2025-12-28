
import React from 'react';
import LoveTimer from './LoveTimer';

const Timeline: React.FC = () => {
  return (
    <div className="pt-40 pb-20 px-6 max-w-2xl mx-auto min-h-screen flex flex-col items-center">
      <div className="text-center mb-16 space-y-10 w-full">
        <div className="animate-reveal">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-4 font-['Montserrat']">
            Hành trình <span className="text-gradient">Đồng Hành</span>
          </h2>
          <p className="text-gray-500 text-sm uppercase tracking-[0.2em] font-medium">Lưu trữ các cột mốc quan trọng</p>
        </div>

        {/* Love Timer remains active */}
        <div className="py-8 border-y border-white/[0.03] w-full">
          <LoveTimer />
        </div>
      </div>

      {/* Placeholder for future updates */}
      <div className="w-full flex flex-col items-center gap-12 mt-10 animate-reveal" style={{ animationDelay: '0.3s' }}>
        <div className="relative group">
          <div className="absolute inset-0 bg-pink-500/10 blur-[50px] rounded-full animate-pulse"></div>
          <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full border border-pink-500/20 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-pink-500/40">
              <path d="M12 8v4l3 3"/>
              <circle cx="12" cy="12" r="10"/>
            </svg>
          </div>
        </div>

        <div className="text-center space-y-4">
          <h3 className="text-xl md:text-2xl font-bold font-['Montserrat'] tracking-tight text-white/90">
            Dữ liệu đang được đồng bộ...
          </h3>
          <p className="text-gray-500 text-xs md:text-sm max-w-xs mx-auto leading-relaxed tracking-wide">
            Phần Timeline tạm thời được bảo trì để cập nhật những khoảnh khắc mới nhất. Vui lòng quay lại sau.
          </p>
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full border-white/5 mt-6">
            <div className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-ping"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-pink-400">Status: Updating Later</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
