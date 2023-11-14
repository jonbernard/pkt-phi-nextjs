const path = require('path');

module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', '127.0.0.1'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'database'),
      user: env('DATABASE_USERNAME', 'local'),
      password: env('DATABASE_PASSWORD', 'local'),
      schema: env('DATABASE_SCHEMA', 'public'), // Not required
      ...(env.bool('DATABASE_SSL', true) ? {
        ssl: {
          rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false), // For self-signed certificates
        },
      } : {}),

    },
    debug: false,
  },
});