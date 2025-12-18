
export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  category: string;
}

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  showResults: boolean;
  userAnswers: string[];
  isStarted: boolean;
}
