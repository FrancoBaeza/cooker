import { NextApiRequest, NextApiResponse } from "next";

import { createOne, updateOne, deleteOne, getAll, getOne } from "../util/handlerFactory";
import User from "../models/User";
import catchAsync from "../util/catchAsync";

export const createUser = createOne(User);
export const updateUser = updateOne(User);
export const deleteUser = deleteOne(User);
export const getAllUsers = getAll(User);
export const getUser = getOne(User);

export const updateFridge =  catchAsync( async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    const { fridge } = req.body;

    console.log("updateFridge: ", fridge, " id: ", id)

    // update the user's fridge
    const updatedUser = await User.findByIdAndUpdate(id, { fridge }, { new: true });

    res.status(200).json({
        status: "success",
        data: {
            data: updatedUser,
        },
    });
})


