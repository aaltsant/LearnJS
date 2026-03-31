import { use, useState } from 'react';
import AdminChoosing from './AdminChoosing';

function AdminTraining() {
  const [questions, setQuestions] = useState([]);
  const [view, setView] = useState("Admintraining");

  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [answer, setAnswer] = useState("");
  const [code, setCode] = useState("");
  const [correct, setCorrect] = useState("");
  const [incorrect, setIncorrect] = useState("");

  const fetchQuestions = async () => {
    const response = await fetch("/api/questions");
    const data = await response.json();
    setQuestions(data);
  };

  if (view === "menu") {
    return <AdminChoosing />
  }

  if (view === "create") {
    return (
      <>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
          <h2>Create new question</h2>
          <input placeholder="question" value={question}/>
          <input placeholder="option_1" value={option1}/>
          <input placeholder="option_2" value={option2}/>
          <input placeholder="option_3" value={option3}/>
          <input placeholder="correct_answer" value={answer}/>
          <input placeholder="code _snippet" value={code}/>
          <input placeholder="feedback_correct" value={correct}/>
          <input placeholder="feedback_incorrect" value={incorrect}/>
          <button type="submit">Submit</button>
        </form>
        <button onClick={() => setView("menu")}>Go back</button>
      </>
    );
  }

  return (
    <>
      <h1>Questions table CRUD -operations</h1>
      <div>
        <button onClick={() => setView("create")}>Create</button>
        <button onClick={fetchQuestions}>Read</button>
        <button>Update</button>
        <button>Delete</button>
      </div>
      <button onClick={() => setView("menu")}>Go back</button>
      <div>
        <pre>{JSON.stringify(questions, null, 2)}</pre>
      </div>
    </>
  );
}

export default AdminTraining;