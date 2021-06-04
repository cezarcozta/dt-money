import { currencyBRFormatter } from "../../../../utils/BRCurrencyFormatter";
import { Container } from "./styles";

type ICard = {
  title: string;
  icon: string;
  value: number;
  isBalance?: boolean;
};

export function Card({ title, icon, value, isBalance }: ICard) {
  return (
    <Container isBalance={isBalance}>
      <header>
        <p>{title}</p>
        <img src={icon} alt="icon" />
      </header>
      <strong>{currencyBRFormatter(value)}</strong>
    </Container>
  );
}
