import { Request, Response, NextFunction } from "express";
import { Database } from "../../repositories";
import bcrypt from "bcrypt";
import { NotFoundError } from "../../bootstrap/middlewares/NotFoundError";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password, firstName, lastName } = req.body;

  if (!username || !password) next(new NotFoundError());
  const userExists = await Database.userRepository.findUser(username);
  if (userExists) next(new NotFoundError("User with same name already exist"));

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await Database.userRepository.signup({
      ...req.body,
      password: hashedPassword,
    });
    const cart: any = {userId: user._id, products: []}
    await Database.cartRepository.createCart(cart)
    res.status(200).send({ message: "User created" });
  } catch (error) {
    next(new NotFoundError());
  }
};
