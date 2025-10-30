const express = require('express')
const router = express.Router()
const db = require('../db')

router.get('/', (req, res) => {
    const query = 'SELECT vc.pessoa_id, vc.nome, vc.descr, vc.cnpj, vc.cpf, vc.cliente_id FROM v_clientes vc';
    
    db.execute(query, (error, results) => {
        if (error) {
            console.error('Erro ao buscar dados da view:', error);
            return res.status(500).render('error', { 
                message: 'Erro ao carregar dados dos clientes' 
            });
        }

        const clientesFormatados = results.map(cliente => ({
            nome: cliente.nome,
            meio_comunic: cliente.descr,
            cpf: cliente.cpf,
            cnpj: cliente.cnpj,
            cliente_id: cliente.cliente_id
        }));

        res.render('dashboard', {
            clientes: clientesFormatados,
            title: 'Clientes - Intracor',
            usuario: req.session.usuario,
            nivel: req.session.nivel
        });
    });
});

router.get('/apolices',(req,res)=>{
    res.render('apolices',{
        usuario: req.session.usuario,
        nivel: req.session.nivel
    })
})

router.get('/apolices/nova', (req, res) => {
    res.render('inclusao-apolice', { 
        usuario: req.session.usuario,
        nivel: req.session.nivel
    });
});

router.get('/endossos', (req, res) => {
    res.render('endossos', {
        usuario: req.session.usuario,
        nivel: req.session.nivel
    });
});

router.get('/sinistros', (req, res) => {
    res.render('sinistros', {
        usuario: req.session.usuario,
        nivel: req.session.nivel
    });
});

router.get('/clientes/incluir', (req, res) => {
    res.render('inclusao-cliente', { // Nome do novo arquivo EJS
        usuario: req.session.usuario,
        nivel: req.session.nivel
    });
});

module.exports = router