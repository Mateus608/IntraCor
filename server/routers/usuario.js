const express = require('express')
const router = express.Router()
const db = require('../db')
const { isAdmin } = require('../middleware/auth');

router.get('/', (req, res) => {
    res.render('usuario', {
        usuario: req.session.usuario,
        nivel: req.session.nivel
    });
});

router.get('/incluir', isAdmin, (req, res) => {
    res.render('inclusao-usuario', {
        usuario: req.session.usuario,
        nivel: req.session.nivel
    });
});

router.get('/alterar/:cliente_id', isAdmin, (req, res) => {
    res.render('inclusao-usuario', {
        usuario_id: req.params.usuario_id,
        usuario: req.session.usuario,
        nivel: req.session.nivel
    });
});

router.post('/incUsuario', (req, res) => {
    
    const { nome
          , cd_usu_bd
          , senha
          , tpacessusu_id
          , funcaousu_id
          , sit
          } = req.body
    
    const query = `CALL pk_inc_usuario( ?, ?, ?, ?, ?, ?);`
    
    db.execute(query,[nome, cd_usu_bd, senha, tpacessusu_id, funcaousu_id, sit], (error) => {
        if (error) {
            db.rollback;
            console.error('Erro ao cadastrar usuario: ', error);
            return res.status(500).render('error', { 
                message: 'Erro ao cadastrar usuario!' 
            });
        }

        //Insere Log_Auditoria
        const usu_session = req.session.usuario;

        db.query(
            'INSERT INTO auditoria_logs (usuario, acao, timestamp) VALUES (?, ?, NOW())',
            [usu_session, `Cadastrou usuário: ${req.body.nome}`],
            (logErr) => {
                if (logErr) {
                    console.error("Erro ao registrar log de inclusão de usuario: ", logErr);
                }
                
                res.json({
                    success: true,
                    message: 'Usuário cadastrado com sucesso'
                });
            }
        );

    });
});

router.put('/altUsuario', (req, res) => {
    
    const { nome
          , cd_usu_bd
          , senha
          , tpacessusu_id
          , funcaousu_id
          , sit
          , usuario_id 
          } = req.body
    
    const query = `CALL pk_alt_usuario(?, ?, ?, ?, ?, ?, ?)`;
    
    db.execute(query,[nome, cd_usu_bd, senha, tpacessusu_id, funcaousu_id, sit, usuario_id], (error) => {
        if (error) {
            console.error('Erro ao atualizar usuario: ', error);
            db.rollback;
            return res.status(500).render('error', { 
                message: 'Erro ao atualizar usuario!' 
            });
        }

        //Insere Log_Auditoria
        const usu_session = req.session.usuario;

        db.query(
            'INSERT INTO auditoria_logs (usuario, acao, timestamp) VALUES (?, ?, NOW())',
            [usu_session, `Alterou usuário: ${req.body.nome}`],
            (logErr) => {
                if (logErr) {
                    console.error("Erro ao registrar log de alteração de usuario: ", logErr);
                }
                
                res.json({
                    success: true,
                    message: 'Usuário alterado com sucesso'
                });
            }
        );
    
    });
});


router.put('/excluir', (req, res ) => {
   const usuario_id = req.body.usuario_id;
   
   console.log('usuario para excluir: ', usuario_id);
   
   const query = 'delete from usuario us where us.usuario_id = ?'

   db.execute(query, [usuario_id], (erroDelete, results) => {
       if (erroDelete){
           console.error('Erro ao excluir usuario. Verifique!', erroDelete);
           return res.status(500).json({ 
               success: false,
               error: 'Erro ao excluir usuario. Verifique!',
               details: error.message
            });
        }

        //Insere Log_Auditoria
        const usu_session = req.session.usuario;

        db.query(
            'INSERT INTO auditoria_logs (usuario, acao, timestamp) VALUES (?, ?, NOW())',
            [usu_session, `Excluiu usuário: ${usuario_id}`],
            (logErr) => {
                if (logErr) {
                    console.error("Erro ao registrar log de exclusão de usuario: ", logErr);
                }
                
                res.json({
                    success: true,
                    message: 'Usuário excluído com sucesso'
                });
            }
        );

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

router.get('/getUsuarios', (req, res) => {
    const query = `select vu.nome
                        , vu.usuario_id
                        , vu.cd_usu_bd
                        , vu.senha 
                        , vu.descr_funcaousu
                        , vu.descr_tpacessusu
                        , vu.tpacessusu_id
                        , vu.funcaousu_id
                     from v_usuarios vu`;
    
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

router.get('/getUsuario/:usuario_id', (req, res) => {
    const { usuario_id } = req.params;
    
    const query = `SELECT vu.nome
                        , vu.cd_usu_bd
                        , vu.tpacessusu_id
                        , vu.funcaousu_id
                        , vu.sit
                     FROM v_usuarios vu
                    WHERE vu.usuario_id = ?`;
    
    db.execute(query, [usuario_id], (error, results) => {
        if (error) {
            console.error('Erro ao buscar dados do usuario:', error);
            return res.status(500).json({ 
                success: false,
                error: 'Erro ao carregar dados do usuario',
                details: error.message
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Usuario não encontrado'
            });
        }

        const usuario = results[0];
        
        const usuarioFormatado = {
            nome: usuario.nome||null,
            cd_usu_bd: usuario.cd_usu_bd||null,
            tpacessusu_id: usuario.tpacessusu_id,
            funcaousu_id: usuario.funcaousu_id,
            sit: usuario.sit
        };

        res.json({
            success: true,
            usuario: usuarioFormatado
        });
    });
});

//req auxiliares
router.get('/getTpAcesso', (req, res) => {
    const query = `select tau.tpacessusu_id
                        , tau.descr
                     from tp_acesso_usu tau`;
    
    db.execute(query, (error, results) => {
        if (error) {
            console.error('Erro ao buscar dados da view:', error);
            return res.status(500).json({ 
                success: false,
                error: 'Erro ao carregar tipos de acesso',
                details: error.message
            });
        }

        const tpAcessoFormatado = results.map(tpAcesso => ({
            tpacessusu_id: tpAcesso.tpacessusu_id,
            descr: tpAcesso.descr
        }));

        res.json({
            success: true,
            tpsAcesso: tpAcessoFormatado
        });
    });
});


router.get('/getFuncaoUsu', (req, res) => {
    const query = `select fu.funcaousu_id
                        , fu.descr
                     from funcao_usu fu`;
    
    db.execute(query, (error, results) => {
        if (error) {
            console.error('Erro ao buscar dados da view:', error);
            return res.status(500).json({ 
                success: false,
                error: 'Erro ao carregar funções',
                details: error.message
            });
        }

        const funcaoFormatado = results.map(funcaoUsu => ({
            funcaousu_id: funcaoUsu.funcaousu_id,
            descr: funcaoUsu.descr
        }));

        res.json({
            success: true,
            funcaoUsu: funcaoFormatado
        });
    });
});

router.get('/getSit', (req, res) => {
    const query = `select do.descr
                        , do.vlr
                     from dominio do
                    where do.dominio = 'USUARIO.SIT'`;
    
    db.execute(query, (error, results) => {
        if (error) {
            console.error('Erro ao buscar dados da view:', error);
            return res.status(500).json({ 
                success: false,
                error: 'Erro ao carregar situação',
                details: error.message
            });
        }

        const dominioFormatado = results.map(dominio => ({
            vlr: dominio.vlr,
            descr: dominio.descr
        }));

        res.json({
            success: true,
            dominio: dominioFormatado
        });
    });
});

module.exports = router