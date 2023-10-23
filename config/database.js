/* eslint-disable no-undef */
// POSTGRES_URL="postgres://default:9ycmYw1lLHeM@ep-shiny-shadow-515199-pooler.ap-southeast-1.postgres.vercel-storage.com:5432/verceldb"
// POSTGRES_PRISMA_URL="postgres://default:9ycmYw1lLHeM@ep-shiny-shadow-515199-pooler.ap-southeast-1.postgres.vercel-storage.com:5432/verceldb?pgbouncer=true&connect_timeout=15"
// POSTGRES_URL_NON_POOLING="postgres://default:9ycmYw1lLHeM@ep-shiny-shadow-515199.ap-southeast-1.postgres.vercel-storage.com:5432/verceldb"
// POSTGRES_USER="default"
// POSTGRES_HOST="ep-shiny-shadow-515199-pooler.ap-southeast-1.postgres.vercel-storage.com"
// POSTGRES_PASSWORD="9ycmYw1lLHeM"
// POSTGRES_DATABASE="verceldb"
const {
  DB_USER = "a2.1900158",
  DB_PASSWORD = "iXtO0o2ubVIJ",
  DB_HOST = "ep-frosty-smoke-76623216.us-east-2.aws.neon.tech",
  DB_NAME = "neondb",
  DB_PORT = "5432",
} = process.env;

module.exports = {
  development: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: `${DB_NAME}`,
    host: DB_HOST,
    port: DB_PORT,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
          require: true,
          rejectUnauthorized: false
      }
   },
  },
  test: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: `${DB_NAME}`,
    host: DB_HOST,
    port: DB_PORT,
    dialect: "postgres",
  },
  production: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: `${DB_NAME}`,
    host: DB_HOST,
    port: DB_PORT,
    dialect: "postgres",
  },
};
