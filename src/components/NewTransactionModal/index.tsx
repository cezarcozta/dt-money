import { useState } from "react";
import closeImg from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import { Button, Container, TypeContainer } from "./styles";

interface INewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: INewTransactionModalProps) {
  const [type, setType] = useState("deposit");

  return (
    <Container
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="close" />
      </button>
      <h2>Cadatrar transação</h2>
      <form>
        <input placeholder="Titulo" />
        <input placeholder="Valor" type="number" />

        <TypeContainer>
          <Button
            isClicked={type === "deposit"}
            clickedColor="green"
            type="button"
            onClick={() => {
              setType("deposit");
            }}
          >
            <img src={incomeImg} alt="deposito" />
            <span>Entrada</span>
          </Button>
          <Button
            isClicked={type === "withdraw"}
            clickedColor="red"
            type="button"
            onClick={() => {
              setType("withdraw");
            }}
          >
            <img src={outcomeImg} alt="saque" />
            <span>Saída</span>
          </Button>
        </TypeContainer>

        <input placeholder="Categoria" />

        <button type="submit">Cadastrar</button>
      </form>
    </Container>
  );
}
