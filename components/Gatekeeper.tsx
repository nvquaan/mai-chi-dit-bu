
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface GatekeeperProps {
  onUnlock: (passcode: string) => void;
}

const Gatekeeper: React.FC<GatekeeperProps> = ({ onUnlock }) => {
  const [passcode, setPasscode] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Bạn có thể đặt một mã truy cập đơn giản ở đây để bảo vệ trang web
    // Ví dụ: "maichi2024"
    if (passcode.trim().length < 4) {
      setIsError(true);
      setTimeout(() => setIsError(false), 2000);
      return;
    }
    onUnlock(passcode);
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#0d0208] p-6 overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-pink-500 shadow-[0_0_20px_#fb7185] animate-scan"></div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="glass max-w-md w-full p-10 rounded-[2.5rem] border-white/10 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent"></div>
        
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-pink-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-pink-500/20 shadow-[0_0_30px_rgba(236,72,153,0.1)]">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fb7185" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tighter font-['Montserrat'] mb-2 uppercase">Xác minh</h1>
          <p className="text-gray-500 text-[10px] uppercase tracking-[0.3em]">Hệ thống lưu trữ ảnh độc quyền</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-pink-400 font-bold ml-1">Nhập Mã Truy Cập</label>
            <input 
              type="password" 
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="Gợi ý: Tên bạn + 2024"
              className={`w-full bg-white/5 border ${isError ? 'border-red-500' : 'border-white/10'} rounded-2xl px-5 py-4 focus:outline-none focus:border-pink-500/50 transition-all text-white placeholder:opacity-20 text-center tracking-widest`}
            />
            {isError && <p className="text-red-500 text-[10px] mt-1 uppercase font-bold text-center">Mã truy cập không hợp lệ</p>}
          </div>

          <button 
            type="submit"
            className="w-full py-5 bg-white text-black rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-pink-500 hover:text-white transition-all active:scale-95 shadow-xl shadow-white/5"
          >
            Mở khóa bộ sưu tập
          </button>
        </form>

        <p className="mt-8 text-[9px] text-gray-600 uppercase text-center tracking-widest opacity-50">
          Dữ liệu được bảo mật bởi Cloudinary Server-side API
        </p>
      </motion.div>

      <style>{`
        @keyframes scan {
          0% { top: -10%; }
          100% { top: 110%; }
        }
        .animate-scan { animation: scan 4s linear infinite; }
      `}</style>
    </div>
  );
};

export default Gatekeeper;
