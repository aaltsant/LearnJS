import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/questions.module.css';

function Test({ username }) {
  const [question, setQuestion] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState("");

  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxstreak, setMaxstreak] = useState(0);

  const [hasAnswered, setHasAnswered] = useState(false);

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
    setHasAnswered(false);
    setCurrentIndex(prevIndex => prevIndex + 1);
  };

  // this method right here checks if the answer is correct
  // and if it is the score rises by 100
  // and if not score will decrease
  const checkAnswer = (answer) => {
    // if user has answered questions
    // return immediately
    if (hasAnswered) {
      return;
    }

    setHasAnswered(true);

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

  // changes state to the biggest streak
  if (streak > maxstreak) {
    setMaxstreak(streak);
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
        max_streak: maxstreak
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
    return <div className={styles.header2}>Loading questions...</div>;
  }

  if (currentIndex >= question.length) {
    return (
      <div className={styles.questionbackcard}>
        <h2 className={styles.header2}>Test Over!</h2>
        <p className={styles.finalpara}>Well done, {username}!</p>
        <p className={styles.finalpara}>Your final score: {score}</p>
        <p className={styles.finalpara}>Your highest streak: {maxstreak}</p>
        <button className={styles.button} onClick={saveResults}>Ready</button>
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
        <container className={styles.namebox}
        style={{ textAlign: 'center', margin: '20px auto', width: 'fit-content', gap: "15px"}}>
          <p>Username: {username}</p>
          <p>question: {currentIndex + 1}/{question.length}</p>
          <p>Score: {score}</p> <p>Streak: {streak}</p>
        </container>

      <div className={styles.questionbackcard}>
        <h2 className={styles.header2}>{currentQuestion.question}</h2>

          <div className={styles.questioncard}>
            <pre style={{ textAlign: 'left', margin: '20px auto', width: 'fit-content'}}>
              <code className={styles.code}>{currentQuestion.code_snippet}</code>
            </pre>

            <button className={styles.button} onClick={() => checkAnswer(currentQuestion.option_1)}
              disabled={hasAnswered}>
              {currentQuestion.option_1}
            </button>

            <button className={styles.button} onClick={() => checkAnswer(currentQuestion.option_2)}
              disabled={hasAnswered}>
              {currentQuestion.option_2}
            </button>

            <button className={styles.button} onClick={() => checkAnswer(currentQuestion.option_3)}
              disabled={hasAnswered}>
              {currentQuestion.option_3}
            </button>

            <p className={styles.para}>{feedback}</p>
          </div>

          <button className={styles.nextButton} onClick={nextQuestion} disabled={!hasAnswered}>
            Next question
          </button>
        </div>
      </div>
    </div>
  );
}

export default Test
