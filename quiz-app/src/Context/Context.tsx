import React, { useState } from "react";

export interface IQuiz {
  amount: number;
  category: string;
  difficulty: string;
}

export interface IAppContext {
  waiting: boolean;
  loading: boolean;
  questions: Array<string>;
  index: number;
  correct: number;
  error: boolean;
  quiz: IQuiz;
  modal: boolean;
}

export const AppContext = React.createContext<IAppContext | null>(null);

const AppProvider: React.FC<> = ({ children }) => {
  const [waiting, setWaiting] = useState(true);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<Array<string>>([]);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [error, setError] = useState(false);
  const [quiz, setQuiz] = useState<IQuiz>({
    amount: 10,
    category: "sports",
    difficulty: "easy",
  });
  const [modal, setModal] = useState(false);

  return (
    <AppContext.Provider
      value={{ waiting, loading, questions, index, correct, error, quiz, modal }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
