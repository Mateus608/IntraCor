const express = require('express')
const router = express.Router()
const db = require('../db')

router.post('/incCliente', (req, res) => {
    // Insere pessoa
    const { 
        nome, 
        cpf, 
        telefone,
        dt_nasc,
        email,
        descr_ender, 
        bairro_ender, 
        nro_ender, 
        cidade_id, 
        profissao,
        usuprep_id,
        greconomico_id,
        obs
    } = req.body;

    if (!nome) {
        return res.status(400).json({
            success: false,
            error: 'Nome é obrigatório'
        });
    }

    const queryPessoa = 'CALL pk_inc_pessoa(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    
    // Converter data se necessário (DD/MM/AAAA para AAAA-MM-DD)
    let dtNascMask = dt_nasc;
    if (dt_nasc && dt_nasc.includes('/')) {
        const partes = dt_nasc.split('/');
        if (partes.length === 3) {
            dtNascMask = `${partes[2]}-${partes[1]}-${partes[0]}`;
        }
    }
    const paramsPessoa = [
        nome, 
        cpf || null,
        null,  
        null,
        null,
        descr_ender || null, 
        bairro_ender || null, 
        telefone || null,
        email || null,
        nro_ender || null, 
        cidade_id || null,
        dtNascMask || null
    ];

    db.execute(queryPessoa, paramsPessoa, (errorPessoa) => {
        if (errorPessoa) {
            console.error('Erro ao cadastrar pessoa: ', errorPessoa);
            db.rollback;
            return res.status(500).json({ 
                success: false,
                error: 'Erro ao cadastrar pessoa!',
                details: errorPessoa.message
                
            });
            
        }

        const queryGetPessoa = 'SELECT fkg_pessoa_id(?) as pessoa_id';
        
        db.execute(queryGetPessoa, [nome], (errorGetPessoa, results) => {
            if (errorGetPessoa) {
                console.error('Erro ao capturar pessoa: ', errorGetPessoa);
                db.rollback;
                return res.status(500).json({ 
                    success: false,
                    error: 'Erro ao capturar pessoa!',
                    details: errorGetPessoa.message
                });
            }

            const pessoa_id = results[0].pessoa_id;

            if (!pessoa_id || pessoa_id === 0) {
                console.error('Nenhum resultado encontrado. Verifique!');
                db.rollback;
                return res.status(500).json({
                    success: false,
                    error: 'Erro ao capturar pessoa!'
                });
            }

            //inserir cliente
            const queryCliente = 'CALL pk_inc_cliente(?, ?, ?, ?, ?)';
            
            const paramsCliente = [
                pessoa_id, 
                profissao || null, 
                usuprep_id || null, 
                greconomico_id || null,
                obs || null
            ];

            db.execute(queryCliente, paramsCliente, (errorCliente, resultsCliente) => {
                if (errorCliente) {
                    db.rollback;
                    console.error('Erro ao cadastrar cliente: ', errorCliente);
                    return res.status(500).json({ 
                        success: false,
                        error: 'Erro ao salvar cliente no banco de dados',
                        details: errorCliente.message
                    });
                }

                res.json({
                    success: true,
                    message: 'Cliente salvo com sucesso',
                    pessoa_id: pessoa_id,
                    cliente_id: resultsCliente.insertId
                });
            });
        });
    });
});

router.get('/getGrEconomico', (req, res) => {
    const query = `select ge.descr
                        , ge.greconomico_id
                     from grupo_economico ge`;
    
    db.execute(query, (error, results) => {
        if (error) {
            console.error('Erro ao buscar grupos economicos: ', error);
            return res.status(500).json({ 
                error: 'Erro ao buscar grupos economicos no banco de dados',
                details: error.message
            });
        }

        res.json({
            success: true,
            grEconomicos: Array.isArray(results) ? results : []
        });
    });
});

router.get('/getCidade', (req, res) => {
    const query = `select CONCAT(ci.nome, ' - ', ci.uf ) descr_cidade
                        , ci.cidade_id
                     from cidade ci
                    order by ci.nome`;
    
    db.execute(query, (error, results) => {
        if (error) {
            console.error('Erro ao buscar cidades: ', error);
            return res.status(500).json({ 
                error: 'Erro ao buscar cidades no banco de dados',
                details: error.message
            });
        }

        res.json({
            success: true,
            cidades: Array.isArray(results) ? results : []
        });
    });
});


module.exports = router