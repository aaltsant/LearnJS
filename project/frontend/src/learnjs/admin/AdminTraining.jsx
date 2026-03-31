import { useState } from 'react';
import AdminChoosing from './AdminChoosing';

function AdminTraining() {
  const [questions, setQuestions] = useState([]);
  const [view, setView] = useState("Admintraining");

  const [id, setId] = useState("");
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

  if (view === "crudmenu") {
    return <AdminTraining />
  }

  if (view === "create") {
    return (
      <>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
          <h2>Create new question</h2>
          <input placeholder="question" value={question} onChange={(e) => setQuestion(e.target.value)} />
          <input placeholder="option_1" value={option1} onChange={(e) => setOption1(e.target.value)} />
          <input placeholder="option_2" value={option2} onChange={(e) => setOption2(e.target.value)} />
          <input placeholder="option_3" value={option3} onChange={(e) => setOption3(e.target.value)} />
          <input placeholder="correct_answer" value={answer} onChange={(e) => setAnswer(e.target.value)} />
          <input placeholder="code _snippet" value={code} onChange={(e) => setCode(e.target.value)} />
          <input placeholder="feedback_correct" value={correct} onChange={(e) => setCorrect(e.target.value)} />
          <input placeholder="feedback_incorrect" value={incorrect} onChange={(e) => setIncorrect(e.target.value)} />
          <button type="submit">Submit</button>
        </form>
        <button onClick={() => setView("crudmenu")}>Go back</button>
      </>
    );
  }

  if (view === "update") {
    return (
      <>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
          <input placeholder='What field you want to update'/>
          <input placeholder='New value'/>
          <button type="submit">Submit</button>
        </form>
        <button onClick={() => setView("crudmenu")}>Go back</button>
      </>
    )
  }



  if (view === "delete") {
    const handleDelete = async (e) => {
      // tämä estää sivun uudelleen lataamisen (state nollautuisi)
      e.preventDefault();

      if (!id) {
        return alert("Give ID!");
      }

      if (isNaN(id)) {
        alert("ID is not valid integer!");
      }

      const response = await fetch(`/api/questions/${id}`, {
        // tämä kertoo bäkkäriin, että kyseessä on DELETE request
        method: 'DELETE',
      });

      // tämä tarkistaa, että onnistuiko poistaminen vai ei
      // ja ilmoittaa fronttiin siitä. setId() nollaa id:n staten
      if (response.status === 204) {
        alert(`Question with ${id} was deleted successfully!`);
        setId("");
      } else if (response.status === 404) {
        alert(`Question with ${id} was not found!`);
        setId("");
      }
    }

    return (
      <>
        <form onSubmit={handleDelete} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
          <input placeholder='Question to delete (ID)' value={id} onChange={(e) => setId(e.target.value)}/>
          <button type="submit">Submit</button>
        </form>
        <button onClick={() => setView("crudmenu")}>Go back</button>
      </>
    )
  }

  return (
    <>
      <h1>Questions table CRUD -operations</h1>
      <div>
        <button onClick={() => setView("create")}>Create</button>
        <button onClick={fetchQuestions}>Read</button>
        <button onClick={() => setView("update")}>Update</button>
        <button onClick={() => setView("delete")}>Delete</button>
      </div>
      <button onClick={() => setView("menu")}>Go back</button>
      <div>
        <pre>{JSON.stringify(questions, null, 2)}</pre>
      </div>
    </>
  );
}

export default AdminTraining;