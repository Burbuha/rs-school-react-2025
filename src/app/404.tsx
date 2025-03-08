'use client';

import { useRouter } from 'next/navigation';
import styles from '../styles/NotFoundPage.module.css';

const NotFound = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/');
  };

  return (
    <div className={styles.container}>
      <button onClick={handleClick}>Go Home</button>
    </div>
  );
};

export default NotFound;
