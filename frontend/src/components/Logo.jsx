import React from 'react';

const Logo = ({ compact = false }) => (
  <div className="flex items-center gap-3">
    <div className="relative w-12 h-12">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary via-emerald-400 to-cyan-500 blur-lg opacity-70 animate-pulse"></div>
      <div className="relative w-full h-full rounded-2xl bg-slate-900 border border-primary/50 flex items-center justify-center shadow-neon">
        <span className="text-xl font-black text-neon">JF</span>
      </div>
    </div>
    {!compact && (
      <div>
        <div className="text-lg font-semibold text-white tracking-wide">Junglee Russian Force</div>
        <div className="text-xs uppercase text-slate-300">Digital Attendance</div>
      </div>
    )}
  </div>
);

export default Logo;
