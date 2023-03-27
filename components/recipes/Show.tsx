import { useEffect, useState } from "react";

import { Recipe } from "@/utils/types";
import Icon from "../Icon";
import { useAlertStore } from "@/stores/alertStore";
import { useIngredientStore } from "@/stores/ingredientStore";
import * as api from "@/utils/api";

interface ShowProps {
    recipe: Recipe;
    setShowRecipe: (op: boolean) => void;
    setEditRecipe: (op: boolean) => void;
}

export default function Show({
    recipe,
    setShowRecipe,
    setEditRecipe,
}: ShowProps) {
    const [start, setStart] = useState(false);

    console.log(recipe);

    // setting the start state to true
    useEffect(() => {
        setStart(true);
    }, []);

    // close the modal
    const close = () => {
        setStart(false);
        setTimeout(() => {
            setShowRecipe(false);
        }, 300);
    };

    const editRecipe = () => {
        setStart(false);
        setTimeout(() => {
            setShowRecipe(false);
            setEditRecipe(true);
        }, 300);
    };

    // alert store functions
    const setAlert = useAlertStore((state) => state.setAlert);

    // delete the ingredient
    const deleteRecipe = async () => {
        try {
            // await api.deleteRecipe(ingredient._id);
            // await fetchRecipes();
            close();
            setAlert("Recipe deleted successfully", "danger");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div
            className={`fixed top-0 left-0 w-screen h-screen bg-black/30 grid place-content-center duration-300 ${
                start ? "opacity-1" : "opacity-0"
            }`}
        >
            <div
                className={`w-[400px] min-h-[500px] bg-[#E0E0E0] border-4 border-base-primary rounded-md shadow text-center p-4 flex flex-col gap-2 relative `}
            >
                <button
                    onClick={close}
                    className="absolute h-6 w-6 top-1 right-1"
                >
                    <Icon icon="close" className="fill-slate-900" />
                </button>
                <h2 className=" font-primary text-2xl font-semibold">
                    {recipe.name}
                </h2>
                <p className="font-primary text-sm font-semibold">
                    {recipe.description}
                </p>
                <p className="font-primary text-sm font-semibold self-start">
                    Duration: {recipe.duration} mins
                </p>
                <p className="font-primary text-sm font-semibold self-start">
                    Difficulty: {recipe.difficulty}
                </p>
                <p className="font-primary text-sm font-semibold self-start">
                    Ingredients:{" "}
                </p>
                <div className="flex flex-col gap-1 w-full items-start px-2">
                    {recipe.ingredients.map((ingre) => (
                        <div key={ingre._id} className="font-primary text-sm font-semibold">- {ingre.name}</div>
                        // <div
                        //     key={ingre._id}
                        //     className=" flex justify-between w-full bg-gray-300 border-gray-400 border-2 px-2 py-1 rounded-md font-primary text-slate-500 font-medium "
                        // >
                        //     {ingre.name}
                        //     <button
                        //         // onClick={() =>
                        //         //     setIngredientsList(
                        //         //         ingredientsList.filter(
                        //         //             (i) => i !== ingre._id
                        //         //         )
                        //         //     )
                        //         // }
                        //         className=" px-1 py-0.5 rounded bg-red-500 border-red-600 border-2 hover:bg-red-600 duration-300"
                        //     >
                        //         <Icon icon="trashcan" className="w-3" />
                        //     </button>
                        // </div>
                    ))}
                </div>
                <div className=" w-full flex-grow items-end flex justify-center gap-2">
                    <button
                        onClick={deleteRecipe}
                        className="w-[70px] bg-red-500 border-2 border-red-600 rounded-md font-primary font-semibold text-sm text-slate-200 shadow-md duration-300 hover:bg-red-600 "
                    >
                        Delete
                    </button>
                    <button
                        onClick={editRecipe}
                        className="w-[70px] bg-blue-500 border-2 border-blue-600 rounded-md font-primary font-semibold text-sm text-slate-200 shadow-md duration-300 hover:bg-blue-600 "
                    >
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
}
