document.addEventListener('DOMContentLoaded', function() {
    // --- 1. Navegação Suave (Scroll Suave) ---
    // Seleciona todos os links da navegação que apontam para IDs na mesma página
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault(); // Impede o comportamento padrão do link (salto brusco)

            const targetId = this.getAttribute('href'); // Pega o ID do elemento alvo (ex: #sobre)
            const targetElement = document.querySelector(targetId); // Encontra o elemento no DOM

            if (targetElement) {
                // Rola suavemente até o elemento alvo
                window.scrollTo({
                    top: targetElement.offsetTop - (document.querySelector('header nav') ? document.querySelector('header nav').offsetHeight : 0), // Ajusta para a altura do cabeçalho fixo, se existir
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 2. Efeito "Sticky Header" (Cabeçalho Fixo ao Rolar) ---
    const header = document.querySelector('header'); // Seleciona o cabeçalho
    const nav = document.querySelector('nav'); // Seleciona a navegação (que será fixa)
    const headerHeight = header.offsetHeight; // Altura do cabeçalho

    function handleScroll() {
        if (window.scrollY > headerHeight) { // Se a rolagem for maior que a altura do cabeçalho
            nav.classList.add('sticky'); // Adiciona a classe 'sticky' à navegação
            document.body.style.paddingTop = nav.offsetHeight + 'px'; // Adiciona padding ao body para o conteúdo não "pular"
        } else {
            nav.classList.remove('sticky'); // Remove a classe 'sticky'
            document.body.style.paddingTop = '0'; // Remove o padding
        }
    }

    // Adiciona o evento de rolagem
    window.addEventListener('scroll', handleScroll);

    // Garante que o sticky header funcione ao carregar a página se já estiver rolado
    handleScroll();


    // --- 3. Animação ao Rolar (Scroll Reveal para seções) ---
    const sections = document.querySelectorAll('section'); // Seleciona todas as seções

    const revealSection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { // Se a seção estiver visível na viewport
                entry.target.style.opacity = 1; // Torna visível
                entry.target.style.transform = 'translateY(0)'; // Remove a translação
                observer.unobserve(entry.target); // Deixa de observar essa seção
            }
        });
    };

    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null, // Observa a viewport
        threshold: 0.15, // A seção é considerada visível quando 15% dela está na viewport
        rootMargin: '-50px' // Começa a revelar um pouco antes de chegar no topo
    });

    sections.forEach(section => {
        section.style.opacity = 0; // Inicializa as seções como invisíveis
        section.style.transform = 'translateY(50px)'; // Inicializa as seções um pouco para baixo
        section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out'; // Adiciona transição
        sectionObserver.observe(section); // Começa a observar cada seção
    });

    // --- 4. Validação Básica de Formulário de Contato ---
    const contactForm = document.querySelector('.form-contato');
    if (contactForm) { // Verifica se o formulário existe na página
        contactForm.addEventListener('submit', function(e) {
            const nomeInput = document.getElementById('nome');
            const emailInput = document.getElementById('email');
            const mensagemInput = document.getElementById('mensagem');

            // Remove mensagens de erro anteriores
            const existingErrors = contactForm.querySelectorAll('.error-message');
            existingErrors.forEach(err => err.remove());

            let hasError = false;

            // Validação do campo Nome
            if (nomeInput.value.trim() === '') {
                displayError(nomeInput, 'Por favor, digite seu nome.');
                hasError = true;
            }

            // Validação do campo E-mail
            if (emailInput.value.trim() === '') {
                displayError(emailInput, 'Por favor, digite seu e-mail.');
                hasError = true;
            } else if (!isValidEmail(emailInput.value.trim())) {
                displayError(emailInput, 'Por favor, digite um e-mail válido.');
                hasError = true;
            }

            // Validação do campo Mensagem
            if (mensagemInput.value.trim() === '') {
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