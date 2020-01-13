import { RequestHandler } from 'express';

import { WrongAuthenticationTokenError, AuthenticationTokenMissingError } from '../errors';
import User from '../models/User';
import { IAuthenticateRequest } from '../interfaces/request';
import { verifyToken } from '../services/jwt';

const authMiddleware: RequestHandler = async (req: IAuthenticateRequest, res, next) => {
  const cookies = req.cookies;
  const headers = req.headers;

  const bearerToken: string = cookies?.Authorization ?? headers?.authorization;
  if (bearerToken) {
    try {
      const [, token] = bearerToken.split(' ');
      const data = (await verifyToken(token)) as { [key: string]: string };
      if (data) {
        const user = await User.findById(data.id);
        if (!user) {
          next(new WrongAuthenticationTokenError());
        }
        req.user = user;
        next();
      } else {
        next(new WrongAuthenticationTokenError());
      }
    } catch (error) {
      next(new WrongAuthenticationTokenError());
    }
  } else {
    next(new AuthenticationTokenMissingError());
  }
};

export default authMiddleware;
