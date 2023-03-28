import { useState } from 'react';
import './styles.css';
import DeleteIcon from "../../assets/icons-delete.png";

export default function Tooltip({ handleDelete, id }) {
  const [active, setActive] = useState(false)

  function handleActive(e) {
    e.preventDefault()
    setActive(!active)
  }

  return (
    <div className="tooltip-wrapper" onClick={handleActive}>
      <img src={DeleteIcon}></img>
      {active && (<div className="tooltip-content">
        <h3>Apagar item?</h3>
        <div className="tooltip-buttons">
          <button className="confirm" onClick={(e) => { handleDelete(e, id) }}>Sim</button>
          <button className="cancel">Não</button>
        </div>
      </div>)}
    </div>
  )
}