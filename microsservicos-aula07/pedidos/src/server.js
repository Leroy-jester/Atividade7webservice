require("dotenv").config();

const express = require("express");
const { criarPedido } = require("./pedidos.service");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.post("/pedidos", async (req, res) => {
  const { produtoId, quantidade } = req.body;

  if (!Number.isInteger(produtoId) || !Number.isInteger(quantidade) || quantidade <= 0) {
    return res.status(400).json({
      mensagem: "produtoId e quantidade devem ser inteiros válidos"
    });
  }

  try {
    const pedido = await criarPedido(produtoId, quantidade);

    return res.status(201).json({
      mensagem: "Pedido criado com sucesso",
      pedido
    });
  } catch (erro) {
    const status = erro.status || 502;

    return res.status(status).json({
      mensagem: erro.message || "Erro ao processar pedido"
    });
  }
});

app.listen(PORT, () => {
  console.log(`Pedidos rodando em http://localhost:${PORT}`);
});