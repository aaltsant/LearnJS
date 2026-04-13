import { useEffect, useState } from 'react'
import styles from '../../styles/questions.module.css';

function Test({ username }) {
  const [question, setQuestion] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState("");

  // this fetches the test questions from the backend
  // this saves an array of questions to setQuestion state
  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch("/api/test/rand");
      const data = await response.json();
      setQuestion(data);
    };
    fetchQuestions();
  }, []);

  // this is for getting next question quicker.
  // also without this it would be hard to get questions by id
  // because ID is auto_incremented and there might be
  // "holes" in the questions
  const currentQuestion = question[currentIndex];
  const nextQuestion = () => {
    setFeedback("");
    setCurrentIndex(prevIndex => prevIndex + 1);
  };

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  const checkAnswer = (answer) => {
    if (answer === currentQuestion.correct_answer) {
      setFeedback(currentQuestion.feedback_correct);
    } else {
      setFeedback(currentQuestion.feedback_incorrect);
    }
  }

  return (
    <div>
      <div>
        <p>{username}</p>
        <h2>{currentQuestion.question}</h2>
          <pre>
            <code>{currentQuestion.code_snippet}</code>
          </pre>
          <div>
            <button className={styles.button} onClick={() => checkAnswer(currentQuestion.option_1)}>
              {currentQuestion.option_1}
            </button>

            <button className={styles.button} onClick={() => checkAnswer(currentQuestion.option_2)}>
              {currentQuestion.option_2}
            </button>

            <button className={styles.button} onClick={() => checkAnswer(currentQuestion.option_3)}>
              {currentQuestion.option_3}
            </button>

            <p>{feedback}</p>
          </div>
          <button className={styles.nextButton} onClick={nextQuestion}>
            Next question
          </button>
      </div>
    </div>
  );
}

export default Test
