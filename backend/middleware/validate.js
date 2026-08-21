import { AppError } from "../utils/errors.js";

export function validate(schema, source = "body") {
  return (req, _res, next) => {
    const { error, value } = schema.validate(req[source], {
      abortEarly: false,
      allowUnknown: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = {};
      for (const item of error.details) {
        errors[item.path.join(".")] = item.message;
      }
      return next(new AppError("Validation failed", 422, errors));
    }

    req[source] = value;
    next();
  };
}
