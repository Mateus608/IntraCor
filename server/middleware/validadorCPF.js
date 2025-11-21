function limparCPF(cpf) {
    return cpf.replace(/\D/g, '');
}

function formatarCPF(cpf) {
    const cpfLimpo = limparCPF(cpf);
    return cpfLimpo.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

function validarCPF(cpf) {
    // Limpa o CPF
    const cpfLimpo = limparCPF(cpf);
    
    // Verifica se tem 11 dígitos
    if (cpfLimpo.length !== 11) {
        return false;
    }

    // Verifica se todos os dígitos são iguais (CPF inválido)
    if (/^(\d)\1+$/.test(cpfLimpo)) {
        return false;
    }

    // Calcula primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpfLimpo.charAt(i)) * (10 - i);
    }
    
    let resto = soma % 11;
    const digito1 = resto < 2 ? 0 : 11 - resto;

    // Verifica primeiro dígito
    if (digito1 !== parseInt(cpfLimpo.charAt(9))) {
        return false;
    }

    // Calcula segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpfLimpo.charAt(i)) * (11 - i);
    }
    
    resto = soma % 11;
    const digito2 = resto < 2 ? 0 : 11 - resto;

    // Verifica segundo dígito
    if (digito2 !== parseInt(cpfLimpo.charAt(10))) {
        return false;
    }

    return true;
}

function gerarCPFValido() {
    let cpf = '';
    
    // Gera 9 dígitos aleatórios
    for (let i = 0; i < 9; i++) {
        cpf += Math.floor(Math.random() * 10);
    }

    // Calcula primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    
    let resto = soma % 11;
    const digito1 = resto < 2 ? 0 : 11 - resto;
    cpf += digito1;

    // Calcula segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    
    resto = soma % 11;
    const digito2 = resto < 2 ? 0 : 11 - resto;
    cpf += digito2;

    return cpf;
}

// Exporta as funções
module.exports = {
    limparCPF,
    formatarCPF,
    validarCPF,
    gerarCPFValido
};