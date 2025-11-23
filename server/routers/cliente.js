const express = require('express')
const router = express.Router()
const db = require('../db')
const validarCPF = require('../middleware/validarCpf')


router.get('/', (req, res) => {
    res.render('clientes', {
        usuario: req.session.usuario,
        nivel: req.session.nivel
    });
});

router.get('/incluir', (req, res) => {
    res.render('inclusao-cliente', {
        usuario: req.session.usuario,
        nivel: req.session.nivel
    });
});

router.get('/alterar/:cliente_id', (req, res) => {
    res.render('inclusao-cliente', {
        cliente_id: req.params.cliente_id,
        usuario: req.session.usuario,
        nivel: req.session.nivel
    });
});


router.get('/getClientes', (req, res) => {
    const query = 'SELECT vc.pessoa_id, vc.nome, vc.email, vc.telefone, vc.cpf, vc.cliente_id, vc.preposto_clie FROM v_clientes vc';
    
    db.execute(query, (error, results) => {
        if (error) {
            console.error('Erro ao buscar dados da view:', error);
            return res.status(500).json({ 
                success: false,
                error: 'Erro ao carregar dados dos clientes',
                details: error.message
            });
        }

        const clientesFormatados = results.map(cliente => ({
            nome: cliente.nome,
            email: cliente.email,
            telefone: cliente.telefone,
            cpf: cliente.cpf,
            cliente_id: cliente.cliente_id,
            preposto_clie: cliente.preposto_clie
        }));

        res.json({
            success: true,
            clientes: clientesFormatados
        });
    });
});

router.get('/getCliente/:cliente_id', (req, res) => {
    const { cliente_id } = req.params;
    
    const query = `SELECT vc.pessoa_id
                        , vc.nome
                        , vc.email
                        , vc.telefone
                        , vc.cpf
                        , vc.dt_nasc
                        , vc.cliente_id
                        , vc.preposto_clie
                        , vc.usuprep_id
                        , vc.profissao
                        , vc.greconomico_id
                        , vc.obs
                        , vc.descr_ender
                        , vc.nro_ender
                        , vc.bairro_ender
                        , vc.cidade_id 
                     FROM v_clientes vc
                    WHERE vc.princ      = 1
                      and vc.cliente_id = ?`;
    
    db.execute(query, [cliente_id], (error, results) => {
        if (error) {
            console.error('Erro ao buscar dados do cliente:', error);
            return res.status(500).json({ 
                success: false,
                error: 'Erro ao carregar dados do cliente',
                details: error.message
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Cliente não encontrado'
            });
        }

        const cliente = results[0];
        
        dtnasc_mask = cliente.dt_mask;
        const clienteFormatado = {
            nome: cliente.nome,
            email: cliente.email,
            telefone: cliente.telefone,
            cpf: cliente.cpf,
            usuprep_id: cliente.usuprep_id,
            profissao: cliente.profissao,
            greconomico_id: cliente.greconomico_id,
            obs: cliente.obs,
            descr_ender: cliente.descr_ender,
            nro_ender: cliente.nro_ender,
            bairro_ender: cliente.bairro_ender,
            cidade_id: cliente.cidade_id,
            dt_nasc: cliente.dt_nasc
        };

        res.json({
            success: true,
            cliente: clienteFormatado
        });
    });
});

router.post('/incluir', validarCPF, (req, res) => {
    const { 
        nome, 
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
        obs,
    } = req.body;

    const cpfValidado = req.cpfValidado;
    const cpfNumerico = req.cpfNumerico;

    if (!nome) {
        return res.status(400).json({
            success: false,
            error: 'Nome é obrigatório'
        });
    }
    
    const queryPessoa = 'CALL pk_inc_pessoa(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    
    let dtNascMask = dt_nasc;
    if (dt_nasc && dt_nasc.includes('/')) {
        const partes = dt_nasc.split('/');
        if (partes.length === 3) {
            dtNascMask = `${partes[2]}-${partes[1]}-${partes[0]}`;
        }
    }
    
    const paramsPessoa = [
        nome, 
        cpfNumerico,
        null,  
        null,
        null,
        descr_ender    || null, 
        bairro_ender   || null, 
        telefone       || null,
        email          || null,
        nro_ender      || null, 
        cidade_id      || null,
        dtNascMask     || null,
    ];

    db.execute(queryPessoa, paramsPessoa, (errorPessoa) => {
        if (errorPessoa) {
            db.rollback();
            console.error('Erro ao cadastrar pessoa: ', errorPessoa);
            return res.status(500).json({ 
                success: false,
                error: 'Erro ao cadastrar pessoa!',
                details: errorPessoa.message
            });
        }

        const queryGetPessoa = 'SELECT fkg_pessoa_id(?) as pessoa_id';
        
        db.execute(queryGetPessoa, [nome], (errorGetPessoa, results) => {
            if (errorGetPessoa) {
                db.rollback();
                console.error('Erro ao capturar pessoa: ', errorGetPessoa);
                return res.status(500).json({ 
                    success: false,
                    error: 'Erro ao capturar pessoa!',
                    details: errorGetPessoa.message
                });
            }

            const pessoa_id = results[0].pessoa_id;

            if (!pessoa_id || pessoa_id === 0) {
                db.rollback();
                console.error('Nenhum resultado encontrado. Verifique!');
                return res.status(500).json({
                    success: false,
                    error: 'Erro ao capturar pessoa!'
                });
            }

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
                    db.rollback();
                    console.error('Erro ao cadastrar cliente: ', errorCliente);
                    return res.status(500).json({ 
                        success: false,
                        error: 'Erro ao salvar cliente no banco de dados',
                        details: errorCliente.message
                    });
                    
                }

                const usu_session = req.session.usuario;

                db.query(
                    'INSERT INTO auditoria_logs (usuario, acao, timestamp) VALUES (?, ?, NOW())',
                    [usu_session, `Cadastrou Cliente: ${req.body.nome}`],
                    (logErr) => {
                        if (logErr) {
                            console.error("Erro ao registrar log de cadastro de Cliente: ", logErr);
                        }
                        
                        res.json({
                            success: true,
                            message: 'Cliente cadastrado com sucesso'
                        });
                    }
                );
            });
        });
    });
});

router.put('/atlzCliente', validarCPF, (req, res) => {
   
   const { 
        nome, 
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
        obs,
        cliente_id
    } = req.body;
    

    const cpfValidado = req.cpfValidado;
    const cpfNumerico = req.cpfNumerico;
    
    if (!req.cpfValidado) {
        return res.status(400).json({
            success: false,
            message: 'CPF não foi validado corretamente'
        });
    }
    
    let dtNascMask = dt_nasc;
    if (dt_nasc && dt_nasc.includes('/')) {
        const partes = dt_nasc.split('/');
        if (partes.length === 3) {
            dtNascMask = `${partes[2]}-${partes[1]}-${partes[0]}`;
        }
    }

    const paramCliente = [
                       cliente_id,
                       telefone,
                       cpfNumerico,
                       usuprep_id,
                       email,
                       profissao,
                       nome,
                       descr_ender,
                       obs,
                       dtNascMask,
                       greconomico_id,
                       nro_ender,
                       bairro_ender,
                       cidade_id
                       ];
    
    query = `CALL pk_alt_cliente(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
   
    db.execute(query, paramCliente, (error, results ) => {
        if (error) {
            db.rollback;
            console.error('Erro ao atualizar cliente. Verifique!', error);
            return res.status(500).json({ 
             success: false,
             error: 'Erro ao atualizar cliente. Verifique!',
             details: error.message
            });
        }

        //Insere Log_Auditoria
        const usu_session = req.session.usuario;

        db.query(
            'INSERT INTO auditoria_logs (usuario, acao, timestamp) VALUES (?, ?, NOW())',
            [usu_session, `Alterou cliente: ${req.body.nome}`],
            (logErr) => {
                if (logErr) console.error("Erro ao registrar log de alteração de cliente: ", logErr); 
            }
        );

        res.json({
            success: true,
            message: 'Cliente alterado com sucesso'
        });
   });

});

router.put('/excluir', (req, res ) => {
   const cliente_id = req.body.clienteId;
   
   queryPessoaId = `select pe.pessoa_id
                      from pessoa  pe
                         , cliente cl
                     where pe.pessoa_id = cl.pessoa_id
                       and cl.cliente_id = ?`

   db.execute(queryPessoaId, [cliente_id], (erroPessoaId, resultsPessoaId) => {
        if (erroPessoaId){
            db.rollback();
            console.error('Erro ao buscar pessoa id. Verifique!', erroPessoaId);
            return res.status(500).json({ 
                success: false,
                error: 'Erro ao buscar pessoa_id. Verifique!',
                details: error.message
            });
        }

        const pessoaId = resultsPessoaId[0].pessoa_id;

        const queryPf = `Delete from pf 
                          where pf.pessoa_id = ?`

        db.execute(queryPf, [pessoaId], (erroPf, resultsPf) => {
            if (erroPf){
                db.rollback();
                console.error('Erro ao excluir pf. Verifique!', erroPf);
                return res.status(500).json({ 
                    success: false,
                    error: 'Erro ao excluir pf. Verifique!',
                    details: error.message
                });
            }
        });

        const queryMeioComunic = `Delete from meio_comunic mc 
                                        where mc.pessoa_id = ?`

        db.execute(queryMeioComunic, [pessoaId], (erroMeioComunic, resultsMeioComunic) => {
            if (erroMeioComunic){
                db.rollback();
                console.error('Erro ao excluir meio de comunicação. Verifique!', erroMeioComunic);
                return res.status(500).json({ 
                    success: false,
                    error: 'Erro ao excluir meio de comunicação. Verifique!',
                    details: error.message
                });
            }
        });

        const queryEndereco= `Delete from endereco en 
                                        where en.pessoa_id = ?`

        db.execute(queryEndereco, [pessoaId], (erroEndereco, resultsEndereco) => {
            if (erroEndereco){
                db.rollback();
                console.error('Erro ao excluir endereço. Verifique!', erroEndereco);
                return res.status(500).json({ 
                    success: false,
                    error: 'Erro ao excluir Endereço. Verifique!',
                    details: error.message
                });
            }
        });

        const queryCliente= `Delete from cliente cl 
                                        where cl.pessoa_id = ?`

        db.execute(queryCliente, [pessoaId], (erroCliente, resultsCliente) => {
            if (erroCliente){
                db.rollback();
                console.error('Erro ao excluir cliente. Verifique!', erroCliente);
                return res.status(500).json({ 
                    success: false,
                    error: 'Erro ao excluir Cliente. Verifique!',
                    details: error.message
                });
            }
        });

        const queryPessoa = `Delete from pessoa pe 
                                        where pe.pessoa_id = ?`

        db.execute(queryPessoa, [pessoaId], (erroPessoa, resultsPessoa) => {
            if (erroPessoa){
                db.rollback();
                console.error('Erro ao excluir pessoa. Verifique!', erroPessoa);
                return res.status(500).json({ 
                    success: false,
                    error: 'Erro ao excluir pessoa. Verifique!',
                    details: error.message
                });
            }

            //Insere Log_Auditoria
            const usu_session = req.session.usuario;

            db.query(
                'INSERT INTO auditoria_logs (usuario, acao, timestamp) VALUES (?, ?, NOW())',
                [usu_session, `Excluiu cliente: ${cliente_id} `],
                (logErr) => {
                    if (logErr) console.error("Erro ao registrar log de exclusão de cliente: ", logErr); 
                }
            );

            res.json({
                success: true,
                message: 'Cliente excluído com sucesso'
            });
        });
    });
});

// ===== ROTAS AUXILIARES =====

//marcaveic_modeloveic
router.get('/getMarcaModelVeic', (req, res) => {
    const query = `select mm.mrcmdveic_id
                        , CONCAT(mov.descr, ' ( ', mv.descr, ' ) ' ) descr_marcmodel 
                     from marcaveic_modeloveic mm
                        , marca_veic           mv
                        , modelo_veic          mov
                    where mm.marcaveic_id   = mv.marcaveic_id
                      and mm.modeloveic_id  = mov.modelveic_id
                    order by mv.descr`;
    
    db.execute(query, (error, results) => {
        if (error) {
            console.error('Erro ao buscar dados:', error);
            return res.status(500).json({ 
                success: false,
                error: 'Erro ao carregar dados de marca e modelo veículos.',
                details: error.message
            });
        }

        const marcaModelFormatados = results.map(marcModelVeic => ({
            descr: marcModelVeic.descr_marcmodel,
            mrcmdveic_id: marcModelVeic.mrcmdveic_id
        }));

        res.json({
            success: true,
            marcModelsVeic: marcaModelFormatados
        });
    });
});

//veiculo.tpcombust
router.get('/getTpCombust', (req, res) => {
    const query = `select do.descr
                        , do.vlr
                     from dominio do
                    where do.dominio = 'VEICULO.TP_COMBUST'
                    order by do.descr`;
    
    db.execute(query, (error, results) => {
        if (error) {
            console.error('Erro ao buscar dados da view:', error);
            return res.status(500).json({ 
                success: false,
                error: 'Erro ao carregar dados de tipo de combustiveís',
                details: error.message
            });
        }

        const tpCombustFormatados = results.map(tpCombust => ({
            descr: tpCombust.descr,
            vlr: tpCombust.vlr
        }));

        res.json({
            success: true,
            tpCombust: tpCombustFormatados
        });
    });
});

router.get('/getGrEconomico', (req, res) => {
    const query = `SELECT ge.descr, ge.greconomico_id FROM grupo_economico ge`;
    
    db.execute(query, (error, results) => {
        if (error) {
            console.error('Erro ao buscar grupos economicos: ', error);
            return res.status(500).json({ 
                success: false,
                error: 'Erro ao buscar grupos economicos',
                details: error.message
            });
        }

        res.json({
            success: true,
            grEconomicos: Array.isArray(results) ? results : []
        });
    });
});

router.get('/getCidades', (req, res) => {
    const query = `SELECT CONCAT(ci.nome, ' - ', ci.uf ) as descr_cidade, ci.cidade_id 
                   FROM cidade ci 
                   ORDER BY ci.nome`;
    
    db.execute(query, (error, results) => {
        if (error) {
            console.error('Erro ao buscar cidades: ', error);
            return res.status(500).json({ 
                success: false,
                error: 'Erro ao buscar cidades',
                details: error.message
            });
        }

        res.json({
            success: true,
            cidades: Array.isArray(results) ? results : []
        });
    });
});

module.exports = router;