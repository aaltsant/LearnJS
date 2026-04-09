import { useState } from 'react';
import AdminChoosing from './AdminChoosing';

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [view, setView] = useState("users");

  const [id, setId] = useState("");
  const [field, setField] = useState("");
  const [newField, setNewField] = useState("");

  const [username, setUsername] = useState("");
  const [score, setScore] = useState("");
  const [streak, setStreak] = useState("");

  const fetchUsers = async () => {
    const response = await fetch("/api/users");
    const data = await response.json();
    setUsers(data);
  };

  if (view === "menu") {
    return <AdminChoosing />
  }

   if (view === "crudmenu") {
    return <AdminUsers />
  }

  if (view === "create") {
  const handleCreate = async (e) => {
    e.preventDefault();

    const response = await fetch(`api/users`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        username: username,
        score: score,
        max_streak: streak
      })
    });

    if (response.status === 201) {
      alert(`New user created successfully`);
      setUsername("");
      setScore("");
      setStreak("");
    } else {
      alert(`Something went wrong!`);
    }
  }

  return (
    <>
      <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px', padding: '15px' }}>
        <h2>Create new user</h2>
        <input placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input placeholder="score" value={score} onChange={(e) => setScore(e.target.value)} />
        <input placeholder="max streak" value={streak} onChange={(e) => setStreak(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      <button onClick={() => setView("crudmenu")}>Go back</button>
    </>
  );
}

  if (view === "update") {
    const handleUpdate = async (e) => {
      e.preventDefault();

      const correctFields = ["username", "score", "max_streak"]

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

      const response = await fetch(`api/users/${id}`, {
        // kertoo mikä metodi
        method: 'PATCH',
        // tämä kertoo, että tuleva sisältö on jsonia
        headers: { 'Content-type': 'application/json' },
        // .stringify muuttaa js-olion merkkijonoksi
        // se täytyy muuttaa merkkijonoksi, jotta bäkkäri osaa lukea sitä!
        body: JSON.stringify({
          [field]: newField
        })
      });

      if (response.status === 200) {
        alert(`User with id: ${id} was updated successfully!`);
        setId("");
        setField("");
        setNewField("");
      } else if (response.status === 404) {
        alert(`User with id: ${id} was not found!`);
      } else {
        alert("Something went wrong!");
      }
    }

    return (
      <>
        <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px', padding: '15px'}}>
          <input placeholder='Users ID' value={id} onChange={(e) => setId(e.target.value)}/>
          <input placeholder='User you want to update' value={field} onChange={(e) => setField(e.target.value)}/>
          <input placeholder='New value' value={newField} onChange={(e) => setNewField(e.target.value)}/>
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

      const response = await fetch(`/api/users/${id}`, {
        // tämä kertoo bäkkäriin, että kyseessä on DELETE request
        method: 'DELETE',
      });

      // tämä tarkistaa, että onnistuiko poistaminen vai ei
      // ja ilmoittaa fronttiin siitä. setId() nollaa id:n staten
      if (response.status === 204) {
        alert(`User with id: ${id} was deleted successfully!`);
        setId("");
      } else if (response.status === 404) {
        alert(`User with id: ${id} was not found!`);
      }
    }

    return (
      <>
        <form onSubmit={handleDelete} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px', padding: '15px' }}>
          <input placeholder='User to delete (ID)' value={id} onChange={(e) => setId(e.target.value)}/>
          <button type="submit">Submit</button>
        </form>
        <button onClick={() => setView("crudmenu")}>Go back</button>
      </>
    )
  }

  return (
    <>
      <h1>Users table CRUD -operations</h1>
      <div>
        <button onClick={() => setView("create")}>Create</button>
        <button onClick={fetchUsers}>Read</button>
        <button onClick={() => setView("update")}>Update</button>
        <button onClick={() => setView("delete")}>Delete</button>
      </div>
      <button onClick={() => setView("menu")}>Go back</button>
      <div>
        <pre>{JSON.stringify(users, null, 2)}</pre>
      </div>
    </>
  );
}

export default AdminUsers;
