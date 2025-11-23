CREATE DEFINER=`root`@`localhost` PROCEDURE `pk_inc_itemcliente`( IN en_cliente_id  INT
									  , IN en_veiculo_id  INT
									  , IN en_endereco_id INT
                                      )
BEGIN
   if en_cliente_id is not null then 
      insert into item_cliente ( cliente_id
							   , veiculo_id
                               , endereco_id
                               )
					   values  ( en_cliente_id
							   , en_veiculo_id
							   , en_endereco_id
                               );
	end if;
END