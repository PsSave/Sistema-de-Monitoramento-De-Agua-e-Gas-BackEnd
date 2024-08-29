# Sistema de Gestão de Leitura de Consumo de Água e Gás

## Objetivo do Sistema

Este sistema foi desenvolvido para gerenciar a leitura individualizada de consumo de água e gás para clientes. Utilizando inteligência artificial, o sistema permite a coleta de informações através de fotos dos medidores, automatizando o processo de leitura e garantindo precisão nas medidas.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para o desenvolvimento do back-end.
- **Express**: Framework para criação de APIs RESTful.
- **TypeScript**: Superset de JavaScript que adiciona tipagem estática ao código.
- **PostgreSQL**: Banco de dados relacional utilizado para armazenamento das leituras.

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
