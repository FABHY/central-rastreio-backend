import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { Cliente } from '../models/Cliente';
import { Pedido } from '../models/Pedido';
import { z } from 'zod';

// Schema de validação usando o Zod
const verificarPedidoBodySchema = z.object({
  cpf: z.string().min(11, "CPF deve ter pelo menos 11 dígitos"),
  numeroPedido: z.string()
});

export async function authRoutes(fastify: FastifyInstance) {
  
  fastify.post('/api/v1/auth/verificar-pedido', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      // 1. Valida se o corpo da requisição veio correto
      const { cpf, numeroPedido } = verificarPedidoBodySchema.parse(request.body);

      // Limpa pontos ou traços que o usuário possa ter digitado
      const cpfLimpo = cpf.replace(/\D/g, '');

      // 2. Busca o cliente pelo CPF
      const cliente = await Cliente.findOne({ cpf: cpfLimpo });

      if (!cliente) {
        return reply.status(404).send({
          autenticado: false,
          mensagem: "Cliente não encontrado com o CPF informado."
        });
      }

      // 3. Busca o pedido vinculado a este cliente
      const pedido = await Pedido.findOne({
        numeroPedido: numeroPedido,
        clienteId: cliente._id
      });

      if (!pedido) {
        return reply.status(404).send({
          autenticado: false,
          mensagem: "Pedido não encontrado para este cliente. Verifique o número."
        });
      }

      // 4. Se tudo bater, retorna sucesso para o Typebot
      return reply.status(200).send({
        autenticado: true,
        pedidoId: pedido._id,
        clienteNome: cliente.nome,
        mensagem: `Olá, ${cliente.nome}! Pedido localizado.`
      });

    } catch (error) {
      // CORREÇÃO AQUI: Usando o error.format() para o TypeScript aceitar sem reclamar
      if (error instanceof z.ZodError) {
        return reply.status(400).send({ 
          autenticado: false, 
          mensagem: "Dados inválidos enviados.", 
          erros: error.format() 
        });
      }

      fastify.log.error(error);
      return reply.status(500).send({ 
        autenticado: false, 
        mensagem: "Erro interno no servidor de rastreio." 
      });
    }
  });
}