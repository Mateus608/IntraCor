const mysql = require('mysql2')

const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Mat@ti9674',
    database: 'quoteflex'
})

conexao.connect((err)=>{
    if (err) throw err
    console.log('Conectado ao Mysql!')
})

module.exports = conexao