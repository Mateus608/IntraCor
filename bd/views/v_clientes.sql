CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
<<<<<<< HEAD
VIEW `v_clientes` AS
    SELECT 
    cl.cliente_id,
    pe.pessoa_id,
    pe.nome,
    pf.cpf,
    CONCAT(LPAD(pj.cnpj_raiz, 8, '0'),
           LPAD(pj.cnpj_filial, 4, '0'),
           LPAD(pj.cnpj_dv, 2, '0')) AS cnpj,
    mc.descr,
    mc.tp AS tp_meiocomunic,
    us.nome AS preposto
FROM pessoa pe
JOIN cliente cl ON pe.pessoa_id = cl.pessoa_id
JOIN meio_comunic mc ON pe.pessoa_id = mc.pessoa_id
LEFT JOIN pf ON pe.pessoa_id = pf.pessoa_id
LEFT JOIN pj ON pe.pessoa_id = pj.pessoa_id
LEFT JOIN apolice ap ON cl.cliente_id = ap.cliente_id
LEFT JOIN usuario us ON ap.usuario_id = us.usuario_id
ORDER BY pe.nome;
=======
VIEW `quoteflex`.`v_clientes` AS
    SELECT DISTINCT
        `cl`.`cliente_id` AS `cliente_id`,
        `pe`.`pessoa_id` AS `pessoa_id`,
        `pe`.`nome` AS `nome`,
        `quoteflex`.`pf`.`cpf` AS `cpf`,
        CONCAT(LPAD(`quoteflex`.`pj`.`cnpj_raiz`, 8, '0'),
                LPAD(`quoteflex`.`pj`.`cnpj_filial`, 4, '0'),
                LPAD(`quoteflex`.`pj`.`cnpj_dv`, 2, '0')) AS `cnpj`,
        `mc`.`descr` AS `descr`,
        `mc`.`tp` AS `tp_meiocomunic`,
        `us`.`nome` AS `preposto`
    FROM
        ((((((`quoteflex`.`pessoa` `pe`
        JOIN `quoteflex`.`cliente` `cl` ON ((`pe`.`pessoa_id` = `cl`.`pessoa_id`)))
        JOIN `quoteflex`.`meio_comunic` `mc` ON ((`pe`.`pessoa_id` = `mc`.`pessoa_id`)))
        LEFT JOIN `quoteflex`.`pf` ON ((`pe`.`pessoa_id` = `quoteflex`.`pf`.`pessoa_id`)))
        LEFT JOIN `quoteflex`.`pj` ON ((`pe`.`pessoa_id` = `quoteflex`.`pj`.`pessoa_id`)))
        LEFT JOIN `quoteflex`.`apolice` `ap` ON ((`cl`.`cliente_id` = `ap`.`cliente_id`)))
        LEFT JOIN `quoteflex`.`usuario` `us` ON ((`ap`.`usuario_id` = `us`.`usuario_id`)))
    ORDER BY `pe`.`nome`
>>>>>>> 97044db726c81523ce8aee64f0f24d8fa788ef4e
