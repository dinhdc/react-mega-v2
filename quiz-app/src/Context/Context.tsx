import React, { FormEvent, useContext, useState } from "react";
import axios from "axios";

export interface IQuiz {
  amount: number;
  category: string;
  difficulty: string;
}

export interface IQuestion {
  incorrect_answers: Array<string>;
  correct_answer: string;
  question: string;
}

const table = {
  sports: 20,
  history: 24,
  politics: 25,
};

export interface IAppContext {
  waiting: boolean;
  loading: boolean;
  questions: Array<any>;
  index: number;
  correct: number;
  error: boolean;
  quiz: IQuiz;
  modal: boolean;
  nextQuestion: () => void;
  checkAnswers: (value: any) => void;
  closeModal: () => void;
  openModal: () => void;
  handleSubmit: (e: any) => void;
  handleChange: (e: any) => void;
}

const AppContext = React.createContext<IAppContext | null>(null);

const AppProvider = ({ children }: { children: React.ReactNode }) => {
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

  const fetchQuestions = async (url: string) => {
    setLoading(true);
    setWaiting(true);
    const response = await axios(url).catch((e) => {
      console.log(e);
    });
    if (response) {
      const data = response.data;
      if (data.results.length > 0) {
        setQuestions(data.results);
        setLoading(false);
        setWaiting(false);
        setError(false);
      } else if (data.response_code >= 3) {
        const token = localStorage.getItem("token");
        const getToken = await axios(
          `https://opentdb.com/api_token.php?command=reset&token=${token}`
        ).catch((e) => {
          console.log(e);
        });
        if (getToken) {
          console.log(getToken.data);
          localStorage.setItem("token", getToken.data.token);
        }
        setLoading(true);
        setWaiting(true);
      }
    } else {
      setWaiting(true);
    }
  };

  const openModal = () => {
    console.log("openModal");
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
    setWaiting(true);
    setCorrect(0);
  };

  const nextQuestion = () => {
    setIndex((old) => {
      const index = old + 1;
      if (index > questions.length - 1) {
        openModal();
        return 0;
      } else {
        return index;
      }
    });
  };

  const checkAnswers = (value: any) => {
    if (value) {
      setCorrect((old) => old + 1);
    }
    nextQuestion();
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setQuiz({ ...quiz, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { amount, difficulty, category } = quiz;
    if (category === "sports") {
      var number_category = table["sports"];
    } else if (category === "history") {
      number_category = table.history;
    } else {
      number_category = table.politics;
    }
    const token = localStorage.getItem("token");
    const url = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&category=${number_category}&type=multiple&token=${token}`;
    fetchQuestions(url);
  };

  return (
    <AppContext.Provider
      value={{
        waiting,
        loading,
        questions,
        index,
        correct,
        error,
        quiz,
        modal,
        checkAnswers,
        closeModal,
        openModal,
        handleSubmit,
        handleChange,
        nextQuestion,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
