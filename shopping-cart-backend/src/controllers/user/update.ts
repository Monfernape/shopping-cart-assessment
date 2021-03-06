import { Request, Response, NextFunction } from "express";
import { Database } from "../../repositories";
import { BadRequestError } from "../../bootstrap/middlewares/BadRequestError";
import { LeanDocument } from "mongoose";
import { UserDocument } from "../../interfaces";

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id, firstName, username, lastName } = req.body
    const user = await Database.userRepository.getUserById(_id) as LeanDocument<UserDocument>
    user.firstName = firstName;
    user.lastName = lastName;
    user.username = username
    const updatedUser = await Database.userRepository.updateUser(user) as UserDocument;
    const { password, ...userData} = updatedUser.toObject()
    res.status(200).send({ message: "User Updated", data: userData });
  } catch (error) {
    next(new BadRequestError());
  }
};
