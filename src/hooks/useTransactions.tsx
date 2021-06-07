import { AxiosError } from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { axiosClient } from "../services/axiosClient";

type ITransactions = {
  id: number;
  title: string;
  amount: number;
  category: string;
  createdAt: Date;
  type: "deposit" | "withdraw";
};

type ITransactionData = Pick<
  ITransactions,
  "title" | "category" | "amount" | "type"
>;

type ITransactionsProviderProps = {
  children: ReactNode;
};

type ITransactionsContext = {
  transactions: ITransactions[];
  createTransaction: (transaction: ITransactionData) => Promise<void>;
  deleteTransaction: (id: number) => Promise<void>;
  editTransaction: (transaction: ITransactions) => Promise<void>;
};

const TransactionsContexts = createContext<ITransactionsContext>(
  {} as ITransactionsContext
);

export function TransactionsProvider({ children }: ITransactionsProviderProps) {
  const [transactions, setTransactions] = useState<ITransactions[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const { data } = await axiosClient.get("/transactions");
        setTransactions(data.transactions);
      } catch (error) {
        const axiosError = error as AxiosError;
        alert(axiosError.response?.data.message);
      }
    }

    loadData();
  }, []);

  async function createTransaction({
    title,
    amount,
    category,
    type,
  }: ITransactionData) {
    const dataNewTransaction = {
      title,
      amount,
      category,
      type,
      createdAt: new Date(),
    };

    try {
      const { data } = await axiosClient.post(
        "/transactions",
        dataNewTransaction
      );

      const { amount, createdAt, category, id, title } =
        data.transaction as ITransactions;

      setTransactions([
        ...transactions,
        {
          id,
          title,
          amount,
          category,
          type,
          createdAt,
        },
      ]);
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log({
        error: axiosError,
      });
      alert(axiosError.response?.data.message);
    }
  }

  async function deleteTransaction(id: number) {
    try {
      await axiosClient.delete(`/transactions/${id}`);
      setTransactions(
        transactions.filter((transaction) => transaction.id !== id)
      );
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log({
        error: axiosError,
      });
      alert(axiosError.response?.data.message);
    }
  }

  async function editTransaction({
    id,
    title,
    amount,
    category,
    type,
    createdAt,
  }: ITransactions) {
    const updateTransaction = {
      title,
      amount,
      category,
      type,
      createdAt: new Date(),
    };
    try {
      const { data } = await axiosClient.put(
        `/transactions/${id}`,
        updateTransaction
      );
      if (!data) return;
      const returnData = data as ITransactions;
      setTransactions([
        ...transactions.filter((transaction) => transaction.id !== id, {
          returnData,
        }),
      ]);
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log({
        error: axiosError,
      });
      alert(axiosError.response?.data.message);
    }
  }

  return (
    <TransactionsContexts.Provider
      value={{
        transactions,
        createTransaction,
        deleteTransaction,
        editTransaction,
      }}
    >
      {children}
    </TransactionsContexts.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContexts);

  return context;
}
