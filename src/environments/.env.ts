export const EnvConfiguration = () => {

  const ENVIRONMENT_DATABASE_IMPETU = process.env.DATABASE_IMPETU ? JSON.parse(process.env.DATABASE_IMPETU) : {};
  const ENVIRONMENT_JWT = process.env.JWT ? JSON.parse(process.env.JWT) : {};

  return {
    environment: 'dev',
    impetu_database: {
      host: ENVIRONMENT_DATABASE_IMPETU.host,
      port: ENVIRONMENT_DATABASE_IMPETU.port,
      user: ENVIRONMENT_DATABASE_IMPETU.user,
      password: ENVIRONMENT_DATABASE_IMPETU.password,
      database: ENVIRONMENT_DATABASE_IMPETU.database,
    },
    jwt: {
      secret: ENVIRONMENT_JWT.secret,
      expiresIn: ENVIRONMENT_JWT.expiresIn,
    }
  };
};
