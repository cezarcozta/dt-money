import { useState } from "react";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import { useTransactions } from "../../hooks/useTransactions";
import { currencyBRFormatter } from "../../utils/BRCurrencyFormatter";
import { dataBRFormatter } from "../../utils/BRISODateFormatter";
import { EditTransactionModal } from "../EditTransactionModal";
import { Container } from "./styles";

export function TransactionsTable() {
  const iconColor = "#969cb3";
  const { transactions, deleteTransaction } = useTransactions();

  const [editId, setEditId] = useState(-1);
  const [isNewTransactionModalOepn, setIsNewTransactionModalOpen] =
    useState(false);

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
  }
  function handleEdit(id: number) {
    setEditId(id);
    setIsNewTransactionModalOpen(true);
  }

  async function handleRemove(id: number) {
    await deleteTransaction(id);
  }
  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
            <th>Editar</th>
            <th>Deletar</th>
          </tr>
        </thead>

        <tbody>
          {transactions &&
            transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.title}</td>
                <td className={transaction.type}>
                  {currencyBRFormatter(transaction.amount)}
                </td>
                <td>{transaction.category}</td>
                <td>{dataBRFormatter(transaction.createdAt)}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleEdit(transaction.id)}
                  >
                    <FaPen color={iconColor} />
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleRemove(transaction.id)}
                  >
                    <FaTrashAlt color={iconColor} />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <EditTransactionModal
        id={editId}
        isOpen={isNewTransactionModalOepn}
        onRequestClose={handleCloseNewTransactionModal}
      />
    </Container>
  );
}
