document.getElementById('rastreioForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Impede a página de recarregar ao enviar o formulário

    // URL exata do seu backend que está rodando no Render
    const URL_DO_RENDER = "https://central-rastreio-backend.onrender.com/api/v1/auth/verificar-pedido";

    // Pegando os elementos da tela
    const cpfInput = document.getElementById('cpf').value.trim();
    const pedidoInput = document.getElementById('pedido').value.trim();
    const btnBuscar = document.getElementById('btnBuscar');
    const resultadoDiv = document.getElementById('resultado');

    // Mudando o estado do botão para "Carregando"
    btnBuscar.innerText = "Buscando...";
    btnBuscar.disabled = true;

    // Limpando e escondendo a caixa de resultado anterior
    resultadoDiv.className = "resultado hidden";
    resultadoDiv.innerHTML = "";

    try {
        // Fazendo a chamada HTTP POST para o Render
        const response = await fetch(URL_DO_RENDER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cpf: cpfInput,
                numeroPedido: pedidoInput
            })
        });

        const respostaDoServidor = await response.json();

        // Se o servidor responder com status 200 (Sucesso) e encontrar o pedido
        if (response.ok && respostaDoServidor.data?.autenticado === true) {
            resultadoDiv.classList.remove('hidden');
            resultadoDiv.classList.add('sucesso');
            
            // Exibindo a mensagem personalizada com o nome do cliente vindo do MongoDB
            resultadoDiv.innerHTML = `
                <strong>✅ Pedido Encontrado!</strong><br><br>
                Olá, <strong>${respostaDoServidor.data.clienteNome}</strong>.<br>
                Seu pedido foi localizado com sucesso em nosso sistema.
            `;
        } else {
            // Se o servidor responder com erro controlado (Ex: 400 ou 404)
            resultadoDiv.classList.remove('hidden');
            resultadoDiv.classList.add('erro');
            
            const msgErro = respostaDoServidor.data?.mensagem || "Dados inválidos ou pedido não localizado.";
            resultadoDiv.innerHTML = `<strong>❌ Erro:</strong> ${msgErro}`;
        }

    } catch (error) {
        // Se houver falha de rede ou o servidor do Render estiver carregando/desligado
        resultadoDiv.classList.remove('hidden');
        resultadoDiv.classList.add('erro');
        resultadoDiv.innerHTML = `<strong>⚠️ Erro de Conexão:</strong> Não foi possível se comunicar com o servidor. Certifique-se de que o deploy no Render terminou com sucesso.`;
    } finally {
        // Voltando o botão ao estado normal após terminar tudo
        btnBuscar.innerText = "Buscar Pedido";
        btnBuscar.disabled = false;
    }
});