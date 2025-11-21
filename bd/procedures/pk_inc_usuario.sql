CREATE DEFINER=`root`@`localhost` PROCEDURE `pk_inc_usuario`( in ev_nome           varchar(300)
								  , in ev_cd_usu_bd      varchar(100)
                                  , in ev_senha          varchar(45)
                                  , in en_tpacessusu_id  int
                                  , in en_funcaousu_id   int
                                  , in en_sit			 int 
                                  )
BEGIN
   if ev_nome is not null and ev_cd_usu_bd is not null and ev_senha is not null then
      insert into usuario ( nome, cd_usu_bd, senha, tpacessusu_id, funcaousu_id, sit ) 
		   values  ( ev_nome, ev_cd_usu_bd, md5(ev_senha), en_tpacessusu_id, en_funcaousu_id, en_sit );
   end if;
END