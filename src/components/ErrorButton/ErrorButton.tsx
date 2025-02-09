import { useState } from 'react';

export const ErrorButton = () => {
  const [shouldThrowError, setShouldThrowError] = useState(false);

  const handleClick = () => {
    setShouldThrowError(true);
  };

  if (shouldThrowError) {
    throw new Error('Test error after button click');
  }

  return <button onClick={handleClick}>Throw Error</button>;
};
