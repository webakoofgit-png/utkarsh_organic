import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { Admin, Permission, Role } from "../models/index.js";
import { AppError, forbidden } from "../utils/errors.js";

function permissionNames(admin) {
  const roles = admin.Roles || [];
  return roles.flatMap((role) => (role.Permissions || []).map((permission) => permission.name));
}

export async function authenticate(req, _res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : req.cookies?.accessToken;

    if (!token) return next(new AppError("Authentication required", 401));

    const decoded = jwt.verify(token, env.jwtSecret);
    const admin = await Admin.findByPk(decoded.id, {
      include: [{ model: Role, include: [Permission] }],
    });

    if (!admin || !admin.isActive) return next(new AppError("Admin account is not active", 401));

    req.admin = admin;
    req.permissions = permissionNames(admin);
    req.roles = (admin.Roles || []).map((role) => role.slug);
    next();
  } catch (error) {
    next(error);
  }
}

export function authorize(...requiredPermissions) {
  return (req, _res, next) => {
    if (!req.admin) return next(new AppError("Authentication required", 401));
    if (req.roles?.includes("super-admin")) return next();
    if (!requiredPermissions.length) return next();

    const allowed = requiredPermissions.some((permission) => req.permissions?.includes(permission));
    if (!allowed) return next(forbidden());
    next();
  };
}
