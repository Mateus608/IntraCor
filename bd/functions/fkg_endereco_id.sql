CREATE DEFINER=`root`@`localhost` FUNCTION `fkg_endereco_id`( en_pessoa_id INT) RETURNS int
    READS SQL DATA
    DETERMINISTIC
BEGIN
	DECLARE
       vn_endereco_id INT;
       
	select en.endereco_id
      into vn_endereco_id
      from endereco en 
	 where en.pessoa_id = en_pessoa_id;
     
RETURN vn_endereco_id;
END