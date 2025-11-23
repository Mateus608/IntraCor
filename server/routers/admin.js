const express = require('express');
const router = express.Router();
const db = require('../db'); 
const { isAdmin } = require('../middleware/auth'); 
const util = require('util');

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

router.get('/relatorio/gerar', isAdmin, async (req, res) => {
    const { dataInicio, dataFim } = req.query;
    const query = util.promisify(db.query).bind(db);

    try {
        // --- CONSULTA 1: TOTAIS (Cards do topo) ---
        // Soma o prêmio total e conta as apólices no período
        const sqlResumo = `
            SELECT 
                COUNT(*) as totalApolices,
                SUM(premio_total) as totalPremios,
                COUNT(DISTINCT cliente_id) as totalClientes
            FROM apolice
            WHERE dt_incl BETWEEN ? AND ?
        `;
        const resultResumo = await query(sqlResumo, [dataInicio, dataFim]);
        
        const resumo = {
            totalClientes: resultResumo[0].totalClientes || 0,
            totalApolices: resultResumo[0].totalApolices || 0,
            totalPremios: (resultResumo[0].totalPremios || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        };

        // --- CONSULTA 2: RANKING DE CORRETORES ---
        // Agrupa por usuário (corretor) e soma o valor vendido
        const sqlRanking = `
            SELECT 
                u.nome, 
                COUNT(a.apolice_id) as qtd, 
                SUM(a.premio_total) as valor
            FROM apolice a
            INNER JOIN usuario u ON a.usuario_id = u.usuario_id
            WHERE a.dt_incl BETWEEN ? AND ?
            GROUP BY u.nome
            ORDER BY valor DESC
            LIMIT 5
        `;
        const resultRanking = await query(sqlRanking, [dataInicio, dataFim]);
        
        const ranking = resultRanking.map(r => ({
            nome: r.nome,
            qtd: r.qtd,
            valor: r.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        }));

        // --- CONSULTA 3: DETALHAMENTO (Tabela grande) ---
        // Traz os dados completos juntando com Cliente e Usuário
        const sqlDetalhes = `
            SELECT 
                DATE_FORMAT(a.dt_incl, '%d/%m/%Y') as data,
                c.nome as cliente,
                a.nro as apolice,
                a.ramoapolic_id as ramo, 
                u.nome as corretor
            FROM apolice a
            INNER JOIN v_clientes c ON a.cliente_id = c.cliente_id
            INNER JOIN usuario u ON a.usuario_id = u.usuario_id
            WHERE a.dt_incl BETWEEN ? AND ?
            ORDER BY a.dt_incl DESC
        `;
        const detalhes = await query(sqlDetalhes, [dataInicio, dataFim]);

        res.render('relatorio-impressao', {
            layout: false,
            dataInicio: new Date(dataInicio).toLocaleDateString('pt-BR'),
            dataFim: new Date(dataFim).toLocaleDateString('pt-BR'),
            resumo,
            ranking,
            detalhes
        });

    } catch (err) {
        console.error('Erro ao gerar relatório:', err);
        res.status(500).send("Erro ao gerar relatório no banco de dados.");
    }
});

module.exports = router;