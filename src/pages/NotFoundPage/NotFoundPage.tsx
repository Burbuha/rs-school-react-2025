import { useNavigate } from 'react-router-dom';

import styles from './NotFoundPage.module.css';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <button onClick={handleClick}>Go Home</button>
    </div>
  );
};
