import React, { useState } from "react";
import { Header } from "./components/Header";
import { NewTransactionModal } from "./components/NewTransactionModal";
import { Dashboard } from "./pages/Dashboard";
import { GlobalStyle } from "./styles/global";
import { TransactionsProvider } from "./TransactionContext";

export function App() {
  const [isNewTransactionModalOepn, setIsNewTransactionModalOpen] =
    useState(false);

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
  }
  return (
    <TransactionsProvider>
      <Header onOpneNewTransactionModal={handleOpenNewTransactionModal} />

      <Dashboard />

      <NewTransactionModal
        isOpen={isNewTransactionModalOepn}
        onRequestClose={handleCloseNewTransactionModal}
      />

      <GlobalStyle />
    </TransactionsProvider>
  );
}
