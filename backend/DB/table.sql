-- preguntas que se haran al bot
-- contiene la preguntas
-- contiene una lista de palabras claves que puede resultar coincidencia con lo que quieren preguntar
-- la respuesta de la coincidencias
CREATE TABLE faq (
  id SERIAL PRIMARY KEY,
  question VARCHAR(255) NOT NULL,
  response VARCHAR(255) NOT NULL
);

CREATE TABLE keyboard(
  id SERIAL PRIMARY KEY,
  keyword_name VARCHAR(20) NOT NULL
);

CREATE TABLE faq_keyboard(
  id SERIAL PRIMARY KEY,
  idFAQ INT REFERENCES faq(id),
  idKeyboard INT REFERENCES keyboard(id)
);

-- las preguntas que realiza el usuario ya sea que coincide con una pregunta
CREATE TABLE log(
    id SERIAL PRIMARY KEY,
    message_question TEXT NOT NULL,
    understood BOOLEAN NOT NULL,
    matched_question TEXT,
    matched_response TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);