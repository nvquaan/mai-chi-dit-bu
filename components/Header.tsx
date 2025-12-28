
import { AppView } from '../types';

interface HeaderProps {
  currentView: AppView;
  setView: (view: AppView) => void;
}

export default function Header({ currentView, setView }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center bg-white/40 backdrop-blur-xl border-b border-pink-200/30">
      <div 
        className="text-2xl md:text-3xl font-black flex items-center gap-2 cursor-pointer group" 
        onClick={() => setView(AppView.GALLERY)}
      >
        <span className="text-script text-pink-500 group-hover:scale-110 transition-transform">MaiChi</span>
        <span className="w-1.5 h-1.5 bg-pink-300 rounded-full"></span>
      </div>
      
      <nav className="glass flex items-center gap-2 p-1.5 rounded-full border border-pink-100 shadow-sm">
        <button 
          onClick={() => setView(AppView.GALLERY)}
          className={`px-6 py-2 rounded-full text-[10px] font-black tracking-[0.2em] uppercase transition-all duration-500 ${currentView === AppView.GALLERY ? 'bg-pink-500 text-white shadow-lg' : 'text-pink-400 hover:text-pink-600'}`}
        >
          Archive
        </button>
        <button 
          onClick={() => setView(AppView.TIMELINE)}
          className={`px-6 py-2 rounded-full text-[10px] font-black tracking-[0.2em] uppercase transition-all duration-500 ${currentView === AppView.TIMELINE ? 'bg-pink-500 text-white shadow-lg' : 'text-pink-400 hover:text-pink-600'}`}
        >
          Timeline
        </button>
      </nav>

      <div className="hidden md:flex items-center gap-3">
        <div className="w-10 h-10 rounded-full border-2 border-pink-200 p-0.5 animate-spin-slow">
           <div className="w-full h-full bg-pink-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="#FF758C"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
           </div>
        </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow { animation: spin-slow 12s linear infinite; }
      `}</style>
    </header>
  );
}
