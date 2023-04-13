import mongoose from "mongoose";

const IngredientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
    },
    description: {
        type: String,
    },
    // image: {
    //     type: String,
    //     required: [true, "Please provide an image"],
    // },
    // category: {
    //     type: String,
    //     required: [true, "Please provide a category"],
    // },
    active: {
        type: Boolean,
        default: true,
        select: false,
    },
});

////////////////////////// Middleware //////////////////////////

// remove the __v propierty after querying the database
IngredientSchema.pre(/^find/, function (next) {
    this.select("-__v");
    next();
});

export default mongoose.models.Ingredient ||
    mongoose.model("Ingredient", IngredientSchema);