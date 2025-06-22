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

    // --- Variáveis do Jogo ---
    let currentOperation = ''; // Armazena a operação escolhida (+, -, x, /)
    let score = 0;
    let num1, num2, correctAnswer;

    // --- Funções de Controle de Tela ---
    function showGameArea() {
        selectionSection.classList.add('hidden');
        gameArea.classList.remove('hidden');
        resetGameRound(); // Inicia a primeira rodada
    }

    function showSelectionArea() {
        gameArea.classList.add('hidden');
        selectionSection.classList.remove('hidden');
        resetScore(); // Reseta a pontuação ao voltar para o menu
        feedbackMessage.textContent = ''; // Limpa mensagem de feedback
        userAnswerInput.value = ''; // Limpa o campo de resposta
        nextBtn.classList.add('hidden'); // Esconde o botão "Próxima"
        checkBtn.classList.remove('hidden'); // Mostra o botão "Verificar"
    }

    // --- Funções do Jogo ---
    function generateNumbers() {
        if (currentOperation === 'divisao') {
            // Garante divisão exata
            num2 = Math.floor(Math.random() * 9) + 2; // de 2 a 10
            num1 = num2 * (Math.floor(Math.random() * 9) + 2); // num1 é múltiplo de num2
        } else {
            num1 = Math.floor(Math.random() * 100) + 1; // de 1 a 100
            num2 = Math.floor(Math.random() * 100) + 1; // de 1 a 100
            // Ajuste para subtração para evitar números negativos fáceis
            if (currentOperation === 'subtracao' && num1 < num2) {
                [num1, num2] = [num2, num1]; // Troca os números para num1 ser maior
            }
        }
    }

    function calculateCorrectAnswer() {
        switch (currentOperation) {
            case 'adicao':
                correctAnswer = num1 + num2;
                operatorSymbolSpan.textContent = '+';
                break;
            case 'subtracao':
                correctAnswer = num1 - num2;
                operatorSymbolSpan.textContent = '-';
                break;
            case 'multiplicacao':
                correctAnswer = num1 * num2;
                operatorSymbolSpan.textContent = 'x';
                break;
            case 'divisao':
                correctAnswer = num1 / num2;
                operatorSymbolSpan.textContent = '/';
                break;
        }
    }

    function displayQuestion() {
        num1Span.textContent = num1;
        num2Span.textContent = num2;
        userAnswerInput.value = ''; // Limpa o campo de resposta
        userAnswerInput.focus(); // Coloca o cursor no campo de resposta
        feedbackMessage.textContent = ''; // Limpa a mensagem de feedback
        checkBtn.classList.remove('hidden'); // Mostra o botão verificar
        nextBtn.classList.add('hidden'); // Esconde o botão próxima
        userAnswerInput.disabled = false; // Habilita o input
    }

    function checkAnswer() {
        const userAnswer = Number(userAnswerInput.value);

        if (userAnswerInput.value.trim() === '') {
            feedbackMessage.textContent = 'Por favor, digite sua resposta.';
            feedbackMessage.classList.add('wrong');
            return;
        }

        userAnswerInput.disabled = true; // Desabilita o input após verificar

        if (userAnswer === correctAnswer) {
            feedbackMessage.textContent = 'ACERTOU! 🎉';
            feedbackMessage.className = 'feedback correct'; // Adiciona classe de acerto
            score++;
        } else {
            feedbackMessage.textContent = `ERROU! A resposta correta era ${correctAnswer}. 😔`;
            feedbackMessage.className = 'feedback wrong'; // Adiciona classe de erro
        }
        scoreSpan.textContent = score;
        checkBtn.classList.add('hidden'); // Esconde o verificar
        nextBtn.classList.remove('hidden'); // Mostra o próxima
    }

    function resetGameRound() {
        generateNumbers();
        calculateCorrectAnswer();
        displayQuestion();
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
        }
    });

    // Inicia o jogo no modo de seleção de operação
    showSelectionArea();
});