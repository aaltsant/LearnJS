import { useEffect, useState } from 'react'
import styles from '../styles/questions.module.css';

function Questions() {
  const [question, setQuestion] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch("/api/questions/rand");
      const data = await response.json();
      setQuestion(data);
    };
    fetchQuestions();
  }, []);

  return (
    <div>
      {question.map((question) =>
      <div>
        <h2>{question.question}</h2>
          <p>{question.code_snippet}</p>
          <button className={styles.button}>{question.option_1}</button>
          <button className={styles.button}>{question.option_2}</button>
          <button className={styles.button}>{question.option_3}</button>
      </div>
      )}
    </div>
  );
}

export default Questions
