import { useEffect, useState } from 'react'
import styles from '../styles/questions.module.css';

function Questions() {
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch("/api/questions/rand");
      const data = await response.json();
      setQuestion(data);
    };
    fetchQuestions();
  }, []);

  if (!question) {
    return <div>Loading question...</div>;
  }

  return (
    <div>
      {question.map((question) =>
      <div>
        <h2>{question.question_text}</h2>
        <button className={styles.button}>{question.option_1}</button>
        <button className={styles.button}>{question.option_2}</button>
        <button className={styles.button}>{question.option_3}</button>
      </div>
      )}
    </div>
  );
}

export default Questions
