#ramo_apolice
INSERT INTO `quoteflex`.`ramo_apolice` (`descr`, `cd`) VALUES
('Compreensivo Automóvel', 1),
('Incêndio', 2),
('Roubo/Furto', 3),
('Vida Individual', 4),
('Acidentes Pessoais', 5),
('Transporte de Cargas', 6),
('Responsabilidade Civil Geral', 7),
('Equipamentos Portáteis', 8),
('Obras Civis', 9),
('Animais', 10);
#tipo_pag
INSERT INTO `quoteflex`.`tipo_pag` (`descr`, `cd`) VALUES
('À Vista', 1),
('Cartão de Crédito', 2),
('Débito Automático', 3),
('Boleto Bancário', 4),
('PIX', 5),
('Cartão Débito', 6),
('Transferência Bancária', 7),
('Financiamento', 8),
('Carnê', 9),
('Duplicata', 10);
#tipo_apolice
INSERT INTO `quoteflex`.`tipo_apolice` (`descr`, `cd`) VALUES
('Automóvel', 1),
('Residencial', 2),
('Vida', 3),
('Empresarial', 4),
('Condomínio', 5),
('Equipamentos', 6),
('Responsabilidade Civil', 7),
('Transporte', 8),
('Riscos de Engenharia', 9),
('Agrícola', 10);

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

#MARCA_VEICULO
INSERT INTO `quoteflex`.`marca_veic` (`descr`, `cd`) VALUES
('Acura', 1),
('Agrale', 2),
('Alfa Romeo', 3),
('AM Gen', 4),
('Asia Motors', 5),
('Aston Martin', 6),
('Audi', 7),
('BMW', 8),
('BRM', 9),
('Buggy', 10),
('Bugre', 11),
('Cadillac', 12),
('CBT Jipe', 13),
('CHANA', 14),
('CHANGAN', 15),
('CHERY', 16),
('Chevrolet', 17),
('Chrysler', 18),
('Citroën', 19),
('Cross Lander', 20),
('Daewoo', 21),
('Daihatsu', 22),
('Dodge', 23),
('EFFA', 24),
('Engesa', 25),
('Envemo', 26),
('Ferrari', 27),
('Fiat', 28),
('Fibravan', 29),
('Ford', 30),
('FOTON', 31),
('Fyber', 32),
('GEELY', 33),
('GM', 34),
('Great Wall', 35),
('Gurgel', 36),
('HAFEI', 37),
('Honda', 38),
('Hyundai', 39),
('Isuzu', 40),
('JAC', 41),
('Jaguar', 42),
('Jeep', 43),
('JINBEI', 44),
('JPX', 45),
('Kia', 46),
('Lada', 47),
('Lamborghini', 48),
('Land Rover', 49),
('Lexus', 50),
('Lifan', 51),
('LOBINI', 52),
('Lotus', 53),
('Mahindra', 54),
('Maserati', 55),
('Matra', 56),
('Mazda', 57),
('Mercedes-Benz', 58),
('Mercury', 59),
('MG', 60),
('Mini', 61),
('Mitsubishi', 62),
('Miura', 63),
('Nissan', 64),
('Peugeot', 65),
('Plymouth', 66),
('Pontiac', 67),
('Porsche', 68),
('RAM', 69),
('RELY', 70),
('Renault', 71),
('Rolls-Royce', 72),
('Rover', 73),
('Saab', 74),
('Saturn', 75),
('Seat', 76),
('Shineray', 77),
('Smart', 78),
('SSANGYONG', 79),
('Subaru', 80),
('Suzuki', 81),
('TAC', 82),
('Toyota', 83),
('Troller', 84),
('Volvo', 85),
('VW - VolksWagen', 86),
('Wake', 87),
('Walk', 88);

-- Script para inserir novas marcas de moto
INSERT INTO `quoteflex`.`marca_veic` (`descr`, `cd`) VALUES
-- Marcas de moto
('Yamaha', 89),
('Kawasaki', 90),
('Harley-Davidson', 91),
('Ducati', 92),
('KTM', 93),
('Triumph', 94),
('Indian', 95),
('Royal Enfield', 96),
('MV Agusta', 97),
('Aprilia', 98),
('Moto Guzzi', 99),
('Benelli', 100),
('CFMoto', 101),
('Dafra', 102),
('Kasinski', 103);


-- Script para inserção de modelos de moto na tabela modelo_veic
INSERT INTO `quoteflex`.`modelo_veic` (`descr`) VALUES
-- Honda Motos
('CG 160'),
('CB 300F'),
('CB 500F'),
('CB 650R'),
('NXR 160 Bros'),
('XRE 300'),
('CRF 250F'),
('Africa Twin'),

-- Yamaha (precisa adicionar na tabela marca_veic primeiro)
('MT-03'),
('MT-07'),
('MT-09'),
('YZF-R3'),
('YZF-R1'),
('XTZ 250 Lander'),
('XMAX 300'),

-- Suzuki Motos
('GSX-S750'),
('GSX-R1000'),
('GSX-R750'),
('DR650'),
('V-Strom 650'),

-- Kawasaki (precisa adicionar na tabela marca_veic primeiro)
('Ninja 400'),
('Ninja 650'),
('Ninja ZX-6R'),
('Ninja ZX-10R'),
('Z900'),
('Versys 650'),

-- BMW Motos
('R 1250 GS'),
('S 1000 RR'),
('F 750 GS'),
('R nineT'),
('C 400 GT'),

-- Harley-Davidson (precisa adicionar na tabela marca_veic primeiro)
('Street 750'),
('Iron 883'),
('Fat Boy'),
('Road King'),
('Sportster'),

-- Ducati (precisa adicionar na tabela marca_veic primeiro)
('Panigale V4'),
('Monster 821'),
('Scrambler'),
('Multistrada'),
('Diavel'),

-- KTM (precisa adicionar na tabela marca_veic primeiro)
('Duke 390'),
('Duke 790'),
('RC 390'),
('Adventure 1090'),
('EXC 450'),

-- Triumph (precisa adicionar na tabela marca_veic primeiro)
('Street Triple'),
('Tiger 800'),
('Bonneville'),
('Rocket 3'),
('Speed Triple'),

-- Indian (precisa adicionar na tabela marca_veic primeiro)
('Scout'),
('Chief'),
('Chieftain'),
('Roadmaster'),

-- Royal Enfield (precisa adicionar na tabela marca_veic primeiro)
('Classic 350'),
('Interceptor 650'),
('Continental GT'),
('Himalayan'),

-- MV Agusta (precisa adicionar na tabela marca_veic primeiro)
('Brutale 800'),
('Dragster 800'),
('F3 800'),
('Turismo Veloce'),

-- Aprilia (precisa adicionar na tabela marca_veic primeiro)
('RSV4'),
('Tuono V4'),
('Shiver 900'),
('SXR 160'),

-- Moto Guzzi (precisa adicionar na tabela marca_veic primeiro)
('V7 Stone'),
('V9 Bobber'),
('V85 TT'),

-- Benelli (precisa adicionar na tabela marca_veic primeiro)
('TNT 600'),
('TRK 502'),
('Leoncino 500'),
('BN 302'),

-- CFMoto (precisa adicionar na tabela marca_veic primeiro)
('NK 650'),
('MT 800'),
('650 NK'),
('250 NK'),

-- Dafra (precisa adicionar na tabela marca_veic primeiro)
('Horizon 150'),
('Citycom 300'),
('Apache 200'),

-- Shineray Motos
('Storm 125'),
('Work 150'),
('Cyclone 250'),

-- Kasinski (precisa adicionar na tabela marca_veic primeiro)
('Mirage 250'),
('Explorer 250'),
('Custom 125');



#modelo_veic
-- Script para inserção de modelos de veículos na tabela modelo_veic
INSERT INTO `quoteflex`.`modelo_veic` (`descr`) VALUES
-- Honda
('Civic'),
('Accord'),
('CR-V'),
('HR-V'),
('Fit'),
('City'),
('WR-V'),

-- Toyota
('Corolla'),
('Hilux'),
('SW4'),
('Yaris'),
('Etios'),
('RAV4'),
('Camry'),
('Prius'),

-- Volkswagen
('Gol'),
('Polo'),
('Virtus'),
('T-Cross'),
('Nivus'),
('Taos'),
('Jetta'),
('Tiguan'),
('Amarok'),

-- Fiat
('Uno'),
('Mobi'),
('Argo'),
('Cronos'),
('Toro'),
('Strada'),
('Ducato'),
('Fiorino'),

-- Chevrolet
('Onix'),
('Prisma'),
('Cruze'),
('Tracker'),
('S10'),
('Spin'),
('Montana'),
('Cobalt'),

-- Ford
('Ka'),
('Fiesta'),
('Focus'),
('Fusion'),
('EcoSport'),
('Ranger'),
('Territory'),
('Mustang'),

-- Hyundai
('HB20'),
('Creta'),
('Tucson'),
('Santa Fe'),
('Azera'),
('i30'),

-- Nissan
('Kicks'),
('March'),
('Sentra'),
('Versa'),
('Frontier'),
('Leaf'),

-- Renault
('Kwid'),
('Sandero'),
('Logan'),
('Duster'),
('Captur'),
('Oroch'),

-- Jeep
('Renegade'),
('Compass'),
('Commander'),
('Wrangler'),
('Gladiator'),

-- BMW
('Série 1'),
('Série 3'),
('Série 5'),
('Série 7'),
('X1'),
('X3'),
('X5'),
('X6'),

-- Mercedes-Benz
('Classe A'),
('Classe C'),
('Classe E'),
('Classe S'),
('GLA'),
('GLC'),
('GLE'),
('GLS'),

-- Audi
('A1'),
('A3'),
('A4'),
('A5'),
('A6'),
('A7'),
('A8'),
('Q3'),
('Q5'),
('Q7'),

-- Volvo
('XC40'),
('XC60'),
('XC90'),
('S60'),
('S90'),

-- Mitsubishi
('L200'),
('Outlander'),
('ASX'),
('Eclipse Cross'),

-- Subaru
('Forester'),
('Outback'),
('XV'),
('Impreza'),
('WRX'),

-- Kia
('Cerato'),
('Sorento'),
('Sportage'),
('Soul'),
('Carnival'),

-- Citroën
('C3'),
('C4'),
('C4 Cactus'),
('Aircross'),
('C5'),

-- Peugeot
('208'),
('2008'),
('308'),
('3008'),
('5008'),

-- Land Rover
('Range Rover Evoque'),
('Range Rover Sport'),
('Range Rover Velar'),
('Defender'),
('Discovery'),

-- Porsche
('911'),
('Cayenne'),
('Macan'),
('Panamera'),
('Taycan'),

-- Lexus
('UX'),
('NX'),
('RX'),
('ES'),
('LS'),

-- Ferrari
('F8 Tributo'),
('Roma'),
('Portofino'),
('SF90 Stradale'),

-- Lamborghini
('Huracán'),
('Aventador'),
('Urus'),

-- Maserati
('Ghibli'),
('Quattroporte'),
('Levante'),
('MC20'),

-- Suzuki
('Jimny'),
('Vitara'),
('S-Cross'),
('Swift'),

-- RAM
('1500'),
('2500'),
('3500'),

-- Dodge
('Charger'),
('Challenger'),
('Durango'),

-- Chrysler
('300C'),
('Pacifica'),

-- Cadillac
('Escalade'),
('XT5'),
('CT5'),

-- Jaguar
('F-Pace'),
('E-Pace'),
('XE'),
('XF'),

-- Mini
('Cooper'),
('Countryman'),
('Clubman'),

-- Smart
('Fortwo'),
('Forfour'),

-- Volvo Caminhões
('FH'),
('FM'),
('VM');


-- Script para inserção de relacionamentos entre marcas e modelos de moto
INSERT INTO `quoteflex`.`marcaveic_modeloveic` (`marcaveic_id`, `modeloveic_id`) VALUES
-- Honda Motos (marcaveic_id: 38)
(38, 180),  -- CG 160
(38, 181),  -- CB 300F
(38, 182),  -- CB 500F
(38, 183),  -- CB 650R
(38, 184),  -- NXR 160 Bros
(38, 185),  -- XRE 300
(38, 186),  -- CRF 250F
(38, 187),  -- Africa Twin

-- Yamaha Motos (marcaveic_id: 89)
(89, 188),  -- MT-03
(89, 189),  -- MT-07
(89, 190),  -- MT-09
(89, 191),  -- YZF-R3
(89, 192),  -- YZF-R1
(89, 193),  -- XTZ 250 Lander
(89, 194),  -- XMAX 300

-- Suzuki Motos (marcaveic_id: 81)
(81, 195),  -- GSX-S750
(81, 196),  -- GSX-R1000
(81, 197),  -- GSX-R750
(81, 198),  -- DR650
(81, 199),  -- V-Strom 650

-- Kawasaki Motos (marcaveic_id: 90)
(90, 200),  -- Ninja 400
(90, 201),  -- Ninja 650
(90, 202),  -- Ninja ZX-6R
(90, 203),  -- Ninja ZX-10R
(90, 204),  -- Z900
(90, 205),  -- Versys 650

-- BMW Motos (marcaveic_id: 8)
(8, 206),   -- R 1250 GS
(8, 207),   -- S 1000 RR
(8, 208),   -- F 750 GS
(8, 209),   -- R nineT
(8, 210),   -- C 400 GT

-- Harley-Davidson (marcaveic_id: 91)
(91, 211),  -- Street 750
(91, 212),  -- Iron 883
(91, 213),  -- Fat Boy
(91, 214),  -- Road King
(91, 215),  -- Sportster

-- Ducati (marcaveic_id: 92)
(92, 216),  -- Panigale V4
(92, 217),  -- Monster 821
(92, 218),  -- Scrambler
(92, 219),  -- Multistrada
(92, 220),  -- Diavel

-- KTM (marcaveic_id: 93)
(93, 221),  -- Duke 390
(93, 222),  -- Duke 790
(93, 223),  -- RC 390
(93, 224),  -- Adventure 1090
(93, 225),  -- EXC 450

-- Triumph (marcaveic_id: 94)
(94, 226),  -- Street Triple
(94, 227),  -- Tiger 800
(94, 228),  -- Bonneville
(94, 229),  -- Rocket 3
(94, 230),  -- Speed Triple

-- Indian (marcaveic_id: 95)
(95, 231),  -- Scout
(95, 232),  -- Chief
(95, 233),  -- Chieftain
(95, 234),  -- Roadmaster

-- Royal Enfield (marcaveic_id: 96)
(96, 235),  -- Classic 350
(96, 236),  -- Interceptor 650
(96, 237),  -- Continental GT
(96, 238),  -- Himalayan

-- MV Agusta (marcaveic_id: 97)
(97, 239),  -- Brutale 800
(97, 240),  -- Dragster 800
(97, 241),  -- F3 800
(97, 242),  -- Turismo Veloce

-- Aprilia (marcaveic_id: 98)
(98, 243),  -- RSV4
(98, 244),  -- Tuono V4
(98, 245),  -- Shiver 900
(98, 246),  -- SXR 160

-- Moto Guzzi (marcaveic_id: 99)
(99, 247),  -- V7 Stone
(99, 248),  -- V9 Bobber
(99, 249),  -- V85 TT

-- Benelli (marcaveic_id: 100)
(100, 250), -- TNT 600
(100, 251), -- TRK 502
(100, 252), -- Leoncino 500
(100, 253), -- BN 302

-- CFMoto (marcaveic_id: 101)
(101, 254), -- NK 650
(101, 255), -- MT 800
(101, 256), -- 650 NK
(101, 257), -- 250 NK

-- Dafra (marcaveic_id: 102)
(102, 258), -- Horizon 150
(102, 259), -- Citycom 300
(102, 260), -- Apache 200

-- Shineray Motos (marcaveic_id: 77)
(77, 261),  -- Storm 125
(77, 262),  -- Work 150
(77, 263),  -- Cyclone 250

-- Kasinski (marcaveic_id: 103)
(103, 264), -- Mirage 250
(103, 265), -- Explorer 250
(103, 266); -- Custom 125

#marcaveic_modeloveic
INSERT INTO `quoteflex`.`marcaveic_modeloveic` (`marcaveic_id`, `modeloveic_id`) VALUES
-- Honda (marcaveic_id: 38)
(38, 1),   -- Civic
(38, 2),   -- Accord
(38, 3),   -- CR-V
(38, 4),   -- HR-V
(38, 5),   -- Fit
(38, 6),   -- City
(38, 7),   -- WR-V

-- Toyota (marcaveic_id: 83)
(83, 8),   -- Corolla
(83, 9),   -- Hilux
(83, 10),  -- SW4
(83, 11),  -- Yaris
(83, 12),  -- Etios
(83, 13),  -- RAV4
(83, 14),  -- Camry
(83, 15),  -- Prius

-- Volkswagen (marcaveic_id: 86)
(86, 16),  -- Gol
(86, 17),  -- Polo
(86, 18),  -- Virtus
(86, 19),  -- T-Cross
(86, 20),  -- Nivus
(86, 21),  -- Taos
(86, 22),  -- Jetta
(86, 23),  -- Tiguan
(86, 24),  -- Amarok

-- Fiat (marcaveic_id: 28)
(28, 25),  -- Uno
(28, 26),  -- Mobi
(28, 27),  -- Argo
(28, 28),  -- Cronos
(28, 29),  -- Toro
(28, 30),  -- Strada
(28, 31),  -- Ducato
(28, 32),  -- Fiorino

-- Chevrolet (marcaveic_id: 17)
(17, 33),  -- Onix
(17, 34),  -- Prisma
(17, 35),  -- Cruze
(17, 36),  -- Tracker
(17, 37),  -- S10
(17, 38),  -- Spin
(17, 39),  -- Montana
(17, 40),  -- Cobalt

-- Ford (marcaveic_id: 30)
(30, 41),  -- Ka
(30, 42),  -- Fiesta
(30, 43),  -- Focus
(30, 44),  -- Fusion
(30, 45),  -- EcoSport
(30, 46),  -- Ranger
(30, 47),  -- Territory
(30, 48),  -- Mustang

-- Hyundai (marcaveic_id: 39)
(39, 49),  -- HB20
(39, 50),  -- Creta
(39, 51),  -- Tucson
(39, 52),  -- Santa Fe
(39, 53),  -- Azera
(39, 54),  -- i30

-- Nissan (marcaveic_id: 64)
(64, 55),  -- Kicks
(64, 56),  -- March
(64, 57),  -- Sentra
(64, 58),  -- Versa
(64, 59),  -- Frontier
(64, 60),  -- Leaf

-- Renault (marcaveic_id: 71)
(71, 61),  -- Kwid
(71, 62),  -- Sandero
(71, 63),  -- Logan
(71, 64),  -- Duster
(71, 65),  -- Captur
(71, 66),  -- Oroch

-- Jeep (marcaveic_id: 43)
(43, 67),  -- Renegade
(43, 68),  -- Compass
(43, 69),  -- Commander
(43, 70),  -- Wrangler
(43, 71),  -- Gladiator

-- BMW (marcaveic_id: 8)
(8, 72),   -- Série 1
(8, 73),   -- Série 3
(8, 74),   -- Série 5
(8, 75),   -- Série 7
(8, 76),   -- X1
(8, 77),   -- X3
(8, 78),   -- X5
(8, 79),   -- X6

-- Mercedes-Benz (marcaveic_id: 58)
(58, 80),  -- Classe A
(58, 81),  -- Classe C
(58, 82),  -- Classe E
(58, 83),  -- Classe S
(58, 84),  -- GLA
(58, 85),  -- GLC
(58, 86),  -- GLE
(58, 87),  -- GLS

-- Audi (marcaveic_id: 7)
(7, 88),   -- A1
(7, 89),   -- A3
(7, 90),   -- A4
(7, 91),   -- A5
(7, 92),   -- A6
(7, 93),   -- A7
(7, 94),   -- A8
(7, 95),   -- Q3
(7, 96),   -- Q5
(7, 97),   -- Q7

-- Volvo (marcaveic_id: 85)
(85, 98),  -- XC40
(85, 99),  -- XC60
(85, 100), -- XC90
(85, 101), -- S60
(85, 102), -- S90

-- Mitsubishi (marcaveic_id: 62)
(62, 103), -- L200
(62, 104), -- Outlander
(62, 105), -- ASX
(62, 106), -- Eclipse Cross

-- Subaru (marcaveic_id: 80)
(80, 107), -- Forester
(80, 108), -- Outback
(80, 109), -- XV
(80, 110), -- Impreza
(80, 111), -- WRX

-- Kia (marcaveic_id: 46)
(46, 112), -- Cerato
(46, 113), -- Sorento
(46, 114), -- Sportage
(46, 115), -- Soul
(46, 116), -- Carnival

-- Citroën (marcaveic_id: 19)
(19, 117), -- C3
(19, 118), -- C4
(19, 119), -- C4 Cactus
(19, 120), -- Aircross
(19, 121), -- C5

-- Peugeot (marcaveic_id: 65)
(65, 122), -- 208
(65, 123), -- 2008
(65, 124), -- 308
(65, 125), -- 3008
(65, 126), -- 5008

-- Land Rover (marcaveic_id: 49)
(49, 127), -- Range Rover Evoque
(49, 128), -- Range Rover Sport
(49, 129), -- Range Rover Velar
(49, 130), -- Defender
(49, 131), -- Discovery

-- Porsche (marcaveic_id: 68)
(68, 132), -- 911
(68, 133), -- Cayenne
(68, 134), -- Macan
(68, 135), -- Panamera
(68, 136), -- Taycan

-- Lexus (marcaveic_id: 50)
(50, 137), -- UX
(50, 138), -- NX
(50, 139), -- RX
(50, 140), -- ES
(50, 141), -- LS

-- Ferrari (marcaveic_id: 27)
(27, 142), -- F8 Tributo
(27, 143), -- Roma
(27, 144), -- Portofino
(27, 145), -- SF90 Stradale

-- Lamborghini (marcaveic_id: 48)
(48, 146), -- Huracán
(48, 147), -- Aventador
(48, 148), -- Urus

-- Maserati (marcaveic_id: 55)
(55, 149), -- Ghibli
(55, 150), -- Quattroporte
(55, 151), -- Levante
(55, 152), -- MC20

-- Suzuki (marcaveic_id: 81)
(81, 153), -- Jimny
(81, 154), -- Vitara
(81, 155), -- S-Cross
(81, 156), -- Swift

-- RAM (marcaveic_id: 69)
(69, 157), -- 1500
(69, 158), -- 2500
(69, 159), -- 3500

-- Dodge (marcaveic_id: 23)
(23, 160), -- Charger
(23, 161), -- Challenger
(23, 162), -- Durango

-- Chrysler (marcaveic_id: 18)
(18, 163), -- 300C
(18, 164), -- Pacifica

-- Cadillac (marcaveic_id: 12)
(12, 165), -- Escalade
(12, 166), -- XT5
(12, 167), -- CT5

-- Jaguar (marcaveic_id: 42)
(42, 168), -- F-Pace
(42, 169), -- E-Pace
(42, 170), -- XE
(42, 171), -- XF

-- Mini (marcaveic_id: 61)
(61, 172), -- Cooper
(61, 173), -- Countryman
(61, 174), -- Clubman

-- Smart (marcaveic_id: 78)
(78, 175), -- Fortwo
(78, 176); -- Forfour

   