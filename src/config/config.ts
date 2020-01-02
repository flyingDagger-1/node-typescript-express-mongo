import { CleanEnv, str, port, url, cleanEnv, makeValidator, num } from 'envalid';

type Environment = {
  NODE_ENV: string;
  PORT: number;
  MONGO_URL: string;
  SECRET_HEX: string;
  ACCESS_TOKEN_LIFETIME_MIN: number;
  BCRYPT_N_ROUNDS: number;
};

const strHex64 = makeValidator<string>(x => {
  if (/^[0-9a-f]{64}$/.test(x)) {
    return x;
  }
  throw new Error('Expected a hex-character string of length 64');
});

export type Config = Readonly<Environment & CleanEnv>;

const config: Config = cleanEnv<Environment>(process.env, {
  NODE_ENV: str({ choices: ['production', 'test', 'development'] }),
  PORT: port(),
  MONGO_URL: url(),
  SECRET_HEX: strHex64(),
  ACCESS_TOKEN_LIFETIME_MIN: num(),
  BCRYPT_N_ROUNDS: num(),
});

export default config;
