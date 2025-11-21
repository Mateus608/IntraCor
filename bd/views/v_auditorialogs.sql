CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `quoteflex`.`v_auditorialogs` AS
    SELECT 
        `al`.`auditorialogs_id` AS `auditorialogs_id`,
        `al`.`usuario` AS `usuario`,
        `al`.`acao` AS `acao`,
        DATE_FORMAT(`al`.`timestamp`, '%d/%m/%Y %H:%i:%s') AS `dt_ref`
    FROM
        `quoteflex`.`auditoria_logs` `al`
    ORDER BY `al`.`timestamp` DESC