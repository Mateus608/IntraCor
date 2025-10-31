CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `v_clientes` AS
    SELECT 
        `cl`.`cliente_id` AS `cliente_id`,
        `pe`.`pessoa_id` AS `pessoa_id`,
        `pe`.`nome` AS `nome`,
        `pf`.`cpf` AS `cpf`,
        CONCAT(LPAD(`pj`.`cnpj_raiz`, 8, '0'),
                LPAD(`pj`.`cnpj_filial`, 4, '0'),
                LPAD(`pj`.`cnpj_dv`, 2, '0')) AS `cnpj`,
        `mc`.`descr` AS `descr`,
        `mc`.`tp` AS `tp_meiocomunic`
    FROM
        ((((`pessoa` `pe`
        JOIN `cliente` `cl` ON ((`pe`.`pessoa_id` = `cl`.`pessoa_id`)))
        JOIN `meio_comunic` `mc` ON ((`pe`.`pessoa_id` = `mc`.`pessoa_id`)))
        LEFT JOIN `pf` ON ((`pe`.`pessoa_id` = `pf`.`pessoa_id`)))
        LEFT JOIN `pj` ON ((`pe`.`pessoa_id` = `pj`.`pessoa_id`)))
    ORDER BY `pe`.`nome`