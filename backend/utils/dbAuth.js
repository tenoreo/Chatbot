import dotenv from "dotenv";
dotenv.config();

import { Pool } from "pg";

const pool = new Pool({
  user: process.env.USER_DB,
  host: process.env.HOST_DB,
  database: process.env.DB_NAME,
  password: process.env.PASSWORD_DB,
  port: process.env.PORT_DB,
  // CONFIGURACIÓN DE LÍMITES
  max: 30, // Máximo de clientes/conexiones simultáneas en el pool
  idleTimeoutMillis: 30000, // Tiempo antes de cerrar una conexión inactiva (30 seg)
  connectionTimeoutMillis: 2000, // Tiempo máximo para esperar una conexión disponible (2 seg)
});
export default pool;
