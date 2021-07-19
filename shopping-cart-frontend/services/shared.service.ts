import { User } from "../models";

export const getUserId = (): string => {
    const user = localStorage.getItem('user')
    const serializedUser: User = JSON.parse(user as string);
    return serializedUser._id as string
}