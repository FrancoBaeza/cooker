import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
    },
    description: {
        type: String,
        required: [true, "Please provide a description"],
    },
    ingredients: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Ingredient",
            },
        ],
        default: [],
    },
    duration: {
        type: Number,
        required: [true, "Please provide a duration"],
        min: [1, "Duration must be at least 1 minute"],
        max: [500, "Duration must be at most 500 minutes"],
    },
    difficulty: {
        type: Number,
        required: [true, "Please provide a difficulty"],
        min: [1, "Difficulty must be at least 1"],
        max: [10, "Difficulty must be at most 10"],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true],
    },
    active: {
        type: Boolean,
        default: true,
        select: false,
    },
});

////////////////////////// Middleware //////////////////////////

// remove the __v propierty after querying the database
RecipeSchema.pre(/^find/, function (next) {
    this.select("-__v");

    this.populate({
        path: "ingredients",
        select: "-__v",
    });

    next();
});


export default mongoose.models.Recipe ||
    mongoose.model("Recipe", RecipeSchema);