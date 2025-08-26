import { useCallback } from 'react';

const useClickSound = () => {
  const playSound = useCallback(() => {
    const audio = new Audio('/audio/click.mp3');
    audio.play();
  }, []);

  return playSound;
};

export default useClickSound;
