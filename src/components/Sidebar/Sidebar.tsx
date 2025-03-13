import styles from './Sidebar.module.css';

export const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <h1>React forms</h1>
      <nav>
        <ul>
          <li>
            <a href="/">Main</a>
          </li>
          <li>
            <a href="/uncontrolled-form">Uncontrolled Form</a>
          </li>
          <li>
            <a href="/hook-form">Hook Form</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
