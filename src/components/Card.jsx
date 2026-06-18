import vinylRecord from "../Assets/vinyl-record.png"

const Card = ({ card, onClick }) => {
  return (
    <div className={`card ${card.isFlipped ? 'flipped' : ''} ${card.isUnflipping ? 'unflipping' : ''} ${card.isMatched ? 'matched' : ''}`} onClick={() => {onClick(card)}}>
        <div className="card-front"><img src={vinylRecord} alt="" /></div>
        <div className="card-back"><img src={card.value} alt="" /></div>
    </div>
  )
}

export default Card
