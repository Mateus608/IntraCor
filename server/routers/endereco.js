const express = require('express')
const router = express.Router()
const db = require('../db')

// Rotas para endereços
router.get('/:cliente_id', (req, res) => {
    res.render('enderecos', {
        usuario: req.session.usuario,
        nivel: req.session.nivel,
        clienteId: req.params.clienteId
    });
});

router.get('/incluir/:cliente_id', (req, res) => { 
    res.render('inclusao-endereco', {
        usuario: req.session.usuario,
        nivel: req.session.nivel,
        clienteId: req.params.cliente_id
    });
});

router.get('/alterar/:endereco_id', (req, res) => {
    res.render('inclusao-endereco', {
        endereco_id: req.params.endereco_id,
        usuario: req.session.usuario,
        nivel: req.session.nivel
    });
});

router.post('/incluir', (req, res) => {
    const { 
        descr, 
        nro,
        bairro,
        cidade_id,
        cliente_id
    } = req.body;

    // Validações
    if (!descr) {
        return res.status(400).json({
            success: false,
            error: 'Endereço é obrigatório'
        });
    }

    if (!nro) {
        return res.status(400).json({
            success: false,
            error: 'Número é obrigatório'
        });
    }

    if (!bairro) {
        return res.status(400).json({
            success: false,
            error: 'Bairro é obrigatório'
        });
    }

    if (!cidade_id) {
        return res.status(400).json({
            success: false,
            error: 'Cidade é obrigatória'
        });
    }

    // Primeiro busca o pessoa_id do cliente
    const queryGetPessoaId = 'SELECT pessoa_id FROM cliente WHERE cliente_id = ?';
    
    db.execute(queryGetPessoaId, [cliente_id], (errorPessoa, resultsPessoa) => {
        if (errorPessoa) {
            console.error('Erro ao buscar pessoa_id:', errorPessoa);
            return res.status(500).json({ 
                success: false,
                error: 'Erro ao buscar dados do cliente!',
                details: errorPessoa.message
            });
        }

        if (!resultsPessoa || resultsPessoa.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Cliente não encontrado'
            });
        }

        const pessoa_id = resultsPessoa[0].pessoa_id;

        const queryEndereco = 'INSERT INTO endereco (descr, nro, bairro, cidade_id, pessoa_id, princ) VALUES (?, ?, ?, ?, ?, 0)';
        
        const paramsEndereco = [
            descr,
            nro,
            bairro,
            cidade_id,
            pessoa_id
        ];

        db.execute(queryEndereco, paramsEndereco, (errorEndereco, resultsEndereco) => {
            if (errorEndereco) {
                console.error('Erro ao cadastrar endereço:', errorEndereco);
                return res.status(500).json({ 
                    success: false,
                    error: 'Erro ao cadastrar endereço!',
                    details: errorEndereco.message
                });
            }

            const usu_session = req.session.usuario;
            const endereco_id = resultsEndereco.insertId;

            // Registrar log de auditoria
            db.query(
                'INSERT INTO auditoria_logs (usuario, acao, timestamp) VALUES (?, ?, NOW())',
                [usu_session, `Cadastrou Endereço ID: ${endereco_id} para o cliente ID: ${cliente_id}`],
                (logErr) => {
                    if (logErr) {
                        console.error("Erro ao registrar log de cadastro de Endereço: ", logErr);
                    }
                    
                    res.json({
                        success: true,
                        message: 'Endereço cadastrado com sucesso',
                        endereco_id: endereco_id
                    });
                }
            );
        });
    });
});

// Rota para alterar endereço
router.put('/alterar/:endereco_id', (req, res) => {
    const { 
        descr, 
        nro,
        bairro,
        cidade_id
    } = req.body;

    const endereco_id = req.params.endereco_id;

    // Validações
    if (!descr) {
        return res.status(400).json({
            success: false,
            error: 'Endereço é obrigatório'
        });
    }

    if (!nro) {
        return res.status(400).json({
            success: false,
            error: 'Número é obrigatório'
        });
    }

    if (!bairro) {
        return res.status(400).json({
            success: false,
            error: 'Bairro é obrigatório'
        });
    }

    if (!cidade_id) {
        return res.status(400).json({
            success: false,
            error: 'Cidade é obrigatória'
        });
    }

    const queryUpdateEndereco = `
        UPDATE endereco 
        SET descr = ?, 
            nro = ?, 
            bairro = ?, 
            cidade_id = ?
        WHERE endereco_id = ?
    `;
    
    const paramsUpdateEndereco = [
        descr,
        nro,
        bairro,
        cidade_id,
        endereco_id
    ];

    db.execute(queryUpdateEndereco, paramsUpdateEndereco, (error, results) => {
        if (error) {
            console.error('Erro ao atualizar endereço:', error);
            return res.status(500).json({ 
                success: false,
                error: 'Erro ao atualizar endereço!',
                details: error.message
            });
        }
    
        const usu_session = req.session.usuario;

        // Registrar log de auditoria
        db.query(
            'INSERT INTO auditoria_logs (usuario, acao, timestamp) VALUES (?, ?, NOW())',
            [usu_session, `Alterou Endereço ID: ${endereco_id}`],
            (logErr) => {
                if (logErr) {
                    console.error("Erro ao registrar log de alteração de Endereço: ", logErr);
                }
                
                res.json({
                    success: true,
                    message: 'Endereço alterado com sucesso',
                    endereco_id: endereco_id
                });
            }
        );
    });
});

router.get('/getEndereco/:endereco_id', (req, res) => {
    const { endereco_id } = req.params;
    
    const query = `SELECT e.endereco_id
                        , e.descr
                        , e.nro
                        , e.bairro
                        , e.cidade_id
                        , concat(c.nome, ' - ', c.uf) descr_cidade
                        , p.pessoa_id
                        , cl.cliente_id
                     FROM endereco e
                        , cidade c
                        , pessoa p
                        , cliente cl
                    WHERE e.cidade_id = c.cidade_id
                      AND e.pessoa_id = p.pessoa_id
                      AND p.pessoa_id = cl.pessoa_id
                      AND e.endereco_id = ?`;
    
    db.execute(query, [endereco_id], (error, results) => {
        if (error) {
            console.error('Erro ao buscar dados do endereço:', error);
            return res.status(500).json({ 
                success: false,
                error: 'Erro ao carregar dados do endereço',
                details: error.message
            });
        }

        if (!results || results.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Endereço não encontrado'
            });
        }

        const endereco = results[0];
        
        const enderecoFormatado = {
            endereco_id: endereco.endereco_id,
            descr: endereco.descr,
            nro: endereco.nro,
            bairro: endereco.bairro,
            cidade_id: endereco.cidade_id,
            descr_cidade: endereco.descr_cidade,
            pessoa_id: endereco.pessoa_id,
            cliente_id: endereco.cliente_id,
        };

        res.json({
            success: true,
            endereco: enderecoFormatado
        });
    });
});

// Rota para excluir endereço
router.put('/excluir', (req, res) => {
    const endereco_id = req.body.enderecoId;
   
    const queryDelEndereco = `DELETE FROM endereco WHERE endereco_id = ?`;

    db.execute(queryDelEndereco, [endereco_id], (erroEndereco, resultsEndereco) => {
        if (erroEndereco){
            console.error('Erro ao excluir endereço:', erroEndereco);
            return res.status(500).json({ 
                success: false,
                error: 'Erro ao excluir endereço!',
                details: erroEndereco.message
            });
        }

        const usu_session = req.session.usuario;

        db.query(
            'INSERT INTO auditoria_logs (usuario, acao, timestamp) VALUES (?, ?, NOW())',
            [usu_session, `Excluiu Endereço ID: ${endereco_id}`],
            (logErr) => {
                if (logErr) console.error("Erro ao registrar log de exclusão de endereço: ", logErr); 
                
                res.json({
                    success: true,
                    message: 'Endereço excluído com sucesso'
                });
            }
        );    
    });
});

router.get('/getEnderecos/:cliente_id', (req, res) => {
    const { cliente_id } = req.params;
    
    const query = `SELECT e.endereco_id
                        , e.descr
                        , e.nro
                        , e.bairro
                        , CONCAT(c.nome, ' - ', c.uf)   descr_cidade
                        , e.pessoa_id
                     FROM endereco e
                        , cidade c
                    WHERE e.cidade_id = c.cidade_id
                      AND e.pessoa_id = (SELECT pessoa_id FROM cliente WHERE cliente_id = ?)
                    order by e.descr`;
    
    db.execute(query, [cliente_id], (error, results) => {
        if (error) {
            console.error('Erro ao buscar dados dos endereços:', error);
            return res.status(500).json({ 
                success: false,
                error: 'Erro ao carregar dados dos endereços',
                details: error.message
            });
        }

        if (!results || results.length === 0) {
            return res.json({
                success: true,
                enderecos: [] 
            });
        }

        const enderecosFormatados = results.map(endereco => ({
            endereco_id: endereco.endereco_id,
            descr: endereco.descr,
            nro: endereco.nro,
            bairro: endereco.bairro,
            descr_cidade: endereco.descr_cidade,
            pessoa_id: endereco.pessoa_id,
        }));

        res.json({
            success: true,
            enderecos: enderecosFormatados
        });
    });
});

module.exports = router;