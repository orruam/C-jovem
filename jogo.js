document.addEventListener('DOMContentLoaded', function() {
    // --- Elementos HTML ---
    const selectionSection = document.getElementById('operation-selection');
    const gameArea = document.getElementById('game-area');
    const operationItems = document.querySelectorAll('.item[data-op]');
    const backToMenuBtn = document.getElementById('back-to-menu');

    const num1Span = document.getElementById('num1');
    const operatorSymbolSpan = document.getElementById('operator-symbol');
    const num2Span = document.getElementById('num2');
    const userAnswerInput = document.getElementById('user-answer');
    const checkBtn = document.getElementById('check-btn');
    const nextBtn = document.getElementById('next-btn');
    const feedbackMessage = document.getElementById('feedback-message');
    const scoreSpan = document.getElementById('current-score');
    const feedbackImg = document.getElementById('feedback-img'); // Adicionado elemento da imagem de feedback

    // --- Variáveis do Jogo ---
    let currentOperation = ''; // Armazena a operação escolhida (+, -, x, /)
    let score = 0;
    let num1, num2, correctAnswer;

    // --- Funções de Controle de Tela ---
    function showGameArea() {
        selectionSection.classList.add('hidden');
        gameArea.classList.remove('hidden');
        resetGameRound(); // Inicia a primeira rodada
        userAnswerInput.focus(); // Foca no campo de resposta
    }

    function showSelectionArea() {
        gameArea.classList.add('hidden');
        selectionSection.classList.remove('hidden');
        resetScore(); // Reseta a pontuação ao voltar para o menu
        // Limpa a mensagem de feedback e imagem ao voltar
        feedbackMessage.textContent = '';
        feedbackImg.classList.add('hidden');
        feedbackImg.src = '';
    }

    // --- Funções de Lógica do Jogo ---
    function generateNumbers() {
        num1 = Math.floor(Math.random() * 10) + 1; // Números de 1 a 10
        num2 = Math.floor(Math.random() * 10) + 1;

        // Ajustes para operações específicas para evitar resultados muito complexos ou inválidos
        if (currentOperation === 'divisao') {
            // Garante que a divisão resulte em número inteiro
            correctAnswer = num1 * num2; // Faz a multiplicação para garantir divisibilidade
            num1 = correctAnswer;        // num1 será o dividendo
        }
        if (currentOperation === 'subtracao' && num2 > num1) {
            // Garante que o resultado da subtração não seja negativo para números pequenos
            [num1, num2] = [num2, num1]; // Troca os números para num1 ser sempre maior
        }
    }

    function calculateCorrectAnswer() {
        switch (currentOperation) {
            case 'adicao':
                correctAnswer = num1 + num2;
                break;
            case 'subtracao':
                correctAnswer = num1 - num2;
                break;
            case 'multiplicacao':
                correctAnswer = num1 * num2;
                break;
            case 'divisao':
                correctAnswer = num1 / num2;
                break;
        }
    }

    function displayQuestion() {
        num1Span.textContent = num1;
        num2Span.textContent = num2;
        userAnswerInput.value = ''; // Limpa o campo de resposta
        feedbackMessage.textContent = ''; // Limpa a mensagem de feedback
        feedbackImg.classList.add('hidden'); // Esconde a imagem de feedback
        feedbackImg.src = ''; // Limpa a src da imagem
        checkBtn.classList.remove('hidden'); // Mostra o botão verificar
        nextBtn.classList.add('hidden'); // Esconde o botão próxima

        switch (currentOperation) {
            case 'adicao':
                operatorSymbolSpan.textContent = '+';
                break;
            case 'subtracao':
                operatorSymbolSpan.textContent = '-';
                break;
            case 'multiplicacao':
                operatorSymbolSpan.textContent = 'x';
                break;
            case 'divisao':
                operatorSymbolSpan.textContent = '/';
                break;
        }
    }

    function checkAnswer() {
        const userAnswer = parseFloat(userAnswerInput.value); // Converte para número
        if (isNaN(userAnswer)) {
            feedbackMessage.textContent = 'Por favor, digite um número.';
            feedbackMessage.classList.add('wrong');
            feedbackMessage.classList.remove('correct');
            return;
        }

        if (userAnswer === correctAnswer) {
            feedbackMessage.textContent = 'Correto!';
            feedbackMessage.classList.remove('wrong');
            feedbackMessage.classList.add('correct');
            score++;
            // Se você tiver imagens para certo/errado, configure o caminho aqui:
            // feedbackImg.src = 'caminho/para/imagem_certo.png';
            // feedbackImg.classList.remove('hidden');
        } else {
            feedbackMessage.textContent = `Errado. A resposta era ${correctAnswer}.`;
            feedbackMessage.classList.remove('correct');
            feedbackMessage.classList.add('wrong');
            score = Math.max(0, score - 1); // Garante que a pontuação não seja negativa
            // Se você tiver imagens para certo/errado, configure o caminho aqui:
            // feedbackImg.src = 'caminho/para/imagem_errado.png';
            // feedbackImg.classList.remove('hidden');
        }
        scoreSpan.textContent = score;
        checkBtn.classList.add('hidden'); // Esconde o verificar
        nextBtn.classList.remove('hidden'); // Mostra o próxima
    }

    function resetGameRound() {
        generateNumbers();
        calculateCorrectAnswer();
        displayQuestion();
        userAnswerInput.focus(); // Foca no campo de resposta para a próxima pergunta
    }

    function resetScore() {
        score = 0;
        scoreSpan.textContent = score;
    }

    // --- Event Listeners ---

    // Eventos para selecionar a operação
    operationItems.forEach(item => {
        item.addEventListener('click', function() {
            currentOperation = this.dataset.op; // Pega o valor do atributo data-op
            showGameArea();
        });
    });

    // Botão Voltar ao Menu
    backToMenuBtn.addEventListener('click', showSelectionArea);

    // Botão Verificar
    checkBtn.addEventListener('click', checkAnswer);

    // Botão Próxima
    nextBtn.addEventListener('click', resetGameRound);

    // Pressionar Enter para verificar (e ir para a próxima)
    userAnswerInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            if (!checkBtn.classList.contains('hidden')) { // Se o botão verificar estiver visível
                checkAnswer();
            } else { // Se o botão próxima estiver visível
                resetGameRound();
            }
            event.preventDefault(); // Impede o comportamento padrão do Enter (ex: submeter formulário)
        }
    });
});