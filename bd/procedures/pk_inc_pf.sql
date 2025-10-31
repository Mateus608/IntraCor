CREATE DEFINER=`root`@`localhost` PROCEDURE `pk_inc_pf`( IN en_pessoa_id INT 
													   , IN ev_cpf VARCHAR(20) )
BEGIN
   DECLARE
      vv_cpf varchar(12);
      
   SET vv_cpf = REPLACE(REPLACE(REPLACE(ev_cpf, '-', ''), '.', ''), ' ', '');
   
   if vv_cpf is not null then
      insert into pf ( pessoa_id, cpf ) values ( en_pessoa_id, vv_cpf );
   end if;
END