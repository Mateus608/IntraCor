const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
    res.render('endossos',{
        usuario: req.session.usuario,
        nivel: req.session.nivel
    })
})

router.get('/incluir', (req, res) => {
    res.render('inclusao-endosso', { 
        usuario: req.session.usuario,
        nivel: req.session.nivel
    });
});

module.exports = router