import React, { useState, useEffect } from 'react';

const colors = [
  'red', 'blue', 'green', 'yellow', 'purple', 'pink',
  'orange'
];

export default function CountingColorfulBalloons() {
  const [balloons, setBalloons] = useState([]);
  const [colorToFind, setColorToFind] = useState('');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    // Load high score from localStorage when component mounts
    const savedHighScore = localStorage.getItem('balloonGameHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
    generateBalloons();
  }, []);

  const generateBalloons = () => {
    // Select 12 random colors for balloons (may include duplicates)
    const newBalloons = Array.from({ length: 12 }, () => colors[Math.floor(Math.random() * colors.length)]);
    
    // Select a random color to find
    const targetColor = colors[Math.floor(Math.random() * colors.length)];
    
    setBalloons(newBalloons);
    setColorToFind(targetColor);
  };

  const handleClick = (color) => {
    if (color === colorToFind) {
      // First update the score
      const newScore = score + 1;
      setScore(newScore);
      
      // Then update high score if needed
      if (newScore > highScore) {
        setHighScore(newScore);
        localStorage.setItem('balloonGameHighScore', newScore.toString());
      }
      
      // Show success message
      alert('Yay! Correct! 🎈');
      
      // Generate new balloons after score is updated
      generateBalloons();
    } else {
      alert(`Oops! Try again. You clicked a ${color} balloon.`);
    }
  };

  const handleSkip = () => {
    generateBalloons();
  };

  const handleExit = () => {
    setIsGameOver(true);  // Don't reset score, just end the game
  };

  const handlePlayAgain = () => {
    setScore(0);
    setIsGameOver(false);
    generateBalloons();
  };

  if (isGameOver) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 p-8">
        <h1 className="text-4xl font-bold mb-8">Game Over! 🎮</h1>
        <div className="text-2xl mb-4">Your Score: {score}</div>
        <div className="text-3xl font-bold mb-8">High Score: {highScore} 🏆</div>
        <button
          onClick={handlePlayAgain}
          className="bg-green-500 text-white px-6 py-3 rounded-lg text-xl hover:bg-green-600 transition-colors duration-200"
        >
          Play Again
        </button>
      </div>
    );
  }

  const getColorStyle = (color) => {
    const colorMap = {
      red: 'bg-red-500',
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      yellow: 'bg-yellow-400',
      purple: 'bg-purple-500',
      pink: 'bg-pink-500',
      orange: 'bg-orange-500'
    };
    return colorMap[color] || 'bg-gray-500';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-blue-100">
      <div className="absolute top-4 right-4 flex flex-col items-end">
        <div className="text-xl font-bold mb-2">High Score: {highScore} 🏆</div>
        <div className="flex gap-2">
          <button
            onClick={handleSkip}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors duration-200"
          >
            Skip Round
          </button>
          <button
            onClick={handleExit}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
          >
            Exit Game
          </button>
        </div>
      </div>
      <h1 className="text-3xl font-bold mb-4">Counting Colorful Balloons 🎈</h1>
      <h2 className="text-xl mb-4">Find and click on the <span className="font-bold" style={{ color: colorToFind }}>{colorToFind}</span> balloon!</h2>

      <div className="grid grid-cols-4 gap-6 mb-6">
        {balloons.map((color, index) => (
          <div
            key={index}
            onClick={() => handleClick(color)}
            className="relative w-24 h-32 cursor-pointer transform hover:scale-110 transition-transform duration-200"
          >
            <div
              className={`absolute w-full h-full rounded-full shadow-lg transform scale-y-110 ${getColorStyle(color)}`}
            />
            <div className="absolute bottom-0 left-1/2 w-1 h-16 bg-gray-400 transform -translate-x-1/2" />
          </div>
        ))}
      </div>
      <div className="text-xl font-bold">Score: {score}</div>
    </div>
  );
}