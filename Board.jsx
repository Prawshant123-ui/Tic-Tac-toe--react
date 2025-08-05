import React, { useState } from 'react';
import Square from './Square';

const Board = () => {
  const [state, setState] = useState(Array(9).fill(null));
  const [isX, setIsX] = useState(true);
  const winnerInfo = calculateWinner(state);
  const winner = winnerInfo?.winner;
  const winningSquares = winnerInfo?.line || [];

  const handleClick = (index) => {
    if (state[index] || winner) return;

    const copyState = [...state];
    copyState[index] = isX ? 'X' : 'O';
    setState(copyState);
    setIsX(!isX);
  };

  const handleReset = () => {
    setState(Array(9).fill(null));
    setIsX(true);
  };

  const getStatusMessage = () => {
    if (winner) return `🎉 Winner: ${winner}`;
    if (state.every(Boolean)) return "😐 It's a draw!";
    return `👉 Next player: ${isX ? 'X' : 'O'}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 px-4">
      <h1 className="text-4xl font-bold text-indigo-700 mb-4">Tic Tac Toe</h1>
      <div className="text-lg font-medium text-gray-800 bg-white px-6 py-3 rounded-xl shadow mb-6">
        {getStatusMessage()}
      </div>
      <div className="grid grid-cols-3 gap-3 bg-white p-6 rounded-2xl shadow-lg">
        {state.map((value, index) => (
          <Square
            key={index}
            value={value}
            onClick={() => handleClick(index)}
            highlight={winningSquares.includes(index)}
          />
        ))}
      </div>
      <button
        onClick={handleReset}
        className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition shadow"
      >
        🔄 Restart Game
      </button>
    </div>
  );
};

// 🧠 Winner Detection Logic
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6],            // diagonals
  ];

  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return null;
}

export default Board;
