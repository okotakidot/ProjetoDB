const banco = db.getSiblingDB("happy_pet");

// 1. Índice único para o e-mail dos usuários
banco.usuarios.createIndex(
  { email: 1 },
  { unique: true, name: "idx_usuarios_email_unico" }
);

// 2. Índice de texto para buscar produtos pelo nome
banco.produtos.createIndex(
  { nome: "text" },
  { name: "idx_produtos_nome_texto" }
);

// 3. Índice composto para filtrar produtos por categoria e preço
banco.produtos.createIndex(
  { categoria: 1, preco: 1 },
  { name: "idx_produtos_categoria_preco" }
);

// 4. Índice para consultar pedidos recentes
banco.pedidos.createIndex(
  { criadoEm: -1 },
  { name: "idx_pedidos_criadoEm" }
);

print("Índices criados ou já existentes.");

// Listar os índices
print("Índices de produtos:");
banco.produtos.getIndexes().forEach(printjson);

print("Índices de usuários:");
banco.usuarios.getIndexes().forEach(printjson);

print("Índices de pedidos:");
banco.pedidos.getIndexes().forEach(printjson);

// Diagnóstico de uma consulta
print("Diagnóstico da busca por produto:");
printjson(
  banco.produtos.find({ nome: "Coleira Happy" })
    .explain("executionStats")
);