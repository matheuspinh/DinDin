import './styles.css'
import { useEffect, useState } from 'react'
import { getItem } from '../../utils/storage'
import api from '../../services/api'
import plusIcon from '../../assets/plus-black.png'
import xIcon from '../../assets/x-white.png'

export default function Filter({ setFilters, selectedFilters, setSelectedFilters }) {
  const [categories, setCategories] = useState([])
  const localSelection = [...selectedFilters]
  const [localState, setLocalState] = useState(false)


  async function loadCategories(token) {
    try {
      const response = await api.get('/categoria', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setCategories(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  function handleSetFilters() {
    setFilters(selectedFilters)
  }

  function handleClear() {
    setSelectedFilters([])
    setFilters([])
  }

  function handleSelectCategory(e, category) {
    e.preventDefault()

    if (localSelection.includes(category)) {
      const index = localSelection.indexOf(category);
      localSelection.splice(index, 1);
      setSelectedFilters(localSelection)
      setLocalState(!localState)
    } else {
      localSelection.push(category)
      setSelectedFilters(localSelection)
      setLocalState(!localState)
    }
  }

  useEffect(() => {
    const token = getItem('token')
    if (!categories.length) {
      loadCategories(token)
    }
  }, [localState])

  return (
    <div className="filter-container">
      <h1 className="filter-title">Categorias</h1>
      <div className="categories-box">
        {categories.map((category, key) => {
          return (
            <div onClick={(e) => handleSelectCategory(e, category.descricao)} value={category.descricao} className={"category-button" + (selectedFilters.includes(category.descricao) ? ' selected' : '')} key={key}><p>{category.descricao}</p>{selectedFilters.includes(category.descricao) ? <img src={xIcon}></img> : <img src={plusIcon}></img>}</div>
          )
        })}
      </div>
      <div className="set-filter-container">
        <button className="apply" onClick={handleSetFilters}>Aplicar Filtros</button>
        <button className="clear" onClick={handleClear}>Limpar Filtros</button>
      </div>
    </div>
  )
}