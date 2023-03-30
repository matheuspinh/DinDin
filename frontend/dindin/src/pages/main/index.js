import Summary from '../../components/summary'
import Header from '../../components/header'
import './styles.css'
import { useEffect, useState } from 'react'
import { getItem } from '../../utils/storage'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import Table from '../../components/table'
import Modal from '../../components/modal'
import Filter from '../../components/filter'
import FilterIcon from '../../assets/icons-filter.png'

export default function Main() {
  const navigate = useNavigate()
  const [user, setUser] = useState({})
  const [modalActive, setModalActive] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState([])
  const [modalType, setModalType] = useState('')
  const [currentModalData, setCurrentModalData] = useState([])
  const [filterBox, setFilterBox] = useState(false)
  const [filters, setFilters] = useState([])
  const [summary, setSummary] = useState([])
  const [transactions, setTransactions] = useState([])

  function handleModalActive(e, modalType, data) {
    e.preventDefault()
    setModalType(modalType)
    setCurrentModalData(data)
    setModalActive(!modalActive)
  }

  const token = getItem('token')

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
    if (!user.length) {
      loadUser(token)
    }
    if (!transactions.length) {
      loadData(token)
    }
  }, [filters]);

  async function loadSummary(token) {
    try {
      const response = await api.get('/transacao/extrato', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setSummary(response.data)
    } catch (err) {
      navigate('/login')
    }
  }

  async function loadData(token) {
    try {
      const response = await api.get('/transacao', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setTransactions(response.data)
      return (response.data)
    } catch (err) {
      navigate('/login')
    }
  }

  async function loadUser(token) {
    try {
      const response = await api.get('/usuario', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setUser(response.data)
    } catch (err) {
      navigate('/login')
    }
  }

  return (
    <div className="main-container">
      <Header user={user} handleModalActive={handleModalActive} />
      <div className="main">
        <div className="information">
          <div>
            <div className="table-filter-container">
              <button className="filter-button" onClick={(e) => { setFilterBox(!filterBox) }}><img src={FilterIcon}></img>Filtrar</button>
              {filterBox && <Filter selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} setFilters={setFilters} />}
              <Table loadData={loadData} transactions={transactions} setTransactions={setTransactions} handleModalActive={handleModalActive} filters={filters} />
            </div>
          </div>
          <div className="summary-box">
            <Summary transactions={transactions} summary={summary} loadSummary={loadSummary} />
            <button onClick={(e) => handleModalActive(e, 'addRegistry')} className="add-registry-button">Adicionar registro</button>
          </div>
        </div>
        {modalActive && <Modal user={user} setUser={setUser} loadData={loadData} transactions={transactions} setTransactions={setTransactions} modalType={modalType} handleModalActive={handleModalActive} data={currentModalData} />}
      </div>
    </div>
  )
}