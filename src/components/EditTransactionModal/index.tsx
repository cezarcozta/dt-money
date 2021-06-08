import { AxiosError } from "axios";
import { FormEvent, useEffect, useState } from "react";
import closeImg from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import { useTransactions } from "../../hooks/useTransactions";
import { axiosClient } from "../../services/axiosClient";
import { Button, Container, TypeContainer } from "./styles";

type ITransaction = {
  id: number;
  title: string;
  amount: number;
  category: string;
  createdAt: Date;
  type: "deposit" | "withdraw";
};

interface IEditTransactionModal {
  isOpen: boolean;
  onRequestClose: () => void;
  id: number;
}

export function EditTransactionModal({
  isOpen,
  onRequestClose,
  id,
}: IEditTransactionModal) {
  const { editTransaction } = useTransactions();

  const [type, setType] = useState<"deposit" | "withdraw">("deposit");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");

  useEffect(() => {
    async function loadTransaction() {
      try {
        const { data } = await axiosClient.get(`/transactions/${id}`);

        setType(data.transaction.type);
        setTitle(data.transaction.title);
        setAmount(data.transaction.amount);
        setCategory(data.transaction.category);
      } catch (error) {
        const axiosError = error as AxiosError;
        alert(axiosError.response?.data.message);
      }
    }
    loadTransaction();
  }, [id]);

  async function handleEditTransaction(event: FormEvent) {
    event.preventDefault();

    await editTransaction({
      id,
      title,
      category,
      type,
      amount,
      createdAt: new Date(),
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
      <h2>Editar transação</h2>
      <form onSubmit={handleEditTransaction}>
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

        <button type="submit">Editar</button>
      </form>
    </Container>
  );
}
