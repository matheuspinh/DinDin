import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getItem } from '../../utils/storage'
import TypeSelection from '../typeSelection'
import api from '../../services/api'
import './styles.css'
import dateFormat from 'dateformat'
import CurrencyInput from 'react-currency-input-field'

export default function Registry(props) {
  const { setTransactions, transactions, handleModalActive, transactionType, currentData, title, modalType } = props
  const localTransactions = [...transactions]
  const [type, setType] = useState('')
  const [categories, setCategories] = useState([])
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState('')
  const [category, setCategory] = useState('')
  const [categoryName, setCategoryName] = useState('')
  const [description, setDescription] = useState('')

  const token = getItem('token')
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
    populateCategories(token)
    if (transactionType) {
      setType(transactionType)
    } else if (currentData) {
      setType(currentData.tipo)
      setAmount(currentData.valor / 100)
      setDate(dateFormat(currentData.data, "yyyy-mm-dd"))
      setCategory(currentData.categoria_id)
      setCategoryName(currentData.categoria_nome)
      setDescription(currentData.descricao)
    }
  }, [])

  async function populateCategories(token) {
    try {
      const response = await api.get('/categoria', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setCategories(response.data)
    } catch (err) {
      navigate('/login')
    }
  }

  async function handleSubmitEdit(e) {
    e.preventDefault();
    try {
      const token = getItem('token')
      if (!type || !amount || !date || !category || !description) {
        return
      }
      const amountString = amount.toString().replace(",", "").replace(".", "");
      const response = await api.put(`/transacao/${currentData.id}`, {
        tipo: type,
        descricao: description,
        valor: parseInt(amountString, 10),
        data: date,
        categoria_id: category
      },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      const index = localTransactions.findIndex(transaction => transaction.id === currentData.id)
      localTransactions[index] = {
        id: currentData.id,
        tipo: type,
        descricao: description,
        valor: parseInt(amountString, 10),
        data: date,
        categoria_id: category,
        categoria_nome: categoryName
      }
      setTransactions(localTransactions)
      handleModalActive(e)
    } catch (err) {
      console.log(err)
    }
  }

  async function handleSubmitNew(e) {
    e.preventDefault();
    try {
      const token = getItem('token')
      if (!type || !amount || !date || !category || !description) {
        return
      }
      const amountString = amount.toString().replace(",", "").replace(".", "");
      const response = await api.post('/transacao', {
        tipo: type,
        descricao: description,
        valor: (parseInt(amountString, 10)),
        data: date,
        categoria_id: category
      },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      const newTransaction = response.data
      localTransactions.push(newTransaction)
      setTransactions(localTransactions)
      handleModalActive(e)
    } catch (err) {
      console.log(err)
    }
  }

  function handleChangeCategory(e) {
    e.preventDefault()
    setCategory(e.target.value)
    const value = parseInt(e.target.value)
    const categoryDescription = categories.filter(cat => cat.id === value)
    setCategoryName(categoryDescription[0].descricao)
  }

  function handleValueChange(newValue) {
    if (newValue === undefined) {
      setAmount(0.00)
    } else {
      setAmount(newValue)
    }
  }

  return (
    <div className="addregistry-container">
      <h1>{title}</h1>
      <form className="addregistry-form">
        <TypeSelection type={type} setType={setType} />
        <div className="input-fields">
          <label>Valor</label>
          <CurrencyInput intlConfig={{ locale: 'pt-BR', currency: 'BRL' }} decimalScale={2} decimalLimit={2} value={amount} onValueChange={handleValueChange} />
          {/* <input type="text" value={amount} onKeyUp={(e) => { handleFormatCurrency(e) }} onChange={(e) => setAmount(e.target.value)}></input> */}
          <label>Categoria</label>
          <select value={category} onChange={(e) => handleChangeCategory(e)}>
            <option></option>
            {categories.map((val, key) => {
              return (
                <option value={val.id} key={key}>{val.descricao}</option>
              )
            })}
          </select>
          <label>Data</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)}></input>
          <label>Descrição</label>
          <input value={description} onChange={(e) => setDescription(e.target.value)}></input>
          {modalType === 'addRegistry' ?
            <button onClick={(e) => handleSubmitNew(e)}>Confirmar</button> :
            <button onClick={handleSubmitEdit}>Confirmar</button>}
        </div>
      </form>
    </div>
  )
}