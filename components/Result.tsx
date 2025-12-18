
import React from 'react';
import { Question } from '../types';

interface Props {
  score: number;
  total: number;
  onRestart: () => void;
  questions: Question[];
  userAnswers: string[];
}

const Result: React.FC<Props> = ({ score, total, onRestart, questions, userAnswers }) => {
  const percentage = Math.round((score / total) * 100);

  const getPerformanceMessage = () => {
    if (percentage === 100) return "Genius! Ready for TCS/Accenture!";
    if (percentage >= 80) return "Excellent! Almost there.";
    if (percentage >= 60) return "Good job, but practice the shortcuts.";
    return "Keep practicing! Watch the workshop video.";
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-xl p-10 text-center border border-slate-100">
        <h2 className="text-3xl font-black text-slate-800 mb-2">Quiz Complete!</h2>
        <p className="text-slate-500 mb-8">{getPerformanceMessage()}</p>
        
        <div className="relative inline-flex items-center justify-center p-4 mb-8">
          <svg className="w-32 h-32 transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="58"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-slate-100"
            />
            <circle
              cx="64"
              cy="64"
              r="58"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={364}
              strokeDashoffset={364 - (364 * percentage) / 100}
              strokeLinecap="round"
              className="text-indigo-600 transition-all duration-1000"
            />
          </svg>
          <span className="absolute text-3xl font-black text-indigo-700">{percentage}%</span>
        </div>

        <div className="flex justify-center gap-12 mb-10">
          <div className="text-center">
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Score</p>
            <p className="text-2xl font-black text-slate-800">{score} / {total}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Accuracy</p>
            <p className="text-2xl font-black text-slate-800">{percentage}%</p>
          </div>
        </div>

        <button 
          onClick={onRestart}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all"
        >
          Try Again
        </button>
        
        <div className="mt-8 p-4 bg-indigo-50 rounded-xl border border-indigo-100 text-left">
          <h4 className="text-indigo-800 font-bold text-sm mb-2 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1a1 1 0 112 0v1a1 1 0 11-2 0zM13.536 14.95a1 1 0 011.414 0l.707.707a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 010-1.414zM15.657 15.657l-.707-.707a1 1 0 011.414-1.414l.707.707a1 1 0 01-1.414 1.414z" />
            </svg>
            Special Offer: Aptitude Workshop
          </h4>
          <p className="text-indigo-600 text-xs leading-relaxed">
            Enroll in our 2-week Workshop for just ₹199! Learn shortcuts to solve any question under 30 seconds.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-800 px-2">Detailed Analysis</h3>
        {questions.map((q, idx) => (
          <div key={q.id} className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
            <div className="flex items-start justify-between mb-4">
              <h5 className="font-bold text-slate-800 leading-tight pr-4">
                {idx + 1}. {q.question}
              </h5>
              {userAnswers[idx] === q.correctAnswer ? (
                <span className="text-green-500 flex-shrink-0">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                </span>
              ) : (
                <span className="text-red-500 flex-shrink-0">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                </span>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4 text-xs">
              <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded">Your Answer: <span className="font-bold">{userAnswers[idx] || 'No Answer'}</span></span>
              <span className="bg-green-50 text-green-700 px-2 py-1 rounded">Correct: <span className="font-bold">{q.correctAnswer}</span></span>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-indigo-500">
              <p className="text-sm font-bold text-indigo-700 mb-1">Shortcut Method:</p>
              <p className="text-sm text-slate-600 leading-relaxed italic">{q.explanation}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Result;
