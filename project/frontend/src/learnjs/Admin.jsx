import { useState } from 'react';
import { Link } from 'react-router-dom';

function Admin() {
  const [question, setQuestion] = useState([]);

  const fetchQuestions = async () => {
      const response = await fetch("/api/questions");
      const data = await response.json();
      setQuestion(data);
  };

  return (
    <>
      <h1>CRUD -operations</h1>
      <div>
        <button>Create</button>
        <button onClick={fetchQuestions}>Read</button>
        <button>Update</button>
        <button>Delete</button>
      </div>
      <div>
        <pre>{JSON.stringify(question, null, 2)}</pre>
      </div>
    </>
  );
}

export default Admin;