const express = require('express');
const router = express.Router();
const db = require('../db'); 
const { isAdmin } = require('../middleware/auth'); 

router.get('/painel', isAdmin, (req, res) => { 

    res.render('painel-admin', { 
        usuario: req.session.usuario,
        nivel: req.session.nivel
    });
});

router.get('/getLogsAuditoria', (req, res) => {
    const query = `select va.usuario
                        , va.acao
                        , va.dt_ref
                     from v_auditorialogs va`;
    
    db.execute(query, (error, results) => {
        if (error) {
            console.error('Erro ao buscar dados da view:', error);
            return res.status(500).json({ 
                success: false,
                error: 'Erro ao carregar dados dos logs de auditoria',
                details: error.message
            });
        }

        const auditoriaLogsFormatado = results.map(logs => ({
            usuario: logs.usuario.toUpperCase(),
            acao: logs.acao,
            dt_ref: logs.dt_ref
        }));

        res.json({
            success: true,
            logsAuditoria: auditoriaLogsFormatado
        });
    });
});

module.exports = router;