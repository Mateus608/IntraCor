#CIDADE
INSERT INTO cidade (nome, uf) VALUES
('São Paulo', 'SP'),
('Guarulhos', 'SP'),
('Campinas', 'SP'),
('São Bernardo do Campo', 'SP'),
('Santo André', 'SP'),
('Osasco', 'SP'),
('Sorocaba', 'SP'),
('Ribeirão Preto', 'SP'),
('São José dos Campos', 'SP'),
('Mauá', 'SP'),
('São José do Rio Preto', 'SP'),
('Mogi das Cruzes', 'SP'),
('Santos', 'SP'),
('Diadema', 'SP'),
('Jundiaí', 'SP'),
('Carapicuíba', 'SP'),
('Piracicaba', 'SP'),
('Bauru', 'SP'),
('Itaquaquecetuba', 'SP'),
('São Vicente', 'SP'),
('Franca', 'SP'),
('Praia Grande', 'SP'),
('Guarujá', 'SP'),
('Taubaté', 'SP'),
('Limeira', 'SP'),
('Suzano', 'SP'),
('Taboão da Serra', 'SP'),
('Sumaré', 'SP'),
('Barueri', 'SP'),
('Embu das Artes', 'SP'),
('São Carlos', 'SP'),
('Indaiatuba', 'SP'),
('Cotia', 'SP'),
('Americana', 'SP'),
('Marília', 'SP'),
('Itapevi', 'SP'),
('Araraquara', 'SP'),
('Jacareí', 'SP'),
('Hortolândia', 'SP'),
('Presidente Prudente', 'SP'),
('Rio Claro', 'SP'),
('Araçatuba', 'SP'),
('Ferraz de Vasconcelos', 'SP'),
('Santa Bárbara d''Oeste', 'SP'),
('Itapecerica da Serra', 'SP'),
('Francisco Morato', 'SP'),
('Itu', 'SP'),
('Bragança Paulista', 'SP'),
('Pindamonhangaba', 'SP'),
('Itapetininga', 'SP'),
('São Caetano do Sul', 'SP'),
('Mogi Guaçu', 'SP'),
('Franco da Rocha', 'SP'),
('Jaú', 'SP'),
('Botucatu', 'SP'),
('Atibaia', 'SP'),
('Santana de Parnaíba', 'SP'),
('Araras', 'SP'),
('Cubatão', 'SP'),
('Valinhos', 'SP'),
('Sertãozinho', 'SP'),
('Jandira', 'SP'),
('Birigui', 'SP'),
('Ribeirão Pires', 'SP'),
('Várzea Paulista', 'SP'),
('Caraguatatuba', 'SP'),
('Hortolândia', 'SP'),
('Itatiba', 'SP'),
('Salto', 'SP'),
('Poá', 'SP'),
('Catanduva', 'SP'),
('Vinhedo', 'SP'),
('Leme', 'SP'),
('Paulínia', 'SP'),
('Assis', 'SP'),
('Caieiras', 'SP'),
('Mairiporã', 'SP'),
('Votorantim', 'SP'),
('Itanhaém', 'SP'),
('Barretos', 'SP'),
('Caçapava', 'SP'),
('Matao', 'SP'),
('Jaboticabal', 'SP'),
('Bebedouro', 'SP'),
('São João da Boa Vista', 'SP'),
('Arujá', 'SP'),
('Lins', 'SP'),
('Aparecida', 'SP'),
('Mogi Mirim', 'SP'),
('São Roque', 'SP'),
('Ubatuba', 'SP'),
('Porto Feliz', 'SP'),
('Cosmópolis', 'SP'),
('Tatuí', 'SP'),
('Peruíbe', 'SP'),
('Ilhabela', 'SP'),
('Guararema', 'SP'),
('Cajamar', 'SP'),
('Ibiúna', 'SP'),
('Piedade', 'SP'),
('Serra Negra', 'SP'),
('Capivari', 'SP'),
('Pilar do Sul', 'SP'),
('Rio Grande da Serra', 'SP'),
('Salesópolis', 'SP'),
('Bom Jesus dos Perdões', 'SP'),
('Nazaré Paulista', 'SP'),
('Joanópolis', 'SP'),
('Piracaia', 'SP'),
('Bragança Paulista', 'SP'),
('Pedra Bela', 'SP'),
('Vargem', 'SP'),
('Extrema', 'SP'),
('Tuiuti', 'SP');

#EMPRESA
insert into empresa( nome, nome_fant, cnpj_raiz, cnpj_filial, cnpj_dv, sit ) values ( 'EMPRESA QUOTEFLEX', 'QUOTEFLEX', 84863097, 0001, 55, 1);
insert into empresa( nome, nome_fant, cnpj_raiz, cnpj_filial, cnpj_dv, sit ) values ( 'EMPRESA INTRACOR', 'INTRACOR', 40636011, 0001, 87, 1);

#GRUPO_ECONOMICO
insert into grupo_economico ( descr, cd, empresa_id ) values ( 'GRUPO EMPRESA QUOTEFLEX', 1, 1 );
insert into grupo_economico ( descr, cd, empresa_id ) values ( 'GRUPO EMPRESA INTRACOR', 2, 2 );

#DOMINIO
INSERT INTO `dominio` (`dominio_id`, `descr`, `dominio`, `vlr`) VALUES (1, 'ATIVO', 'EMPRESA.SIT', 1);
INSERT INTO `dominio` (`dominio_id`, `descr`, `dominio`, `vlr`) VALUES (2, 'INATIVO', 'EMPRESA.SIT', 0);
INSERT INTO `dominio` (`dominio_id`, `descr`, `dominio`, `vlr`) VALUES (3, 'ATIVO', 'SEGURADORA.SIT', 1);
INSERT INTO `dominio` (`dominio_id`, `descr`, `dominio`, `vlr`) VALUES (4, 'INATIVO', 'SEGURADORA.SIT', 0);
INSERT INTO `dominio` (`dominio_id`, `descr`, `dominio`, `vlr`) VALUES (5, 'ATIVO', 'TP_ACESSO_USU.SIT', 1);
INSERT INTO `dominio` (`dominio_id`, `descr`, `dominio`, `vlr`) VALUES (6, 'INATIVO', 'TP_ACESSO_USU.SIT', 0);
INSERT INTO `dominio` (`dominio_id`, `descr`, `dominio`, `vlr`) VALUES (7, 'ATIVO', 'CLIENTE.SIT', 1);
INSERT INTO `dominio` (`dominio_id`, `descr`, `dominio`, `vlr`) VALUES (8, 'INATIVO', 'CLIENTE.SIT', 0);
INSERT INTO `dominio` (`dominio_id`, `descr`, `dominio`, `vlr`) VALUES (9, 'TELEFONE', 'MEIO_COMUNIC.TP', 0);
INSERT INTO `dominio` (`dominio_id`, `descr`, `dominio`, `vlr`) VALUES (10, 'E-MAIL', 'MEIO_COMUNIC.TP', 1);
INSERT INTO `dominio` (`dominio_id`, `descr`, `dominio`, `vlr`) VALUES (11, 'GASOLINA', 'VEICULO.TP_COMBUST', 0);
INSERT INTO `dominio` (`dominio_id`, `descr`, `dominio`, `vlr`) VALUES (12, 'ALCOOL', 'VEICULO.TP_COMBUST', 1);
INSERT INTO `dominio` (`dominio_id`, `descr`, `dominio`, `vlr`) VALUES (13, 'DIESEL ', 'VEICULO.TP_COMBUST', 2);
INSERT INTO `dominio` (`dominio_id`, `descr`, `dominio`, `vlr`) VALUES (14, 'ELÉTRICO', 'VEICULO.TP_COMBUST', 3);
INSERT INTO `dominio` (`dominio_id`, `descr`, `dominio`, `vlr`) VALUES (15, 'PRÊMIO ADICIONAL ', 'ENDOSSO.TP_ALT', 0);
INSERT INTO `dominio` (`dominio_id`, `descr`, `dominio`, `vlr`) VALUES (16, 'RESTITUIÇÃO', 'ENDOSSO.TP_ALT', 1);
INSERT INTO `dominio` (`dominio_id`,`dominio`, `descr`, `vlr` ) values (17, 'USUARIO.SIT', 'INATIVO', 0 );
INSERT INTO `dominio` (`dominio_id`,`dominio`, `descr`, `vlr` ) values (18, 'USUARIO.SIT', 'ATIVO', 1 );

#FUNCAO_USU
INSERT INTO funcao_usu( descr, cd ) values ( 'CORRETOR', '1' );

#TP_ACESSO_USU
INSERT INTO tp_acesso_usu( descr, cd, sit ) values ( 'ADMIN', 1, 1 );
INSERT INTO tp_acesso_usu( descr, cd, sit ) values ( 'GERENTE', 2, 1 );


   