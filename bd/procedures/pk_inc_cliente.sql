CREATE DEFINER=`root`@`localhost` PROCEDURE `pk_inc_cliente`( IN en_pessoa_id      INT 
															, IN ev_profissao      VARCHAR(500)
														    , IN en_usuprep_id     INT
                                                            , IN en_greconomico_id INT
                                                            , IN ev_obs			   VARCHAR(4000)
                                                            )
BEGIN
   if en_pessoa_id is not null then 
      insert into cliente ( pessoa_id, sit, dt_incl, profissao, usuprep_id, greconomico_id, obs ) 
           values ( en_pessoa_id, 1, now(), UCASE(ev_profissao), en_usuprep_id, en_greconomico_id, ev_obs); 
   end if;
END