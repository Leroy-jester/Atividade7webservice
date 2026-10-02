# Microsserviços - Catálogo + Pedidos

Projeto desenvolvido para a Aula 07 de Web Services do IFMS.

O projeto demonstra dois microsserviços independentes:

- **Catálogo**: porta `3001`
- **Pedidos**: porta `3000`

O serviço de Pedidos consulta o serviço de Catálogo por HTTP usando `fetch`.

## Tecnologias

- Node.js
- Express
- JavaScript
- HTTP/REST
- Fetch
- dotenv

## Estrutura

```text
microsservicos-aula07/
├── catalogo/
│   ├── src/
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── pedidos/
│   ├── src/
│   │   ├── catalogo.client.js
│   │   ├── pedidos.service.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
└── README.md
```

## 1. Instalar dependências

Abra dois terminais.

### Catálogo

```bash
cd catalogo
npm install
```

Crie um arquivo `.env` baseado no `.env.example`:

```env
PORT=3001
```

### Pedidos

No segundo terminal:

```bash
cd pedidos
npm install
```

Crie um arquivo `.env` baseado no `.env.example`:

```env
PORT=3000
CATALOGO_URL=http://localhost:3001
CATALOGO_TIMEOUT=2000
```

## 2. Executar

No terminal do Catálogo:

```bash
npm start
```

No terminal do Pedidos:

```bash
npm start
```

Os serviços estarão disponíveis em:

- Catálogo: `http://localhost:3001`
- Pedidos: `http://localhost:3000`

## 3. Testes no Thunder Client

### Teste 1 - Produto existente

```http
GET http://localhost:3001/produtos/1
```

Esperado:

```text
200 OK
```

### Teste 2 - Produto inexistente

```http
GET http://localhost:3001/produtos/999
```

Esperado:

```text
404 Not Found
```

### Teste 3 - Criar pedido

```http
POST http://localhost:3000/pedidos
Content-Type: application/json
```

Body:

```json
{
  "produtoId": 1,
  "quantidade": 2
}
```

Esperado:

```text
201 Created
```

Exemplo de resposta:

```json
{
  "mensagem": "Pedido criado com sucesso",
  "pedido": {
    "produtoId": 1,
    "produto": "Teclado Mecânico",
    "quantidade": 2,
    "precoUnitario": 150,
    "total": 300
  }
}
```

### Teste 4 - Estoque insuficiente

```http
POST http://localhost:3000/pedidos
Content-Type: application/json
```

Body:

```json
{
  "produtoId": 1,
  "quantidade": 99
}
```

Esperado:

```text
409 Conflict
```

### Teste 5 - Produto inexistente

```http
POST http://localhost:3000/pedidos
Content-Type: application/json
```

Body:

```json
{
  "produtoId": 999,
  "quantidade": 1
}
```

Esperado:

```text
404 Not Found
```

### Teste 6 - Catálogo indisponível

1. Inicie os dois serviços.
2. Confirme que o pedido funciona.
3. Pare o serviço Catálogo.
4. Envie novamente:

```http
POST http://localhost:3000/pedidos
Content-Type: application/json
```

Body:

```json
{
  "produtoId": 1,
  "quantidade": 2
}
```

O Pedidos deve retornar uma falha tratada:

```text
502 Bad Gateway
```

ou, em caso de timeout:

```text
504 Gateway Timeout
```

O serviço não deve ficar esperando indefinidamente.

## Requisitos atendidos

- [x] Dois serviços independentes
- [x] Catálogo na porta 3001
- [x] Pedidos na porta 3000
- [x] GET `/produtos/:id`
- [x] POST `/pedidos`
- [x] Comunicação usando `fetch`
- [x] Contrato HTTP entre serviços
- [x] Status 200 e 404 no Catálogo
- [x] Status 201 no Pedido
- [x] Status 409 para estoque insuficiente
- [x] Status 502/504 para falha do Catálogo
- [x] Timeout na comunicação
- [x] URL configurável por variável de ambiente
- [x] README com instruções
