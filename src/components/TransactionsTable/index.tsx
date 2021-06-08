import { useState } from "react";
import { useTransactions } from "../../hooks/useTransactions";
import { currencyBRFormatter } from "../../utils/BRCurrencyFormatter";
import { dataBRFormatter } from "../../utils/BRISODateFormatter";
import { EditTransactionModal } from "../EditTransactionModal";
import { Container } from "./styles";

export function TransactionsTable() {
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
            <th></th>
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
                  <button onClick={() => handleEdit(transaction.id)}>
                    Editar
                  </button>
                  <button onClick={() => handleRemove(transaction.id)}>
                    Deletar
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
