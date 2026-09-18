const DEFAULT_PRODUCTS = [
    {
        "id": 1,
        "name": "Conjunto Jantar Premium 8 Lugares",
        "category": "Conjuntos",
        "image": "produto-01.jpg",
        "price": null,
        "stock": 4,
        "featured": 1,
        "description": "Conjunto de jantar amplo com mesa retangular e oito cadeiras. Ideal para áreas gourmet e varandas cobertas."
    },
    {
        "id": 2,
        "name": "Conjunto Lounge Azul",
        "category": "Conjuntos",
        "image": "produto-02.jpg",
        "price": null,
        "stock": 3,
        "featured": 1,
        "description": "Sofá, duas poltronas e mesa de centro com estrutura preta e estofamento azul."
    },
    {
        "id": 3,
        "name": "Chaise Redonda Fibra Marrom",
        "category": "Chaises",
        "image": "produto-03.jpg",
        "price": null,
        "stock": 2,
        "featured": 1,
        "description": "Chaise redonda ampla com acabamento em fibra e almofadas claras."
    },
    {
        "id": 4,
        "name": "Chaise Redonda Azul",
        "category": "Chaises",
        "image": "produto-04.jpg",
        "price": null,
        "stock": 2,
        "featured": 0,
        "description": "Chaise redonda com trama escura e estofamento azul."
    },
    {
        "id": 5,
        "name": "Chaise Redonda Corda Azul",
        "category": "Chaises",
        "image": "produto-05.jpg",
        "price": null,
        "stock": 2,
        "featured": 1,
        "description": "Modelo redondo em corda náutica azul, com almofadas em tons neutros."
    },
    {
        "id": 6,
        "name": "Conjunto Jantar Trama 8 Lugares",
        "category": "Conjuntos",
        "image": "produto-06.jpg",
        "price": null,
        "stock": 3,
        "featured": 0,
        "description": "Conjunto de mesa retangular e oito cadeiras tramadas para ambientes sofisticados."
    },
    {
        "id": 7,
        "name": "Chaise Redonda Verde",
        "category": "Chaises",
        "image": "produto-07.jpg",
        "price": null,
        "stock": 2,
        "featured": 1,
        "description": "Chaise redonda em trama verde, com base robusta e almofadas decorativas."
    },
    {
        "id": 8,
        "name": "Balanço Suspenso Folhagem",
        "category": "Balanços",
        "image": "produto-08.jpg",
        "price": null,
        "stock": 5,
        "featured": 1,
        "description": "Balanço suspenso individual com almofada estampada e suporte metálico."
    },
    {
        "id": 9,
        "name": "Balanço Suspenso Terracota",
        "category": "Balanços",
        "image": "produto-09.jpg",
        "price": null,
        "stock": 5,
        "featured": 0,
        "description": "Balanço individual com acabamento terracota e almofada bege capitonê."
    },
    {
        "id": 10,
        "name": "Poltrona Alta Fibra Natural",
        "category": "Poltronas",
        "image": "produto-10.jpg",
        "price": null,
        "stock": 8,
        "featured": 0,
        "description": "Poltrona alta com estrutura preta e trama em tom natural."
    },
    {
        "id": 11,
        "name": "Poltrona Jardim Fibra",
        "category": "Poltronas",
        "image": "produto-11.jpg",
        "price": null,
        "stock": 8,
        "featured": 0,
        "description": "Poltrona de encosto alto, ideal para jardim, varanda e espaço gourmet."
    },
    {
        "id": 12,
        "name": "Poltrona Alta Premium",
        "category": "Poltronas",
        "image": "produto-12.jpg",
        "price": null,
        "stock": 8,
        "featured": 0,
        "description": "Poltrona alta em fibra marrom com estrutura metálica preta."
    },
    {
        "id": 13,
        "name": "Conjunto Bistrô 4 Lugares",
        "category": "Bistrôs",
        "image": "produto-13.jpg",
        "price": null,
        "stock": 4,
        "featured": 1,
        "description": "Mesa redonda com tampo de vidro e quatro cadeiras em acabamento preto."
    },
    {
        "id": 14,
        "name": "Mesa de Centro Tramado",
        "category": "Mesas",
        "image": "produto-14.jpg",
        "price": null,
        "stock": 10,
        "featured": 0,
        "description": "Mesa de centro quadrada com estrutura preta e trama em tom natural."
    },
    {
        "id": 15,
        "name": "Banqueta Alta Marrom",
        "category": "Banquetas",
        "image": "produto-15.jpg",
        "price": null,
        "stock": 12,
        "featured": 0,
        "description": "Banqueta alta com assento estofado e estrutura metálica em tom marrom."
    },
    {
        "id": 16,
        "name": "Banqueta Alta Tramada",
        "category": "Banquetas",
        "image": "produto-16.jpg",
        "price": null,
        "stock": 12,
        "featured": 0,
        "description": "Banqueta com detalhe trançado no encosto e assento estofado."
    },
    {
        "id": 17,
        "name": "Banqueta Alta Clara",
        "category": "Banquetas",
        "image": "produto-17.jpg",
        "price": null,
        "stock": 12,
        "featured": 0,
        "description": "Banqueta alta em acabamento claro, ideal para bancadas e áreas gourmet."
    },
    {
        "id": 18,
        "name": "Conjunto Jantar Noturno",
        "category": "Conjuntos",
        "image": "produto-18.jpg",
        "price": null,
        "stock": 2,
        "featured": 1,
        "description": "Mesa de jantar retangular com oito cadeiras, ambientação premium para área externa."
    },
    {
        "id": 19,
        "name": "Conjunto Lounge Preto",
        "category": "Conjuntos",
        "image": "produto-19.jpg",
        "price": null,
        "stock": 3,
        "featured": 1,
        "description": "Sofá, duas poltronas e mesa redonda com estrutura escura e almofadas claras."
    },
    {
        "id": 20,
        "name": "Conjunto Lounge Trama Preta",
        "category": "Conjuntos",
        "image": "produto-20.jpg",
        "price": null,
        "stock": 3,
        "featured": 1,
        "description": "Conjunto de área externa com sofá, duas poltronas e mesa de centro em vidro."
    }
];
