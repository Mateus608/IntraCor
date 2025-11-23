CREATE DEFINER=`root`@`localhost` FUNCTION `fkg_dominio`( ev_dominio VARCHAR(100)
							  , en_vlr  	   INT) RETURNS varchar(300) CHARSET utf8mb4
    READS SQL DATA
    DETERMINISTIC
BEGIN
   DECLARE
      vv_descr varchar(300);
      
   select do.descr
     into vv_descr
     from dominio do  
	where do.dominio = ev_dominio
      and do.vlr     = en_vlr;
      
RETURN vv_descr;
END