CREATE DEFINER=`root`@`localhost` FUNCTION `fkg_cliente_id`( en_pessoa_id INT) RETURNS int
    READS SQL DATA
    DETERMINISTIC
BEGIN
   DECLARE 
      vn_cliente_id INT;
      
   select cl.cliente_id
     into vn_cliente_id
     from cliente cl
	where cl.pessoa_id = en_pessoa_id;
    
RETURN vn_cliente_id;

END