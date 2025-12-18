
import React, { useState, useCallback } from 'react';
import { questions } from './data/questions';
import { QuizState } from './types';
import QuestionCard from './components/QuestionCard';
import Result from './components/Result';

const App: React.FC = () => {
  const [state, setState] = useState<QuizState>({
    currentQuestionIndex: 0,
    score: 0,
    showResults: false,
    userAnswers: [],
    isStarted: false,
  });

  const startQuiz = () => {
    setState({
      currentQuestionIndex: 0,
      score: 0,
      showResults: false,
      userAnswers: [],
      isStarted: true,
    });
  };

  const handleAnswer = (answer: string) => {
    const isCorrect = answer === questions[state.currentQuestionIndex].correctAnswer;
    
    setState(prev => {
      const isLastQuestion = prev.currentQuestionIndex === questions.length - 1;
      return {
        ...prev,
        score: isCorrect ? prev.score + 1 : prev.score,
        userAnswers: [...prev.userAnswers, answer],
        currentQuestionIndex: isLastQuestion ? prev.currentQuestionIndex : prev.currentQuestionIndex + 1,
        showResults: isLastQuestion,
      };
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-10 px-4">
      <header className="max-w-4xl w-full text-center mb-12">
        <h1 className="text-4xl font-extrabold text-indigo-700 tracking-tight mb-2">
          Online Study For You
        </h1>
        <p className="text-slate-600 font-medium">Complete Placement Solution • Shortcut Methods Challenge</p>
      </header>

      <main className="max-w-2xl w-full">
        {!state.isStarted ? (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-slate-100">
            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4">Aptitude & Reasoning Marathon</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Solve all 32 shortcut-based questions asked in Accenture, TCS, and Wipro. 
              Try to solve every question in under 2 minutes!
            </p>
            <button 
              onClick={startQuiz}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-10 rounded-full transition-all transform hover:scale-105 shadow-lg"
            >
              Start Full 32-Question Quiz
            </button>
            <div className="mt-6 flex justify-center gap-4 text-sm text-slate-400">
              <span>32 Questions</span>
              <span>•</span>
              <span>120s Per Question</span>
              <span>•</span>
              <span>Shortcut Tricks</span>
            </div>
          </div>
        ) : state.showResults ? (
          <Result 
            score={state.score} 
            total={questions.length} 
            onRestart={startQuiz}
            questions={questions}
            userAnswers={state.userAnswers}
          />
        ) : (
          <QuestionCard 
            question={questions[state.currentQuestionIndex]}
            onAnswer={handleAnswer}
            currentIndex={state.currentQuestionIndex}
            totalQuestions={questions.length}
          />
        )}
      </main>

      <footer className="mt-auto pt-12 pb-6 text-slate-400 text-sm">
        © 2024 Online Study For You. Master Shortcut Methods for Top Placements.
      </footer>
    </div>
  );
};

export default App;
