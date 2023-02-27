const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "API Anúncios Venda de Automóveis",
    description:
      "Essa APi tem como objetivo disponibilizar CRUD de Anúncios Automotivos",
    termsOfService: `http://localhost:${process.env.PORT}/terms/`,
    contact: {
      name: "API Support",
      url: "https://github.com/diegosouzamarques",
    },
    version: "1.0.0",
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT}`,
      description: "Development server",
    },
  ],
  paths: {
    "/auth/signup": {
      post: {
        summary: "Cadastro de usuário.",
        tags: ["Usuário"],
        description: "Cadastro de usuário",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/user",
              },
              examples: {
                user: {
                  value: {
                    username: "Nome do usuário",
                    email: "Email do usuário",
                    password: "senha",
                    roles: [
                      {
                        name: "Nome de qual tipo de usuário",
                      },
                    ],
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Mensagem de usuário cadastrado",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/message",
                },
                example: { message: "User registered successfully!" },
              },
            },
          },
          400: {
            description:
              "Usuário contém alguma inconsistência nome, email já cadastro ou tipo de usuário inexistente",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/message",
                },
                examples: {
                  exist: {
                    summary:
                      "Mensagem de usuário já cadastrado com nome ou email",
                    value: {
                      message: "Failed! Username or Email is already in use!",
                    },
                  },
                  without: {
                    summary: "Mensagem de usuário com tipo inexistente",
                    value: {
                      message: "Failed! Role does not exist = {name of role}",
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Mensagem de usuário sem tipo escolhido",
            content: {
              "application/json": {
                schema: {
                  type: "string",
                  example: { message: "User without roles!" },
                },
              },
            },
          },
        },
      },
    },
    "/auth/signin": {
      post: {
        summary: "Login de usuário para obter token.",
        tags: ["Usuário"],
        description: "Login de usuário para obter token",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/signin",
              },
              examples: {
                signin: {
                  value: {
                    username: "Nome do usuário",
                    password: "senha do usuário",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Usuário obteve êxito login",
            content: {
              "application/json": {
                schema: {
                  type: "string",
                  example: {
                    username: "abc",
                    email: "abc@abc.com",
                    roles: ["ROLE_USER", "ROLE_MODERATOR"],
                    accessToken: "eyJhbGci...",
                    refreshToken: "52be04a5...",
                  },
                },
              },
            },
          },
          404: {
            description: "Mensagem de usuário não encontrado na plataforma",
            content: {
              "application/json": {
                schema: {
                  type: "string",
                  example: {
                    message: "User Not found.",
                  },
                },
              },
            },
          },
          401: {
            description: "Mensagem senha do usuário esta invalida",
            content: {
              "application/json": {
                schema: {
                  type: "string",
                  example: {
                    accessToken: null,
                    message: "Invalid Password!",
                  },
                },
              },
            },
          },
        },
      },
    },
    "/auth/refreshtoken": {
      post: {
        summary: "Atualizar o token após expiração utilizando o refreshtoken.",
        tags: ["Usuário"],
        description: "Atualização do token utilizando o refreshtoken",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/refreshtoken",
              },
              examples: {
                signin: {
                  value: {
                    refreshToken: "RefreshToken fornecido no ato do login.",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description:
              "Usuário obteve êxito em realizar a atualização do token.",
            content: {
              "application/json": {
                schema: {
                  type: "string",
                  example: {
                    accessToken: "eyJhbGciOiJIUz...",
                    refreshToken: "087fca3f...",
                  },
                },
              },
            },
          },
          403: {
            description: `Possíveis argumentos refresh Token não foi fornecido, fornecido mas não consta na plataforma ou 
               fornecido porém está vencido, por favor refaça o login `,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/message",
                },
                examples: {
                  without: {
                    summary: "Refresh Token não foi fornecido",
                    value: {
                      message: "Refresh Token is required!",
                    },
                  },
                  plataform: {
                    summary: "Fornecido mas não consta na plataforma",
                    value: {
                      message: "Refresh token is not in database!",
                    },
                  },
                  expired: {
                    summary: "Fornecido porém está vencido.",
                    value: {
                      message:
                        "Refresh token was expired. Please make a new signin request",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/anuncios": { 
      get: {
        security: [ { "JWT": [] } ],
        summary: "Lista todos anúncios cadastrados.",
        tags: ["Anúncios"],
        description: "Retorna uma lista de anúncios.",
        responses: {
          200: {
            description: "Retorna a lista de anúncios",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/anuncio",
                },
                example: [
                  {
                    _id: "63ed283fe349d93790bef247",
                    titulo: "Omega 3.0",
                    descricao: "Raridade impecavel",
                    valor: 32500.32,
                    vendedorID: {
                      _id: "63ed2a11e349d93790bef24b",
                      nome: "DSM AUTOS IMPORTS",
                    },
                    tipoID: {
                      _id: "63ed2a6ee349d93790bef24d",
                      tipo: "carro",
                    },
                    ano: "2023-02-15T00:00:00.000Z",
                    dataCreated: "2023-02-15T00:00:00.000Z",
                    dataUpdated: "2023-02-15T00:00:00.000Z",
                    categoriaID: {
                      _id: "63ed2b6fe349d93790bef253",
                      categoria: "sedan",
                    },
                  },
                  {
                    _id: "63ee8aa492a4514554e37cf9",
                    titulo: "Gol g5",
                    descricao: "Lindissimo",
                    valor: 32500.32,
                    vendedorID: {
                      _id: "63ed2a11e349d93790bef24b",
                      nome: "DSM AUTOS IMPORTS",
                    },
                    tipoID: {
                      _id: "63ed2a6ee349d93790bef24d",
                      tipo: "carro",
                    },
                    ano: "2010-02-15T00:00:00.000Z",
                    categoriaID: {
                      _id: "63ed2b02e349d93790bef251",
                      categoria: "hatchback",
                    },
                    dataCreated: "2023-02-16T19:57:24.265Z",
                    dataUpdated: "2023-02-16T19:57:24.265Z",
                    __v: 0,
                  },
                ],
              },
            },
          },
          401: {
            description:
              "Token fornecido expirado ou não autorizado a continuar",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/message",
                },
                examples: {
                  expired: {
                    summary: "Token fornecido expirado",
                    value: {
                      message: "Unauthorized! Access Token was expired!",
                    },
                  },
                  Unauthorized: {
                    summary: "Não autorizado a continuar",
                    value: {
                      message: "Unauthorized!",
                    },
                  },
                },
              },
            },
          },
          403: {
            description:
              "Usuário não forneceu Token de acesso obtido no login, ou não contem permissão.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/message",
                },
                examples: {
                  exist: {
                    summary: "Não forneceu Token de acesso obtido no login",
                    value: {
                      message: "Nenhum token fornecido!",
                    },
                  },
                  role: {
                    summary: "Sem permissão de Moderador ou Adm.",
                    value: {
                      message: "Require Moderator or Admin Role!",
                    },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        security: [ { "JWT": [] } ],
        summary: "Cadastrar anúncio.",
        tags: ["Anúncios"],
        description: "Realiza o cadastrado de um anúncio.",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/anuncio",
              },
              examples: {
                anuncio: {
                  value: {
                    titulo: "Titulo do anúncio",
                    descricao: "Descrição do anúncio",
                    valor: "Valor do veiculo em decimal",
                    ano: "Ano de fabricação em Date",
                    vendedorID: "ID do vendedor",
                    tipoID: "ID do tipo de veiculo",
                    categoriaID: "ID da categoria do veiculo",
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Retorno foi criado com sucesso o novo anúncio.",
          },
          400: {
            description: `Possiveis mensagens: 
             Título, Descrição, Valor não informado, ano em formato não válido ou vendedorID, tipoID, categoriaID com
             ID não válido.
            `,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/errors",
                },
                examples: {
                  empty: {
                    summary: "Título, Descrição, Valor não informado",
                    value: {
                      errors: "{property} não informado",
                    },
                  },
                  data: {
                    summary: "Ano inválido",
                    value: {
                      errors: "Data inválida",
                    },
                  },
                  unknown: {
                    summary:
                      "Ano, vendedorID, tipoID, categoriaID não é ID válido",
                    value: {
                      errors: "{property} não é ID válido!",
                    },
                  },
                },
              },
            },
          },
          401: {
            description:
              "Token fornecido expirado ou não autorizado a continuar",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/message",
                },
                examples: {
                  expired: {
                    summary: "Token fornecido expirado",
                    value: {
                      message: "Unauthorized! Access Token was expired!",
                    },
                  },
                  Unauthorized: {
                    summary: "Não autorizado a continuar",
                    value: {
                      message: "Unauthorized!",
                    },
                  },
                },
              },
            },
          },
          403: {
            description:
              "Usuário não forneceu Token de acesso obtido no login, ou não contem permissão.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/message",
                },
                examples: {
                  exist: {
                    summary: "Não forneceu Token de acesso obtido no login",
                    value: {
                      message: "Nenhum token fornecido!",
                    },
                  },
                  role: {
                    summary: "Sem permissão de Moderador ou Adm.",
                    value: {
                      message: "Require Moderator or Admin Role!",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/anuncios/{id}": {
      get: {
        security: [ { "JWT": [] } ],
        summary: "Retorna um anúncio.",
        tags: ["Anúncios"],
        description:
          "Retorna único anúncios cadastrados localizado através do ID.",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "string",
              description: "ID do cadastro do anúncio",
            },
          },
        ],
        responses: {
          200: {
            description: "Retorno do anúncio localizado.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/anuncio",
                },
                example: {
                  _id: "63ed283fe349d93790bef247",
                  titulo: "Omega 3.0",
                  descricao: "Raridade impecavel",
                  valor: 32500.32,
                  vendedorID: {
                    _id: "63ed2a11e349d93790bef24b",
                    nome: "DSM AUTOS IMPORTS",
                  },
                  tipoID: {
                    _id: "63ed2a6ee349d93790bef24d",
                    tipo: "carro",
                  },
                  ano: "2023-02-15T00:00:00.000Z",
                  dataCreated: "2023-02-15T00:00:00.000Z",
                  dataUpdated: "2023-02-15T00:00:00.000Z",
                  categoriaID: {
                    _id: "63ed2b6fe349d93790bef253",
                    categoria: "sedan",
                  },
                },
              },
            },
          },
          400: {
            description:
              "ID anúncio não informado ou ID anúncio formato não previsto",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/message",
                },
                examples: {
                  expired: {
                    summary: "Não foi informado na rota o ID",
                    value: {
                      message: "ID anúncio formato não previsto",
                    },
                  },
                  Unauthorized: {
                    summary: "ID inconsistente.",
                    value: {
                      message: "ID anúncio formato não previsto",
                    },
                  },
                },
              },
            },
          },
          401: {
            description:
              "Token fornecido expirado ou não autorizado a continuar",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/message",
                },
                examples: {
                  expired: {
                    summary: "Token fornecido expirado",
                    value: {
                      message: "Unauthorized! Access Token was expired!",
                    },
                  },
                  Unauthorized: {
                    summary: "Não autorizado a continuar",
                    value: {
                      message: "Unauthorized!",
                    },
                  },
                },
              },
            },
          },
          403: {
            description:
              "Usuário não forneceu Token de acesso obtido no login, ou não contem permissão.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/message",
                },
                examples: {
                  exist: {
                    summary: "Não forneceu Token de acesso obtido no login",
                    value: {
                      message: "Nenhum token fornecido!",
                    },
                  },
                  role: {
                    summary: "Sem permissão de Moderador ou Adm.",
                    value: {
                      message: "Require Moderator or Admin Role!",
                    },
                  },
                },
              },
            },
          },
        },
      },
      patch: {
        security: [ { "JWT": [] } ],
        summary: "Alterar anúncio.",
        tags: ["Anúncios"],
        description: "Possivel atualizar alguma informação um anúncio.",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "string",
              description: "ID do cadastro do anúncio",
            },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/anuncio",
              },
              examples: {
                anuncio: {
                  value: {
                    titulo: "Titulo do anúncio",
                    descricao: "Descrição do anúncio",
                    valor: "Valor do veiculo em decimal",
                    ano: "Ano de fabricação em Date",
                    vendedorID: "ID do vendedor",
                    tipoID: "ID do tipo de veiculo",
                    categoriaID: "ID da categoria do veiculo",
                  },
                },
              },
            },
          },
        },
        responses: {
          204: {
            description: "Retorno foi alterado com sucesso o anúncio.",
          },
          400: {
            description: `Possiveis mensagens: 
             Título, Descrição, Valor não informado, ano em formato não válido ou vendedorID, tipoID, categoriaID com
             ID não válido.
            `,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/errors",
                },
                examples: {
                  empty: {
                    summary: "Título, Descrição, Valor não informado",
                    value: {
                      errors: "{property} não informado",
                    },
                  },
                  data: {
                    summary: "Ano inválido",
                    value: {
                      errors: "Data inválida",
                    },
                  },
                  unknown: {
                    summary:
                      "Ano, vendedorID, tipoID, categoriaID não é ID válido",
                    value: {
                      errors: "{property} não é ID válido!",
                    },
                  },
                },
              },
            },
          },
          401: {
            description:
              "Token fornecido expirado ou não autorizado a continuar",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/message",
                },
                examples: {
                  expired: {
                    summary: "Token fornecido expirado",
                    value: {
                      message: "Unauthorized! Access Token was expired!",
                    },
                  },
                  Unauthorized: {
                    summary: "Não autorizado a continuar",
                    value: {
                      message: "Unauthorized!",
                    },
                  },
                },
              },
            },
          },
          403: {
            description:
              "Usuário não forneceu Token de acesso obtido no login, ou não contem permissão.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/message",
                },
                examples: {
                  exist: {
                    summary: "Não forneceu Token de acesso obtido no login",
                    value: {
                      message: "Nenhum token fornecido!",
                    },
                  },
                  role: {
                    summary: "Sem permissão de Moderador ou Adm.",
                    value: {
                      message: "Require Moderator or Admin Role!",
                    },
                  },
                },
              },
            },
          },
        },
      },
      delete: {
        security: [ { "JWT": [] } ],
        summary: "Excluir anúncio.",
        tags: ["Anúncios"],
        description: "Possivel excluir um anúncio.",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "string",
              description: "ID do cadastro do anúncio",
            },
          },
        ],
        responses: {
          202: {
            description: "Retorno foi excluído com sucesso o anúncio.",
          },
          422: {
            description: ` Algum erro com a exclusão
            `,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/errors",
                },
                example: { message: "não foi possível deletar" },
              },
            },
          },
          401: {
            description:
              "Token fornecido expirado ou não autorizado a continuar",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/message",
                },
                examples: {
                  expired: {
                    summary: "Token fornecido expirado",
                    value: {
                      message: "Unauthorized! Access Token was expired!",
                    },
                  },
                  Unauthorized: {
                    summary: "Não autorizado a continuar",
                    value: {
                      message: "Unauthorized!",
                    },
                  },
                },
              },
            },
          },
          403: {
            description:
              "Usuário não forneceu Token de acesso obtido no login, ou não contem permissão.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/message",
                },
                examples: {
                  exist: {
                    summary: "Não forneceu Token de acesso obtido no login",
                    value: {
                      message: "Nenhum token fornecido!",
                    },
                  },
                  role: {
                    summary: "Sem permissão de Adm.",
                    value: {
                      message: "Require Admin Role!",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/vendedores": {
      get: {
        security: [ { "JWT": [] } ],
        summary: "Lista todos vendedores cadastrados.",
        tags: ["Vendedores"],
        description: "Retorna uma lista de vendedores.",
        responses: {
          200: {
            description: "Retorna a lista de vendedores",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/vendedor",
                },
                example: [
                  {
                    _id: "63ed2a11e349d93790bef24b",
                    nome: "DSM AUTOS IMPORTS",
                  },
                  {
                    _id: "63ed2a11e349d93790bef35b",
                    nome: "JDM JAPAN AUTOS",
                  },
                  {
                    _id: "63ed2a11e349d93790bff35b",
                    nome: "EURO NATIONS CARS",
                  },
                ],
              },
            },
          },
          401: {
            description:
              "Token fornecido expirado ou não autorizado a continuar",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/message",
                },
                examples: {
                  expired: {
                    summary: "Token fornecido expirado",
                    value: {
                      message: "Unauthorized! Access Token was expired!",
                    },
                  },
                  Unauthorized: {
                    summary: "Não autorizado a continuar",
                    value: {
                      message: "Unauthorized!",
                    },
                  },
                },
              },
            },
          },
          403: {
            description:
              "Usuário não forneceu Token de acesso obtido no login, ou não contem permissão.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/message",
                },
                examples: {
                  exist: {
                    summary: "Não forneceu Token de acesso obtido no login",
                    value: {
                      message: "Nenhum token fornecido!",
                    },
                  },
                  role: {
                    summary: "Sem permissão de Moderador ou Adm.",
                    value: {
                      message: "Require Moderator or Admin Role!",
                    },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        security: [ { "JWT": [] } ],
        summary: "Cadastrar vendedor.",
        tags: ["Vendedores"],
        description: "Realiza o cadastrado de um vendedor.",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  nome: {
                    type: "string",
                    required: true,
                  },
                },
              },
              examples: {
                vendedor: {
                  value: {
                    nome: "Nome do vendedor",
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Retorno foi criado com sucesso o novo vendedor.",
          },
          400: {
            description: `Possiveis mensagens: 
             Nome não informado.
            `,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/errors",
                },
                examples: {
                  empty: {
                    summary: "Nome não informado",
                    value: {
                      errors: "Nome não informado",
                    },
                  },
                },
              },
            },
          },
          401: {
            description:
              "Token fornecido expirado ou não autorizado a continuar",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/message",
                },
                examples: {
                  expired: {
                    summary: "Token fornecido expirado",
                    value: {
                      message: "Unauthorized! Access Token was expired!",
                    },
                  },
                  Unauthorized: {
                    summary: "Não autorizado a continuar",
                    value: {
                      message: "Unauthorized!",
                    },
                  },
                },
              },
            },
          },
          403: {
            description:
              "Usuário não forneceu Token de acesso obtido no login, ou não contem permissão.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/message",
                },
                examples: {
                  exist: {
                    summary: "Não forneceu Token de acesso obtido no login",
                    value: {
                      message: "Nenhum token fornecido!",
                    },
                  },
                  role: {
                    summary: "Sem permissão de Adm.",
                    value: {
                      message: "Require Admin Role!",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/vendedores/{id}": {
      get: {
        security: [ { "JWT": [] } ],
        summary: "Retorna um vendedor.",
        tags: ["Vendedores"],
        description:
          "Retorna único vendedor cadastrado localizado através do ID.",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "string",
              description: "ID do cadastro do vendedor",
            },
          },
        ],
        responses: {
          200: {
            description: "Retorno do vendedor localizado.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/vendedor",
                },
                example: {
                  _id: "63fce047d361c8e985cd093a",
                  nome: "NASCAR SALES",
                },
              },
            },
          },
          400: {
            description:
              "ID vendedor não informado ou ID vendedor formato não previsto",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/message",
                },
                examples: {
                  expired: {
                    summary: "Não foi informado na rota o ID",
                    value: {
                      message: "ID vendedor formato não previsto",
                    },
                  },
                  Unauthorized: {
                    summary: "ID inconsistente.",
                    value: {
                      message: "ID vendedor formato não previsto",
                    },
                  },
                },
              },
            },
          },
          401: {
            description:
              "Token fornecido expirado ou não autorizado a continuar",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/message",
                },
                examples: {
                  expired: {
                    summary: "Token fornecido expirado",
                    value: {
                      message: "Unauthorized! Access Token was expired!",
                    },
                  },
                  Unauthorized: {
                    summary: "Não autorizado a continuar",
                    value: {
                      message: "Unauthorized!",
                    },
                  },
                },
              },
            },
          },
          403: {
            description:
              "Usuário não forneceu Token de acesso obtido no login, ou não contem permissão.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/message",
                },
                examples: {
                  exist: {
                    summary: "Não forneceu Token de acesso obtido no login",
                    value: {
                      message: "Nenhum token fornecido!",
                    },
                  },
                  role: {
                    summary: "Sem permissão de Moderador ou Adm.",
                    value: {
                      message: "Require Moderator or Admin Role!",
                    },
                  },
                },
              },
            },
          },
        },
      },
      patch: {
        security: [ { "JWT": [] } ],
        summary: "Alterar vendedor.",
        tags: ["Vendedores"],
        description: "Possivel atualizar alguma informação de um vendedor.",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "string",
              description: "ID do cadastro do vendedor",
            },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/vendedor",
              },
              examples: {
                vendedor: {
                  value: {
                    nome: "Nome do vendedor",
                  },
                },
              },
            },
          },
        },
        responses: {
          204: {
            description: "Retorno foi alterado com sucesso o vendedor.",
          },
          400: {
            description: `Possiveis mensagens: 
             Nome não informado.
            `,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/errors",
                },
                examples: {
                  empty: {
                    summary: "Nome não informado",
                    value: {
                      errors: "Nome não informado",
                    },
                  },
                },
              },
            },
          },
          401: {
            description:
              "Token fornecido expirado ou não autorizado a continuar",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/message",
                },
                examples: {
                  expired: {
                    summary: "Token fornecido expirado",
                    value: {
                      message: "Unauthorized! Access Token was expired!",
                    },
                  },
                  Unauthorized: {
                    summary: "Não autorizado a continuar",
                    value: {
                      message: "Unauthorized!",
                    },
                  },
                },
              },
            },
          },
          403: {
            description:
              "Usuário não forneceu Token de acesso obtido no login, ou não contem permissão.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/message",
                },
                examples: {
                  exist: {
                    summary: "Não forneceu Token de acesso obtido no login",
                    value: {
                      message: "Nenhum token fornecido!",
                    },
                  },
                  role: {
                    summary: "Sem permissão de Adm.",
                    value: {
                      message: "Require Admin Role!",
                    },
                  },
                },
              },
            },
          },
        },
      },
      delete: {
        security: [ { "JWT": [] } ],
        summary: "Excluir vendedor.",
        tags: ["Vendedores"],
        description: "Possivel excluir um vendedor.",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "string",
              description: "ID do cadastro do vendedor",
            },
          },
        ],
        responses: {
          202: {
            description: "Retorno foi excluído com sucesso o vendedor.",
          },
          422: {
            description: ` Algum erro com a exclusão
            `,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/errors",
                },
                example: { message: "não foi possível deletar" },
              },
            },
          },
          401: {
            description:
              "Token fornecido expirado ou não autorizado a continuar",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/message",
                },
                examples: {
                  expired: {
                    summary: "Token fornecido expirado",
                    value: {
                      message: "Unauthorized! Access Token was expired!",
                    },
                  },
                  Unauthorized: {
                    summary: "Não autorizado a continuar",
                    value: {
                      message: "Unauthorized!",
                    },
                  },
                },
              },
            },
          },
          403: {
            description:
              "Usuário não forneceu Token de acesso obtido no login, ou não contem permissão.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/message",
                },
                examples: {
                  exist: {
                    summary: "Não forneceu Token de acesso obtido no login",
                    value: {
                      message: "Nenhum token fornecido!",
                    },
                  },
                  role: {
                    summary: "Sem permissão de Adm.",
                    value: {
                      message: "Require Admin Role!",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/categorias": {
      get: {
        security: [ { "JWT": [] } ],
        summary: "Lista todos categorias cadastrados.",
        tags: ["Categorias"],
        description: "Retorna uma lista de categorias.",
        responses: {
          200: {
            description: "Retorna a lista de categorias",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/categoria",
                },
                example: [
                  {
                    _id: "63ed2b02e349d93790bef251",
                    categoria: "hatchback",
                  },
                  {
                    _id: "63ed2b49e349d93790bef252",
                    categoria: "sport",
                  },
                  {
                    _id: "63ed2b6fe349d93790bef253",
                    categoria: "sedan",
                  },
                  {
                    _id: "63ed2ba5e349d93790bef254",
                    categoria: "coupe",
                  },
                  {
                    _id: "63ed2bc0e349d93790bef255",
                    categoria: "cabine simples",
                  },
                  {
                    _id: "63ed2bd6e349d93790bef256",
                    categoria: "cabine dupla",
                  },
                  {
                    _id: "63ed2bfee349d93790bef258",
                    categoria: "trail",
                  },
                  {
                    _id: "63ed2c53e349d93790bef259",
                    categoria: "naked",
                  },
                ],
              },
            },
          },
          401: {
            description:
              "Token fornecido expirado ou não autorizado a continuar",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/message",
                },
                examples: {
                  expired: {
                    summary: "Token fornecido expirado",
                    value: {
                      message: "Unauthorized! Access Token was expired!",
                    },
                  },
                  Unauthorized: {
                    summary: "Não autorizado a continuar",
                    value: {
                      message: "Unauthorized!",
                    },
                  },
                },
              },
            },
          },
          403: {
            description:
              "Usuário não forneceu Token de acesso obtido no login, ou não contem permissão.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/message",
                },
                examples: {
                  exist: {
                    summary: "Não forneceu Token de acesso obtido no login",
                    value: {
                      message: "Nenhum token fornecido!",
                    },
                  },
                  role: {
                    summary: "Sem permissão de Moderador ou Adm.",
                    value: {
                      message: "Require Moderator or Admin Role!",
                    },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        security: [ { "JWT": [] } ],
        summary: "Cadastrar categoria.",
        tags: ["Categorias"],
        description: "Realiza o cadastrado de uma categoria.",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  categoria: {
                    type: "string",
                    required: true,
                  },
                },
              },
              examples: {
                categoria: {
                  value: {
                    categoria: "Descrição da categoria",
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Retorno foi criado com sucesso a nova categoria.",
          },
          400: {
            description: `Possiveis mensagens: 
            Categoria não informado.
            `,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/errors",
                },
                examples: {
                  empty: {
                    summary: "Categoria não informado",
                    value: {
                      errors: "Categoria não informado",
                    },
                  },
                },
              },
            },
          },
          401: {
            description:
              "Token fornecido expirado ou não autorizado a continuar",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/message",
                },
                examples: {
                  expired: {
                    summary: "Token fornecido expirado",
                    value: {
                      message: "Unauthorized! Access Token was expired!",
                    },
                  },
                  Unauthorized: {
                    summary: "Não autorizado a continuar",
                    value: {
                      message: "Unauthorized!",
                    },
                  },
                },
              },
            },
          },
          403: {
            description:
              "Usuário não forneceu Token de acesso obtido no login, ou não contem permissão.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/message",
                },
                examples: {
                  exist: {
                    summary: "Não forneceu Token de acesso obtido no login",
                    value: {
                      message: "Nenhum token fornecido!",
                    },
                  },
                  role: {
                    summary: "Sem permissão de Adm.",
                    value: {
                      message: "Require Admin Role!",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/categorias/{id}": {
      get: {
        security: [ { "JWT": [] } ],
        summary: "Retorna uma categoria.",
        tags: ["Categorias"],
        description:
          "Retorna única categoria cadastrada localizada através do ID.",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "string",
              description: "ID do cadastro do categoria",
            },
          },
        ],
        responses: {
          200: {
            description: "Retorno da categoria localizado.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/categoria",
                },
                example: {
                  _id: "63ed2ba5e349d93790bef254",
                  categoria: "coupe",
                },
              },
            },
          },
          400: {
            description:
              "ID Categoria não informado ou ID vendedor formato não previsto",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/message",
                },
                examples: {
                  expired: {
                    summary: "Não foi informado na rota o ID",
                    value: {
                      message: "ID categoria formato não previsto",
                    },
                  },
                  Unauthorized: {
                    summary: "ID inconsistente.",
                    value: {
                      message: "ID categoria formato não previsto",
                    },
                  },
                },
              },
            },
          },
          401: {
            description:
              "Token fornecido expirado ou não autorizado a continuar",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/message",
                },
                examples: {
                  expired: {
                    summary: "Token fornecido expirado",
                    value: {
                      message: "Unauthorized! Access Token was expired!",
                    },
                  },
                  Unauthorized: {
                    summary: "Não autorizado a continuar",
                    value: {
                      message: "Unauthorized!",
                    },
                  },
                },
              },
            },
          },
          403: {
            description:
              "Usuário não forneceu Token de acesso obtido no login, ou não contem permissão.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/message",
                },
                examples: {
                  exist: {
                    summary: "Não forneceu Token de acesso obtido no login",
                    value: {
                      message: "Nenhum token fornecido!",
                    },
                  },
                  role: {
                    summary: "Sem permissão de Moderador ou Adm.",
                    value: {
                      message: "Require Moderator or Admin Role!",
                    },
                  },
                },
              },
            },
          },
        },
      },
      patch: {
        security: [ { "JWT": [] } ],
        summary: "Alterar categoria.",
        tags: ["Categorias"],
        description: "Possivel atualizar alguma informação de uma categoria.",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "string",
              description: "ID do cadastro da categoria",
            },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/categoria",
              },
              examples: {
                vendedor: {
                  value: {
                    categoria: "Descrição da categoria",
                  },
                },
              },
            },
          },
        },
        responses: {
          204: {
            description: "Retorno foi alterado com sucesso a categoria.",
          },
          400: {
            description: `Possiveis mensagens: 
             Categoria não informado.
            `,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/errors",
                },
                examples: {
                  empty: {
                    summary: "Categoria não informado",
                    value: {
                      errors: "Categoria não informado",
                    },
                  },
                },
              },
            },
          },
          401: {
            description:
              "Token fornecido expirado ou não autorizado a continuar",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/message",
                },
                examples: {
                  expired: {
                    summary: "Token fornecido expirado",
                    value: {
                      message: "Unauthorized! Access Token was expired!",
                    },
                  },
                  Unauthorized: {
                    summary: "Não autorizado a continuar",
                    value: {
                      message: "Unauthorized!",
                    },
                  },
                },
              },
            },
          },
          403: {
            description:
              "Usuário não forneceu Token de acesso obtido no login, ou não contem permissão.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/message",
                },
                examples: {
                  exist: {
                    summary: "Não forneceu Token de acesso obtido no login",
                    value: {
                      message: "Nenhum token fornecido!",
                    },
                  },
                  role: {
                    summary: "Sem permissão de Adm.",
                    value: {
                      message: "Require Admin Role!",
                    },
                  },
                },
              },
            },
          },
        },
      },
      delete: {
        security: [ { "JWT": [] } ],
        summary: "Excluir categoria.",
        tags: ["Categorias"],
        description: "Possivel excluir um categoria.",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "string",
              description: "ID do cadastro da categoria",
            },
          },
        ],
        responses: {
          202: {
            description: "Retorno foi excluído com sucesso a categoria.",
          },
          422: {
            description: ` Algum erro com a exclusão
            `,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/errors",
                },
                example: { message: "não foi possível deletar" },
              },
            },
          },
          401: {
            description:
              "Token fornecido expirado ou não autorizado a continuar",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/message",
                },
                examples: {
                  expired: {
                    summary: "Token fornecido expirado",
                    value: {
                      message: "Unauthorized! Access Token was expired!",
                    },
                  },
                  Unauthorized: {
                    summary: "Não autorizado a continuar",
                    value: {
                      message: "Unauthorized!",
                    },
                  },
                },
              },
            },
          },
          403: {
            description:
              "Usuário não forneceu Token de acesso obtido no login, ou não contem permissão.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/message",
                },
                examples: {
                  exist: {
                    summary: "Não forneceu Token de acesso obtido no login",
                    value: {
                      message: "Nenhum token fornecido!",
                    },
                  },
                  role: {
                    summary: "Sem permissão de Adm.",
                    value: {
                      message: "Require Admin Role!",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/fotos": {
      get: {
        security: [ { "JWT": [] } ],
        summary: "Lista todos fotos cadastradas.",
        tags: ["Fotos"],
        description: "Retorna uma lista de fotos.",
        responses: {
          200: {
            description: "Retorna a lista de fotos",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/foto",
                },
                example: [
                  {
                    _id: "63ed3315e349d93790bef25e",
                    url: "https://i.ibb.co/0sCYD6Z/chevrolet-omega-3-0.webp",
                    anuncioID: "63ed3346e349d93790bef25f",
                  },
                  {
                    _id: "63ed3315e349d12790bef25e",
                    url: "https://i.ibb.co/0sCYD6Z/bmw-m5.webp",
                    anuncioID: "63ed3346e349d93790bef25d",
                  },
                ],
              },
            },
          },
          401: {
            description:
              "Token fornecido expirado ou não autorizado a continuar",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/message",
                },
                examples: {
                  expired: {
                    summary: "Token fornecido expirado",
                    value: {
                      message: "Unauthorized! Access Token was expired!",
                    },
                  },
                  Unauthorized: {
                    summary: "Não autorizado a continuar",
                    value: {
                      message: "Unauthorized!",
                    },
                  },
                },
              },
            },
          },
          403: {
            description:
              "Usuário não forneceu Token de acesso obtido no login, ou não contem permissão.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/message",
                },
                examples: {
                  exist: {
                    summary: "Não forneceu Token de acesso obtido no login",
                    value: {
                      message: "Nenhum token fornecido!",
                    },
                  },
                  role: {
                    summary: "Sem permissão de Moderador ou Adm.",
                    value: {
                      message: "Require Moderator or Admin Role!",
                    },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        security: [ { "JWT": [] } ],
        summary: "Cadastrar fotos.",
        tags: ["Fotos"],
        description: "Realiza o cadastrado de fotos de anúncios.",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  url: {
                    type: "string",
                    required: true,
                  },
                  anuncioID: {
                    type: "string",
                    required: true,
                  },
                },
              },
              examples: {
                foto: {
                  value: {
                    url: "Url da hospedagem da foto",
                    anuncioID: "ID do anúncio vinculado.",
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Retorno foi criado com sucesso a nova foto.",
          },
          400: {
            description: `Possiveis mensagens: 
            Url ou ID do anúncio não informado, ID do anúncio em formato não previsto.
            `,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/errors",
                },
                examples: {
                  empty: {
                    summary: "Url não informado",
                    value: {
                      errors: "Url não informado",
                    },
                  },
                  unknown: {
                    summary: "anuncioID não é ID válido",
                    value: {
                      errors: "anuncioID não é ID válido!",
                    },
                  },
                },
              },
            },
          },
          401: {
            description:
              "Token fornecido expirado ou não autorizado a continuar",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/message",
                },
                examples: {
                  expired: {
                    summary: "Token fornecido expirado",
                    value: {
                      message: "Unauthorized! Access Token was expired!",
                    },
                  },
                  Unauthorized: {
                    summary: "Não autorizado a continuar",
                    value: {
                      message: "Unauthorized!",
                    },
                  },
                },
              },
            },
          },
          403: {
            description:
              "Usuário não forneceu Token de acesso obtido no login, ou não contem permissão.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/message",
                },
                examples: {
                  exist: {
                    summary: "Não forneceu Token de acesso obtido no login",
                    value: {
                      message: "Nenhum token fornecido!",
                    },
                  },
                  role: {
                    summary: "Sem permissão de Moderador ou Adm.",
                    value: {
                      message: "Require Moderator or Admin Role!",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/fotos/{id}": {
      get: {
        security: [ { "JWT": [] } ],
        summary: "Retorna uma foto.",
        tags: ["Fotos"],
        description: "Retorna única foto cadastrada localizada através do ID.",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "string",
              description: "ID do cadastro da foto",
            },
          },
        ],
        responses: {
          200: {
            description: "Retorno da foto localizado.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/foto",
                },
                example: {
                  _id: "63ed3315e349d93790bef25e",
                  url: "https://i.ibb.co/0sCYD6Z/chevrolet-omega-3-0.webp",
                  anuncioID: "63ed3346e349d93790bef25f",
                },
              },
            },
          },
          400: {
            description:
              "ID Foto não informado ou ID foto formato não previsto",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/message",
                },
                examples: {
                  expired: {
                    summary: "Não foi informado na rota o ID",
                    value: {
                      message: "ID categoria formato não previsto",
                    },
                  },
                  Unauthorized: {
                    summary: "ID inconsistente.",
                    value: {
                      message: "ID categoria formato não previsto",
                    },
                  },
                },
              },
            },
          },
          401: {
            description:
              "Token fornecido expirado ou não autorizado a continuar",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/message",
                },
                examples: {
                  expired: {
                    summary: "Token fornecido expirado",
                    value: {
                      message: "Unauthorized! Access Token was expired!",
                    },
                  },
                  Unauthorized: {
                    summary: "Não autorizado a continuar",
                    value: {
                      message: "Unauthorized!",
                    },
                  },
                },
              },
            },
          },
          403: {
            description:
              "Usuário não forneceu Token de acesso obtido no login, ou não contem permissão.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/message",
                },
                examples: {
                  exist: {
                    summary: "Não forneceu Token de acesso obtido no login",
                    value: {
                      message: "Nenhum token fornecido!",
                    },
                  },
                  role: {
                    summary: "Sem permissão de Moderador ou Adm.",
                    value: {
                      message: "Require Moderator or Admin Role!",
                    },
                  },
                },
              },
            },
          },
        },
      },
      patch: {
        security: [ { "JWT": [] } ],
        summary: "Alterar foto.",
        tags: ["Fotos"],
        description: "Possivel atualizar alguma informação de uma foto.",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "string",
              description: "ID do cadastro da foto",
            },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/foto",
              },
              examples: {
                foto: {
                  value: {
                    url: "Url da hospedagem da foto",
                    anuncioID: "ID do anúncio vinculado.",
                  },
                },
              },
            },
          },
        },
        responses: {
          204: {
            description: "Retorno foi alterado com sucesso a foto.",
          },
          400: {
            description: `Possiveis mensagens: 
            Url ou ID do anúncio não informado, ID do anúncio em formato não previsto.
            `,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/errors",
                },
                examples: {
                  empty: {
                    summary: "Url não informado",
                    value: {
                      errors: "Url não informado",
                    },
                  },
                  unknown: {
                    summary: "anuncioID não é ID válido",
                    value: {
                      errors: "anuncioID não é ID válido!",
                    },
                  },
                },
              },
            },
          },
          401: {
            description:
              "Token fornecido expirado ou não autorizado a continuar",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/message",
                },
                examples: {
                  expired: {
                    summary: "Token fornecido expirado",
                    value: {
                      message: "Unauthorized! Access Token was expired!",
                    },
                  },
                  Unauthorized: {
                    summary: "Não autorizado a continuar",
                    value: {
                      message: "Unauthorized!",
                    },
                  },
                },
              },
            },
          },
          403: {
            description:
              "Usuário não forneceu Token de acesso obtido no login, ou não contem permissão.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/message",
                },
                examples: {
                  exist: {
                    summary: "Não forneceu Token de acesso obtido no login",
                    value: {
                      message: "Nenhum token fornecido!",
                    },
                  },
                  role: {
                    summary: "Sem permissão de Adm.",
                    value: {
                      message: "Require Admin Role!",
                    },
                  },
                },
              },
            },
          },
        },
      },
      delete: {
        security: [ { "JWT": [] } ],
        summary: "Excluir foto.",
        tags: ["Fotos"],
        description: "Possivel excluir uma foto.",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "string",
              description: "ID do cadastro da foto",
            },
          },
        ],
        responses: {
          202: {
            description: "Retorno foi excluído com sucesso a foto.",
          },
          422: {
            description: ` Algum erro com a exclusão
            `,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/errors",
                },
                example: { message: "não foi possível deletar" },
              },
            },
          },
          401: {
            description:
              "Token fornecido expirado ou não autorizado a continuar",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/message",
                },
                examples: {
                  expired: {
                    summary: "Token fornecido expirado",
                    value: {
                      message: "Unauthorized! Access Token was expired!",
                    },
                  },
                  Unauthorized: {
                    summary: "Não autorizado a continuar",
                    value: {
                      message: "Unauthorized!",
                    },
                  },
                },
              },
            },
          },
          403: {
            description:
              "Usuário não forneceu Token de acesso obtido no login, ou não contem permissão.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/message",
                },
                examples: {
                  exist: {
                    summary: "Não forneceu Token de acesso obtido no login",
                    value: {
                      message: "Nenhum token fornecido!",
                    },
                  },
                  role: {
                    summary: "Sem permissão de Adm.",
                    value: {
                      message: "Require Admin Role!",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/tipos": {
      get: {
        security: [ { "JWT": [] } ],
        summary: "Lista todos tipos cadastradas.",
        tags: ["Tipos"],
        description: "Retorna uma lista de tipos.",
        responses: {
          200: {
            description: "Retorna a lista de tipos",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/tipo",
                },
                example: [
                  {
                    _id: "63ed2a6ee349d93790bef24d",
                    tipo: "carro",
                  },
                  {
                    _id: "63ed2ab4e349d93790bef24f",
                    tipo: "camionete",
                  },
                  {
                    _id: "63ed2ad8e349d93790bef250",
                    tipo: "moto",
                  },
                ],
              },
            },
          },
          401: {
            description:
              "Token fornecido expirado ou não autorizado a continuar",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/message",
                },
                examples: {
                  expired: {
                    summary: "Token fornecido expirado",
                    value: {
                      message: "Unauthorized! Access Token was expired!",
                    },
                  },
                  Unauthorized: {
                    summary: "Não autorizado a continuar",
                    value: {
                      message: "Unauthorized!",
                    },
                  },
                },
              },
            },
          },
          403: {
            description:
              "Usuário não forneceu Token de acesso obtido no login, ou não contem permissão.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/message",
                },
                examples: {
                  exist: {
                    summary: "Não forneceu Token de acesso obtido no login",
                    value: {
                      message: "Nenhum token fornecido!",
                    },
                  },
                  role: {
                    summary: "Sem permissão de Moderador ou Adm.",
                    value: {
                      message: "Require Moderator or Admin Role!",
                    },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        security: [ { "JWT": [] } ],
        summary: "Cadastrar tipos.",
        tags: ["Tipos"],
        description: "Realiza o cadastrado de tipos de anúncios.",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  tipo: {
                    type: "string",
                    required: true,
                  },
                },
              },
              examples: {
                tipo: {
                  value: {
                    tipo: "Tipo de veículo automovel",
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Retorno foi criado com sucesso o novo tipo.",
          },
          400: {
            description: `Possiveis mensagens: 
            Tipo não informado.
            `,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/errors",
                },
                examples: {
                  empty: {
                    summary: "Tipo não informado",
                    value: {
                      errors: "Tipo não informado",
                    },
                  },
                },
              },
            },
          },
          401: {
            description:
              "Token fornecido expirado ou não autorizado a continuar",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/message",
                },
                examples: {
                  expired: {
                    summary: "Token fornecido expirado",
                    value: {
                      message: "Unauthorized! Access Token was expired!",
                    },
                  },
                  Unauthorized: {
                    summary: "Não autorizado a continuar",
                    value: {
                      message: "Unauthorized!",
                    },
                  },
                },
              },
            },
          },
          403: {
            description:
              "Usuário não forneceu Token de acesso obtido no login, ou não contem permissão.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/message",
                },
                examples: {
                  exist: {
                    summary: "Não forneceu Token de acesso obtido no login",
                    value: {
                      message: "Nenhum token fornecido!",
                    },
                  },
                  role: {
                    summary: "Sem permissão de Adm.",
                    value: {
                      message: "Require Admin Role!",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/tipos/{id}":{
      get: {
        security: [ { "JWT": [] } ],
        summary: "Retorna um tipo.",
        tags: ["Tipos"],
        description:
          "Retorna único tipo cadastrada localizada através do ID.",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "string",
              description: "ID do cadastro do tipo",
            },
          },
        ],
        responses: {
          200: {
            description: "Retorno da tipo localizado.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/tipo",
                },
                example: {
                  _id: "63ed2ba5e349d93724bef254",
                  tipo: "coupe",
                },
              },
            },
          },
          400: {
            description:
              "ID tipo não informado ou  formato não previsto",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/message",
                },
                examples: {
                  expired: {
                    summary: "Não foi informado na rota o ID",
                    value: {
                      message: "ID tipo formato não previsto",
                    },
                  },
                  Unauthorized: {
                    summary: "ID inconsistente.",
                    value: {
                      message: "ID tipo formato não previsto",
                    },
                  },
                },
              },
            },
          },
          401: {
            description:
              "Token fornecido expirado ou não autorizado a continuar",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/message",
                },
                examples: {
                  expired: {
                    summary: "Token fornecido expirado",
                    value: {
                      message: "Unauthorized! Access Token was expired!",
                    },
                  },
                  Unauthorized: {
                    summary: "Não autorizado a continuar",
                    value: {
                      message: "Unauthorized!",
                    },
                  },
                },
              },
            },
          },
          403: {
            description:
              "Usuário não forneceu Token de acesso obtido no login, ou não contem permissão.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/message",
                },
                examples: {
                  exist: {
                    summary: "Não forneceu Token de acesso obtido no login",
                    value: {
                      message: "Nenhum token fornecido!",
                    },
                  },
                  role: {
                    summary: "Sem permissão de Moderador ou Adm.",
                    value: {
                      message: "Require Moderator or Admin Role!",
                    },
                  },
                },
              },
            },
          },
        },
      },
      patch: {
        security: [ { "JWT": [] } ],
        summary: "Alterar tipo.",
        tags: ["Tipos"],
        description: "Possivel atualizar alguma informação de um tipo.",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "string",
              description: "ID do cadastro de tipo",
            },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/tipo",
              },
              examples: {
                vendedor: {
                  value: {
                    tipo: "Descrição o tipo",
                  },
                },
              },
            },
          },
        },
        responses: {
          204: {
            description: "Retorno foi alterado com sucesso o tipo.",
          },
          400: {
            description: `Possiveis mensagens: 
             Tipo não informado.
            `,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/errors",
                },
                examples: {
                  empty: {
                    summary: "Tipo não informado",
                    value: {
                      errors: "Tipo não informado",
                    },
                  },
                },
              },
            },
          },
          401: {
            description:
              "Token fornecido expirado ou não autorizado a continuar",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/message",
                },
                examples: {
                  expired: {
                    summary: "Token fornecido expirado",
                    value: {
                      message: "Unauthorized! Access Token was expired!",
                    },
                  },
                  Unauthorized: {
                    summary: "Não autorizado a continuar",
                    value: {
                      message: "Unauthorized!",
                    },
                  },
                },
              },
            },
          },
          403: {
            description:
              "Usuário não forneceu Token de acesso obtido no login, ou não contem permissão.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/message",
                },
                examples: {
                  exist: {
                    summary: "Não forneceu Token de acesso obtido no login",
                    value: {
                      message: "Nenhum token fornecido!",
                    },
                  },
                  role: {
                    summary: "Sem permissão de Adm.",
                    value: {
                      message: "Require Admin Role!",
                    },
                  },
                },
              },
            },
          },
        },
      },  
      delete: {
        security: [ { "JWT": [] } ],
        summary: "Excluir tipo.",
        tags: ["Tipos"],
        description: "Possivel excluir um tipo.",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "string",
              description: "ID do cadastro da tipo",
            },
          },
        ],
        responses: {
          202: {
            description: "Retorno foi excluído com sucesso o tipo.",
          },
          422: {
            description: ` Algum erro com a exclusão
            `,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/errors",
                },
                example: { message: "não foi possível deletar" },
              },
            },
          },
          401: {
            description:
              "Token fornecido expirado ou não autorizado a continuar",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/message",
                },
                examples: {
                  expired: {
                    summary: "Token fornecido expirado",
                    value: {
                      message: "Unauthorized! Access Token was expired!",
                    },
                  },
                  Unauthorized: {
                    summary: "Não autorizado a continuar",
                    value: {
                      message: "Unauthorized!",
                    },
                  },
                },
              },
            },
          },
          403: {
            description:
              "Usuário não forneceu Token de acesso obtido no login, ou não contem permissão.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/message",
                },
                examples: {
                  exist: {
                    summary: "Não forneceu Token de acesso obtido no login",
                    value: {
                      message: "Nenhum token fornecido!",
                    },
                  },
                  role: {
                    summary: "Sem permissão de Adm.",
                    value: {
                      message: "Require Admin Role!",
                    },
                  },
                },
              },
            },
          },
        },
      },          
    }
  },
  components: {
    securitySchemes: {
      JWT: {
        type: "apiKey",
        in: "header",
        name: "x-access-token",
      },
    },
    schemas: {
      errors: {
        type: "object",
        properties: {
          errors: {
            type: "string",
          },
        },
      },
      message: {
        type: "object",
        properties: {
          message: {
            type: "string",
          },
        },
      },
      user: {
        type: "object",
        properties: {
          username: {
            type: "string",
          },
          email: {
            type: "string",
          },
          password: {
            type: "string",
          },
          roles: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },
      },
      signin: {
        type: "object",
        properties: {
          username: {
            type: "string",
          },
          email: {
            type: "string",
          },
        },
      },
      refreshtoken: {
        type: "object",
        properties: {
          refreshToken: {
            type: "string",
          },
        },
      },
      anuncio: {
        type: "object",
        properties: {
          _id: {
            type: "string",
          },
          titulo: {
            type: "string",
          },
          descricao: {
            type: "string",
          },
          valor: {
            type: "decimal",
          },
          vendedorID: {
            type: "object",
            properties: {
              _id: {
                type: "string",
              },
              nome: {
                type: "string",
              },
            },
          },
          tipoID: {
            type: "object",
            properties: {
              _id: {
                type: "string",
              },
              tipo: {
                type: "string",
              },
            },
          },
          categoriaID: {
            type: "object",
            properties: {
              _id: {
                type: "string",
              },
              categoria: {
                type: "string",
              },
            },
          },
          ano: {
            type: "date",
          },
          dataCreated: {
            type: "date",
          },
          dataUpdated: {
            type: "date",
          },
        },
      },
      vendedor: {
        type: "object",
        properties: {
          _id: {
            type: "string",
          },
          nome: {
            type: "string",
          },
        },
      },
      categoria: {
        type: "object",
        properties: {
          _id: {
            type: "string",
          },
          categoria: {
            type: "string",
          },
        },
      },
      foto: {
        type: "object",
        properties: {
          _id: {
            type: "string",
          },
          url: {
            type: "string",
          },
          anuncioID: {
            type: "string",
          },
        },
      },
      tipo: {
        type: "object",
        properties: {
          _id: {
            type: "string",
          },
          tipo: {
            type: "string",
          },
        },
      },
    },
  },
};

export default swaggerDocument;
