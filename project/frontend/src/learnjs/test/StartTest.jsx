import { useState } from 'react'
import Test from './Test';
import styles from "../../styles/questions.module.css";

function StartTest() {
  const [view, setView] = useState("startTest");
  const [username, setUsername] = useState("");

  if (view === "game") {
    return <Test username={username} />
  }

  return (
    <div>
      <h1 className={styles.header1}>Are you ready to test your skills?</h1>
      <div className={styles.startbox}>
        <h2 className={styles.header2}>What is your name?</h2>
        <p className={styles.finalpara}>It's saved for leaderboard!</p>
        <input className={styles.input} placeholder='Your name...' value={username} onChange={(e) => setUsername(e.target.value)}/>
        <button className={styles.nextButton} onClick={() => setView("game")}>Start test!</button>
      </div>
    </div>
  );
}

export default StartTest
