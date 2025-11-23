CREATE DEFINER=`root`@`localhost` PROCEDURE `pk_inc_apolice`(
    IN p_nro INT,
    IN p_premio_total DECIMAL(10,2),
    IN p_qtde_parc INT,
    IN p_dt_inic DATE,
    IN p_dt_fim DATE,
    IN p_cliente_id INT,
    IN p_tppag_id INT,
    IN p_seguradora_id INT,
    IN p_ramoapolic_id INT,
    IN p_usuario_id INT
)
BEGIN
    INSERT INTO apolice (
        dt_incl, nro, premio_total, qtde_parc, 
        dt_inic, dt_fim, cliente_id, tppag_id, 
        seguradora_id, ramoapolic_id, usuario_id, tpapolice_id
    ) VALUES (
        NOW(), p_nro, p_premio_total, p_qtde_parc,
        p_dt_inic, p_dt_fim, p_cliente_id, p_tppag_id,
        (select se.seguradora_id from seguradora se, empresa em where em.empresa_id = se.empresa_id and em.cnpj_raiz = '40636011'), p_ramoapolic_id, p_usuario_id, 1
    );
END