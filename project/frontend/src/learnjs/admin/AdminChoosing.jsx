import { useState } from "react";
import AdminTest from "./AdminTest";
import AdminTraining from "./AdminTraining";
import AdminUsers from "./AdminUsers";

function AdminChoosing() {
  const [view, setView] = useState("menu");

  if (view === "training") {
    return <AdminTraining />
  }

  if (view === "test") {
    return <AdminTest />
  }

  if (view === "users") {
    return <AdminUsers />
  }

  return (
    <>
      <div>
        <h1>Which table you want to change?</h1>
        <button onClick={() => setView("training")}>Change training questions</button>
        <button onClick={() => setView("test")}>Change test questions</button>
        <button onClick={() => setView("users")}>Change users</button>
      </div>
    </>
  );
}

export default AdminChoosing;