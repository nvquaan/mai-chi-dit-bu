
import React from 'react';
import LoveTimer from './LoveTimer';

const TIMELINE_EVENTS = [
  { 
    date: '08 Tháng 3, 2025', 
    title: 'Sợi dây kết nối', 
    desc: 'Bắt đầu những dòng tin nhắn làm quen đầu tiên, những rung động nhẹ nhàng qua màn hình nhỏ.',
    color: 'bg-rose-100'
  },
  { 
    date: '31 Tháng 3, 2025', 
    title: 'Buổi hẹn hò đầu tiên', 
    desc: 'Hương vị Pizza và rạp phim. Một buổi tối ngượng ngùng nhưng đầy ắp những nụ cười.',
    color: 'bg-purple-100'
  },
  { 
    date: '13 Tháng 4, 2025', 
    title: 'Lời bày tỏ chân thành', 
    desc: 'Một khoảnh khắc can đảm để nói ra tiếng lòng, dẫu có chút thử thách nhưng thật đáng trân trọng.',
    color: 'bg-amber-100'
  },
  { 
    date: '20 Tháng 4, 2025', 
    title: 'Chính thức bên nhau', 
    desc: 'Ngày hai trái tim tìm thấy nhịp đập chung. Một khởi đầu mới đầy hứa hẹn và yêu thương.',
    color: 'bg-pink-100'
  },
  { 
    date: '05 Tháng 7, 2025', 
    title: 'Chuyến hành trình đầu tiên', 
    desc: 'Cùng nhau đi đến những vùng đất mới, viết tiếp những kỷ niệm rực rỡ dưới ánh nắng hè.',
    color: 'bg-blue-100'
  },
];

const Timeline: React.FC = () => {
  return (
    <div className="pt-48 pb-40 px-6 max-w-4xl mx-auto min-h-screen">
      <div className="text-center mb-32 space-y-6 animate-reveal">
        <span className="text-script text-3xl text-pink-400 block">Câu Chuyện Tình Yêu</span>
        <h2 className="text-4xl md:text-7xl font-black tracking-tighter text-serif text-romantic">
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
                <p className="text-gray-500 text-sm leading-relaxed font-medium italic">{event.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-48 text-center animate-reveal">
         <div className="inline-block py-6 px-12 glass rounded-full border border-pink-100 animate-float">
            <p className="text-script text-2xl text-pink-400">Vẫn còn tiếp tục viết tiếp...</p>
         </div>
      </div>
    </div>
  );
};

export default Timeline;
