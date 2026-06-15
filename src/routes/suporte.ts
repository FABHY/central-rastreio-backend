import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { Chamado } from '../models/Chamado';
import { Pedido } from '../models/Pedido';
import { z } from 'zod';

// Validamos o que o Typebot precisa nos enviar obrigatoriamente
const criarChamadoBodySchema = z.object({
  pedidoId: z.string().min(1),
  assunto: z.string().min(3, "O assunto deve ter pelo menos 3 caracteres"),
  mensagemUsuario: z.string().min(5, "A mensagem deve ter pelo menos 5 caracteres")
});

export async function suporteRoutes(fastify: FastifyInstance) {
  
  fastify.post('/api/v1/suporte/chamados', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      // 1. Valida os dados recebidos no corpo da requisição
      const { pedidoId, assunto, mensagemUsuario } = criarChamadoBodySchema.parse(request.body);

      // 2. Verifica se o pedido enviado realmente existe no sistema antes de abrir o chamado
      const pedidoExiste = await Pedido.findById(pedidoId);
      if (!pedidoExiste) {
        return reply.status(404).send({
          sucesso: false,
          mensagem: "Não é possível abrir um chamado para um pedido inexistente."
        });
      }

      // 3. Gera um número de protocolo aleatório profissional (Ex: CH-2026-8472)
      const numeroAleatorio = Math.floor(1000 + Math.random() * 9000);
      const protocolo = `CH-2026-${numeroAleatorio}`;

      // 4. Salva o novo chamado no MongoDB Atlas
      const dataAtual = new Date().toISOString().split('T')[0]; // Pega a data atual no formato AAAA-MM-DD
      
      const novoChamado = await Chamado.create({
        pedidoId,
        assunto,
        mensagemUsuario,
        protocolo,
        status: 'Aberto',
        dataCriacao: dataAtual
      });

      // 5. Retorna a confirmação e o protocolo para o Typebot mostrar na tela
      return reply.status(201).send({
        sucesso: true,
        protocolo: novoChamado.protocolo,
        mensagem: "Chamado registrado com sucesso em nossa central de suporte.",
        dataCriacao: novoChamado.dataCriacao
      });

    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.status(400).send({ 
          sucesso: false, 
          mensagem: "Dados incompletos para abertura de chamado.", 
          erros: error.format() 
        });
      }

      fastify.log.error(error);
      return reply.status(500).send({ sucesso: false, message: "Erro interno ao abrir chamado." });
    }
  });
}