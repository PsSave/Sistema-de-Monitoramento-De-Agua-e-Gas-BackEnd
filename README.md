# Sistema de Gestão de Leitura de Consumo de Água e Gás

## Objetivo do Sistema

Este sistema foi desenvolvido para gerenciar a leitura individualizada de consumo de água e gás para clientes. Utilizando inteligência artificial, o sistema permite a coleta de informações através de fotos dos medidores, automatizando o processo de leitura e garantindo precisão nas medidas.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para o desenvolvimento do back-end.
- **Express**: Framework para criação de APIs RESTful.
- **TypeScript**: Superset de JavaScript que adiciona tipagem estática ao código.
- **PostgreSQL**: Banco de dados relacional utilizado para armazenamento das leituras.


## Configuração do Projeto

Antes de utilizar o projeto, você deve criar um arquivo `.env` na raiz do projeto e incluir a chave da API do Google Gemini. Para obter a chave da API, você pode se inscrever em [Google Gemini API](https://ai.google.dev/gemini-api/docs/api-key).

- **Arquivo `.env`:**
  ```env
  GEMINI_API_KEY=<chave da API>
  ```
#
- Para rodar o projeto basta buildar o docker-compose.
  ```docker-compose
    docker-compose up --build
  ```
# uso do banco de dados
caso queira analisar o banco use o comando:

```bash
docker exec -it postgres-db psql -U root -d image_reader
```

## Endpoints da API

### 1. `POST /upload`

Responsável por receber uma imagem em base64 e consultar a API do Google Gemini para obter a medida lida.

- **Request Body:**
  ```json
  {
    "image": "base64",
    "customer_code": "string",
    "measure_datetime": "datetime",
    "measure_type": "WATER" | "GAS"
  }
  ```

### 2. `PATCH /confirm`

Responsável por confirmar ou corrigir o valor lido pela API de LLM.

- **Request Body:**
  ```json
  {
    "measure_uuid": "string",
    "confirmed_value": "integer"
  }
  ```

### 3. `GET /<customer_code>/list`

Responsável por listar as medidas realizadas por um determinado cliente.

- **Exemplo de Requisição:**
  ```http
  GET {base_url}/<customer_code>/list?measure_type=WATER
  ```
Se o parâmetro measure_type não for fornecido, o endpoint retornará todas as medidas associadas ao customer_code.
