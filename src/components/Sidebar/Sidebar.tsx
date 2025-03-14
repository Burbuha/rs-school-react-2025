import styles from './Sidebar.module.css';
import { Link } from 'react-router-dom';

export const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <h1>React forms</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Main</Link>
          </li>
          <li>
            <Link to="/uncontrolled-form">Uncontrolled Form</Link>
          </li>
          <li>
            <Link to="/hook-form">Hook Form</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
