CREATE DEFINER=`root`@`localhost` PROCEDURE `pk_inc_veiculo`( IN ev_placa         VARCHAR(7)
								  , IN ed_ano_fab       YEAR
                                  , IN ef_km            FLOAT
                                  , IN ev_chassi        VARCHAR(17)
                                  , IN en_tp_combust     INT
                                  , IN en_cliente_id    INT
                                  , IN en_mrcmdveic_id  INT )
BEGIN	
   if en_cliente_id is not null and en_mrcmdveic_id is not null then
      insert into veiculo( placa
						 , ano_fab
                         , km
                         , chassi
                         , tp_combust
                         , cliente_id
                         , mrcmdveic_id
                         )
				   values( ev_placa
						 , ed_ano_fab
                         , ef_km
                         , ev_chassi
                         , en_tp_combust
                         , en_cliente_id
                         , en_mrcmdveic_id
                         );
	end if;
            
END