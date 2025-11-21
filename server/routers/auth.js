const express = require('express')
const router = express.Router()
const db = require('../db')
const crypto = require('crypto');


router.get('/',(req,res)=>{
    res.render('login');
})

router.post('/login', (req, res) => {
    const { usuario,  senha } = req.body;
    
    let senha_hash = senha; 

    if (senha_hash) {
        senha_hash = crypto
            .createHash('md5')
            .update(senha_hash)
            .digest('hex');
    }
    
    const query = `
       select us.cd_usu_bd
            , tau.descr     descr_tpacessusu 
         from usuario       us
            , tp_acesso_usu tau
        where us.tpacessusu_id = tau.tpacessusu_id
          and us.cd_usu_bd     = ?
          and us.senha         = ?
    `;

    db.query(query, [usuario, senha_hash], (err, results) => {
        if (err) throw err;
        
        if (results.length > 0) {
           const user = results[0];

           req.session.usuario = user.cd_usu_bd;
           
           req.session.nivel = user.descr_tpacessusu.toLowerCase();

           db.query(
                'INSERT INTO auditoria_logs (usuario, acao, timestamp) VALUES (?, ?, NOW())',
                [user.cd_usu_bd, 'login'],
                (logErr) => {
                    if (logErr) console.error("Erro ao registrar log de login:", logErr);
                    res.redirect('/clientes');  
                }
            );
           // --- FIM DA LÓGICA DE SESSÃO ---

        } else {
            res.render('login', { erro: 'Usuário ou senha inválidos' });
        }
    });
});

router.get('/logout', (req, res) => {
    
    const usuario = req.session.usuario;

    if (usuario) {
        db.query(
            'INSERT INTO auditoria_logs (usuario, acao, timestamp) VALUES (?, ?, NOW())',
            [usuario, 'logout'],
            (logErr) => {
                if (logErr) console.error("Erro ao registrar log:", logErr);

                req.session.destroy(() => {
                    res.redirect('/');
                });
            }
        );
    } else {
        res.redirect('/');
    }
});


module.exports = router