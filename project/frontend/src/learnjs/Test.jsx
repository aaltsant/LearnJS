import { useEffect, useState } from 'react'
import styles from '../styles/questions.module.css';

function Test() {
  const [question, setQuestion] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  // const [points, setPoints] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch("/api/test/rand");
      const data = await response.json();
      setQuestion(data);
    };
    fetchQuestions();
  }, []);

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
