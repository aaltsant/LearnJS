import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/questions.module.css';

function Test({ username }) {
  const [question, setQuestion] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState("");

  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const navigate = useNavigate();

  // this fetches the test questions from the database
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
  const nextQuestion = () => {
    setFeedback("");
    setCurrentIndex(prevIndex => prevIndex + 1);
  };

  // this method right here checks if the answer is correct
  // and if it is the score rises by 100
  // and if not score will decrease
  const checkAnswer = (answer) => {
    if (answer === currentQuestion.correct_answer) {
      setFeedback(currentQuestion.feedback_correct);
      const pointsEarned = 100 + (streak * 25);

      setScore(prev => prev + pointsEarned);
      setStreak(prev => prev + 1);
    } else {
      setFeedback(currentQuestion.feedback_incorrect);
      setScore(prev => prev - 50);
      setStreak(0);
    }
  }

  // method saveresults is for posting users who took the test
  // to the users table
  const saveResults = async () => {
    const response = await fetch(`api/users`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        username: username,
        score: score,
        max_streak: streak
      })
    });

    if (response.status === 201) {
      alert("Results saved!");
      // you can change the path with this
      // after successfull POST on user it goes back to HomePage
      navigate("/");
    } else {
      alert("Something went wrong!");
    }
  }

  // "loading screen"
  if (question.length === 0) {
    return <div>Loading questions...</div>;
  }

  if (currentIndex >= question.length) {
    return (
      <div>
        <h2>Test Over!</h2>
        <p>Well done, {username}!</p>
        <p>Your final score: {score}</p>
        <p>Your streak: {streak}</p>
        <button onClick={saveResults}>Ready</button>
      </div>
    );
  }

  // this just makes code cleaner in return
  // without this it would be:
  // question[currentIndex].question etc.
  const currentQuestion = question[currentIndex];

  return (
    <div>
      <div>
        <p>{username}</p><p>{currentIndex + 1}/{question.length}</p>
        <p>{score}</p>
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
