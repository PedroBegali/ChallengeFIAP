document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.formulario');
    const toggleButton = document.querySelector('#toggleSectionButton');
    const sectionToToggle = document.querySelector('#secaoParaEsconder');

    if (!form) return;

    function carregarDadosSalvos() {
        const nomeSalvo = localStorage.getItem('nome');
        const emailSalvo = sessionStorage.getItem('email');

        if (nomeSalvo) {
            document.querySelector('#nome').value = nomeSalvo;
        }
        if (emailSalvo) {
            document.querySelector('#email').value = emailSalvo;
        }
    }

    carregarDadosSalvos();

    if (toggleButton && sectionToToggle) {
        toggleButton.addEventListener('click', function() {
            if (sectionToToggle.style.display === 'none') {
                sectionToToggle.style.display = 'block';
                toggleButton.textContent = 'Esconder Seção Adicional';
            } else {
                sectionToToggle.style.display = 'none';
                toggleButton.textContent = 'Exibir Seção Adicional';
            }
        });
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const nome = document.querySelector('#nome');
        const email = document.querySelector('#email');
        const telefone = document.querySelector('#txtTel');
        const dataNascimento = document.querySelector('#dataNascimento');
        const mensagem = document.querySelector('#mensagem');
        const opcaoArmazenamento = document.querySelector('input[name="armazenamento"]:checked');

        const feedbackGeral = document.querySelector('#feedbackGeral');
        let formValido = true;
        let erros = [];

        function verificarPreenchimento(input, nomeCampo) {
            if (input.value.trim() === '') {
                erros.push(`O campo ${nomeCampo} é obrigatório.`);
                input.style.border = '2px solid red';
                formValido = false;
                alert(`Erro de validação: O campo ${nomeCampo} é obrigatório.`);
                return false;
            } else {
                input.style.border = '1px solid #ced4da';
                return true;
            }
        }

        function verificarEmailSimples(input) {
            if (input.value.trim().indexOf('@') === -1 || input.value.trim().indexOf('.') === -1) {
                erros.push('O email deve conter "@" e ".".');
                input.style.border = '2px solid red';
                formValido = false;
                alert('Erro de validação: O email deve conter "@" e ".".');
                return false;
            } else {
                input.style.border = '1px solid #ced4da';
                return true;
            }
        }


        verificarPreenchimento(nome, 'Nome Completo');

        if (verificarPreenchimento(email, 'Email')) {
            verificarEmailSimples(email);
        }

        verificarPreenchimento(dataNascimento, 'Data de Nascimento');

        verificarPreenchimento(mensagem, 'Mensagem');

        if (formValido) {
            feedbackGeral.innerHTML = '<p class="sucesso">Formulário enviado com sucesso! (Simulação)</p>';

            if (opcaoArmazenamento && opcaoArmazenamento.value === 'local') {
                localStorage.setItem('nome', nome.value.trim());
                localStorage.setItem('email', email.value.trim());
            } else if (opcaoArmazenamento && opcaoArmazenamento.value === 'session') {
                sessionStorage.setItem('nome', nome.value.trim());
                sessionStorage.setItem('email', email.value.trim());
            } else {
                localStorage.removeItem('nome');
                localStorage.removeItem('email');
                sessionStorage.removeItem('nome');
                sessionStorage.removeItem('email');
            }

        } else {
            feedbackGeral.innerHTML = '<p class="erro">Por favor, corrija os erros:</p><ul>' +
                erros.map(erro => `<li>${erro}</li>`).join('') +
                '</ul>';
        }
    });
});