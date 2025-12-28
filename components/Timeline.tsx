
import React from 'react';

const TIMELINE_EVENTS = [
  { date: 'Ngày đầu', title: 'Cú lừa thế kỷ', desc: 'Lần đầu gặp mặt, trông hiền khô mà ai ngờ...' },
  { date: 'Tháng 2', title: 'Ăn sập Sài Gòn', desc: 'Phát hiện ra khả năng ăn như rồng cuốn của Mai Chi.' },
  { date: 'Tháng 5', title: 'Trận đòn đầu tiên', desc: 'Chỉ vì cười một cái mà ăn ngay quả đấm vào vai.' },
  { date: 'Hiện tại', title: 'Vẫn bị bắt nạt', desc: 'Kiếp nạn thứ 82 vẫn chưa kết thúc.' },
];

const Timeline: React.FC = () => {
  return (
    <div className="pt-40 pb-20 px-6 max-w-2xl mx-auto min-h-screen">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold tracking-tighter mb-4 font-['Montserrat']">Hành trình <span className="text-gradient">Bị Bắt Nạt</span></h2>
        <p className="text-gray-500 text-sm">Tóm tắt các cột mốc quan trọng của "đại ca" và đàn em.</p>
      </div>

      <div className="relative border-l border-pink-500/30 ml-4 space-y-12">
        {TIMELINE_EVENTS.map((event, idx) => (
          <div key={idx} className="relative pl-10">
            <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.5)]"></div>
            <div className="glass p-6 rounded-2xl border-l-4 border-pink-500 hover:translate-x-2 transition-transform duration-300">
              <span className="text-[10px] font-bold text-pink-400 uppercase tracking-widest">{event.date}</span>
              <h3 className="text-xl font-bold mt-1 text-white">{event.title}</h3>
              <p className="text-gray-400 mt-2 text-sm leading-relaxed">{event.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
