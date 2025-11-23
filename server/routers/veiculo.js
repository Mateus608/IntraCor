const express = require('express')
const router = express.Router()
const db = require('../db')


router.get('/:cliente_id', (req, res) => {
    res.render('veiculos', {
        usuario: req.session.usuario,
        nivel: req.session.nivel,
        clienteId: req.params.cliente_id
    });
});

router.get('/incluir/:cliente_id', (req, res) => { 
    res.render('inclusao-veiculo', {
        usuario: req.session.usuario,
        nivel: req.session.nivel,
        clienteId: req.params.cliente_id
    });
});


router.get('/alterar/:veiculo_id', (req, res) => {
    res.render('inclusao-veiculo', {
        veiculo_id: req.params.veiculo_id,
        usuario: req.session.usuario,
        nivel: req.session.nivel
    });
});


router.post('/incluir', (req, res) => {
    
    const { 
        placa_veic, 
        chassi_veic,
        anofab_veic,
        km_veic,
        tpCombust_veic,
        mrcmdveic_id,
        cliente_id
    } = req.body;

    if (!placa_veic) {
        return res.status(400).json({
            success: false,
            error: 'Placa é obrigatória'
        });
    }

    if (!anofab_veic) {
        return res.status(400).json({
            success: false,
            error: 'Ano de fabricação é obrigatório'
        });
    }

    if (!mrcmdveic_id) {
        return res.status(400).json({
            success: false,
            error: 'Marca/Modelo é obrigatório'
        });
    }

    if (!cliente_id) {
        return res.status(400).json({
            success: false,
            error: 'Cliente é obrigatório'
        });
    }

    const queryVeiculo = 'CALL pk_inc_veiculo(?, ?, ?, ?, ?, ?, ?)';
    
    const paramsVeiculo = [
        placa_veic.toUpperCase() || null,
        anofab_veic,
        km_veic || 0,
        chassi_veic ? chassi_veic.toUpperCase() : null,
        tpCombust_veic || null,
        cliente_id,
        mrcmdveic_id
    ];

    db.execute(queryVeiculo, paramsVeiculo, (errorVeiculo, resultsVeiculo) => {
        if (errorVeiculo) {
            console.error('Erro ao cadastrar veículo: ', errorVeiculo);
            return res.status(500).json({ 
                success: false,
                error: 'Erro ao cadastrar veículo!',
                details: errorVeiculo.message
            });
        }

        const usu_session = req.session.usuario;

        // Registrar log de auditoria
        db.query(
            'INSERT INTO auditoria_logs (usuario, acao, timestamp) VALUES (?, ?, NOW())',
            [usu_session, `Cadastrou Veículo: ${placa_veic} para o cliente ID: ${cliente_id}`],
            (logErr) => {
                if (logErr) {
                    console.error("Erro ao registrar log de cadastro de Veículo: ", logErr);
                }
                
                res.json({
                    success: true,
                    message: 'Veículo cadastrado com sucesso',
                    veiculo_id: resultsVeiculo && resultsVeiculo[0] && resultsVeiculo[0][0] ? resultsVeiculo[0][0].veiculo_id : null
                });
            }
        );
    });
});


router.put('/alterar/:veiculo_id', (req, res) => {
    
    const { 
        placa_veic, 
        chassi_veic,
        anofab_veic,
        km_veic,
        tpCombust_veic,
        mrcmdveic_id
    } = req.body;

    const veiculo_id = req.params.veiculo_id;

    // Validações
    if (!placa_veic) {
        return res.status(400).json({
            success: false,
            error: 'Placa é obrigatória'
        });
    }

    if (!anofab_veic) {
        return res.status(400).json({
            success: false,
            error: 'Ano de fabricação é obrigatório'
        });
    }

    if (!mrcmdveic_id) {
        return res.status(400).json({
            success: false,
            error: 'Marca/Modelo é obrigatório'
        });
    }

    if (!veiculo_id) {
        return res.status(400).json({
            success: false,
            error: 'ID do veículo é obrigatório'
        });
    }

    const queryUpdateVeiculo = `
        UPDATE veiculo ve
        SET ve.placa = ?, 
            ve.ano_fab = ?, 
            ve.km = ?, 
            ve.chassi = ?, 
            ve.tp_combust = ?, 
            ve.mrcmdveic_id = ?
        WHERE ve.veiculo_id = ?
    `;
    
    const paramsUpdateVeiculo = [
        placa_veic.toUpperCase() || null,
        anofab_veic,
        km_veic || 0,
        chassi_veic ? chassi_veic.toUpperCase() : null,
        tpCombust_veic || null,
        mrcmdveic_id,
        veiculo_id
    ];

    db.execute(queryUpdateVeiculo, paramsUpdateVeiculo, (error, results) => {
        if (error) {
            console.error(' Erro ao atualizar veículo:', error);
            return res.status(500).json({ 
                success: false,
                error: 'Erro ao atualizar veículo!',
                details: error.message
            });
        }
    
        const usu_session = req.session.usuario;

        // Registrar log de auditoria
        db.query(
            'INSERT INTO auditoria_logs (usuario, acao, timestamp) VALUES (?, ?, NOW())',
            [usu_session, `Alterou Veículo ID: ${veiculo_id} - Placa: ${placa_veic}`],
            (logErr) => {
                if (logErr) {
                    console.error("Erro ao registrar log de alteração de Veículo: ", logErr);
                }
                
                res.json({
                    success: true,
                    message: 'Veículo alterado com sucesso',
                    veiculo_id: veiculo_id
                });
            }
        );
    });
});

router.get('/getVeiculos/:cliente_id', (req, res) => {
    const { cliente_id } = req.params;
    
    const query = `SELECT ve.veiculo_id
                        , ve.placa
                        , ve.ano_fab
                        , ve.km
                        , ve.chassi
                        , fkg_dominio('VEICULO.TP_COMBUST', ve.tp_combust) descr_tpcombust
                        , ve.cliente_id
                        , mv.descr     descr_marcaveic
                        , mov.descr    descr_modelveic
                     FROM veiculo              ve
                        , marcaveic_modeloveic mm
                        , marca_veic           mv
                        , modelo_veic          mov
                    WHERE ve.mrcmdveic_id  = mm.mrcmdveic_id
                      and mm.marcaveic_id  = mv.marcaveic_id
                      and mm.modeloveic_id = mov.modelveic_id
                      and ve.cliente_id = ?`;
    
    db.execute(query, [cliente_id], (error, results) => {
        if (error) {
            console.error('Erro ao buscar dados dos veículos:', error);
            return res.status(500).json({ 
                success: false,
                error: 'Erro ao carregar dados dos veículos',
                details: error.message
            });
        }

        if (!results || results.length === 0) {
            return res.json({
                success: true,
                veiculos: [] 
            });
        }

        const veiculosFormatados = results.map(veiculo => ({
            veiculo_id: veiculo.veiculo_id,
            placa: veiculo.placa,
            ano_fab: veiculo.ano_fab,
            km: veiculo.km,
            chassi: veiculo.chassi,
            descr_tpcombust: veiculo.descr_tpcombust,
            cliente_id: veiculo.cliente_id,
            descr_marcaveic: veiculo.descr_marcaveic,
            descr_modelveic: veiculo.descr_modelveic,
        }));

        res.json({
            success: true,
            veiculos: veiculosFormatados
        });
    });
});

router.get('/getVeiculo/:veiculo_id', (req, res) => {
    
    const { veiculo_id } = req.params;
    
    const query = `SELECT ve.veiculo_id
                        , ve.placa
                        , ve.ano_fab
                        , ve.km
                        , ve.chassi
                        , ve.tp_combust
                        , ve.cliente_id
                        , ve.mrcmdveic_id
                        , fkg_dominio('VEICULOS.TP_COMBUST', ve.tp_combust) descr_tpcombust
                        , mv.descr     descr_marcaveic
                        , mov.descr    descr_modelveic
                     FROM veiculo              ve
                        , marcaveic_modeloveic mm
                        , marca_veic           mv
                        , modelo_veic          mov
                    WHERE ve.mrcmdveic_id  = mm.mrcmdveic_id
                      and mm.marcaveic_id  = mv.marcaveic_id
                      and mm.modeloveic_id = mov.modelveic_id
                      and ve.veiculo_id = ?`;
    
    db.execute(query, [veiculo_id], (error, results) => {
        if (error) {
            console.error('Erro ao buscar dados do veículo:', error);
            return res.status(500).json({ 
                success: false,
                error: 'Erro ao carregar dados do veículo',
                details: error.message
            });
        }

        console.log('📊 Resultados do veículo:', results);
        
        if (!results || results.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Veículo não encontrado'
            });
        }

        const veiculo = results[0];
        
        const veiculoFormatado = {
            veiculo_id: veiculo.veiculo_id,
            placa: veiculo.placa,
            ano_fab: veiculo.ano_fab,
            km: veiculo.km,
            chassi: veiculo.chassi,
            tp_combust: veiculo.tp_combust,
            descr_tpcombust: veiculo.descr_tpcombust,
            cliente_id: veiculo.cliente_id,
            mrcmdveic_id: veiculo.mrcmdveic_id,
            descr_marcaveic: veiculo.descr_marcaveic,
            descr_modelveic: veiculo.descr_modelveic,
        };

        res.json({
            success: true,
            veiculo: veiculoFormatado
        });
    });
});

router.put('/excluir', (req, res ) => {
   const veiculo_id = req.body.veiculoId;
   
   queryDelVeiculo = `delete from veiculo ve
                          where ve.veiculo_id = ?`

   db.execute(queryDelVeiculo, [veiculo_id], (erroVeiculo, resultsVeiculo) => {
        if (erroVeiculo){
            db.rollback();
            console.error('Erro ao excluir veículo. Verifique!', erroVeiculo);
            return res.status(500).json({ 
                success: false,
                error: 'Erro ao excluir veículo. Verifique!',
                details: erroVeiculo.message
            });
        }

        //Insere Log_Auditoria
        const usu_session = req.session.usuario;

        db.query(
            'INSERT INTO auditoria_logs (usuario, acao, timestamp) VALUES (?, ?, NOW())',
            [usu_session, `Excluiu veículo: ${veiculo_id} `],
            (logErr) => {
                if (logErr) console.error("Erro ao registrar log de exclusão de veículo: ", logErr); 
                
                res.json({
                    success: true,
                    message: 'Veículo excluído com sucesso'
                });
            }
        );    
    });
});

module.exports = router;
