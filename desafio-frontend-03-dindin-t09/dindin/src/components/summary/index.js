import './styles.css'
import { useEffect, useState } from 'react'
import { getItem } from '../../utils/storage'
import api from '../../services/api'
import { useNavigate } from 'react-router-dom'

export default function Summary({ summary, loadSummary }) {
  const navigate = useNavigate()

  const token = getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
    loadSummary(token)
  }, [summary]);



  return (
    <div className='summary-container'>
      <h2>Resumo</h2>
      <div className='income'>
        <p>Entradas</p> <p className='value'>R$ {((summary.entrada / 100).toFixed(2)).toString().replace(".", ",")}</p>
      </div>
      <div className='expense'>
        <p className='text'>Saídas</p> <p className='value'>R$ {((summary.saida / 100).toFixed(2)).toString().replace(".", ",")}</p>
      </div>
      <div className='line'></div>
      <div className='balance'>
        <strong>Saldo</strong><p className='value'>R$ {(((summary.entrada - summary.saida) / 100).toFixed(2)).toString().replace(".", ",")}</p>
      </div>
    </div>
  )
}