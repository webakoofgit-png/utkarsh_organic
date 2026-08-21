import { Router } from "express";
import {
  changePassword,
  forgotPassword,
  login,
  logout,
  profile,
  refresh,
  resetPassword,
  updateProfile,
} from "../controllers/authController.js";
import { authenticate } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  changePasswordSchema,
  forgotPasswordSchema,
  loginSchema,
  refreshSchema,
  resetPasswordSchema,
  updateProfileSchema,
} from "../validations/authSchemas.js";

const router = Router();

router.post("/login", validate(loginSchema), asyncHandler(login));
router.post("/refresh", validate(refreshSchema), asyncHandler(refresh));
router.post("/forgot-password", validate(forgotPasswordSchema), asyncHandler(forgotPassword));
router.post("/reset-password", validate(resetPasswordSchema), asyncHandler(resetPassword));
router.post("/logout", asyncHandler(logout));

router.use(authenticate);
router.get("/profile", asyncHandler(profile));
router.patch("/profile", validate(updateProfileSchema), asyncHandler(updateProfile));
router.post("/change-password", validate(changePasswordSchema), asyncHandler(changePassword));

export default router;
