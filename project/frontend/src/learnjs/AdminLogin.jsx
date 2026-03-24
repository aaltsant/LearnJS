import { useState } from "react";
import Admin from "./Admin";
import styles from '../styles/admin.module.css';

function AdminLogin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const LogIn = () => {
    if (password === "toimiiko") {
      setIsAuthenticated(true);
    } else {
      alert("Wrong password!");
    }
  }

  if (isAuthenticated) {
    return <Admin />
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