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

interface INewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  isEdit: boolean;
  idTransaction?: number;
}

export function NewTransactionModal({
  isOpen,
  onRequestClose,
  isEdit,
  idTransaction,
}: INewTransactionModalProps) {
  const { createTransaction, editTransaction } = useTransactions();

  const [type, setType] = useState<"deposit" | "withdraw">("deposit");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");

  useEffect(() => {
    async function loadTransaction() {
      try {
        const { data } = await axiosClient.get<ITransaction>(
          `/transactions/${idTransaction}`
        );
        setType(data.type);
        setTitle(data.title);
        setAmount(data.amount);
        setCategory(data.category);
      } catch (error) {
        const axiosError = error as AxiosError;
        alert(axiosError.response?.data.message);
      }
    }
    if (isEdit) loadTransaction();
  }, [idTransaction, isEdit]);

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

  async function handleEditTransaction(event: FormEvent) {
    event.preventDefault();

    await editTransaction({
      id: idTransaction ? idTransaction : 0,
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
      <h2>{isEdit ? "ditar transação" : "Cadatrar transação"}</h2>
      <form
        onSubmit={isEdit ? handleEditTransaction : handleCreateNewTransaction}
      >
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

        <button type="submit">{isEdit ? "Editar" : "Cadastrar"}</button>
      </form>
    </Container>
  );
}
