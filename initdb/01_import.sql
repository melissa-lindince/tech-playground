COPY employees (
  nome,
  email,
  email_corporativo,
  area,
  cargo,
  funcao,
  localidade,
  tempo_de_empresa,
  genero,
  geracao,
  n0_empresa,
  n1_diretoria,
  n2_gerencia,
  n3_coordenacao,
  n4_area,
  data_resposta,
  interesse_no_cargo,
  comentarios_interesse,
  contribuicao,
  comentarios_contribuicao,
  aprendizado_desenvolvimento,
  comentarios_aprendizado,
  feedback,
  comentarios_feedback,
  interacao_gestor,
  comentarios_interacao,
  clareza_carreira,
  comentarios_carreira,
  expectativa_permanencia,
  comentarios_permanencia,
  enps,
  enps_aberto
)
FROM '/docker-entrypoint-initdb.d/data.csv'
DELIMITER ';'
CSV HEADER;
NULL '-';
