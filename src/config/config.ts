import { CleanEnv, str, port, url, cleanEnv } from 'envalid';

type Environment = {
  NODE_ENV: string;
  PORT: number;
  MONGO_URL: string;
};

export type Config = Readonly<Environment & CleanEnv>;

const config: Config = cleanEnv<Environment>(process.env, {
  NODE_ENV: str({ choices: ['production', 'test', 'development'] }),
  PORT: port(),
  MONGO_URL: url(),
});

export default config;
