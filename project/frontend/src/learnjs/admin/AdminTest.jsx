import { useState } from 'react';
import AdminChoosing from './AdminChoosing';

function AdminTest() {
  const [question, setQuestion] = useState([]);
  const [view, setView] = useState("Admintest");

  const fetchQuestions = async () => {
    const response = await fetch("/api/testquestions");
    const data = await response.json();
    setQuestion(data);
  };

  if (view === "menu") {
    return <AdminChoosing />
  }

  return (
    <>
      <h1>Test table CRUD -operations</h1>
      <div>
        <button>Create</button>
        <button onClick={fetchQuestions}>Read</button>
        <button>Update</button>
        <button>Delete</button>
      </div>
      <button onClick={() => setView("menu")}>Go back</button>
      <div>
        <pre>{JSON.stringify(question, null, 2)}</pre>
      </div>
    </>
  );
}

export default AdminTest;