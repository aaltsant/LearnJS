import { useEffect, useState } from "react";

function HomePage() {
  const [users, setUsers] = useState([]);

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
      <h1>LearnJS! - JavaScript made fun!</h1>
      <p>This is fullstack app made as course project.</p>

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
