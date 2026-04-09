import { useState } from 'react'
import Test from './Test';

function StartTest() {
  const [view, setView] = useState("startTest");
  const [username, setUsername] = useState("");

  if (view === "game") {
    return <Test />
  }

  return (
    <div>
      <h1>Welcome to test page. Are you ready to test your skills?</h1>

      <h2>What is your name?</h2>
      <p>It's saved for leaderboard!</p>
      <form>
        <input placeholder='Your name/username...' value={username} onChange={(e) => setUsername(e.target.value)}/>
        <button onClick={() => setView("game")}>Start!</button>
      </form>
    </div>
  );
}

export default StartTest
