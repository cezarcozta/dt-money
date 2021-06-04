import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import totalImg from "../../assets/total.svg";
import { Card } from "./components/Card";
import { Container } from "./styles";

export function Summary() {
  const incomeValue = 1000;
  const outcomeValue = 500;
  return (
    <Container>
      <Card title="Entrada" icon={incomeImg} value={incomeValue} />
      <Card title="Saída" icon={outcomeImg} value={outcomeValue} />
      <Card
        title="Saldo"
        icon={totalImg}
        value={incomeValue - outcomeValue}
        isBalance
      />
    </Container>
  );
}
