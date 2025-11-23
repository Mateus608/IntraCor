CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `quoteflex`.`v_clientes` AS
    SELECT DISTINCT
        `cl`.`cliente_id` AS `cliente_id`,
        `pe`.`pessoa_id` AS `pessoa_id`,
        `pe`.`nome` AS `nome`,
        DATE_FORMAT(`pe`.`dt_nasc`, '%d/%m/%Y') AS `dt_nasc`,
        `quoteflex`.`pf`.`cpf` AS `cpf`,
        `mc`.`email` AS `email`,
        `mc`.`telefone` AS `telefone`,
        `us_clie`.`nome` AS `preposto_clie`,
        `cl`.`usuprep_id` AS `usuprep_id`,
        `cl`.`profissao` AS `profissao`,
        `cl`.`greconomico_id` AS `greconomico_id`,
        `cl`.`obs` AS `obs`,
        `en`.`descr` AS `descr_ender`,
        `en`.`nro` AS `nro_ender`,
        `en`.`bairro` AS `bairro_ender`,
        `en`.`cidade_id` AS `cidade_id`,
        `en`.`princ` AS `princ`
    FROM
        (((((`quoteflex`.`pessoa` `pe`
        JOIN `quoteflex`.`cliente` `cl` ON ((`pe`.`pessoa_id` = `cl`.`pessoa_id`)))
        JOIN `quoteflex`.`meio_comunic` `mc` ON ((`pe`.`pessoa_id` = `mc`.`pessoa_id`)))
        JOIN `quoteflex`.`pf` ON ((`pe`.`pessoa_id` = `quoteflex`.`pf`.`pessoa_id`)))
        JOIN `quoteflex`.`endereco` `en` ON ((`pe`.`pessoa_id` = `en`.`pessoa_id`)))
        LEFT JOIN `quoteflex`.`usuario` `us_clie` ON ((`cl`.`usuprep_id` = `us_clie`.`usuario_id`)))
    WHERE
        (`en`.`princ` = 1)
    ORDER BY `pe`.`nome`