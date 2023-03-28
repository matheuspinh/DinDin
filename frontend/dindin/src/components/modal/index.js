import './styles.css';
import Registry from '../registry';
import CloseIcon from '../../assets/CloseIcon.png';
import EditProfile from '../editProfile';

export default function ({ user, setUser, loadData, setTransactions, transactions, handleModalActive, modalType, data }) {
  return (
    <div className="modal-container">
      <div className="modal-box">
        <img className="close-icon" src={CloseIcon} alt="fechar" onClick={handleModalActive}></img>
        {modalType === 'addRegistry' && <Registry
          modalType={modalType}
          loadData={loadData}
          title="Adicionar Registro"
          transactionType="saida"
          handleModalActive={handleModalActive}
          transactions={transactions}
          setTransactions={setTransactions}
        />}
        {modalType === 'editRegistry' && <Registry
          modalType={modalType}
          loadData={loadData}
          title="Editar Registro"
          currentData={data}
          handleModalActive={handleModalActive}
          transactions={transactions}
          setTransactions={setTransactions} />}
        {modalType === 'editProfile' && <EditProfile user={user} setUser={setUser} handleModalActive={handleModalActive} />}
      </div>
    </div>
  )
}