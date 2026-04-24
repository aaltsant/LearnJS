import { useState } from "react";
import styles from '../../styles/admin.module.css';
import AdminChoosing from "./AdminChoosing";

function AdminLogin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  /**
   * Password checker for adminpage
   * Works with state and if state is changed to correct string it
   * turn setIsAuthenticated to true and open adminpage
   */
  const LogIn = () => {
    if (password === "salkkis") {
      setIsAuthenticated(true);
    } else {
      alert("Wrong password!");
    }
  }

  if (isAuthenticated) {
    return <AdminChoosing />
  }

  return (
    <>
      <div>
        <input className={styles.input} placeholder="Write password..."
        value={password} onChange={(e) => setPassword(e.target.value)} />

        <button className={styles.button} onClick={LogIn}>Log In</button>
      </div>
    </>
  )
}

export default AdminLogin;