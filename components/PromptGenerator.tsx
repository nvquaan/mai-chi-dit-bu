
import React, { useState } from 'react';
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
      // Removed alert to comply with guidelines prohibiting API key prompts or mentions
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
    <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold tracking-tighter mb-4 font-['Montserrat']">Thì Thầm <span className="text-gradient">Ký Ức</span></h1>
        <p className="text-gray-400 max-w-lg mx-auto">Để AI giúp bạn gửi gắm những tâm tư chân thành nhất vào bức ảnh của hai đứa.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="glass p-8 rounded-3xl space-y-6">
          <div>
            <label className="text-[10px] uppercase tracking-widest text-pink-400 font-bold">Gửi đến ai?</label>
            <input 
              type="text" 
              value={params.recipient}
              onChange={(e) => setParams({...params, recipient: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 mt-2 focus:outline-none focus:border-pink-500/50 transition-colors text-white"
            />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-pink-400 font-bold">Dịp đặc biệt gì?</label>
            <input 
              type="text" 
              value={params.event}
              onChange={(e) => setParams({...params, event: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 mt-2 focus:outline-none focus:border-pink-500/50 transition-colors text-white"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] uppercase tracking-widest text-pink-400 font-bold">Loại tin nhắn</label>
              <select 
                value={params.messageType}
                onChange={(e) => setParams({...params, messageType: e.target.value})}
                className="w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-3 mt-2 focus:outline-none focus:border-pink-500/50 transition-colors appearance-none text-white"
              >
                <option value="Lời nhắn ngắn">Lời nhắn ngắn</option>
                <option value="Thơ tình tứ">Thơ tình tứ</option>
                <option value="Lời tỏ tình">Lời tỏ tình</option>
                <option value="Nhật ký kỷ niệm">Nhật ký</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-widest text-pink-400 font-bold">Cảm xúc</label>
              <input 
                type="text" 
                value={params.mood}
                onChange={(e) => setParams({...params, mood: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 mt-2 focus:outline-none focus:border-pink-500/50 transition-colors text-white"
              />
            </div>
          </div>
          
          <button 
            onClick={handleGenerate}
            disabled={isLoading}
            className="w-full py-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl font-bold uppercase tracking-widest text-sm hover:opacity-90 transition-all active:scale-95 disabled:opacity-50"
          >
            {isLoading ? "Đang viết lời yêu..." : "Tạo Lời Nhắn Yêu Thương"}
          </button>
        </div>

        <div className="flex flex-col">
          <div className={`glass flex-1 rounded-3xl p-8 relative overflow-hidden flex flex-col min-h-[400px] transition-all ${generatedMessage ? 'border-pink-500/30' : ''}`}>
            {!generatedMessage && !isLoading && (
              <div className="flex-1 flex flex-col items-center justify-center text-center opacity-40">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4 text-pink-400"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                <p>Những lời ngọt ngào sẽ hiện ra ở đây...</p>
              </div>
            )}
            
            {isLoading && (
              <div className="space-y-4">
                <div className="h-4 bg-white/5 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-white/5 rounded w-5/6 animate-pulse"></div>
                <div className="h-4 bg-white/5 rounded w-4/6 animate-pulse"></div>
              </div>
            )}

            {generatedMessage && (
              <div className="animate-fadeIn">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-pink-400 font-bold">Lời Nhắn Cho Bạn</span>
                  <button 
                    onClick={copyToClipboard}
                    className="p-2 glass rounded-lg hover:bg-white/10 transition-colors"
                  >
                    {copied ? "Đã chép" : "Sao chép"}
                  </button>
                </div>
                <p className="text-lg text-gray-100 leading-relaxed italic font-serif select-all">
                  "{generatedMessage}"
                </p>
                <div className="mt-8 pt-6 border-t border-white/5 flex gap-2">
                  <div className="px-3 py-1 bg-white/5 rounded-full text-[10px] text-gray-500 uppercase font-bold">Love Language</div>
                  <div className="px-3 py-1 bg-white/5 rounded-full text-[10px] text-gray-500 uppercase font-bold">Forever</div>
                </div>
              </div>
            )}
          </div>
          <p className="mt-4 text-[10px] text-gray-600 uppercase text-center tracking-[0.3em]">Lumina Hearts • Tình yêu kỹ thuật số</p>
        </div>
      </div>
    </div>
  );
};

export default PromptGenerator;
