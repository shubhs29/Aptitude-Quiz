
import React, { useState, useEffect } from 'react';
import { Question } from '../types';

interface Props {
  question: Question;
  onAnswer: (answer: string) => void;
  currentIndex: number;
  totalQuestions: number;
}

const QuestionCard: React.FC<Props> = ({ question, onAnswer, currentIndex, totalQuestions }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(120);

  useEffect(() => {
    setSelected(null);
    setTimeLeft(120);
  }, [question]);

  useEffect(() => {
    if (timeLeft <= 0) {
      onAnswer(""); // Auto-skip if time runs out
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onAnswer]);

  const handleSelect = (option: string) => {
    setSelected(option);
    setTimeout(() => onAnswer(option), 300);
  };

  const progressPercentage = ((currentIndex + 1) / totalQuestions) * 100;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 transition-all">
      {/* Progress Bar */}
      <div className="h-1.5 w-full bg-slate-100">
        <div 
          className="h-full bg-indigo-600 transition-all duration-500" 
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            {question.category}
          </span>
          <div className="flex items-center gap-2">
            <span className={`font-mono font-bold text-lg ${timeLeft < 20 ? 'text-red-500 animate-pulse' : 'text-slate-700'}`}>
              {formatTime(timeLeft)}
            </span>
            <svg className={`w-5 h-5 ${timeLeft < 20 ? 'text-red-500' : 'text-slate-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        <h3 className="text-xl font-bold text-slate-800 mb-8 leading-snug">
          {question.question}
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(option)}
              disabled={selected !== null}
              className={`
                group relative flex items-center p-5 rounded-xl border-2 transition-all text-left
                ${selected === option 
                  ? 'border-indigo-600 bg-indigo-50 shadow-md ring-2 ring-indigo-200' 
                  : 'border-slate-100 hover:border-indigo-300 hover:bg-slate-50'
                }
              `}
            >
              <span className={`
                flex items-center justify-center w-8 h-8 rounded-lg mr-4 font-bold text-sm
                ${selected === option 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-slate-100 text-slate-500 group-hover:bg-indigo-100 group-hover:text-indigo-600'
                }
              `}>
                {String.fromCharCode(65 + idx)}
              </span>
              <span className={`font-medium ${selected === option ? 'text-indigo-900' : 'text-slate-700'}`}>
                {option}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-8 flex justify-between text-sm text-slate-400 font-medium">
          <span>Question {currentIndex + 1} of {totalQuestions}</span>
          <span className="italic">Pro Tip: Use shortcut factors</span>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
