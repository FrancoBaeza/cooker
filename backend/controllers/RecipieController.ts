import { createOne, updateOne, deleteOne, getAll, getOne } from "../util/handlerFactory";
import Recipie from "../models/Recipie";

export const createRecipie = createOne(Recipie);
export const updateRecipie = updateOne(Recipie);
export const deleteRecipie = deleteOne(Recipie);
export const getAllRecipies = getAll(Recipie);
export const getRecipie = getOne(Recipie);

