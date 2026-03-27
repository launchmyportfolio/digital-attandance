import React from 'react';

const Toast = ({ message, type = 'success' }) => {
  if (!message) return null;
  const bg = type === 'error' ? 'bg-red-500/80' : 'bg-emerald-500/80';
  return (
    <div className={`fixed top-4 right-4 z-50 px-4 py-2 rounded-lg text-white shadow-glass ${bg}`}>
      {message}
    </div>
  );
};

export default Toast;
