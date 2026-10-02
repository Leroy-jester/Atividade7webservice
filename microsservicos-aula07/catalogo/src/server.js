require("dotenv").config();

const express = require("express");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001;

const produtos = [
  {
    id: 1,
    nome: "Teclado Mecânico",
    preco: 150.00,
    estoque: 10
  },
  {
    id: 2,
    nome: "Mouse Gamer",
    preco: 80.00,
    estoque: 15
  },
  {
    id: 3,
    nome: "Monitor 24 Polegadas",
    preco: 900.00,
    estoque: 5
  }
];

app.get("/produtos/:id", (req, res) => {
  const id = Number(req.params.id);
  const produto = produtos.find((item) => item.id === id);

  if (!produto) {
    return res.status(404).json({
      mensagem: "Produto não encontrado"
    });
  }

  return res.status(200).json(produto);
});

app.listen(PORT, () => {
  console.log(`Catálogo rodando em http://localhost:${PORT}`);
});