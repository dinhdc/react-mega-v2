import React, { useEffect } from "react";
import SetupForm from "./Form/SetupForm";
import Loading from "./Loading/Loading";
import Modal from "./Modal/Modal";
import { useGlobalContext } from "./Context/Context";
import axios from "axios";

function App() {
  const context = useGlobalContext();

  const getToken = async () => {
    const response = await axios(
      `https://opentdb.com/api_token.php?command=request`
    ).catch((e) => {
      console.log(e);
    });
    if (response) {
      localStorage.setItem("token", response.data.token);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null || token === undefined) {
      getToken();
    }
  }, []);

  if (context !== null) {
    var {
      modal,
      waiting,
      loading,
      questions,
      index,
      correct,
      nextQuestion,
      checkAnswers,
    } = context;
  }
  if (waiting) {
    return <SetupForm />;
  }
  if (loading) {
    return <Loading />;
  }
  if (modal) {
    return <Modal />
  }
  const { incorrect_answers, correct_answer, question } = questions[index];
  console.log(index);
  let anwers = [...incorrect_answers];
  const tempIndex = Math.floor(Math.random() * 4);
  if (tempIndex === 3) {
    anwers.push(correct_answer);
  } else {
    anwers.push(anwers[tempIndex]);
    anwers[tempIndex] = correct_answer;
  }
  return (
    <main>
      <section className="quiz">
        <p className="correct-answers">
          correct answers: {correct}/{questions.length}
        </p>
        <article className="container">
          <h2 dangerouslySetInnerHTML={{ __html: question }} />
          <div className="btn-container">
            {anwers.map((answer, index) => {
              return (
                <button
                  key={index}
                  className="answer-btn"
                  onClick={() => checkAnswers(correct_answer === answer)}
                  dangerouslySetInnerHTML={{ __html: answer }}
                />
              );
            })}
          </div>
        </article>
        <button className="next-question" onClick={() => nextQuestion()}>
          next questions
        </button>
      </section>
    </main>
  );
}

export default App;
