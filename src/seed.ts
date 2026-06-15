import { connectDatabase } from './config/database';
import { Cliente } from './models/Cliente';
import { Pedido } from './models/Pedido';
import mongoose from 'mongoose';

async function runSeed() {
  await connectDatabase();

  // Limpa o banco antes de inserir para não duplicar nos testes
  await Cliente.deleteMany({});
  await Pedido.deleteMany({});

  // 1. Criar Cliente Fake
  const cliente = await Cliente.create({
    nome: "Carlos Eduardo Silva",
    cpf: "12345678901", // Use um CPF fictício limpo de pontos/traços
    telefone: "11999998888",
    email: "carlos@email.com"
  });

  // 2. Criar Pedido Fake vinculado ao Cliente
  await Pedido.create({
    clienteId: cliente._id,
    numeroPedido: "1050",
    dataCompra: "2026-06-10",
    statusAtual: "Saiu para entrega",
    previsaoEntrega: "2026-06-16",
    historico: [
      { data: "2026-06-11", status: "Objeto postado pelo vendedor" },
      { data: "2026-06-13", status: "Em trânsito para a unidade de distribuição" },
      { data: "2026-06-14", status: "Saiu para entrega ao destinatário" }
    ]
  });

  console.log("🌱 Dados fakes (Seed) inseridos com sucesso!");
  await mongoose.disconnect();
}

runSeed();