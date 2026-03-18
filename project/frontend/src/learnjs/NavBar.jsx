import { Link } from 'react-router-dom';
import styles from '../styles/questions.module.css';

function NavBar() {

    return (
        <nav className={styles.navbar}>
            <Link className={styles.navLink} to="/">Home</Link>
            <Link className={styles.navLink} to="/training">Training</Link>
        </nav>
    );
}

export default NavBar;