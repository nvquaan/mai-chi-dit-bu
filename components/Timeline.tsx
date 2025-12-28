
import React from 'react';
import LoveTimer from './LoveTimer';

const TIMELINE_EVENTS = [
  { 
    date: '08 Mar 2025', 
    title: 'Initial Connection', 
    desc: 'Bắt đầu những dòng tin nhắn làm quen đầu tiên qua lại.',
    color: 'bg-rose-100'
  },
  { 
    date: '31 Mar 2025', 
    title: 'The First Encounter', 
    desc: 'Đi ăn pizza rồi đi xem phim. Buổi hẹn đầu khá ổn.',
    color: 'bg-purple-100'
  },
  { 
    date: '13 Apr 2025', 
    title: 'A Confession', 
    desc: 'Mở lời nhưng bị từ chối. Một kỷ niệm đáng nhớ.',
    color: 'bg-amber-100'
  },
  { 
    date: '20 Apr 2025', 
    title: 'Official Union', 
    desc: 'Chốt đơn. Chính thức bắt đầu mối quan hệ.',
    color: 'bg-pink-100'
  },
  { 
    date: '05 Jul 2025', 
    title: 'The First Journey', 
    desc: 'Chuyến đi xa đầu tiên cùng nhau, có thêm nhiều trải nghiệm mới.',
    color: 'bg-blue-100'
  },
];

const Timeline: React.FC = () => {
  return (
    <div className="pt-48 pb-40 px-6 max-w-4xl mx-auto min-h-screen">
      <div className="text-center mb-32 space-y-6 animate-reveal">
        <span className="text-script text-3xl text-pink-400 block">Our Love Story</span>
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-serif text-romantic">
          Hành trình Kỷ niệm
        </h2>
        <div className="flex items-center justify-center gap-4">
           <div className="w-12 h-[1px] bg-pink-200"></div>
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#FFB6C1"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
           <div className="w-12 h-[1px] bg-pink-200"></div>
        </div>
      </div>

      <div className="relative border-l-2 border-dashed border-pink-200 ml-4 space-y-20">
        {TIMELINE_EVENTS.map((event, idx) => (
          <div key={idx} className="relative pl-12 group animate-reveal" style={{ animationDelay: `${idx * 0.2}s` }}>
            {/* Timeline Heart Marker */}
            <div className="absolute -left-[11px] top-0 w-5 h-5 bg-white rounded-full border-2 border-pink-300 flex items-center justify-center group-hover:scale-125 transition-transform shadow-sm">
               <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
            </div>

            <div className={`p-8 rounded-[2rem] border border-pink-100 transition-all duration-500 hover:shadow-xl hover:shadow-pink-200/50 hover:-translate-y-2 glass relative overflow-hidden`}>
              {/* Decorative background circle */}
              <div className={`absolute top-[-20%] right-[-10%] w-32 h-32 ${event.color} rounded-full blur-[40px] opacity-40`}></div>
              
              <div className="relative">
                <span className="text-script text-xl text-pink-400 block mb-2">{event.date}</span>
                <h3 className="text-2xl font-black tracking-tight text-gray-800 mb-4">{event.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed font-medium">{event.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-48 text-center animate-reveal">
         <div className="inline-block py-6 px-12 glass rounded-full border border-pink-100 animate-float">
            <p className="text-script text-2xl text-pink-400">Vẫn còn tiếp tục...</p>
         </div>
      </div>
    </div>
  );
};

export default Timeline;
