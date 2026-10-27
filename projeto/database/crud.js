
const banco = db.getSiblingDB("happy_pet");

// C - CREATE: inserir um novo produto

banco.produtos.insertOne(
  { 
      id: 5,
      nome: "Ração",
      descricao: "Ração de carne",
      preco: 79.99,
      imagem: "Racao.jpg",
      categoria: "Alimentos",
      favorito: false,
      estoque: 40,
      ativo: true
    }
);

print("CREATE: produto cadastrado.");

// R - READ: consultar produtos

// Buscar produto pelo ID
print("READ: produto pelo ID");
printjson(banco.produtos.findOne({ id: 1 }));

// Buscar produtos por categoria
print("READ: produtos da categoria de Alimento");
banco.produtos.find({
  categoria: "Alimentos"
}).forEach(printjson);

// Buscar produtos por faixa de preço
print("READ: produtos entre R$ 20 e R$ 50");
banco.produtos.find({
  preco: { $gte: 20, $lte: 50 }
}).forEach(printjson);

// U - UPDATE: atualizar o estoque

// Definir estoque para um valor conhecido
banco.produtos.updateOne(
  { id: 5 },
  { $set: { estoque: 40 } }
);

// Simular a venda de uma unidade
banco.produtos.updateOne(
  { id: 5, estoque: { $gt: 0 } },
  { $inc: { estoque: -1 } }
);

print("UPDATE: estoque atualizado.");
printjson(
  banco.produtos.findOne({ id: 5 })
);

// D - DELETE: soft delete

// Inativar o produto sem apagar o registro
banco.produtos.updateOne(
  { id: 5 },
  { $set: { ativo: false } }
);

print("DELETE: produto inativado.");
printjson(
  banco.produtos.findOne({ id: 5 })
);

// Consultar somente produtos ativos
print("Consulta: produtos ativos");
banco.produtos.find({
  ativo: { $ne: false }
}).forEach(printjson);

