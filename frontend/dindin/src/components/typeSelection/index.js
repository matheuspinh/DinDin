import './styles.css'

export default function TypeSelection({ type, setType }) {
  function handleClick(e, value) {
    e.preventDefault()
    setType(value)
  }

  return (
    <div className="selection-box">
      <button
        className={`selection-button income ${type === "entrada" ? "selected" : ""}`}
        onClick={(e) => handleClick(e, "entrada")}>Entrada</button>
      <button
        className={`selection-button expense ${type === "saida" ? "selected" : ""}`}
        onClick={(e) => handleClick(e, "saida")}>Saída</button>
    </div>
  )
}