CREATE DEFINER=`root`@`localhost` PROCEDURE `pk_alt_cliente`( IN en_cliente_id 	 INT
								  , IN ev_telefone   	 VARCHAR(20)
                                  , IN en_cpf		 	 BIGINT
                                  , IN en_usuprep_id 	 INT
                                  , IN ev_email          VARCHAR(300)
                                  , IN ev_profissao  	 VARCHAR(500)
                                  , IN ev_nome	     	 VARCHAR(500)
                                  , IN ev_descr_ender    VARCHAR(1000)
                                  , IN ev_obs 			 VARCHAR(4000)
                                  , IN ed_dt_nasc	 	 TIMESTAMP
                                  , IN en_greconomico_id INT
                                  , IN en_nro_ender	     INT
                                  , IN ev_bairro_ender   VARCHAR(1000)
                                  , IN en_cidade_id 	 INT
                                  )
BEGIN
   DECLARE 
      vn_pessoa_id INT; 
      
   select cl.pessoa_id  
     into vn_pessoa_id
     from cliente cl
	where cl.cliente_id = en_cliente_id;
   
   if en_cliente_id is not null then
	  #ATUALIZA CLIENTE
      update cliente cl 
         set cl.usuprep_id     = en_usuprep_id
           , cl.profissao      = trim(ev_profissao)
           , cl.greconomico_id = en_greconomico_id 
           , cl.obs  		   = trim(ev_obs)
	   where cl.cliente_id 	   = en_cliente_id;
      
      #ATUALIZA PESSOA
      update pessoa pe 
         set pe.nome      = trim(ev_nome)
           , pe.dt_nasc   = trim(ed_dt_nasc)
	   where pe.pessoa_id = vn_pessoa_id;
      
      #ATUALIZA MEIO_COMUNIC
      update meio_comunic mc
		 set mc.email     = trim(ev_email)
           , mc.telefone  = trim(replace(replace(replace(en_telefone, '-', ''), ')', ''),'(', ''))
	   where mc.pessoa_id = vn_pessoa_id;
	  
      #ATUALIZA PF
	  update pf 
         set cpf       = replace(replace(en_cpf, '-', ''), '.', '') 
	   where pessoa_id = vn_pessoa_id;
       
	  #ATUALIZA ENDERECO
      update endereco ed
         set ed.descr     = ev_descr_ender
           , ed.bairro    = ev_bairro_ender
           , ed.nro       = en_nro_ender
           , ed.cidade_id = en_cidade_id
	   where ed.pessoa_id = vn_pessoa_id;
	END IF;
 
END