
import React from 'react';
import LoveTimer from './LoveTimer';

const TIMELINE_EVENTS = [
  { 
    date: '08/03/2025', 
    title: 'Lần nhắn tin đầu tiên', 
    desc: 'Bắt đầu những dòng tin nhắn làm quen đầu tiên qua lại.' 
  },
  { 
    date: '31/03/2025', 
    title: 'First date', 
    desc: 'Đi ăn pizza rồi đi xem phim. Buổi hẹn đầu khá ổn.' 
  },
  { 
    date: '13/04/2025', 
    title: 'Tỏ tình lần đầu', 
    desc: 'Mở lời nhưng bị từ chối. Một kỷ niệm đáng nhớ.' 
  },
  { 
    date: '20/04/2025', 
    title: 'Chính thức yêu', 
    desc: 'Chốt đơn. Chính thức bắt đầu mối quan hệ.' 
  },
  { 
    date: '05/07/2025', 
    title: 'Chuyến du lịch đầu tiên', 
    desc: 'Chuyến đi xa đầu tiên cùng nhau, có thêm nhiều trải nghiệm mới.' 
  },
];

const Timeline: React.FC = () => {
  return (
    <div className="pt-40 pb-20 px-6 max-w-2xl mx-auto min-h-screen">
      <div className="text-center mb-16 space-y-10 w-full animate-reveal">
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-4 font-['Montserrat']">
            Hành trình <span className="text-gradient">Đồng Hành</span>
          </h2>
          <p className="text-gray-500 text-sm uppercase tracking-[0.2em] font-medium italic">Lưu trữ các mốc thời gian thực tế</p>
        </div>

        {/* Love Timer integration */}
        <div className="py-8 border-y border-white/[0.03] w-full">
          <LoveTimer />
        </div>
      </div>

      {/* Actual Timeline List */}
      <div className="relative border-l border-white/5 ml-4 space-y-10 pb-10">
        {TIMELINE_EVENTS.map((event, idx) => (
          <div key={idx} className="relative pl-10 group animate-reveal" style={{ animationDelay: `${0.2 + idx * 0.1}s` }}>
            {/* Timeline Dot */}
            <div className="absolute -left-[6px] top-2 w-3 h-3 rounded-full bg-white/20 border border-white/10 group-hover:bg-pink-500 group-hover:scale-150 group-hover:shadow-[0_0_15px_#fb7185] transition-all duration-500"></div>
            
            <div className="glass p-6 rounded-2xl border-white/5 hover:border-pink-500/30 transition-all duration-500 hover:translate-x-1 bg-white/[0.01] group-hover:bg-white/[0.02]">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black text-pink-500/60 uppercase tracking-[0.3em]">{event.date}</span>
                <h3 className="text-xl font-bold text-white group-hover:text-pink-100 transition-colors font-['Montserrat'] uppercase tracking-tight">{event.title}</h3>
                <p className="text-gray-400 mt-2 text-sm leading-relaxed font-medium opacity-80">{event.desc}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Ending Marker */}
        <div className="relative pl-10 pt-6 animate-reveal" style={{ animationDelay: '0.8s' }}>
          <div className="absolute -left-[6px] top-8 w-3 h-3 rounded-full bg-pink-500/30 border border-pink-500/50"></div>
          <div className="py-6 px-8 rounded-2xl bg-white/[0.02] border border-dashed border-white/10">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.4em] text-center">
              Còn nữa, sẽ update sau...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
