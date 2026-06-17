const express = require('express');
const cors = require('cors'); // <-- Adicionado para liberar o acesso do navegador
const connectDB = require('./config/db'); // Ou a sua função de conectar ao banco
const authRoutes = require('./routes/authRoutes'); // Ou o seu arquivo de rotas

const app = express();

// Conectar ao Banco de Dados MongoDB
connectDB();

// Middlewares Globais
app.use(cors()); // <-- ATIVADO! Agora seu HTML local consegue conversar com o Render
app.use(express.json());

// Rotas da API
app.use('/api/v1/auth', authRoutes);

// Porta do Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso na porta ${PORT}`);
});