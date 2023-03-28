import api from "../../services/api";
import './styles.css';
import EditIcon from "../../assets/icons-edit.png"
import { useEffect, useState } from 'react';
import { getItem } from '../../utils/storage';
import dateFormat from 'dateformat';
import { i18n } from 'dateformat';
import Tooltip from "../tooltip";
import ArrowUp from "../../assets/arrow-up.png";

i18n.dayNames = [
  "Dom",
  "Seg",
  "Ter",
  "Qua",
  "Qui",
  "Sex",
  "Sáb",
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
]


export default function Table({ handleModalActive, filters, transactions, setTransactions }) {
  const localTransactions = transactions
  const [ascendingOrder, setAscendingOrder] = useState([true, "scaleY(1)"]);
  async function handleDelete(e, id) {
    e.preventDefault()
    try {
      const token = getItem('token')
      const response = await api.delete(`/transacao/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const newTransactions = localTransactions.filter(trs => trs.id !== id)
      setTransactions(newTransactions)
    } catch (err) {
      console.log(err)
    }
  }

  const handleTableOrder = (e) => {
    e.preventDefault()
    if (ascendingOrder[0]) {
      const sorted = [...localTransactions].sort((a, b) => {
        return new Date(a.data) - new Date(b.data);
      })
      setTransactions(sorted)
      setAscendingOrder([!ascendingOrder[0], "scaleY(1)"])
    } else {
      const sorted = [...localTransactions].sort((a, b) => {
        return new Date(b.data) - new Date(a.data);
      })
      setTransactions(sorted)
      setAscendingOrder([!ascendingOrder[0], "scaleY(-1)"])
    }
  }

  useEffect(() => {
  }, [])


  return (
    <div>
      <table>
        <thead>
          <tr className="table-head">
            <th className="data">Data <img src={ArrowUp} onClick={(e) => handleTableOrder(e)} style={{ transform: ascendingOrder[1] }}></img></th>
            <th className="dia-semana">Dia da semana</th>
            <th className="descricao">Descrição</th>
            <th className="categoria">Categoria</th>
            <th className="valor">Valor</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {localTransactions.map((transaction, key) => {
            if (filters[0]) {
              if (filters.includes(transaction.categoria_nome)) {
                return (
                  < tr className="table-row" key={key} >
                    <td className="data">{dateFormat(transaction.data, "dd/mm/yyyy")}</td>
                    <td className="infos">{dateFormat(transaction.data, "dddd")}</td>
                    <td className="infos">{transaction.descricao}</td>
                    <td className="infos">{transaction.categoria_nome}</td>
                    <td className={"infos " + (transaction.tipo === "entrada" ? "valor-entrada" : "valor-saida")}>R$ {((transaction.valor / 100).toFixed(2)).toString().replace(".", ",")}</td>
                    <td className="row-buttons">
                      <img src={EditIcon} onClick={(e) => { handleModalActive(e, 'editRegistry', transaction) }}></img>
                      <Tooltip handleDelete={handleDelete} id={transaction.id} />
                    </td>
                  </tr>
                )
              }
              return
            } else {
              return (
                < tr className="table-row" key={key} >
                  <td className="data">{dateFormat(transaction.data, "dd/mm/yyyy")}</td>
                  <td className="infos">{dateFormat(transaction.data, "dddd")}</td>
                  <td className="infos">{transaction.descricao}</td>
                  <td className="infos">{transaction.categoria_nome}</td>
                  <td className={"infos " + (transaction.tipo === "entrada" ? "valor-entrada" : "valor-saida")}>R$ {((transaction.valor / 100).toFixed(2)).toString().replace(".", ",")}</td>
                  <td className="row-buttons">
                    <img src={EditIcon} onClick={(e) => { handleModalActive(e, 'editRegistry', transaction) }}></img>
                    <Tooltip handleDelete={handleDelete} id={transaction.id} />
                  </td>
                </tr>
              )
            }
          })}
        </tbody>
      </table>
    </div >
  )
}