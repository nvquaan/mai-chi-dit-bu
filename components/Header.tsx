
import { AppView } from '../types';

interface HeaderProps {
  currentView: AppView;
  setView: (view: AppView) => void;
}

export default function Header({ currentView, setView }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-center">
      <nav className="glass px-8 py-3 rounded-full flex items-center gap-10">
        <div className="text-xl font-bold tracking-tighter flex items-center gap-2 group cursor-pointer" onClick={() => setView(AppView.GALLERY)}>
          <div className="w-2 h-2 bg-pink-500 rounded-full group-hover:scale-150 transition-transform"></div>
          <span className="font-['Montserrat']">MAICHI</span>
        </div>
        
        <div className="flex items-center gap-8 text-xs font-semibold tracking-widest uppercase">
          <button 
            onClick={() => setView(AppView.GALLERY)}
            className={`transition-colors duration-300 ${currentView === AppView.GALLERY ? 'text-pink-400' : 'text-gray-400 hover:text-white'}`}
          >
            Kho Ảnh
          </button>
          <button 
            onClick={() => setView(AppView.TIMELINE)}
            className={`transition-colors duration-300 ${currentView === AppView.TIMELINE ? 'text-purple-400' : 'text-gray-400 hover:text-white'}`}
          >
            Time line
          </button>
          <button 
            onClick={() => setView(AppView.PROMPT)}
            className={`transition-colors duration-300 ${currentView === AppView.PROMPT ? 'text-pink-400' : 'text-gray-400 hover:text-white'}`}
          >
            Lời Yêu
          </button>
        </div>

        <div className="flex items-center gap-4 ml-4">
          <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-500"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          </div>
        </div>
      </nav>
    </header>
  );
}
