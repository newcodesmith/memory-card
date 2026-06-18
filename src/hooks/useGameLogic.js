import { useEffect, useState } from "react";

export const useGameLogic = (cardValues) => {
  const [cards, setCards] = useState([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

  const initializeGame = () => {
    const finalCards = shuffleArray(cardValues).map((value, index) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false,
    }));

    setCards(finalCards);
    setIsLocked(false);
    setScore(0);
    setMoves(0);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (card) => {
    if (card.isFlipped || card.isMatched || isLocked) return;

    const firstCard = cards.find((c) => c.isFlipped && !c.isMatched);

    setCards((prev) =>
      prev.map((c) => (c.id === card.id ? { ...c, isFlipped: true } : c)),
    );

    if (!firstCard) return;

    const newMoves = moves + 1;
    setIsLocked(true);
    setMoves(newMoves);

    if (firstCard.value === card.value) {
      const matchPoints = Math.max(50 - newMoves * 2, 5);
      setTimeout(() => {
        setCards((prev) =>
          prev.map((c) =>
            c.id === card.id || c.id === firstCard.id
              ? { ...c, isMatched: true }
              : c,
          ),
        );
        setScore((prev) => prev + matchPoints);
        setIsLocked(false);
      }, 500);
    } else {
      setTimeout(() => {
        setCards((prev) =>
          prev.map((c) =>
            c.id === card.id || c.id === firstCard.id
              ? { ...c, isUnflipping: true }
              : c,
          ),
        );
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === card.id || c.id === firstCard.id
                ? { ...c, isFlipped: false, isUnflipping: false }
                : c,
            ),
          );
          setIsLocked(false);
        }, 800);
      }, 1800);
    }
  };

  const isGameComplete = cards.length > 0 && cards.every((c) => c.isMatched);

  return {
    cards,
    score,
    moves,
    isGameComplete,
    initializeGame,
    handleCardClick,
  };
};
