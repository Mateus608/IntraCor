CREATE DEFINER=`root`@`localhost` FUNCTION `fkg_pessoa_id`( ev_nome varchar(500) ) RETURNS int
    READS SQL DATA
    DETERMINISTIC
BEGIN
   DECLARE
      vn_pessoa_id INT;
      
   select pe.pessoa_id 
     into vn_pessoa_id
     from pessoa pe
	where lower(pe.nome) = lower(ev_nome);
    
RETURN ifnull(vn_pessoa_id, 0);
END