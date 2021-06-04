import { useContext } from "react";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import totalImg from "../../assets/total.svg";
import { TransactionsContexts } from "../../TransactionContext";
import { Card } from "./components/Card";
import { Container } from "./styles";

export function Summary() {
  const { transactions } = useContext(TransactionsContexts);

  const report = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "deposit") {
        acc.deposits += transaction.amount;
        acc.balance += transaction.amount;
      } else {
        acc.withdraws += transaction.amount;
        acc.balance -= transaction.amount;
      }

      return acc;
    },
    {
      deposits: 0,
      withdraws: 0,
      balance: 0,
    }
  );
  return (
    <Container>
      <Card title="Entrada" icon={incomeImg} value={report.deposits} />
      <Card title="Saída" icon={outcomeImg} value={report.withdraws} />
      <Card title="Saldo" icon={totalImg} value={report.balance} isBalance />
    </Container>
  );
}
