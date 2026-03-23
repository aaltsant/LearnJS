import { useEffect, useState } from 'react'
import styles from '../styles/questions.module.css';

function Questions() {
  const [question, setQuestion] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch("/api/questions/rand");
      const data = await response.json();
      setQuestion(data);
    };
    fetchQuestions();
  }, []);

  const currentQuestion = question[currentIndex];

  const nextQuestion = () => {
    setCurrentIndex(prevIndex => prevIndex + 1);
  };

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <h2>{currentQuestion.question}</h2>
          <p>{currentQuestion.code_snippet}</p>
          <div>
            <button className={styles.button}>{currentQuestion.option_1}</button>
            <button className={styles.button}>{currentQuestion.option_2}</button>
            <button className={styles.button}>{currentQuestion.option_3}</button>
          </div>
          <button className={styles.nextButton} onClick={nextQuestion}>
            Next question
          </button>
      </div>
    </div>
  );
}

export default Questions
