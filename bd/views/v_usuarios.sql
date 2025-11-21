CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `quoteflex`.`v_usuarios` AS
    SELECT 
        `us`.`nome` AS `nome`,
        `us`.`usuario_id` AS `usuario_id`,
        `us`.`cd_usu_bd` AS `cd_usu_bd`,
        `us`.`senha` AS `senha`,
        `us`.`sit` AS `sit`,
        `fu`.`descr` AS `descr_funcaousu`,
        `tau`.`descr` AS `descr_tpacessusu`,
        `fu`.`funcaousu_id` AS `funcaousu_id`,
        `tau`.`tpacessusu_id` AS `tpacessusu_id`
    FROM
        ((`quoteflex`.`usuario` `us`
        JOIN `quoteflex`.`funcao_usu` `fu`)
        JOIN `quoteflex`.`tp_acesso_usu` `tau`)
    WHERE
        ((`us`.`funcaousu_id` = `fu`.`funcaousu_id`)
            AND (`us`.`tpacessusu_id` = `tau`.`tpacessusu_id`))
    ORDER BY `us`.`nome`