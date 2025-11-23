CREATE DEFINER=`root`@`localhost` PROCEDURE `pk_inc_pessoa`( IN ev_nome         VARCHAR(500)
														   , IN en_cpf          BIGINT
                                                           , IN en_cnpj_raiz    INT(8)
                                                           , IN en_cnpj_filial  INT(4)
														   , IN en_cnpj_dv 	    INT(2)
                                                           , IN ev_descr_ender  VARCHAR(300)
														   , IN ev_bairro_ender VARCHAR(300)
                                                           , IN ev_telefone     VARCHAR(20)
                                                           , IN ev_email	    VARCHAR(200)
                                                           , IN en_nro_ender    VARCHAR(10)
                                                           , IN en_cidade_id   	INT
                                                           , IN ed_dt_nasc	    DATE
                                                           )
BEGIN
   DECLARE
      vn_pessoa_id INT;
      
   if ev_nome is not null then
      insert into pessoa( nome, dt_nasc ) values ( ev_nome, ed_dt_nasc );
   end if;
   
   SET vn_pessoa_id = fkg_pessoa_id( ev_nome );
   
   if en_cpf is not null then 
      insert into pf ( pessoa_id, cpf ) values ( vn_pessoa_id, en_cpf );
   end if;
   
   if en_cnpj_raiz is not null then 
      insert into pj ( pessoa_id, cnpj_raiz, cnpj_filial, cnpj_dv ) values ( vn_pessoa_id, en_cnpj_raiz, en_cnpj_filial, en_cnpj_dv ); 
   end if;
   
   if ev_descr_ender is not null then
      insert into endereco( descr, nro, bairro, cidade_id, pessoa_id, princ ) values ( ev_descr_ender, en_nro_ender, ev_bairro_ender, en_cidade_id, vn_pessoa_id, 1 );
   end if;
   
   insert into meio_comunic ( telefone, email, pessoa_id) values ( trim(replace(replace(replace(ev_telefone, '-', ''), ')', ''),'(', '')), ev_email, vn_pessoa_id ); #meio_comunic
   
END