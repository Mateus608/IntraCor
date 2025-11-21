CREATE DEFINER=`root`@`localhost` PROCEDURE `pk_alt_usuario`( IN ev_nome          VARCHAR(300)
								  , IN ev_cd_usu_bd     VARCHAR(50)
                                  , IN ev_senha 	    VARCHAR(30)
                                  , IN en_tpacessusu_id INT
                                  , IN en_funcaousu_id  INT 
                                  , IN en_sit			INT
                                  , IN en_usuario_id 	int
                                  )
BEGIN
   if en_usuario_id is not null and ev_senha is not null then 
      update usuario us 
         set us.nome          = ev_nome
           , us.cd_usu_bd     = ev_cd_usu_bd
		   , us.senha	      = md5(ev_senha)
           , us.tpacessusu_id = en_tpacessusu_id
           , us.funcaousu_id  = en_funcaousu_id
           , us.sit  		  = en_sit
	   where us.usuario_id    = en_usuario_id;
   end if;
   if en_usuario_id is not null and ev_senha is null then 
      update usuario us 
         set us.nome          = ev_nome
           , us.cd_usu_bd     = ev_cd_usu_bd
		   , us.tpacessusu_id = en_tpacessusu_id
           , us.funcaousu_id  = en_funcaousu_id
           , us.sit  		  = en_sit
	   where us.usuario_id    = en_usuario_id;
   end if;
END