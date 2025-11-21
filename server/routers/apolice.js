const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
    res.render('apolices',{
        usuario: req.session.usuario,
        nivel: req.session.nivel
    })
})

router.get('/incluir', (req, res) => {
    res.render('inclusao-apolice', { 
        usuario: req.session.usuario,
        nivel: req.session.nivel
    });
});

module.exports = router