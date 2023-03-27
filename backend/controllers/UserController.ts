import { createOne, updateOne, deleteOne, getAll, getOne } from "../util/handlerFactory";
import User from "../models/User";

export const createUser = createOne(User);
export const updateUser = updateOne(User);
export const deleteUser = deleteOne(User);
export const getAllUsers = getAll(User);
export const getUser = getOne(User);

