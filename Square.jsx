import React from 'react';

const Square = ({ value, onClick, highlight }) => {
  return (
    <button
      onClick={onClick}
      className={`w-24 h-24 text-3xl font-bold border-2 rounded-xl flex items-center justify-center 
        ${
          highlight
            ? 'bg-yellow-300 border-yellow-500 animate-pulse'
            : 'bg-gray-100 border-gray-300 hover:bg-gray-200'
        }
      `}
    >
      {value}
    </button>
  );
};

export default Square;
