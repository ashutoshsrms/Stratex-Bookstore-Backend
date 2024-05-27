import { IUser } from "../../models/userModel"; // Adjust the path as needed

declare module "express-serve-static-core" {
  interface Request {
    user?: IUser & { id: string };
  }
}
