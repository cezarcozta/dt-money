import logoImg from "../../assets/logo.svg";
import { Container, Content } from "./styles";

type IHeaderProps = {
  onOpneNewTransactionModal: () => void;
};
export function Header({ onOpneNewTransactionModal }: IHeaderProps) {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="dt money" />
        <button onClick={onOpneNewTransactionModal}>Nova transação</button>
      </Content>
    </Container>
  );
}
