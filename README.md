# Mini Bot Conversacional (Chatbot)

Este proyecto es una aplicación **Full Stack** desarrollada para ofrecer respuestas automatizadas a consultas frecuentes de una empresa.

La aplicación está dividida en dos partes:

- **Frontend:** desarrollado con **Next.js** y **React**, encargado de la interfaz de usuario y la experiencia de interacción con el chatbot.
- **Backend:** una **API REST** construida con **Node.js** y **Express**, responsable de procesar las solicitudes y gestionar las respuestas del bot.

El chatbot permite responder preguntas predefinidas relacionadas con **horarios**, **ubicación**, **servicios**, **precios** y **contacto**, proporcionando respuestas rápidas y automatizadas.

---

## Funcionamiento del Chatbot

El chatbot funciona a partir de preguntas predefinidas almacenadas en la base de datos.  
Cuando el usuario realiza una consulta:

1. El frontend envía la pregunta al backend.
2. El backend procesa la consulta mediante un controlador.
3. Se busca la coincidencia en la base de datos.
4. Se devuelve la respuesta correspondiente al frontend.

## Stack Tecnológico

- Node.js
- Express
- Next.js
- React
- PostgreSQL
- dotenv

---

## Requisitos

- Node.js v18+
- npm, yarn o pnpm
- PostgreSQL

---

## Base de datos

### Tabla: `faq`

Almacena las preguntas frecuentes y sus respuestas asociadas.

| Campo    | Tipo    | Descripción           |
| -------- | ------- | --------------------- |
| id       | SERIAL  | Identificador único   |
| question | VARCHAR | Pregunta frecuente    |
| response | VARCHAR | Respuesta del chatbot |

### Tabla: `keyboard`

Contiene las palabras clave que pueden coincidir con las preguntas del usuario.

| Campo        | Tipo    | Descripción         |
| ------------ | ------- | ------------------- |
| id           | SERIAL  | Identificador único |
| keyword_name | VARCHAR | Palabra clave       |

### Tabla: `faq_keyboard`

Tabla intermedia que relaciona preguntas frecuentes con sus palabras clave.

| Campo      | Tipo   | Descripción             |
| ---------- | ------ | ----------------------- |
| id         | SERIAL | Identificador           |
| idFAQ      | INT    | Referencia a `faq`      |
| idKeyboard | INT    | Referencia a `keyboard` |

Relación muchos a muchos entre preguntas y palabras clave.

### Tabla: `log`

Registra las preguntas realizadas por los usuarios y si el sistema logró interpretarlas correctamente.

| Campo            | Tipo      | Descripción                        |
| ---------------- | --------- | ---------------------------------- |
| id               | SERIAL    | Identificador                      |
| message_question | TEXT      | Pregunta del usuario               |
| understood       | BOOLEAN   | Indica si se encontró coincidencia |
| matched_question | TEXT      | Pregunta detectada                 |
| matched_response | TEXT      | Respuesta enviada                  |
| created_at       | TIMESTAMP | Fecha de la consulta               |

### Tabla: `Funcion`

El sistema utiliza una función SQL que recibe un arreglo de palabras clave y:

- Busca coincidencias con las palabras clave registradas.
- Cuenta cuántas coincidencias tiene cada pregunta.
- Devuelve la pregunta con mayor número de coincidencias.
- Prioriza la respuesta más relevante para el usuario.

Este enfoque permite tolerar variaciones en la forma en que los usuarios formulan sus preguntas.

---

## Datos de prueba

El proyecto incluye preguntas frecuentes predefinidas, por ejemplo:

- Horarios de atención
- Ubicación de la empresa
- Información de contacto
- Servicios ofrecidos
- Precios y métodos de pago
- Soporte técnico y garantías

---

## Instalación

Clona el repositorio:

```bash
git clone https://github.com/tenoreo/Chatbot.git
cd chatbot

cd frontend
pnpm install

cd ../backend
pnpm install
```

## Ejecución

- **Frontend:**

```bash
pnpm run dev
```

- **Backend:**

```bash
pnpm start
```

## Endpoints

| Método | Ruta            | Descripción                          |
|--------|-----------------|--------------------------------------|
| GET    | /api/chat/query | Obtener la respuesta de la pregunta  |

## Estructura del proyecto

backend/
 ├── controllers/
 ├── DB/
 ├── routes/
 ├── utils/
 └── index.js

frontend/
 ├── public/
 ├── src/
 │   ├── app/
 │   └── components/
