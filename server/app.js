const express = require('express');
const path = require('path');
const session = require('express-session');
const app = express();
const adminRouter = require('./routers/admin'); 
const authRouter = require('./routers/auth');
const dashboardRouter = require('./routers/dashboard');
const usuariosRouter = require('./routers/usuario');
const clienteRouter  = require('./routers/cliente');
const apolicesRouter = require('./routers/apolice');
const endossosRouter = require('./routers/endosso');
const veiculosRouter = require('./routers/veiculo');
const enderecoRouter = require('./routers/endereco');

app.listen(4040, ()=>{
    console.log('Servidor inicializado em http://localhost:4040')
})

app.set('view engine' ,'ejs')
app.set('views', path.join(__dirname, '../renderer/views'))

app.use(express.json())
app.use(express.static(path.join(__dirname, '../renderer/public')))
app.use('/uploads', express.static(path.join(__dirname, '../renderer/public/uploads')));
app.use(express.urlencoded({extended: false}))

app.use(session({
    secret: 'segredo-super-seguro',
    resave: false,
    saveUninitialized: false,
}))

// ROTAS

app.use('/', authRouter);

//usuario
app.use('/usuario', usuariosRouter);

//cliente
app.use('/clientes', clienteRouter);

// dashboard
app.use('/dashboard', dashboardRouter);

// admin
app.use('/admin', adminRouter); 

// apolice
app.use('/apolices', apolicesRouter);

//veiculo
app.use('/veiculos', veiculosRouter);

//endossos
app.use('/endossos', endossosRouter);

//enderecos
app.use('/enderecos', enderecoRouter);
