import { Request, Response, NextFunction } from "express";
import { Database } from "../../repositories";
import { BadRequestError } from "../../bootstrap/middlewares/BadRequestError";
import { LeanDocument } from "mongoose";
import { UserDocument } from "../../interfaces";

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {id} = req.params
    const user = await Database.userRepository.getUserById(id) as LeanDocument<UserDocument>
    const { password, ...userData} = user;
    res.status(200).send({ message: "User Updated", data: userData });
  } catch (error) {
    next(new BadRequestError());
  }
};
