
const banco = db.getSiblingDB("happy_pet");

// Relatório: total de vendas por categoria
// Considera os últimos 30 dias e exclui pedidos cancelados.

const dataInicial = new Date(
  Date.now() - 30 * 24 * 60 * 60 * 1000
);

const relatorio = banco.pedidos.aggregate([
  // 1. Filtrar pedidos dos últimos 30 dias
  {
    $match: {
      criadoEm: { $gte: dataInicial },
      situacao: { $ne: "Cancelado" }
    }
  },

  // 2. Separar os itens de cada pedido
  {
    $unwind: "$itens"
  },

  // 3. Buscar os dados dos produtos
  {
    $lookup: {
      from: "produtos",
      localField: "itens.produtoId",
      foreignField: "id",
      as: "produto"
    }
  },

  // 4. Transformar o resultado do lookup em objeto
  {
    $unwind: {
      path: "$produto",
      preserveNullAndEmptyArrays: true
    }
  },

  // 5. Agrupar por categoria e calcular as vendas
  {
    $group: {
      _id: {
        $ifNull: [
          "$produto.categoria",
          "Sem categoria"
        ]
      },
      quantidadeVendida: {
        $sum: "$itens.quantidade"
      },
      totalVendas: {
        $sum: {
          $multiply: [
            "$itens.precoUnitario",
            "$itens.quantidade"
          ]
        }
      },
      quantidadePedidos: {
        $sum: 1
      }
    }
  },

  // 6. Organizar o resultado
  {
    $project: {
      _id: 0,
      categoria: "$_id",
      quantidadeVendida: 1,
      totalVendas: {
        $round: ["$totalVendas", 2]
      },
      quantidadePedidos: 1
    }
  },

  // 7. Ordenar pelo maior faturamento
  {
    $sort: {
      totalVendas: -1
    }
  }
]);

print("RELATÓRIO DE VENDAS POR CATEGORIA");
print("Período: últimos 30 dias");
print("--------------------------------");

relatorio.forEach(printjson);
