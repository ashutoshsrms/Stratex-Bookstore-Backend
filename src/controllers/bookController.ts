import { Request, Response } from "express";
import Book from "../models/bookModel";
import { parseCSV } from "../utils/csvParser";
import { IBook } from "../types/express/book";

export const uploadBooks = async (req: Request, res: Response) => {
  try {
    if (!req.user?.isSeller) {
      return res.status(403).json({ error: "Only sellers can upload books" });
    }
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const books: IBook[] = await parseCSV(req.file.path);
    const booksWithSeller = books.map((book) => ({
      ...book,
      seller: req.user.id,
    }));
    await Book.insertMany(booksWithSeller);
    res.status(201).json({ message: "Books uploaded successfully" });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(400).json({ error: errorMessage });
  }
};

export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find({ seller: req.user?.id });
    res.status(200).json({ data: books });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(400).json({ error: errorMessage });
  }
};

export const getBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findOne({
      _id: req.params.id,
      seller: req.user?.id,
    });
    if (!book) {
      return res
        .status(404)
        .json({ message: "Book not found or not authorized" });
    }
    res.status(200).json(book);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(400).json({ error: errorMessage });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findOneAndUpdate(
      { _id: req.params.id, seller: req.user?.id },
      req.body,
      { new: true }
    );
    if (!book) {
      return res
        .status(404)
        .json({ message: "Book not found or not authorized" });
    }
    res.status(200).json(book);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(400).json({ error: errorMessage });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findOneAndDelete({
      _id: req.params.id,
      seller: req.user?.id,
    });
    if (!book) {
      return res
        .status(404)
        .json({ message: "Book not found or not authorized" });
    }
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(400).json({ error: errorMessage });
  }
};
