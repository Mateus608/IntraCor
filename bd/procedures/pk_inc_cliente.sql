CREATE DEFINER=`root`@`localhost` PROCEDURE `pk_inc_cliente`( IN en_pessoa_id INT 
															, IN ev_profissao VARCHAR(500) )
BEGIN
   if en_pessoa_id is not null then 
      insert into cliente ( pessoa_id, sit, dt_incl, profissao ) values ( en_pessoa_id, 1, now(), UCASE(ev_profissao) ); 
   end if;
END