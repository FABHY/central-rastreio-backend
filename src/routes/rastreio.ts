import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { Pedido } from '../models/Pedido';
import { z } from 'zod';

// Validamos que o parâmetro enviado na URL (pedidoId) seja uma string preenchida
const rastreioParamsSchema = z.object({
  pedidoId: z.string().min(1)
});

export async function rastreioRoutes(fastify: FastifyInstance) {
  
  fastify.get('/api/v1/rastreio/:pedidoId', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      // 1. Valida se o parâmetro da URL veio correto
      const { pedidoId } = rastreioParamsSchema.parse(request.params);

      // 2. Busca o pedido no banco de dados pelo ID
      const pedido = await Pedido.findById(pedidoId);

      // Se o ID não existir no banco
      if (!pedido) {
        return reply.status(404).send({
          sucesso: false,
          mensagem: "Pedido não localizado no sistema de logística."
        });
      }

      // 3. Retorna os dados de rastreio formatados para o Typebot ler
      return reply.status(200).send({
        sucesso: true,
        numeroPedido: pedido.numeroPedido,
        statusAtual: pedido.statusAtual,
        previsaoEntrega: pedido.previsaoEntrega,
        historico: pedido.historico // Envia o array com todas as movimentações
      });

    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.status(400).send({ sucesso: false, mensagem: "ID do pedido inválido." });
      }

      fastify.log.error(error);
      return reply.status(500).send({ sucesso: false, mensagem: "Erro ao buscar rastreio." });
    }
  });
}