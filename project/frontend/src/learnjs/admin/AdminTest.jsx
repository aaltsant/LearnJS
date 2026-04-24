import { useState } from 'react';
import AdminChoosing from './AdminChoosing';

function AdminTest() {
  const [questions, setQuestions] = useState([]);
  const [view, setView] = useState("Admintest");

  const [id, setId] = useState("");
  const [field, setField] = useState("");
  const [newField, setNewField] = useState("");

  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [answer, setAnswer] = useState("");
  const [code, setCode] = useState();
  const [correct, setCorrect] = useState("");
  const [incorrect, setIncorrect] = useState("");

  /**
   * fetches all questions from test table
   */
  const fetchQuestions = async () => {
    const response = await fetch("/api/test");
    const data = await response.json();
    setQuestions(data);
  };

  if (view === "menu") {
    return <AdminChoosing />
  }

  if (view === "crudmenu") {
    return <AdminTest />
  }

  if (view === "create") {

    /**
     * handles posting new questions to table
     * @param {object} e
     */
    const handleCreate = async (e) => {
      e.preventDefault();

      const response = await fetch(`api/test`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          question: question,
          option_1: option1,
          option_2: option2,
          option_3: option3,
          correct_answer: answer,
          code_snippet: code,
          feedback_correct: correct,
          feedback_incorrect: incorrect
        })
      });

      if (response.status === 201) {
        alert(`New question created successfully`);
        setQuestion("");
        setOption1("");
        setOption2("");
        setOption3("");
        setAnswer("");
        setCode();
        setCorrect("");
        setIncorrect("");
      } else {
        alert(`Something went wrong!`);
      }
    }

    return (
      <>
        <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px', padding: '15px' }}>
          <h2>Create new question</h2>
          <input placeholder="question" value={question} onChange={(e) => setQuestion(e.target.value)} />
          <input placeholder="option_1" value={option1} onChange={(e) => setOption1(e.target.value)} />
          <input placeholder="option_2" value={option2} onChange={(e) => setOption2(e.target.value)} />
          <input placeholder="option_3" value={option3} onChange={(e) => setOption3(e.target.value)} />
          <input placeholder="correct_answer" value={answer} onChange={(e) => setAnswer(e.target.value)} />
          <input placeholder="code_snippet" value={code} onChange={(e) => setCode(e.target.value)} />
          <input placeholder="feedback_correct" value={correct} onChange={(e) => setCorrect(e.target.value)} />
          <input placeholder="feedback_incorrect" value={incorrect} onChange={(e) => setIncorrect(e.target.value)} />
          <button type="submit">Submit</button>
        </form>
        <button onClick={() => setView("crudmenu")}>Go back</button>
      </>
    );
  }

  if (view === "update") {

    /**
     * handles updating users
     * @param {object} e
     */
    const handleUpdate = async (e) => {
      e.preventDefault();

      const correctFields = ["question", "option_1", "option_2", "option_3",
      "correct_answer", "code_snippet", "feedback_correct", "feedback_incorrect"]

      if (!id) {
        return alert("Give ID!");
      }

      if (isNaN(id)) {
        alert("ID is not valid integer!");
      }

      if (!correctFields.includes(field)) {
        alert("Field you want to update dont exist!");
        return;
      }

      if (!newField) {
        return alert("Give new value!");
      }

      const response = await fetch(`api/test/${id}`, {
        method: 'PATCH',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          [field]: newField
        })
      });

      if (response.status === 200) {
        alert(`Question with id: ${id} was updated successfully!`);
        setId("");
        setField("");
        setNewField("");
      } else if (response.status === 404) {
        alert(`Question with id: ${id} was not found!`);
      } else {
        alert("Something went wrong!");
      }
    }

    return (
      <>
        <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px', padding: '15px'}}>
          <input placeholder='Questions ID' value={id} onChange={(e) => setId(e.target.value)}/>
          <input placeholder='Field you want to update' value={field} onChange={(e) => setField(e.target.value)}/>
          <input placeholder='New value' value={newField} onChange={(e) => setNewField(e.target.value)}/>
          <button type="submit">Submit</button>
        </form>
        <button onClick={() => setView("crudmenu")}>Go back</button>
      </>
    )
  }



  if (view === "delete") {

    /**
     * handles deleting questions
     * @param {object} e
     */
    const handleDelete = async (e) => {
      e.preventDefault();

      if (!id) {
        return alert("Give ID!");
      }

      if (isNaN(id)) {
        alert("ID is not valid integer!");
      }

      const response = await fetch(`/api/test/${id}`, {
        method: 'DELETE',
      });

      if (response.status === 204) {
        alert(`Question with id: ${id} was deleted successfully!`);
        setId("");
      } else if (response.status === 404) {
        alert(`Question with id: ${id} was not found!`);
      }
    }

    return (
      <>
        <form onSubmit={handleDelete} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px', padding: '15px' }}>
          <input placeholder='Question to delete (ID)' value={id} onChange={(e) => setId(e.target.value)}/>
          <button type="submit">Submit</button>
        </form>
        <button onClick={() => setView("crudmenu")}>Go back</button>
      </>
    )
  }

  return (
    <>
      <h1>Test table CRUD -operations</h1>
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

export default AdminTest;