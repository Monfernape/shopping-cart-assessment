import { Request, Response, NextFunction } from "express";
import { Database } from "../../repositories";
import { NotFoundError } from "../../bootstrap/middlewares/NotFoundError";

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await Database.userRepository.updateUser(req.body);
    res.status(200).send({ message: "User Updated" });
  } catch (error) {
    next(new NotFoundError());
  }
};
