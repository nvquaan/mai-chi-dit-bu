
import React, { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const LoveTimer: React.FC = () => {
  const startDate = new Date('2025-04-20T00:00:00');
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = now.getTime() - startDate.getTime();

      if (difference > 0) {
        setIsStarted(true);
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setIsStarted(false);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isStarted) {
    return (
      <div className="flex flex-col items-center justify-center animate-reveal" style={{ animationDelay: '0.1s' }}>
        <div className="px-4 py-2 glass rounded-full border-pink-500/20">
          <span className="text-[10px] text-pink-400 font-black uppercase tracking-[0.3em]">Hẹn ước: 20/04/2025</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 animate-reveal" style={{ animationDelay: '0.1s' }}>
      <span className="text-[9px] text-gray-500 font-black uppercase tracking-[0.5em] mb-1">Thời gian đồng hành</span>
      <div className="flex items-center gap-3 md:gap-6">
        <TimeUnit value={timeLeft.days} label="Days" />
        <TimeSeparator />
        <TimeUnit value={timeLeft.hours} label="Hours" />
        <TimeSeparator />
        <TimeUnit value={timeLeft.minutes} label="Mins" />
        <TimeSeparator />
        <TimeUnit value={timeLeft.seconds} label="Secs" isLast />
      </div>
    </div>
  );
};

const TimeUnit = ({ value, label, isLast = false }: { value: number, label: string, isLast?: boolean }) => (
  <div className="flex flex-col items-center">
    <div className="text-2xl md:text-4xl font-black font-['Montserrat'] tracking-tighter text-white drop-shadow-[0_0_15px_rgba(251,113,133,0.3)]">
      {value.toString().padStart(2, '0')}
    </div>
    <span className="text-[7px] md:text-[8px] uppercase tracking-widest text-pink-500/60 font-bold mt-1">{label}</span>
  </div>
);

const TimeSeparator = () => (
  <div className="text-xl md:text-3xl font-black text-white/10 self-start mt-1">:</div>
);

export default LoveTimer;
