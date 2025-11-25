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
    try {
        console.log('=== DEBUG: Requisição recebida ===');
        console.log('req.body:', req.body);
        console.log('req.file:', req.file);

        const dados = req.body;
        const arquivo = req.file;
        const usuarioLogado = req.session.usuario;
        

        const apoliceId = dados.apoliceId ? parseInt(dados.apoliceId) : null;
        const clienteId = dados.cliente ? parseInt(dados.cliente) : null;
        const formaPagamentoId = dados.formaPagamentoId ? parseInt(dados.formaPagamentoId) : null;
        const ramoId = dados.ramoId ? parseInt(dados.ramoId) : null;
        const premioFormatado = dados.premioTotal ? parseFloat(dados.premioTotal.toString().replace('R$', '').replace(/\./g, '').replace(',', '.')) : null;
        const parcelasFormatado = dados.parcelas ? parseInt(dados.parcelas.toString().replace(/\D/g, '')) : null;
        const seguradoraId = 1;

        console.log('=== DEBUG: Variáveis processadas ===');
        console.log({
            apoliceId,
            clienteId,
            formaPagamentoId,
            ramoId,
            premioFormatado,
            parcelasFormatado,
            seguradoraId
        });

        let nomeArquivo = null;

        if (arquivo) {
            console.log('=== DEBUG: Arquivo recebido ===', arquivo.originalname);
            const pastaDestino = path.join(process.cwd(), 'renderer/public/uploads/apolices');
            if (!fs.existsSync(pastaDestino)) fs.mkdirSync(pastaDestino, { recursive: true });
            const novoNome = Date.now() + path.extname(arquivo.originalname);
            const destinoCompleto = path.join(pastaDestino, novoNome);
            fs.renameSync(arquivo.path, destinoCompleto);
            nomeArquivo = novoNome;
            console.log('=== DEBUG: Arquivo movido para ===', destinoCompleto);
        }

        if (apoliceId) {
            console.log('=== DEBUG: Atualizando apólice ===');
            const queryUpdate = `
                UPDATE apolice SET 
                    nro = ?, premio = ?, parcelas = ?, vigencia_inicio = ?, vigencia_fim = ?, 
                    cliente_id = ?, forma_pagamento_id = ?, seguradora_id = ?, ramoapolic_id = ? 
                WHERE apolice_id = ?
            `;
            const params = [
                dados.nApolice,
                premioFormatado,
                parcelasFormatado,
                dados.vigenciaInicio,
                dados.vigenciaFinal,
                clienteId,
                formaPagamentoId,
                seguradoraId,
                ramoId,
                apoliceId
            ];
            console.log('=== DEBUG: Params update ===', params);

            db.execute(queryUpdate, params, (error) => {
                if (error) {
                    console.error('Erro ao atualizar:', error);
                    return res.status(500).json({ success: false, message: 'Erro no banco.' });
                }

                if (nomeArquivo) {
                    const queryUpdateFile = 'UPDATE apolice SET arquivo_path = ? WHERE apolice_id = ?';
                    db.execute(queryUpdateFile, [nomeArquivo, apoliceId], (errFile) => {
                        if (errFile) console.error("Erro ao vincular arquivo:", errFile);
                    });
                }

                db.query('INSERT INTO auditoria_logs (usuario, acao, timestamp) VALUES (?, ?, NOW())',
                    [usuarioLogado, `Alterou Apólice Nº ${dados.nApolice}`]);

                res.json({ success: true, message: 'Apólice atualizada com sucesso!' });
            });

        } else {
            console.log('=== DEBUG: Inserindo nova apólice ===');
            
            const queryUsuarioId = `select us.usuario_id from usuario us where us.cd_usu_bd = ?`;

            db.execute(queryUsuarioId, [req.session.usuario], (error, resultUsuario) => {
                if (error) {
                    console.error('Erro ao buscar usuário:', error);
                    return res.status(500).json({ success: false, message: 'Erro no banco.' });
                }

                const usuarioId = resultUsuario[0].usuario_id;

                const queryInsert = `CALL pk_inc_apolice(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
                
                const paramsInsert = [
                    dados.nApolice,
                    premioFormatado,
                    parcelasFormatado,
                    dados.vigenciaInicio,
                    dados.vigenciaFinal,
                    clienteId,
                    formaPagamentoId,
                    seguradoraId,
                    ramoId,
                    usuarioId
                ];
                console.log('=== DEBUG: Params insert ===', paramsInsert);

                db.execute(queryInsert, paramsInsert, (error) => {
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
            
        }

    } catch (err) {
        console.error('=== DEBUG: Erro catch ===', err);
        res.status(500).json({ success: false, message: err.message });
    }
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
            arquivo: ap.arquivo_path || null
        }));

        res.json({ success: true, apolices: apolicesFormatadas });
    });
});

router.get('/getTiposApolice', (req, res) => {
    const query = 'SELECT tpapolice_id as tpapolice_id, descr as descricao FROM tipo_apolice ORDER BY descr';
    
    db.execute(query, (error, results) => {
        if (error) {
            console.error('Erro ao buscar tipos de apólice:', error);
            return res.status(500).json({ success: false, error: error.message });
        }

        res.json({ success: true, tipos: results });
    });
});

router.get('/getRamosApolice', (req, res) => {
    const query = 'SELECT ramoapolic_id as ramoapolic_id, descr as descricao FROM ramo_apolice ORDER BY descr';
    
    db.execute(query, (error, results) => {
        if (error) {
            console.error('Erro ao buscar ramos de apólice:', error);
            return res.status(500).json({ success: false, error: error.message });
        }

        res.json({ success: true, ramos: results });
    });
});

router.get('/getTiposPagamento', (req, res) => {
    const query = 'SELECT tppag_id as tppag_id, descr as descricao FROM tipo_pag ORDER BY descr';
    
    db.execute(query, (error, results) => {
        if (error) {
            console.error('Erro ao buscar tipos de pagamento:', error);
            return res.status(500).json({ success: false, error: error.message });
        }

        res.json({ success: true, tiposPagamento: results });
    });
});

module.exports = router