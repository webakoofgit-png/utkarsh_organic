import { fail } from "../utils/apiResponse.js";

export function notFoundHandler(req, res) {
  return fail(res, `Route not found: ${req.method} ${req.originalUrl}`, {}, 404);
}

export function errorHandler(error, req, res, _next) {
  const status = error.status || 500;

  if (error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
    const errors = {};
    for (const item of error.errors || []) errors[item.path] = item.message;
    return fail(res, "Validation failed", errors, 422);
  }

  if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
    return fail(res, "Authentication token is invalid or expired", {}, 401);
  }

  if (status >= 500) {
    console.error(error);
  }

  return fail(res, error.message || "Something went wrong", error.errors || {}, status);
}
