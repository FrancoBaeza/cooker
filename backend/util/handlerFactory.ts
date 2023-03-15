import { NextApiRequest, NextApiResponse } from "next";

import {Model, Document} from 'mongoose';

import catchAsync from "./catchAsync";
import AppError from "./appError";

export const createOne = (Model: Model<Document>) =>
    catchAsync(
        async (req: NextApiRequest, res: NextApiResponse, next: Function) => {
            console.log('Body: ', req.body)
            const doc = await Model.create(req.body);
            res.status(201).json({ status: "success", data: { data: doc } });
        }
    );

export const updateOne = (Model: Model<Document>) =>
    catchAsync(
        async (req: NextApiRequest, res: NextApiResponse, next: Function) => {
            const doc = await Model.findById(req.query.id);

            if (!doc) {
                throw new AppError("No document found with that id", 404);
            }
            const updatedDoc = await Object.assign(doc, req.body).save();

            res.status(200).json({
                status: "success",
                data: { data: updatedDoc },
            });
        }
    );

export const deleteOne = (Model: Model<Document>) =>
    catchAsync(
        async (req: NextApiRequest, res: NextApiResponse, next: Function) => {
            const doc = await Model.findByIdAndDelete(req.query.id);

            if (!doc) {
                throw new AppError("No document found with that id", 404);
            }

            res.status(204).json({ status: "success", data: null });
        }
    );

export const getOne = (Model: Model<Document>) =>
    catchAsync(
        async (req: NextApiRequest, res: NextApiResponse, next: Function) => {
            let doc = await Model.findById(req.query.id).select('-__v');;
            
            if (!doc) {
                throw new AppError("No document found with that id", 404);
            }

            res.status(200).json({
                status: "success",
                data: {
                    data: doc,
                },
            });
        }
    );

export const getAll = (Model: Model<Document>) =>
    catchAsync(
        async (req: NextApiRequest, res: NextApiResponse, next: Function) => {
            const doc = await Model.find().select('-__v');;

            res.status(200).json({
                status: "success",
                results: doc.length,
                data: {
                    data: doc,
                },
            });
        }
    );
