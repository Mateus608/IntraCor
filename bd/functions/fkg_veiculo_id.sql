CREATE DEFINER=`root`@`localhost` FUNCTION `fkg_veiculo_id`( en_cliente_id   INT
							   , en_mrcmdveic_id INT ) RETURNS int
    READS SQL DATA
    DETERMINISTIC
BEGIN
   DECLARE
      vn_veiculo_id INT;
   
   select ve.veiculo_id
     into vn_veiculo_id 
     from veiculo ve
	where ve.cliente_id   = en_cliente_id
      and ve.mrcmdveic_id = en_mrcmdveic_id; 
      
RETURN vn_veiculo_id;
END