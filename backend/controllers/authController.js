import crypto from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { Admin, PasswordResetToken, Permission, RefreshToken, Role } from "../models/index.js";
import { created, success } from "../utils/apiResponse.js";
import { AppError } from "../utils/errors.js";

function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function ttlToDate(ttl) {
  const match = String(ttl).match(/^(\d+)([mhd])$/);
  const amount = match ? Number(match[1]) : 7;
  const unit = match ? match[2] : "d";
  const multiplier = unit === "m" ? 60 * 1000 : unit === "h" ? 60 * 60 * 1000 : 24 * 60 * 60 * 1000;
  return new Date(Date.now() + amount * multiplier);
}

function adminPermissions(admin) {
  return (admin.Roles || []).flatMap((role) => (role.Permissions || []).map((permission) => permission.name));
}

function serializeAdmin(admin) {
  const plain = admin.toJSON();
  delete plain.passwordHash;
  delete plain.Roles;
  return {
    ...plain,
    roles: (admin.Roles || []).map((role) => ({ id: role.id, name: role.name, slug: role.slug })),
    permissions: adminPermissions(admin),
  };
}

async function adminWithRoles(id, withPassword = false) {
  const model = withPassword ? Admin.scope("withPassword") : Admin;
  return model.findByPk(id, { include: [{ model: Role, include: [Permission] }] });
}

async function issueTokens(admin) {
  const fresh = await adminWithRoles(admin.id);
  const roles = (fresh.Roles || []).map((role) => role.slug);
  const permissions = roles.includes("super-admin") ? ["*"] : adminPermissions(fresh);
  const payload = { id: fresh.id, email: fresh.email, roles, permissions };
  const accessToken = jwt.sign(payload, env.jwtSecret, { expiresIn: env.accessTokenTtl });
  const refreshToken = jwt.sign({ id: fresh.id, type: "refresh" }, env.jwtRefreshSecret, { expiresIn: env.refreshTokenTtl });
  await RefreshToken.create({
    adminId: fresh.id,
    tokenHash: hashToken(refreshToken),
    expiresAt: ttlToDate(env.refreshTokenTtl),
  });
  return { accessToken, refreshToken, admin: serializeAdmin(fresh) };
}

export async function login(req, res) {
  const admin = await Admin.scope("withPassword").findOne({
    where: { email: req.body.email },
    include: [{ model: Role, include: [Permission] }],
  });
  if (!admin || !admin.isActive) throw new AppError("Invalid email or password", 401);
  const ok = await bcrypt.compare(req.body.password, admin.passwordHash);
  if (!ok) throw new AppError("Invalid email or password", 401);

  admin.lastLoginAt = new Date();
  await admin.save();
  const data = await issueTokens(admin);
  return success(res, "Logged in successfully", data);
}

export async function refresh(req, res) {
  const token = req.body.refreshToken || req.cookies?.refreshToken;
  if (!token) throw new AppError("Refresh token required", 401);
  const decoded = jwt.verify(token, env.jwtRefreshSecret);
  const row = await RefreshToken.findOne({ where: { tokenHash: hashToken(token), adminId: decoded.id, revokedAt: null } });
  if (!row || new Date(row.expiresAt) < new Date()) throw new AppError("Refresh token is invalid or expired", 401);
  await row.update({ revokedAt: new Date() });
  const admin = await adminWithRoles(decoded.id);
  if (!admin || !admin.isActive) throw new AppError("Admin account is not active", 401);
  const data = await issueTokens(admin);
  return success(res, "Token refreshed", data);
}

export async function logout(req, res) {
  const token = req.body.refreshToken || req.cookies?.refreshToken;
  if (token) await RefreshToken.update({ revokedAt: new Date() }, { where: { tokenHash: hashToken(token) } });
  return success(res, "Logged out successfully");
}

export async function profile(req, res) {
  const admin = await adminWithRoles(req.admin.id);
  return success(res, "Profile loaded", serializeAdmin(admin));
}

export async function updateProfile(req, res) {
  await req.admin.update(req.body);
  const admin = await adminWithRoles(req.admin.id);
  return success(res, "Profile updated", serializeAdmin(admin));
}

export async function changePassword(req, res) {
  const admin = await adminWithRoles(req.admin.id, true);
  const ok = await bcrypt.compare(req.body.currentPassword, admin.passwordHash);
  if (!ok) throw new AppError("Current password is incorrect", 422);
  admin.passwordHash = await bcrypt.hash(req.body.newPassword, 12);
  admin.forcePasswordChange = false;
  await admin.save();
  await RefreshToken.update({ revokedAt: new Date() }, { where: { adminId: admin.id, revokedAt: null } });
  return success(res, "Password changed successfully");
}

export async function forgotPassword(req, res) {
  const admin = await Admin.findOne({ where: { email: req.body.email } });
  if (!admin) return success(res, "If the email exists, a reset link will be generated");
  const token = crypto.randomBytes(32).toString("hex");
  await PasswordResetToken.create({
    adminId: admin.id,
    tokenHash: hashToken(token),
    expiresAt: new Date(Date.now() + 30 * 60 * 1000),
  });
  const data = env.nodeEnv === "production" ? {} : { resetToken: token };
  return created(res, "Password reset token generated", data);
}

export async function resetPassword(req, res) {
  const row = await PasswordResetToken.findOne({ where: { tokenHash: hashToken(req.body.token), usedAt: null } });
  if (!row || new Date(row.expiresAt) < new Date()) throw new AppError("Reset token is invalid or expired", 422);
  const admin = await Admin.scope("withPassword").findByPk(row.adminId);
  if (!admin) throw new AppError("Admin account not found", 404);
  admin.passwordHash = await bcrypt.hash(req.body.newPassword, 12);
  admin.forcePasswordChange = false;
  await admin.save();
  row.usedAt = new Date();
  await row.save();
  await RefreshToken.update({ revokedAt: new Date() }, { where: { adminId: admin.id, revokedAt: null } });
  return success(res, "Password reset successfully");
}
