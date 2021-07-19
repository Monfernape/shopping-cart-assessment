import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { Database } from "../../repositories";
import { BadRequestError } from "../../bootstrap/middlewares/BadRequestError";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;
  if (!username || !password) next(new BadRequestError());

  try {
    const user = await Database.userRepository.findUser(username);
    if (!user) next(new BadRequestError("User Not Found"));
    const passwordMatched = await bcrypt.compare(password, user!.password);
    if (passwordMatched) {
      let { password, ...userData } = user!.toObject();
      res.status(200).send(userData);
    } else res.status(401).send("Credentials Not Correct");
  } catch {
    next(new BadRequestError());
  }
};
