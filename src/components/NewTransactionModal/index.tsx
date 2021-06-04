import { FormEvent, useState } from "react";
import closeImg from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import { useTransactions } from "../../hooks/useTransactions";
import { Button, Container, TypeContainer } from "./styles";

interface INewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: INewTransactionModalProps) {
  const { createTransaction } = useTransactions();

  const [type, setType] = useState<"deposit" | "withdraw">("deposit");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    await createTransaction({
      title,
      category,
      type,
      amount,
    });

    setTitle("");
    setCategory("");
    setType("deposit");
    setAmount(0);

    onRequestClose();
  }

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
      <form onSubmit={handleCreateNewTransaction}>
        <input
          placeholder="Titulo"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input
          placeholder="Valor"
          type="number"
          value={amount}
          onChange={(e) => {
            setAmount(Number(e.target.value));
          }}
        />

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

        <input
          placeholder="Categoria"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        />

        <button type="submit">Cadastrar</button>
      </form>
    </Container>
  );
}
