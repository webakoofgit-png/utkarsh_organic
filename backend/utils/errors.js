export class AppError extends Error {
  constructor(message, status = 400, errors = {}) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}

export function notFound(message = "Record not found") {
  return new AppError(message, 404);
}

export function forbidden(message = "You do not have permission to perform this action") {
  return new AppError(message, 403);
}
