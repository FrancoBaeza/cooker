import mongoose from "mongoose";

const RecipieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
    },
    description: {
        type: String,
        required: [true, "Please provide a description"],
    },
    ingredients: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Ingredient",
        },
    ],
    duration: {
        type: Number,
        required: [true, "Please provide a duration"],
    },

    active: {
        type: Boolean,
        default: true,
        select: false,
    },
});

////////////////////////// Middleware //////////////////////////

// remove the __v propierty after querying the database
RecipieSchema.pre(/^find/, function (next) {
    this.select("-__v");
    next();
});


export default mongoose.models.Recipie ||
    mongoose.model("Recipie", RecipieSchema);