const { buscarProduto } = require("./catalogo.client");

async function criarPedido(produtoId, quantidade) {
  const produto = await buscarProduto(produtoId);

  if (quantidade > produto.estoque) {
    const error = new Error("Estoque insuficiente");
    error.status = 409;
    throw error;
  }

  const total = produto.preco * quantidade;

  return {
    produtoId: produto.id,
    produto: produto.nome,
    quantidade,
    precoUnitario: produto.preco,
    total
  };
}

module.exports = {
  criarPedido
};