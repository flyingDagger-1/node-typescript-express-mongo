import { sign, SignOptions, verify, VerifyOptions } from 'jsonwebtoken';
import moment from 'moment';

import config from '../config/config';

const SECRET_HEX = config.SECRET_HEX;
const ACCESS_TOKEN_LIFETIME_MIN = config.ACCESS_TOKEN_LIFETIME_MIN;

export const signPayload = (payload: string | Buffer | object): Promise<string> =>
  new Promise((resolve, reject) => {
    const signOptions: SignOptions = {
      expiresIn: moment()
        .add(ACCESS_TOKEN_LIFETIME_MIN, 'minutes')
        .unix(),
    };
    try {
      const token = sign(payload, SECRET_HEX, signOptions);
      resolve(token);
    } catch (error) {
      reject(error);
    }
  });

export const verifyToken = (token: string): Promise<object | string> =>
  new Promise((resolve, reject) => {
    const verifyOptions: VerifyOptions = {};
    try {
      const payload = verify(token, SECRET_HEX, verifyOptions);
      resolve(payload);
    } catch (error) {
      reject(error);
    }
  });
