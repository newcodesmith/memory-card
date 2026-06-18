const WinMessage = ({ moves, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="win-message" onClick={(e) => e.stopPropagation()}>
        <h2>Congratulations!</h2>
        <p>You completed the game in {moves} moves!</p>
        <button className="ok-btn" onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

export default WinMessage;
