
const banco = db.getSiblingDB("happy_pet");

const produtos = [
  {
    id: 1,
    nome: "Coleira Happy",
    descricao: "Coleira confortável para cães",
    preco: 39.9,
    imagem: "https://oopsdog.com.br/wp-content/uploads/TAG-REF-13.jpg",
    categoria: "Coleiras",
    favorito: false
  },
  {
    id: 2,
    nome: "Brinquedo Mordedor",
    descricao: "Brinquedo resistente para diversão",
    preco: 29.9,
    imagem: "https://salescdn.net/aiMlXe1yVbzj0vWlc_PESHpcuhw=/adaptive-fit-in/600x0/prod/store/12895/medias/products/brinquedo-mordedor-gira-gira-para-caes-27217041-4c8d-47e2-aab9-ff63d3d3a1fe.webp",
    categoria: "Brinquedos",
    favorito: false
  },
  {
    id: 3,
    nome: "Caminha Confort",
    descricao: "Caminha macia para seu pet",
    preco: 89.9,
    imagem: "https://http2.mlstatic.com/D_NQ_NP_2X_743759-MLB114261890577_072026-F-cama-pet-caminha-para-ces-gato-quadrada-impermeavel-lavavel.webp",
    categoria: "Camas",
    favorito: false
  },
  {
    id: 4,
    nome: "Comedouro Pet",
    descricao: "Comedouro prático e resistente",
    preco: 49.9,
    imagem: "https://http2.mlstatic.com/D_NQ_NP_2X_941705-MLB110915809872_052026-F-comedouro-bebedouro-inox-304-pet-base-antiderrapante-1500ml.webp",
    categoria: "Alimentação",
    favorito: false
  }
];

produtos.forEach((produto) => {
  banco.produtos.updateOne(
    { id: produto.id },
    { $set: produto },
    { upsert: true }
  );
});

print("Produtos do Happy Pet cadastrados!");
print("Total de produtos:", banco.produtos.countDocuments());




banco.pedidos.updateOne(
  { numeroPedido: "PED001" },
  {
    $setOnInsert: {
      numeroPedido: "PED001",
      usuarioEmail: "joao@teste.com",
      criadoEm: new Date(),
      situacao: "Concluído",
      itens: [
        {
          produtoId: 1,
          nome: "Coleira Happy",
          quantidade: 2,
          precoUnitario: 39.90
        },
        {
          produtoId: 2,
          nome: "Brinquedo Mordedor",
          quantidade: 1,
          precoUnitario: 29.90
        }
      ]
    }
  },
  { upsert: true }
);

print("Pedido de teste inserido com sucesso!");