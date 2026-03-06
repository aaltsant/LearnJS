import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      const response = await fetch("/api/locations");
      const data = await response.json();
      setLocations(data);
    };
    fetchLocations();
  }, []);

  return (
    <ul>
      {locations.map((loc) => (
        <li key={loc.id}>{loc.name}</li>
      ))}
    </ul>
  );
}

export default App
