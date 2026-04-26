import { useEffect, useState } from 'react'
import styles from '../styles/questions.module.css';

const DATABASE_URL = import.meta.env.VITE_API_URL || '';

function Questions() {
  const [question, setQuestion] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState("");

  /**
   * fetches all questions from question table
   * and gives them in random order
   */
  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch(`${DATABASE_URL}/api/questions/rand`);
      const data = await response.json();
      setQuestion(data);
    };
    fetchQuestions();
  }, []);

  const currentQuestion = question[currentIndex];

  /**
   * little function for getting next question
   */
  const nextQuestion = () => {
    setFeedback("");
    setCurrentIndex(prevIndex => prevIndex + 1);
  };

  if (!currentQuestion) {
    return <div className={styles.header2}>Loading...</div>;
  }

  /**
   * Checks if chosen answer is correct or incorrect
   * @param {string} answer
   */
  const checkAnswer = (answer) => {
    if (answer === currentQuestion.correct_answer) {
      setFeedback(currentQuestion.feedback_correct);
    } else {
      setFeedback(currentQuestion.feedback_incorrect);
    }
  }

  return (
    <div>
      <div className={styles.questionbackcard}>
        <h2 className={styles.header2}>{currentQuestion.question}</h2>

          <div className={styles.questioncard}>
            <pre style={{ textAlign: 'left', margin: '20px auto', width: 'fit-content'}}>
              <code className={styles.code}>{currentQuestion.code_snippet}</code>
            </pre>

            <button className={styles.button} onClick={() => checkAnswer(currentQuestion.option_1)}>
              {currentQuestion.option_1}
            </button>

            <button className={styles.button} onClick={() => checkAnswer(currentQuestion.option_2)}>
              {currentQuestion.option_2}
            </button>

            <button className={styles.button} onClick={() => checkAnswer(currentQuestion.option_3)}>
              {currentQuestion.option_3}
            </button>

            <p className={styles.para}>{feedback}</p>
          </div>

          <button className={styles.nextButton} onClick={nextQuestion}>
            Next question
          </button>
      </div>
    </div>
  );
}

export default Questions
