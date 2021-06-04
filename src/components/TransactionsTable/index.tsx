import { useTransactions } from "../../hooks/useTransactions";
import { currencyBRFormatter } from "../../utils/BRCurrencyFormatter";
import { dataBRFormatter } from "../../utils/BRISODateFormatter";
import { Container } from "./styles";

export function TransactionsTable() {
  const { transactions } = useTransactions();
  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
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
              </tr>
            ))}
        </tbody>
      </table>
    </Container>
  );
}
