import { hash, compare } from 'bcrypt';

import config from '../config/config';

export const hashPassword = async (password: string | Buffer | object) => await hash(password, config.BCRYPT_N_ROUNDS);
export const comparePassword = async (password: string | Buffer | object, hash: string) =>
  await compare(password, hash);
