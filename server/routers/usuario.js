const express = require('express')
const router = express.Router()
const db = require('../db')

router.post('/incUsuario', (req, res) => {
    
    const { nome, cd_usu_bd, senha, tpacessusu_id, funcaousu_id } = req.body
    
    const query = `CALL pk_inc_usuario( ?, ?, ?, ?, ?);`
    
    db.execute(query,[nome, cd_usu_bd, senha, tpacessusu_id, funcaousu_id], (error) => {
        if (error) {
            console.error('Erro ao cadastrar usuario: ', error);
            return res.status(500).render('error', { 
                message: 'Erro ao cadastrar usuario!' 
            });
        }

        res.render('painel-admin', {
            usuario: req.session.usuario,
            nivel: req.session.nivel
        });
    });
});

router.get('/getUsuList', (req, res) => {
    const query = `SELECT us.nome, us.usuario_id, us.cd_usu_bd, us.senha FROM usuario us where us.sit = 1 order by us.nome`;
    
    db.execute(query, (error, results) => {
        if (error) {
            console.error('Erro ao buscar usuarios: ', error);
            return res.status(500).json({ 
                error: 'Erro ao buscar usuários no banco de dados',
                details: error.message
            });
        }

        // Retorna JSON em vez de renderizar a view
        res.json({
            success: true,
            usuarios: Array.isArray(results) ? results : []
        });
    });
});

module.exports = router