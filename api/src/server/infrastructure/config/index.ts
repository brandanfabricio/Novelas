if (process.env.NODE_ENV !== "production") {
  require('dotenv').config()

}

export const PORT: number = Number(process.env.PORT) || 3000;

export const MysqlDBConfig = {
  host: process.env.HOST || '192.168.1.16',
  user: process.env.USER || '',
  password: process.env.PASS || '',
  port: Number(process.env.PORT_DB),
  database: process.env.DB || '',
  multipleStatements: true
}

export const ClaveToken = process.env.SECRETOTOKEN || "palabraSecreta";
