import { UserDocument } from "../interfaces";
import { User } from "../models/user";

export class UserRepository {
  getUsers = async () => {
    return await User.find();
  };

  findUser = async (username: string) => {
    return await User.findOne({ username });
  };

  getUserById = async (id: string) => {
    return await User.findById(id).populate('spendingHistory').lean().exec();
  };

  signup = async (userData: UserDocument) => {
    return await new User(userData).save();
  };

  updateUser = async (user: UserDocument) => {
    return await User.findByIdAndUpdate(user._id, user);
  };
}
