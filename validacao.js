document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contatoForm');
    
    form.addEventListener('submit', function(event) {
        
        event.preventDefault();
        
        if (validarFormulario()) {

            alert('Mensagem enviada com sucesso!');
            
            form.reset();
        }
    });

    function validarFormulario() {
        
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensagem = document.getElementById('mensagem').value.trim();
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        let isValido = true;
        let mensagensErro = [];

    
        if (nome === '') {
            mensagensErro.push('O campo Nome completo é obrigatório.');
            isValido = false;
        }

        
        if (email === '') {
            mensagensErro.push('O campo Email é obrigatório.');
            isValido = false;
        } else if (!emailRegex.test(email)) {
            mensagensErro.push('Por favor, insira um endereço de email válido.');
            isValido = false;
        }

        if (mensagem === '') {
            mensagensErro.push('O campo Mensagem é obrigatório.');
            isValido = false;
        }

        if (!isValido) {
            alert('Erro(s) de Validação:\n\n' + mensagensErro.join('\n'));
        }
        
        return isValido;
    }
});