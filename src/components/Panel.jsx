import { Button } from 'react-bootstrap';

function Panel({ isLeft, title, description, buttonText, onClick }) {
  return (
    <div className={`panel ${isLeft ? 'left-panel' : 'right-panel'}`}>
      <div className="content">
        <h3>{title}</h3>
        <p>{description}</p>
        <Button className="btn transparent" onClick={onClick}>
          {buttonText}
        </Button>
      </div>
    </div>
  );
}

export default Panel;