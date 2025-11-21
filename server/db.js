const mysql = require('mysql2')
const path = require('path')

// Carrega o .env do diretório raiz do projeto
require('dotenv').config({ path: path.resolve(__dirname, '.env') })

// Verifica se as variáveis existem
const requiredEnvVars = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_DATABASE']
const missingVars = requiredEnvVars.filter(varName => !process.env[varName])

if (missingVars.length > 0) {
    console.error('Variáveis de ambiente faltando:', missingVars)
    throw new Error('Configure o arquivo .env com todas as variáveis necessárias')
}

const conexao = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: 3306,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

conexao.connect((err) => {
    if (err) {
        console.error('Erro ao conectar com o MySQL:', err.message)
        return
    }
    console.log('Conectado ao MySQL!')
})

module.exports = conexao