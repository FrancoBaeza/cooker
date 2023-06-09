import { useEffect, useState } from "react";

import { Ingredient, Recipe } from "@/utils/types";
import AddIngredient from "./AddIngredient";
import Icon from "../Icon";
import { useAlertStore } from "@/stores/alertStore";
import { useIngredientStore } from "@/stores/ingredientStore";
import { useUserStore } from "@/stores/userStore";
import * as api from "@/utils/api";

interface ShowProps {
    recipe: Recipe;
    setEditRecipe: (op: boolean) => void;
    setShowRecipe: (op: boolean) => void;
    closeView: () => void;
}

export default function Edit({
    recipe,
    setEditRecipe,
    setShowRecipe,
    closeView,
}: ShowProps) {
    const [start, setStart] = useState(false);

    // recipe variables
    const [name, setName] = useState(recipe.name);
    const [description, setDescription] = useState(recipe.description);
    const [difficulty, setDifficulty] = useState(String(recipe.difficulty));
    const [duration, setDuration] = useState(String(recipe.duration));
    const [ingredientsList, setIngredientsList] = useState(
        recipe.ingredients.map((ing) => ing._id)
    );
    const [addIngredients, setAddIngredients] = useState(false);
    const [error, setError] = useState("");

    const ingredients = useIngredientStore((state) => state.ingredients);
    const setIngredients = useIngredientStore((state) => state.setIngredients);
    const fetchUserRecipes = useUserStore((state) => state.fetchUserRecipes);
    const user = useUserStore((state) => state.user);

    // setting the start state to true
    useEffect(() => {
        setStart(true);

        if (ingredients.length === 0) {
            const fetchIngredients = async () => {
                try {
                    const ingredients = await api.getIngredients();
                    setIngredients(ingredients.data.data);
                } catch (error) {
                    console.log(error);
                }
            };
            fetchIngredients();
        }
    }, []);

    // close the modal
    const close = (closeShow: boolean = false) => {
        setStart(false);
        setTimeout(() => {
            setEditRecipe(false);
            setShowRecipe(true);
            if(closeShow) closeView();
        }, 300);
    };

    // alert store functions
    const setAlert = useAlertStore((state) => state.setAlert);

    // submit the edited recipe
    const updateRecipe = async () => {
        try {
            const updatedRecipe = await api.updateRecipe(
                {
                    name,
                    description,
                    difficulty: Number(difficulty),
                    duration: Number(duration),
                    ingredients: ingredientsList,
                },
                recipe._id
            );
            setError("");

            if(user) await fetchUserRecipes(user._id);

            // setting alert params
            setAlert("Recipe edited successfully", "success");

            close(true);
        } catch (error: any) {
            console.log(
                `[${new Date().toLocaleString()}]- Fail to edit recipe (c):`
            );
            console.log(error);

            if (error.path) {
                setError(error.path);
                // setting alert params
                setAlert(error.message, "danger");
            }
        }
    };

    const submitIngredients = (ingredients: Ingredient[]) => {
        const ids = ingredients.map((i) => i._id);
        setIngredientsList(ids);
    };

    return (
        <>
            <div
                className={`fixed top-0 left-0 w-screen h-screen bg-black/30 grid place-content-center duration-300 ${
                    start || addIngredients ? "opacity-1" : "opacity-0"
                }`}
            >
                <div
                    className={`w-[400px] bg-[#E0E0E0] border-4 border-base-primary rounded-md shadow text-center p-4 flex flex-col gap-2 relative `}
                >
                    <button
                        onClick={() => close()}
                        className="absolute h-6 w-6 top-1 right-1"
                    >
                        <Icon icon="close" className="fill-slate-900" />
                    </button>
                    <h2 className=" font-primary text-xl font-semibold text-slate-800">
                        Edit recipe
                    </h2>

                    {/* inputs */}
                    <div className="items-center w-full flex flex-col gap-4 ">
                        {/* name */}
                        <div className="flex flex-col items-start w-5/6">
                            <p
                                className={` font-primary font-semibold text-base ${
                                    error === "name"
                                        ? "text-red-600"
                                        : "text-slate-500"
                                } `}
                            >
                                Name
                            </p>
                            <input
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                value={name}
                                className={`w-full bg-transparent  rounded-md border-2 outline-0 px-2 py-2 font-primary text-sm ${
                                    error === "name"
                                        ? "border-red-600"
                                        : "border-slate-500"
                                } `}
                            />
                        </div>

                        {/* description */}
                        <div className="flex flex-col items-start w-5/6">
                            <p
                                className={`font-primary font-semibold text-base ${
                                    error === "description"
                                        ? "text-red-600"
                                        : "text-slate-500"
                                } `}
                            >
                                Description
                            </p>
                            <input
                                onChange={(e) => setDescription(e.target.value)}
                                type="text"
                                value={description}
                                className={`w-full bg-transparent rounded-md border-2 outline-0 px-2 py-2 font-primary text-sm ${
                                    error === "description"
                                        ? "border-red-600"
                                        : "border-slate-500"
                                } `}
                            />
                        </div>

                        <div className="flex w-full gap-3 px-[30px]">
                            {/* duration */}
                            <div className="flex flex-col w-full">
                                <p
                                    className={`font-primary font-semibold text-base self-start ${
                                        error === "duration"
                                            ? "text-red-600"
                                            : "text-slate-500"
                                    } `}
                                >
                                    Duration (min)
                                </p>
                                <input
                                    onChange={(e) =>
                                        setDuration(e.target.value)
                                    }
                                    type="text"
                                    value={duration}
                                    className={`w-full bg-transparent rounded-md border-2 outline-0 px-2 py-2 font-primary text-sm ${
                                        error === "duration"
                                            ? "border-red-600"
                                            : "border-slate-500"
                                    } `}
                                />
                            </div>

                            {/* difficulty */}
                            <div className="flex flex-col w-full">
                                <p
                                    className={`font-primary font-semibold text-base self-start ${
                                        error === "difficulty"
                                            ? "text-red-600"
                                            : "text-slate-500"
                                    } `}
                                >
                                    Difficulty (1-10)
                                </p>
                                <input
                                    onChange={(e) =>
                                        setDifficulty(e.target.value)
                                    }
                                    type="number"
                                    min="1"
                                    max="10"
                                    value={difficulty}
                                    className={`w-full bg-transparent rounded-md border-2 outline-0 px-2 py-2 font-primary text-sm ${
                                        error === "difficulty"
                                            ? "border-red-600"
                                            : "border-slate-500"
                                    } `}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col items-start w-5/6">
                            <div className="flex flex-row w-full justify-between mb-3">
                                <p
                                    className={`font-primary font-semibold text-base ${
                                        error === "ingredients"
                                            ? "text-red-600"
                                            : "text-slate-500"
                                    } `}
                                >
                                    Ingredients
                                </p>
                                <button
                                    onClick={() => setAddIngredients(true)}
                                    className="border-2 border-green-600 bg-green-500 px-2 font-semibold text-sm text-slate-200 font-primary rounded-md duration-300 hover:bg-green-600"
                                >
                                    Add new
                                </button>
                            </div>
                            <div className="flex flex-col gap-1 w-full items-start">
                                {ingredients
                                    .filter((ing) =>
                                        ingredientsList.find(
                                            (inL) => inL === ing._id
                                        )
                                    )
                                    .map((ingre) => (
                                        <div
                                            key={ingre._id}
                                            className=" flex justify-between w-full bg-gray-300 border-gray-400 text-sm border-2 px-2 py-1 rounded-md font-primary text-slate-500 font-medium "
                                        >
                                            {ingre.name}
                                            <button
                                                onClick={() =>
                                                    setIngredientsList(
                                                        ingredientsList.filter(
                                                            (i) =>
                                                                i !== ingre._id
                                                        )
                                                    )
                                                }
                                                className=" px-1 py-0.5 rounded bg-red-500 border-red-600 border-2 hover:bg-red-600 duration-300"
                                            >
                                                <Icon
                                                    icon="trashcan"
                                                    className="w-3"
                                                />
                                            </button>
                                        </div>
                                    ))}
                            </div>
                        </div>

                        <div className="flex flex-row-reverse w-5/6">
                            <button
                                onClick={updateRecipe}
                                className="font-primary font-semibold text-sm text-slate-200 shadow-md text-center w-[70px] py-0.5 rounded-md border-[2px] duration-300 border-base-primary bg-base-primary/70 hover:bg-base-primary"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* add new ingredient */}
            {addIngredients && (
                <AddIngredient
                    setAddIngredients={setAddIngredients}
                    submit={submitIngredients}
                    ingredientsList={ingredientsList}
                />
            )}
        </>
    );
}
