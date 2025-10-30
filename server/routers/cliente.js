const express = require('express')
const router = express.Router()
const db = require('../db')

router.post('/incCliente', (req, res) => {
    //insere pessoa
    const { nome, cpf, cnpj, descr_ender, bairro_ender, nro_ender, cidade_id, profissao }   = req.body;

    const cnpj_raiz   = cnpj.substring(0, 8).replace(/\D/g, '');

    const cnpj_filial = cnpj.substring(9, 12).replace(/\D/g, '');

    const cnpj_dv     = cnpj.substring(13, 14).replace(/\D/g, '');

    let query = 'CALL pk_inc_pessoa( ?, ?, ?, ?, ?, ?, ?, ?, ? )';
    
    db.execute(query, [ nome, cpf, cnpj_raiz, cnpj_filial, cnpj_dv, descr_ender, bairro_ender, nro_ender, cidade_id ], (error) => {
        if (error) {
            console.error('Erro ao cadastrar pessoa: ', error);
            return res.status(500).render('error', { 
                message: 'Erro ao cadastrar pessoa!' 
            });
        }
    });
    
    //insere cliente
    query = null;
    
    query = 'SELECT fkg_pessoa_id(?) as pessoa_id';

    db.execute(query, nome, (error, results) => {
        if (error) {
            console.error('Erro ao capturar pessoa: ', error);
            return res.status(500).render('error', { 
                message: 'Erro ao capturar pessoa!' 
            });
        }
    
        pessoa_id = results[0];

        if ( pessoa_id == 0 ){
            console.error( 'Nenhum resultado encontrado. Verifique!');
            return res.status(500).render('error', {
                message: 'Erro ao capturar pessoa!'
            })
        }
    });

    query = null;

    query = 'CALL pk_inc_cliente( ?, ?)';
    
    db.execute(query, [pessoa_id, profissao ], (error) => {
        if (error) {
            console.error('Erro ao cadastrar cliente: ', error);
            return res.status(500).render('error', { 
                message: 'Erro ao cadastrar cliente!' 
            });
        }

        res.render('dashboard', {
            usuario: req.session.usuario,
            nivel: req.session.nivel
        });
    });
});

module.exports = router