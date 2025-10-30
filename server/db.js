const mysql = require('mysql2')

const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'quoteflex'
})

conexao.connect((err)=>{
    if (err) throw err
    console.log('Conectado ao Mysql!')
})

module.exports = conexao