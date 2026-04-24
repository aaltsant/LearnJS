import { useEffect, useState } from "react";
import styles from '../styles/general.module.css';


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
      <p className={styles.para}>This is fullstack app made as course project.</p>

      <h3>Views:</h3>
        <ul>
          <li><strong>Home:</strong> This page you are on right now. This is where you land and can move on to different pages.</li>
          <li><strong>Training:</strong> You can train your knowledge and skills. There is theory questions and syntax questions!</li>
          <li><strong>Test:</strong> Here you can really  put your skills to test! Saves your username and points.</li>
        </ul>

      <h3>Leaderboard:</h3>
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.username}, {user.score}</li>
            ))}
        </ul>
    </div>
  );

}

export default HomePage
