
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateLoveLetter } from '../services/geminiService';

const PromptGenerator: React.FC = () => {
  const [params, setParams] = useState({
    recipient: 'Người thương',
    event: 'Kỷ niệm ngày đầu gặp gỡ',
    mood: 'Hạnh phúc và biết ơn',
    messageType: 'Lời nhắn ngắn'
  });
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const result = await generateLoveLetter(params);
      setGeneratedMessage(result);
    } catch (error) {
      console.error("Generation error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pt-40 pb-20 px-6 max-w-6xl mx-auto min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20"
      >
        <span className="text-pink-500 text-[10px] font-bold uppercase tracking-[0.5em] mb-4 block">AI Powered Emotional Engine</span>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 font-['Montserrat'] leading-none">
          KÝ ỨC <span className="text-gradient">SỐ.</span>
        </h1>
        <p className="text-gray-400 max-w-md mx-auto text-sm opacity-60 leading-relaxed font-light">
          Biến những bức ảnh tĩnh thành lời thì thầm ngọt ngào thông qua trí tuệ nhân tạo Gemini.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Input Panel */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-5 glass p-10 rounded-[2.5rem] border-white/5 space-y-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/5 blur-[60px] rounded-full"></div>
          
          <div className="space-y-6">
            <div className="group">
              <label className="text-[9px] uppercase tracking-[0.3em] text-gray-500 font-bold mb-3 block group-focus-within:text-pink-400 transition-colors">Recipient</label>
              <input 
                type="text" 
                value={params.recipient}
                onChange={(e) => setParams({...params, recipient: e.target.value})}
                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-pink-500/30 transition-all text-white text-sm font-medium"
              />
            </div>
            
            <div className="group">
              <label className="text-[9px] uppercase tracking-[0.3em] text-gray-500 font-bold mb-3 block group-focus-within:text-pink-400 transition-colors">Occasion</label>
              <input 
                type="text" 
                value={params.event}
                onChange={(e) => setParams({...params, event: e.target.value})}
                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-pink-500/30 transition-all text-white text-sm font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="group">
                <label className="text-[9px] uppercase tracking-[0.3em] text-gray-500 font-bold mb-3 block">Format</label>
                <select 
                  value={params.messageType}
                  onChange={(e) => setParams({...params, messageType: e.target.value})}
                  className="w-full bg-[#1a0510] border border-white/5 rounded-2xl px-4 py-4 focus:outline-none focus:border-pink-500/30 transition-all text-white text-xs appearance-none cursor-pointer"
                >
                  <option value="Lời nhắn ngắn">Message</option>
                  <option value="Thơ tình tứ">Poetry</option>
                  <option value="Lời tỏ tình">Confession</option>
                  <option value="Nhật ký kỷ niệm">Journal</option>
                </select>
              </div>
              <div className="group">
                <label className="text-[9px] uppercase tracking-[0.3em] text-gray-500 font-bold mb-3 block">Vibe</label>
                <input 
                  type="text" 
                  value={params.mood}
                  onChange={(e) => setParams({...params, mood: e.target.value})}
                  className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-pink-500/30 transition-all text-white text-sm font-medium"
                />
              </div>
            </div>
          </div>
          
          <button 
            onClick={handleGenerate}
            disabled={isLoading}
            className="w-full py-5 bg-white text-black rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-pink-500 hover:text-white transition-all duration-500 active:scale-95 disabled:opacity-20 flex items-center justify-center gap-3 group/btn"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-black rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-1.5 h-1.5 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              </span>
            ) : (
              <>
                Synthesize Emotion
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </>
            )}
          </button>
        </motion.div>

        {/* Output Display */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-7 h-full min-h-[500px] flex flex-col"
        >
          <div className={`glass flex-1 rounded-[3rem] p-12 relative overflow-hidden flex flex-col transition-all duration-1000 ${generatedMessage ? 'border-pink-500/20 bg-pink-500/[0.02]' : 'border-white/5'}`}>
            <AnimatePresence mode="wait">
              {!generatedMessage && !isLoading ? (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col items-center justify-center text-center space-y-6"
                >
                  <div className="w-20 h-20 rounded-full border border-dashed border-white/10 flex items-center justify-center animate-[spin_20s_linear_infinite]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-white/20"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                  </div>
                  <p className="text-gray-600 text-[10px] uppercase tracking-[0.4em]">Awaiting input parameters...</p>
                </motion.div>
              ) : isLoading ? (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6 pt-10"
                >
                  <div className="h-2 bg-white/5 rounded-full w-full animate-pulse overflow-hidden">
                    <div className="h-full bg-pink-500 w-1/3 animate-[shimmer_2s_infinite_linear]"></div>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full w-[90%] animate-pulse"></div>
                  <div className="h-2 bg-white/5 rounded-full w-[80%] animate-pulse"></div>
                  <div className="h-2 bg-white/5 rounded-full w-[70%] animate-pulse"></div>
                </motion.div>
              ) : (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col h-full"
                >
                  <div className="flex justify-between items-center mb-10">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-pink-500 rounded-full animate-ping"></div>
                      <span className="text-[10px] uppercase tracking-[0.3em] text-pink-400 font-bold">Emotion Generated</span>
                    </div>
                    <button 
                      onClick={copyToClipboard}
                      className="px-4 py-2 glass rounded-xl hover:bg-white/10 transition-all text-[9px] uppercase tracking-widest font-bold"
                    >
                      {copied ? "Copied!" : "Copy Text"}
                    </button>
                  </div>
                  
                  <div className="flex-1">
                    <p className="text-2xl md:text-3xl text-gray-100 leading-relaxed font-light italic font-serif selection:bg-pink-500/30">
                      "{generatedMessage}"
                    </p>
                  </div>

                  <div className="mt-12 pt-8 border-t border-white/5 flex flex-wrap gap-3">
                    <div className="px-4 py-1.5 bg-pink-500/10 border border-pink-500/20 rounded-full text-[9px] text-pink-400 uppercase font-bold tracking-wider">Neural Love</div>
                    <div className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[9px] text-gray-500 uppercase font-bold tracking-wider">Eternal Archive</div>
                    <div className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[9px] text-gray-500 uppercase font-bold tracking-wider">Gemini-3-Flash</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <p className="mt-6 text-[8px] text-gray-700 uppercase text-center tracking-[0.5em] opacity-40 italic">Synthesized via Lumina Hearts AI Engine v2.0</p>
        </motion.div>
      </div>

      <style>{`
        @keyframes shimmer {
          from { transform: translateX(-100%); }
          to { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
};

export default PromptGenerator;
