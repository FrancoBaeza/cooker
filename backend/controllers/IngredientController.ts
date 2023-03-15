import { createOne, updateOne, deleteOne, getAll, getOne } from "../util/handlerFactory";
import Ingredient from "../models/Ingredient";

export const createIngredient = createOne(Ingredient);
export const updateIngredient = updateOne(Ingredient);
export const deleteIngredient = deleteOne(Ingredient);
export const getAllIngredients = getAll(Ingredient);
export const getIngredient = getOne(Ingredient);

