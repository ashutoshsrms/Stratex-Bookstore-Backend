import express from "express";
import {
  uploadBooks,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
} from "../controllers/bookController";
import { authenticate } from "../middleware/authMiddleware";
import multer from "multer";

const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.post("/upload", authenticate, upload.single("file"), uploadBooks);
router.get("/", authenticate, getBooks);
router.get("/:id", authenticate, getBook);
router.put("/:id", authenticate, updateBook);
router.delete("/:id", authenticate, deleteBook);

export default router;
