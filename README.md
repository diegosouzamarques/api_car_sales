# Rest Api para Anúncios Venda de Automóveis

Projeto construído em JavaScript para ambiente NodeJS, padrão rest api, 
disponibilizando métodos CRUD para persistência das informações em banco não
relacioanl (NoSQL) MongoDB.

## ✔️ Tecnologias utilizadas

- ``NodeJs v18.12.1``
- ``JavaScript``
- ``Express v4.18.2``
- ``Mongoose v6.9.1``
- ``JWT Web Token``

## Características

- Roteamento REST
- Modelos com relacionamentos adequados
- Controladores/Modelos, etc, com separação adequada de interesses
- Autenticação JWT
- Erros REST

## Rota para documentação:

### Swagger UI

Documentação elaborada utilizando Swagger, especificação OpenAPI onde é baseada.

| Métodos    | URI                               | Ação                                                    |
|------------|-----------------------------------|---------------------------------------------------------|
| `GET`      | `/api-docs/`                      | `Documentação da web api`                               |

## Estrutura
 :open_file_folder: authEngine contém métodos utilizados nos mecanismos de autentição e autorização.

 :open_file_folder: config possui dados de configuração do JWT e conexão com o banco.

 :open_file_folder: controllers classe com métodos de todas as entidades para realização do CRUD.

 :open_file_folder: models modelos com schema utilizando moongose para garantir consistencia nos documentos.

 :open_file_folder: routes implementação das rotas da api padrão rest.

 :open_file_folder: servico implementações sobre persistência no repositório.

 :open_file_folder: swagger contem a configuração para documentação OpenApi.

 :file_cabinet: app.js configurações para app express.
 
 :file_cabinet: server.js criação do app express.

## Deploy
Acesso ao deploy clicando [aqui](https://)

# Autores
[<img src="https://avatars.githubusercontent.com/u/71080010?v=4" width=115><br><sub>Diego de Souza Marques</sub>](https://github.com/diegosouzamarques)