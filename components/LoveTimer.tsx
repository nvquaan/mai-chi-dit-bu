
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
      <div className="flex flex-col items-center justify-center animate-reveal">
        <span className="text-[10px] text-pink-400 font-bold uppercase tracking-[0.4em]">Establishment: 20/04/2025</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2 animate-reveal">
      <div className="flex items-center gap-4 md:gap-8">
        <TimeUnit value={timeLeft.days} label="Ngày" />
        <TimeSeparator />
        <TimeUnit value={timeLeft.hours} label="Giờ" />
        <TimeSeparator />
        <TimeUnit value={timeLeft.minutes} label="Phút" />
        <TimeSeparator />
        <TimeUnit value={timeLeft.seconds} label="Giây" />
      </div>
    </div>
  );
};

const TimeUnit = ({ value, label }: { value: number, label: string }) => (
  <div className="flex flex-col items-center">
    <div className="text-3xl md:text-5xl font-bold text-serif text-pink-500 tracking-tighter drop-shadow-sm">
      {value.toString().padStart(2, '0')}
    </div>
    <span className="text-[8px] uppercase tracking-[0.2em] text-pink-300 font-black mt-1">{label}</span>
  </div>
);

const TimeSeparator = () => (
  <div className="text-xl md:text-3xl font-light text-pink-200 mt-1">:</div>
);

export default LoveTimer;
