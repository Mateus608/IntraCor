CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `quoteflex`.`v_clientes` AS
    SELECT DISTINCT
        `cl`.`cliente_id` AS `cliente_id`,
        `pe`.`pessoa_id` AS `pessoa_id`,
        `pe`.`nome` AS `nome`,
        `quoteflex`.`pf`.`cpf` AS `cpf`,
        `mc`.`email` AS `email`,
        `mc`.`telefone` AS `telefone`,
        `us_clie`.`nome` AS `preposto_clie`
    FROM
        ((((`quoteflex`.`pessoa` `pe`
        JOIN `quoteflex`.`cliente` `cl` ON ((`pe`.`pessoa_id` = `cl`.`pessoa_id`)))
        JOIN `quoteflex`.`meio_comunic` `mc` ON ((`pe`.`pessoa_id` = `mc`.`pessoa_id`)))
        JOIN `quoteflex`.`pf` ON ((`pe`.`pessoa_id` = `quoteflex`.`pf`.`pessoa_id`)))
        LEFT JOIN `quoteflex`.`usuario` `us_clie` ON ((`cl`.`usuprep_id` = `us_clie`.`usuario_id`)))
    ORDER BY `pe`.`nome`