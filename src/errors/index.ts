export class ApplicationError extends Error {
  constructor(public message = 'Internal server error', public status = 500, public code = 'INTERNAL_SERVER_ERROR') {
    super();
  }
}

export class AuthenticationTokenMissingError extends ApplicationError {
  constructor(
    public message = 'Authentication Token Missing',
    public status = 401,
    public code = 'AUTHENTICATION_TOKEN_MISSING',
  ) {
    super();
  }
}

export class WrongAuthenticationTokenError extends ApplicationError {
  constructor(
    public message = 'Wrong Authentication Token',
    public status = 401,
    public code = 'WRONG_AUTHENTICATION_TOKEN',
  ) {
    super();
  }
}
