
import { AppView } from '../types';

interface HeaderProps {
  currentView: AppView;
  setView: (view: AppView) => void;
}

export default function Header({ currentView, setView }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 md:px-6 py-4 md:py-6 flex justify-center">
      <nav className="glass px-5 md:px-10 py-2.5 md:py-4 rounded-full flex items-center gap-3 md:gap-12 border border-white/10 shadow-2xl max-w-[95vw] md:max-w-full overflow-x-auto no-scrollbar">
        <div 
          className="text-base md:text-2xl font-black tracking-tighter flex items-center gap-2 md:gap-3 group cursor-pointer shrink-0" 
          onClick={() => setView(AppView.GALLERY)}
        >
          <div className="w-1.5 h-1.5 md:w-2.5 md:h-2.5 bg-pink-500 rounded-full group-hover:scale-150 transition-transform shadow-[0_0_10px_#fb7185]"></div>
          <span className="font-['Montserrat']">MAICHI</span>
        </div>
        
        <div className="flex items-center gap-4 md:gap-10 text-[9px] md:text-[13px] font-bold tracking-[0.1em] md:tracking-[0.2em] uppercase shrink-0">
          <button 
            onClick={() => setView(AppView.GALLERY)}
            className={`transition-all duration-300 relative group whitespace-nowrap py-1 ${currentView === AppView.GALLERY ? 'text-pink-400' : 'text-gray-400 hover:text-white'}`}
          >
            Kho Ảnh
            {currentView === AppView.GALLERY && <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-pink-500 rounded-full"></span>}
          </button>
          <button 
            onClick={() => setView(AppView.TIMELINE)}
            className={`transition-all duration-300 relative group whitespace-nowrap py-1 ${currentView === AppView.TIMELINE ? 'text-purple-400' : 'text-gray-400 hover:text-white'}`}
          >
            Timeline
            {currentView === AppView.TIMELINE && <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-purple-500 rounded-full"></span>}
          </button>
        </div>

        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          <div className="w-7 h-7 md:w-10 md:h-10 rounded-full bg-pink-500/10 border border-pink-500/20 flex items-center justify-center hover:bg-pink-500/20 transition-colors cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-pink-500 md:w-5 md:h-5"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          </div>
        </div>
      </nav>
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </header>
  );
}
