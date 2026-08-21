export function success(res, message, data = {}, status = 200, extra = {}) {
  return res.status(status).json({ success: true, message, data, ...extra });
}

export function created(res, message, data = {}) {
  return success(res, message, data, 201);
}

export function fail(res, message, errors = {}, status = 400) {
  return res.status(status).json({ success: false, message, errors });
}
