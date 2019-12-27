export class ApplicationError extends Error {
  constructor(public message = 'Internal server error', public status = 500, public code = 'INTERNAL_SERVER_ERROR') {
    super();
  }
}
