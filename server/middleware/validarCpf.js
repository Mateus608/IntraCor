
const ValidadorCPF = require('../middleware/validadorCPF');


const validarCPF = (req, res, next) => {
    /*console.log('=== DEBUG VALIDAR CPF ===');
    console.log('Método:', req.method);
    console.log('URL:', req.url);
    console.log('Body completo:', JSON.stringify(req.body, null, 2));
    console.log('CPF no body:', req.body?.cpf);
    console.log('Tipo do CPF:', typeof req.body?.cpf);
    */
    let cpf = req.body?.cpf || req.query?.cpf || req.headers?.['x-cpf'];
    
    console.log('CPF encontrado:', cpf);
    
    if (!cpf) {
        console.log('❌ ERRO: CPF não encontrado');
        return res.status(400).json({
            success: false,
            message: 'CPF é obrigatório'
        });
    }

    console.log('CPF recebido:', cpf);

    const cpfLimpo = ValidadorCPF.limparCPF(cpf);
    
    console.log('CPF limpo:', cpfLimpo);

    if (!ValidadorCPF.validarCPF(cpfLimpo)) {
        console.log('❌ ERRO: CPF inválido na validação');
        return res.status(400).json({
            success: false,
            message: 'CPF inválido'
        });
    }

    console.log('✅ CPF válido!');
    
    req.cpfValidado = ValidadorCPF.formatarCPF(cpfLimpo);
    req.cpfNumerico = cpfLimpo;
    
    next();
};

module.exports = validarCPF;