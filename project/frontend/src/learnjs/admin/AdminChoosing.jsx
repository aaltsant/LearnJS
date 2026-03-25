import AdminTraining from "./AdminTraining";
import { useState } from "react";

function AdminChoosing() {
  const [view, setView] = useState("menu");

  if (view === "training") {
    return <AdminTraining />
  }


  return (
    <>
      <div>
        <button onClick={() => setView("training")}>Change training questions</button>
        <button>Change test questions</button>
        <button>Change users</button>
      </div>
    </>
  );
}

export default AdminChoosing;