const CATALOGO_URL =
  process.env.CATALOGO_URL || "http://localhost:3001";

const TIMEOUT = Number(process.env.CATALOGO_TIMEOUT || 2000);

async function buscarProduto(produtoId) {
  let resposta;

  try {
    resposta = await fetch(
      `${CATALOGO_URL}/produtos/${produtoId}`,
      {
        signal: AbortSignal.timeout(TIMEOUT)
      }
    );
  } catch (erro) {
    if (erro.name === "TimeoutError") {
      const error = new Error("Catálogo excedeu o tempo de resposta");
      error.status = 504;
      throw error;
    }

    const error = new Error("Catálogo temporariamente indisponível");
    error.status = 502;
    throw error;
  }

  if (resposta.status === 404) {
    const error = new Error("Produto inexistente");
    error.status = 404;
    throw error;
  }

  if (!resposta.ok) {
    const error = new Error("Catálogo temporariamente indisponível");
    error.status = 502;
    throw error;
  }

  return resposta.json();
}

module.exports = {
  buscarProduto
};