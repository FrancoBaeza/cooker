import { NextApiRequest, NextApiResponse } from "next";

import { createOne, updateOne, deleteOne, getAll, getOne } from "../util/handlerFactory";
import Recipe from "../models/Recipe";
import AppError from "../util/appError";

export const createRecipe = createOne(Recipe);
export const updateRecipe = updateOne(Recipe);
export const deleteRecipe = deleteOne(Recipe);
export const getAllRecipes = getAll(Recipe);
export const getRecipe = getOne(Recipe);

export const getUserRecipes = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;

    const recipes = await Recipe.find({ user: id }).populate({
        path: "ingredients",
        select: "-__v",
        });

    res.status(200).json({
        status: "success",
        results: recipes.length,
        data: {
            recipes,
        },
    });
}