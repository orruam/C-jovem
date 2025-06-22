document.addEventListener('DOMContentLoaded', function() {
    // --- 1. Navegação Suave (Scroll Suave) ---
    // Seleciona todos os links da navegação que apontam para IDs na mesma página
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault(); // Impede o comportamento padrão do link (salto brusco)

            const targetId = this.getAttribute('href'); // Pega o ID do elemento alvo (ex: #sobre)
            const targetElement = document.querySelector(targetId); // Encontra o elemento no DOM

            if (targetElement) {
                // Calcula a posição de rolagem ajustando pela altura do cabeçalho (se fixo)
                const headerOffset = document.querySelector('header nav') ? document.querySelector('header nav').offsetHeight : 0;
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 2. Efeito "Sticky Header" (Cabeçalho Fixo ao Rolar) ---
    const header = document.querySelector('header'); // Seleciona o cabeçalho
    const nav = document.querySelector('nav'); // Seleciona a navegação (que será fixa)
    // Calcula a altura do cabeçalho completo para saber quando ativar o sticky
    const headerHeight = header.offsetHeight;

    function handleScroll() {
        // Se a rolagem for maior que a altura do cabeçalho, adiciona a classe 'sticky'
        if (window.scrollY > headerHeight) {
            nav.classList.add('sticky');
            // Adiciona padding ao body para evitar que o conteúdo fique escondido atrás do header fixo
            document.body.classList.add('sticky-padding');
        } else {
            // Remove a classe 'sticky' quando volta ao topo
            nav.classList.remove('sticky');
            document.body.classList.remove('sticky-padding');
        }
    }

    // Adiciona o event listener para o scroll
    window.addEventListener('scroll', handleScroll);

    // --- 3. Validação de Formulário de Contato (Exemplo - se você adicionar um formulário) ---
    // Este código é do seu arquivo script.js original e parece ser para um formulário de contato.
    // Se você não tem um formulário de contato no home.html, este código não fará nada.
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Limpa mensagens de erro anteriores
            document.querySelectorAll('.error-message').forEach(el => el.remove());

            let hasError = false;

            // Validação do campo Nome
            const nomeInput = document.getElementById('nome');
            if (nomeInput && nomeInput.value.trim() === '') {
                displayError(nomeInput, 'Por favor, digite seu nome.');
                hasError = true;
            }

            // Validação do campo Email
            const emailInput = document.getElementById('email');
            if (emailInput) {
                if (emailInput.value.trim() === '') {
                    displayError(emailInput, 'Por favor, digite seu e-mail.');
                    hasError = true;
                } else if (!isValidEmail(emailInput.value.trim())) {
                    displayError(emailInput, 'Por favor, digite um e-mail válido.');
                    hasError = true;
                }
            }

            // Validação do campo Mensagem
            const mensagemInput = document.getElementById('mensagem');
            if (mensagemInput && mensagemInput.value.trim() === '') {
                displayError(mensagemInput, 'Por favor, digite sua mensagem.');
                hasError = true;
            }

            if (hasError) {
                e.preventDefault(); // Impede o envio do formulário se houver erros
            } else {
                // Aqui você enviaria o formulário via AJAX ou para um serviço de backend
                // Para este exemplo, apenas um alerta simples
                alert('Mensagem enviada com sucesso! (Funcionalidade de envio real requer backend)');
                // e.preventDefault(); // Descomente para evitar o envio e testar o alerta
                contactForm.reset(); // Limpa o formulário
            }
        });
    }

    function displayError(inputElement, message) {
        const errorMessage = document.createElement('p');
        errorMessage.classList.add('error-message');
        errorMessage.style.color = '#e74c3c'; // Cor vermelha para a mensagem de erro
        errorMessage.style.fontSize = '0.9em';
        errorMessage.style.marginTop = '5px';
        errorMessage.textContent = message;
        inputElement.parentNode.insertBefore(errorMessage, inputElement.nextSibling); // Insere após o input
    }

    function isValidEmail(email) {
        // Regex simples para validação de e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});