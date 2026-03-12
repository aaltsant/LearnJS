import { useEffect, useState } from 'react'

function Questions() {
  const [Questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch("/api/questions");
      const data = await response.json();
      setQuestions(data);
    };
    fetchQuestions();
  }, []);

  return (
    <div>
      <ul>
        {Questions.map((que) => (
          <li key={que.id}>
            <strong>{que.question_text}</strong>
            <div style={{ marginTop: '10px' }}>
              <button>{que.option_1}</button>
              <button>{que.option_2}</button>
              <button>{que.option_3}</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Questions
