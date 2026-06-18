import { useState } from "react";
import GameHeader from "./components/GameHeader";
import Card from "./components/Card";
import WinMessage from "./components/WinMessage";
import { useGameLogic } from "./hooks/useGameLogic";

import bookends from "./Assets/bookends.jpg";
import kindOfBlue from "./Assets/kind_of_blue.jpg";
import legend from "./Assets/legend.jpg";
import meMyselfAndI from "./Assets/me_myself_and_i.jpg";
import petSounds from "./Assets/pet_sounds.jpg";
import redHeadedStranger from "./Assets/red_headed_stranger.jpg";
import rumours from "./Assets/rumours.jpg";
import sgtPeppers from "./Assets/sgt_peppers.jpg";

const albums = [
  bookends,
  kindOfBlue,
  legend,
  meMyselfAndI,
  petSounds,
  redHeadedStranger,
  rumours,
  sgtPeppers,
];

const cardValues = [...albums, ...albums];

const App = () => {
  const {
    cards,
    score,
    moves,
    isGameComplete,
    initializeGame,
    handleCardClick,
  } = useGameLogic(cardValues);

  const [winDismissed, setWinDismissed] = useState(false);

  const handleReset = () => {
    setWinDismissed(false);
    initializeGame();
  };

  return (
    <div className="app">
      <GameHeader score={score} moves={moves} onReset={handleReset} />

      {isGameComplete && !winDismissed && (
        <WinMessage moves={moves} onClose={() => setWinDismissed(true)} />
      )}

      <div className="cards-grid">
        {cards.map((card) => (
          <Card key={card.id} card={card} onClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
};

export default App;
