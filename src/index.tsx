import { createServer, Model } from "miragejs";
import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";

createServer({
  models: {
    transaction: Model,
  },
  seeds(server) {
    server.db.loadData({
      transactions: [
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
          amount: 1200,
          type: "withdraw",
          category: "Categ 2",
          createdAt: new Date(),
        },
      ],
    });
  },
  routes() {
    this.namespace = "api";

    //Get All
    this.get("/transactions", (schema) => {
      return schema.all("transaction");
    });
    //Get One
    this.get("/transactions/:id", (schema, request) => {
      const id = request.params.id;
      const transaction = schema.find("transaction", id);

      if (!transaction) return new Response("500");

      return transaction;
    });
    //Create
    this.post("/transactions", (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create("transaction", data);
    });
    //Update
    this.put("/transactions/:id", (schema, request) => {
      const id = request.params.id;
      const newData = JSON.parse(request.requestBody);
      const transaction = schema.find("transaction", id);

      if (!transaction) return new Response("500");

      transaction.update(newData);

      return new Response("200");
    });
    //Delete
    this.delete("/transactions/:id", (schema, request) => {
      const id = request.params.id;
      const transaction = schema.find("transaction", id);

      if (!transaction) return new Response("500");

      transaction.destroy();

      return new Response("200");
    });
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
