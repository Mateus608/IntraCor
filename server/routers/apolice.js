const express = require('express')
const router = express.Router()
const db = require('../db')
const path = require('path')
const fs = require('fs')
const multer = require('multer')

const upload = multer({
    dest: path.join(process.cwd(), 'renderer/public/uploads/temp'), // pasta temporária
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['.pdf', '.jpg', '.jpeg', '.png', '.doc', '.docx'];
        const ext = path.extname(file.originalname).toLowerCase();
        
        if (allowedTypes.includes(ext)) {
            cb(null, true);
        } else {
            cb(new Error('Tipo de arquivo não permitido'), false);
        }
    }
});

router.get('/', (req, res) => {
    res.render('apolices', {
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

router.post('/salvar', upload.single('anexo'), (req, res) => {
    // ... seu código existente da rota /salvar
    const dados = req.body;
    const arquivo = req.file;
    const usuarioLogado = req.session.usuario;

    const queryCliente = 'SELECT cliente_id FROM v_clientes WHERE nome = ?';
    
    db.execute(queryCliente, [dados.clienteNome], (err, results) => {
        if (err || results.length === 0) {
            return res.status(400).json({ success: false, message: 'Cliente não encontrado!' });
        }
        
        const clienteId = results[0].cliente_id;
        const premioFormatado = parseFloat(dados.premioTotal.replace('R$', '').replace(/\./g, '').replace(',', '.'));
        const parcelasFormatado = parseInt(dados.parcelas.replace(/\D/g, '')); 

        const nomeArquivo = arquivo ? arquivo.filename : null;

        const usuarioId = 1; 
        const formaPagamentoId = 1;
        const seguradoraId = 1;
        const ramoId = 1;

        const queryInsert = `CALL pk_inc_apolice(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        
        const params = [
            dados.nApolice, premioFormatado, parcelasFormatado,
            dados.vigenciaInicio, dados.vigenciaFinal,
            clienteId, formaPagamentoId, seguradoraId, ramoId, usuarioId
        ];

        db.execute(queryInsert, params, (error) => {
            if (error) {
                console.error('Erro ao salvar:', error);
                return res.status(500).json({ success: false, message: 'Erro no banco.' });
            }

            if (nomeArquivo) {
                const queryUpdateFile = 'UPDATE apolice SET arquivo_path = ? WHERE nro = ?';
                db.execute(queryUpdateFile, [nomeArquivo, dados.nApolice], (errFile) => {
                    if (errFile) console.error("Erro ao vincular arquivo:", errFile);
                });
            }

            db.query('INSERT INTO auditoria_logs (usuario, acao, timestamp) VALUES (?, ?, NOW())',
                [usuarioLogado, `Cadastrou Apólice Nº ${dados.nApolice}`]);

            res.json({ success: true, message: 'Apólice salva com anexo!' });
        });
    });
});

router.get('/getApolices', (req, res) => {
    const query = `
        SELECT 
            a.apolice_id, a.nro, a.arquivo_path,
            c.nome AS nome_cliente,
            r.descr AS ramo_descr
        FROM apolice a
        INNER JOIN cliente cli ON a.cliente_id = cli.cliente_id
        INNER JOIN pessoa c ON cli.pessoa_id = c.pessoa_id
        INNER JOIN ramo_apolice r ON a.ramoapolic_id = r.ramoapolic_id
        ORDER BY a.dt_incl DESC
    `;
    
    db.execute(query, (error, results) => {
        if (error) return res.status(500).json({ success: false, error: error.message });

        const apolicesFormatadas = results.map(ap => ({
            id: ap.apolice_id,
            numero: ap.nro,
            cliente: ap.nome_cliente,
            ramo: ap.ramo_descr || 'Geral',
            arquivo: ap.arquivo_path
        }));

        res.json({ success: true, apolices: apolicesFormatadas });
    });
});

router.get('/getTiposApolice', (req, res) => {
    const query = 'SELECT tpapolice_id as id, descr as descricao FROM tipo_apolice ORDER BY descr';
    
    db.execute(query, (error, results) => {
        if (error) {
            console.error('Erro ao buscar tipos de apólice:', error);
            return res.status(500).json({ success: false, error: error.message });
        }

        res.json({ success: true, tipos: results });
    });
});

// Rota para obter ramos de apólice
router.get('/getRamosApolice', (req, res) => {
    const query = 'SELECT ramoapolic_id as id, descr as descricao FROM ramo_apolice ORDER BY descr';
    
    db.execute(query, (error, results) => {
        if (error) {
            console.error('Erro ao buscar ramos de apólice:', error);
            return res.status(500).json({ success: false, error: error.message });
        }

        res.json({ success: true, ramos: results });
    });
});

// Rota para obter tipos de pagamento
router.get('/getTiposPagamento', (req, res) => {
    const query = 'SELECT tppag_id as id, descr as descricao FROM tipo_pag ORDER BY descr';
    
    db.execute(query, (error, results) => {
        if (error) {
            console.error('Erro ao buscar tipos de pagamento:', error);
            return res.status(500).json({ success: false, error: error.message });
        }

        res.json({ success: true, tiposPagamento: results });
    });
});

module.exports = router