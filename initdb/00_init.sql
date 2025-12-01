CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE employees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  email_corporativo TEXT,

  area TEXT,
  cargo TEXT,
  funcao TEXT,
  localidade TEXT,

  tempo_de_empresa TEXT,
  genero TEXT,
  geracao TEXT,

  n0_empresa TEXT,
  n1_diretoria TEXT,
  n2_gerencia TEXT,
  n3_coordenacao TEXT,
  n4_area TEXT,

  data_resposta DATE NOT NULL,

  interesse_no_cargo INTEGER CHECK (interesse_no_cargo BETWEEN 0 AND 10),
  comentarios_interesse TEXT,

  contribuicao INTEGER CHECK (contribuicao BETWEEN 0 AND 10),
  comentarios_contribuicao TEXT,

  aprendizado_desenvolvimento INTEGER CHECK (aprendizado_desenvolvimento BETWEEN 0 AND 10),
  comentarios_aprendizado TEXT,

  feedback INTEGER CHECK (feedback BETWEEN 0 AND 10),
  comentarios_feedback TEXT,

  interacao_gestor INTEGER CHECK (interacao_gestor BETWEEN 0 AND 10),
  comentarios_interacao TEXT,

  clareza_carreira INTEGER CHECK (clareza_carreira BETWEEN 0 AND 10),
  comentarios_carreira TEXT,

  expectativa_permanencia INTEGER CHECK (expectativa_permanencia BETWEEN 0 AND 10),
  comentarios_permanencia TEXT,

  enps INTEGER CHECK (enps BETWEEN 0 AND 10),
  enps_aberto TEXT
);
