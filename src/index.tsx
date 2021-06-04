import { createServer } from "miragejs";
import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";

createServer({
  routes() {
    this.namespace = "api";

    this.get("/transactions", () => {
      return [
        {
          id: 1,
          title: "Transaction 1",
          amount: 12000,
          type: "deposit",
          category: "Categ 1",
          createdAt: new Date(),
        },
        {
          id: 2,
          title: "Transaction 2",
          amount: -1200,
          type: "withdraw",
          category: "Categ 2",
          createdAt: new Date(),
        },
      ];
    });
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
