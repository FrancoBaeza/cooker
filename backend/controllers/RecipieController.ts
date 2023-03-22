import { createOne, updateOne, deleteOne, getAll, getOne } from "../util/handlerFactory";
import Recipe from "../models/Recipe";

export const createRecipe = createOne(Recipe);
export const updateRecipe = updateOne(Recipe);
export const deleteRecipe = deleteOne(Recipe);
export const getAllRecipes = getAll(Recipe);
export const getRecipe = getOne(Recipe);

