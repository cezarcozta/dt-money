import React, { useState } from "react";
import Modal from "react-modal";
import { Header } from "./components/Header";
import { Dashboard } from "./pages/Dashboard";
import { GlobalStyle } from "./styles/global";

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
    <>
      <Header onOpneNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboard />

      <Modal
        isOpen={isNewTransactionModalOepn}
        onRequestClose={handleCloseNewTransactionModal}
      >
        <h2>Modal</h2>
      </Modal>
      <GlobalStyle />
    </>
  );
}
