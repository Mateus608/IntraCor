const express = require('express');
const router = express.Router();
const db = require('../db'); 
const { isAdmin } = require('../middleware/auth'); 

// Rota principal do painel admin
router.get('/painel', isAdmin, (req, res) => { 
    
    // 1. Mock de dados para os LOGS
    const mockLogs = [
        { usuario: 'usuario.teste', acao: 'login', timestamp: new Date() },
        { usuario: 'usuario.teste', acao: 'Visualizou cliente "Leandro Teste"', timestamp: new Date(Date.now() - 1000 * 60 * 5) },
        { usuario: 'outro.usuario', acao: 'login', timestamp: new Date(Date.now() - 1000 * 60 * 15) },
        { usuario: 'usuario.teste', acao: 'logout', timestamp: new Date(Date.now() - 1000 * 60 * 30) }
    ];

    // 2. Mock de dados para os USUÁRIOS
    const mockUsers = [
        { usuario_id: 6, nome: 'Usuário Teste', cd_usu_bd: 'usuario.teste', nivel: 'admin' },
        { usuario_id: 7, nome: 'Outro Usuário', cd_usu_bd: 'outro.usuario', nivel: 'user' }
    ];

    // 3. Renderiza a nova página EJS e passa os dois mocks
    res.render('painel-admin', { // <-- MUDANÇA AQUI
        logs: mockLogs,
        users: mockUsers, // <-- NOVO DADO
        usuario: req.session.usuario,
        nivel: req.session.nivel
    });
});

router.get('/usuarios/novo', isAdmin, (req, res) => {
    // Apenas renderiza a nova página de formulário
    res.render('inclusao-usuario', {
        usuario: req.session.usuario,
        nivel: req.session.nivel
    });
});

module.exports = router;