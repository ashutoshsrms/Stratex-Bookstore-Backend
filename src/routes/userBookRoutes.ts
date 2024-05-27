import express from "express";
import { getAllBooks, getBookDetails } from "../controllers/userBookController";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/books", authenticate, getAllBooks);
router.get("/books/:id", authenticate, getBookDetails);

export default router;
