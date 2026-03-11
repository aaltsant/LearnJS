import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      const response = await fetch("/api/users");
      const data = await response.json();
      setUsers(data);
    };
    fetchLocations();
  }, []);

  return (
    <ul>
      {users.map((loc) => (
        <li key={loc.id}>{loc.username}, {loc.points}</li>
      ))}
    </ul>
  );
}

export default App
