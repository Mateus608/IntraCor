CREATE DEFINER=`root`@`localhost` PROCEDURE `pk_inc_pessoa`( IN ev_nome         VARCHAR(500)
														   , IN en_cpf          BIGINT
                                                           , IN en_cnpj_raiz    INT(8)
                                                           , IN en_cnpj_filial  INT(4)
														   , IN en_cnpj_dv 	    INT(2)
                                                           , IN ev_descr_ender  VARCHAR(300)
														   , IN ev_bairro_ender VARCHAR(300)
                                                           , IN en_nro_ender    INT
                                                           , IN en_cidade_id   	INT
                                                           )
BEGIN
   DECLARE
      vn_pessoa_id INT;
      
   if ev_nome is not null then
      insert into pessoa( nome ) values ( ev_nome );
   end if;
   
   SET vn_pessoa_id = LAST_INSERT_ID();
   
   if en_cpf is not null then 
      insert into pf ( pessoa_id, cpf ) values ( vn_pessoa_id, en_cpf );
   end if;
   
   if en_cnpj_raiz is not null then 
      insert into pj ( pessoa_id, cnpj_raiz, cnpj_filial, cnpj_dv ) values ( vn_pessoa_id, en_cnpj_raiz, en_cnpj_filial, en_cnpj_dv ); 
   end if;
   
   if ev_descr_ender is not null then
      insert into endereco( descr, nro, bairro, cidade_id, pessoa_id ) values ( ev_descr_ender, en_nro_ender, en_bairro_ender, en_cidade_id, vn_pessoa_id );
   end if;
END