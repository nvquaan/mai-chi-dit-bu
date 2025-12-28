
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
    if (passcode.trim().length < 4) {
      setIsError(true);
      setTimeout(() => setIsError(false), 2000);
      return;
    }
    onUnlock(passcode);
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#0d0208] p-6 overflow-hidden">
      {/* Dynamic Background Noise/Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="glass max-w-sm w-full p-12 rounded-[3rem] border-white/5 relative group"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-[3rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
        
        <div className="relative text-center mb-10">
          <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/10 group-hover:border-pink-500/30 transition-colors duration-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-pink-400"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tighter uppercase font-['Montserrat']">Private Access</h1>
          <p className="text-gray-500 text-[9px] uppercase tracking-[0.4em] mt-2">Personal Archive • 2024</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative">
          <div className="space-y-3">
            <input 
              type="password" 
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="PASSCODE"
              className={`w-full bg-white/5 border ${isError ? 'border-red-500' : 'border-white/10'} rounded-2xl px-5 py-4 focus:outline-none focus:border-pink-500/50 transition-all text-white placeholder:text-white/10 text-center tracking-[0.5em] text-sm`}
            />
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-white text-black rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-pink-500 hover:text-white transition-all duration-500 active:scale-95 shadow-2xl shadow-white/5"
          >
            Authenticate
          </button>
        </form>

        <p className="mt-10 text-[8px] text-gray-600 uppercase text-center tracking-[0.3em] opacity-50">
          Encryption Active • Cloudinary Secure Delivery
        </p>
      </motion.div>
    </div>
  );
};

export default Gatekeeper;
