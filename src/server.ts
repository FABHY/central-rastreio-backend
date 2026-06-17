import Fastify from 'fastify';
import dotenv from 'dotenv';
import path from 'path';
import { connectDatabase } from './config/database';
import { authRoutes } from './routes/auth';
import { rastreioRoutes } from './routes/rastreio';
import { suporteRoutes } from './routes/suporte'; // 1. Importa a rota de suporte

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const fastify = Fastify({ logger: true });

async function start() {
  try {
    await connectDatabase();

    // 2. Registra TODAS as rotas da nossa central de atendimento
    await fastify.register(authRoutes);
    await fastify.register(rastreioRoutes);
    await fastify.register(suporteRoutes); // Registro da nova rota de suporte

    const port = Number(process.env.PORT) || 3333;

    await fastify.listen({ port, host: '0.0.0.0' });
    console.log(`🚀 Servidor rodando com sucesso em http://localhost:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();