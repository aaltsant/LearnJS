import { useEffect, useState } from "react";
import styles from '../styles/home.module.css';


function HomePage() {
  const [users, setUsers] = useState([]);

  /**
   * fetches top 10 points from users table
   * aka leaderboard
   */
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/users/top");
      const data = await response.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);


  return (
    <div>
      <h1 className={styles.header}>LearnJS! - JavaScript made fun!</h1>
      <h2 className={styles.header2}>About this project:</h2>
      <p className={styles.para}>
        LearnJS! is my first ever fullstack project. I had an idea about making this project for a long time.
        I made this as my fullstack course project because I wanted to make project that will taught me new things.
        Whether you are beginner or an advanced coder you can learn new things from here, try it out to sharpen your skills and get your name up on the leaderboard!
      </p>

      <div className={styles.maincontainer}>

        <div className={styles.modecard}>
          <h3 className={styles.header3}>Training mode</h3>
          <p className={styles.modepara}>Here you can train your knowledge and skills. There is theory questions and syntax questions!</p>
          <p className={styles.modepara}>Master the basics at your own pace. Practice with a vast library of questions ranging from variables to asynchronous patterns. Perfect for learning without the pressure of a timer.</p>
        </div>

        <div className={styles.modecard}>
          <h3 className={styles.header3}>Test mode</h3>
          <p className={styles.modepara}>Here you can really  put your skills to test! Saves your username and points.</p>
          <p className={styles.modepara}>Put your JS knowledge to the ultimate test! Answer 15 randomized questions. Your performance will be ranked, so stay sharp and aim for the top of the leaderboard.</p>
        </div>

        <div className={styles.leaderboard}>
          <h3 className={styles.header3}>Leaderboard / Top10</h3>
            {users.map((user, index) => (
            <p className={styles.modepara} key={user.id}>
              {index + 1}. {user.username}, {user.score}</p>
            ))}
        </div>

      </div>
    </div>
  );

}

export default HomePage
