import fs from "fs";
import path from "path";
import { Media } from "../models/index.js";
import { created, success } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { publicUploadUrl } from "../middleware/upload.js";
import { notFound } from "../utils/errors.js";

export const uploadMedia = asyncHandler(async (req, res) => {
  const files = req.files?.length ? req.files : req.file ? [req.file] : [];
  const rows = await Promise.all(
    files.map((file) =>
      Media.create({
        filename: file.filename,
        originalName: file.originalname,
        url: publicUploadUrl(req, file.filename),
        mimeType: file.mimetype,
        size: file.size,
        uploadedBy: req.admin?.id,
      })
    )
  );
  return created(res, "Media uploaded", rows);
});

export const deleteMedia = asyncHandler(async (req, res) => {
  const media = await Media.findByPk(req.params.id);
  if (!media) throw notFound("Media not found");
  const filePath = path.resolve(process.cwd(), "uploads", media.filename);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  await media.destroy();
  return success(res, "Media deleted");
});
