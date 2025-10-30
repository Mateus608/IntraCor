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

module.exports = router