import { useState, useEffect } from "react";

import { TailSpin } from "react-loader-spinner";

import { Ingredient, Recipe, User } from "@/utils/types";
import { useIngredientStore } from "@/stores/ingredientStore";
import { useAlertStore } from "@/stores/alertStore";
import { useUserStore } from "@/stores/userStore";
import * as api from "@/utils/api";

import AddIngredient from "./AddIngredient";
import Icon from "../Icon";
import Result from "../Result";
import Show from "./Show";
import Edit from "./Edit";

export default function Recipes({
    user,
}: {
    user: User;
}) {
    const [filter, setFilter] = useState("recipes");
    const [recipe, setRecipe] = useState({} as Recipe);
    const [showRecipe, setShowRecipe] = useState(false);
    const [editRecipe, setEditRecipe] = useState(false);

    // recipie attributes
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [ingredientsList, setIngredientsList] = useState([] as string[]);
    const [addIngredients, setAddIngredients] = useState(false);
    const [error, setError] = useState("");

    const allIngredients = useIngredientStore((state) => state.ingredients);

    const submitIngredients = (ingredients: Ingredient[]) => {
        const ids = ingredients.map((i) => i._id);
        setIngredientsList(ids);
    };

    // alert store functions
    const setAlert = useAlertStore((state) => state.setAlert);

    // submit new recipie
    const createRecipie = async () => {
        try {
            const recipie = await api.createRecipe({
                name,
                description,
                duration,
                difficulty,
                ingredients: ingredientsList,
                user: user ? user._id : "",
            });
            setName("");
            setDescription("");
            setDuration("");
            setDifficulty("");
            setIngredientsList([]);
            setError("");

            // setting alert params
            setAlert("Recipie created successfully", "success");
        } catch (error: any) {
            console.log(
                `[${new Date().toLocaleString()}]- Fail to create recipie (c):`
            );
            console.log(error);

            if (error.path) {
                setError(error.path);
                // setting alert params
                setAlert(error.message, "danger");
            }
        }
    };

    const userRecipes = useUserStore((state) => state.userRecipes);
    const setUserRecipes = useUserStore((state) => state.setUserRecipes);

    useEffect(() => {
        if(userRecipes.length === 0){
            
            const fetchUserRecipes = async () => {
                try {
                    const recipes = await api.getUserRecipes(user._id);
                    setUserRecipes(recipes.data.recipes);
                } catch (error) {
                    console.log(error);
                }
            };
            fetchUserRecipes();
        }
    }, []);



    return (
        <>
            {/* selectors */}
            <div className=" w-full flex flex-row justify-center gap-3 text-slate-200 mb-10">
                <button
                    onClick={() => setFilter("add")}
                    className={`text-center w-[120px] py-1 text-base shadow-md rounded-md border-[2px] duration-500 ${
                        filter === "add"
                            ? "border-base-secondary bg-base-secondary/50"
                            : "border-slate-400 hover:bg-slate-400/70 bg-slate-300 text-slate-600"
                    } `}
                >
                    Add New
                </button>
                <button
                    onClick={() => setFilter("recipes")}
                    className={`text-center w-[120px] py-1 text-base shadow-md rounded-md border-[2px] duration-500 ${
                        filter === "recipes"
                            ? "border-base-secondary bg-base-secondary/50"
                            : "border-slate-400 hover:bg-slate-400/70 bg-slate-300 text-slate-600"
                    } `}
                >
                    Your Recipes
                </button>
            </div>
            {/* content */}

            {/* add new recipie */}
            {filter === "add" && (
                <div className="w-full flex flex-col items-center gap-8">
                    <h2 className=" font-primary text-xl font-semibold text-slate-800">
                        Add new recipie
                    </h2>

                    {/* inputs */}
                    <div className="items-center flex flex-col gap-4 w-4/6">
                        {/* name */}
                        <div className="flex flex-col w-full">
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
                        <div className="flex flex-col w-full">
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

                        <div className="flex w-full gap-3">
                            {/* duration */}
                            <div className="flex flex-col w-full">
                                <p
                                    className={`font-primary font-semibold text-base ${
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
                                    type="number"
                                    min="1"
                                    max="500"
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
                                    className={`font-primary font-semibold text-base ${
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

                        {/* ingredients */}
                        <div className="flex flex-col w-full gap-2">
                            <div className="flex flex-row justify-between">
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
                            {/* added ingredients list */}
                            {ingredientsList.length > 0 && (
                                <div className="flex flex-col gap-1">
                                    {allIngredients
                                        .filter((ing) =>
                                            ingredientsList.find(
                                                (i) => i === ing._id
                                            )
                                        )
                                        .map((ingre) => (
                                            <div
                                                key={ingre._id}
                                                className=" flex justify-between w-full bg-gray-300 border-gray-400 border-2 px-2 py-1 rounded-md font-primary text-slate-500 font-medium "
                                            >
                                                {ingre.name}
                                                <button
                                                    onClick={() =>
                                                        setIngredientsList(
                                                            ingredientsList.filter(
                                                                (i) =>
                                                                    i !==
                                                                    ingre._id
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
                            )}
                        </div>

                        <button
                            onClick={createRecipie}
                            className=" hover:scale-[1.02] self-end text-300-primary text-center w-[100px] py-1 text-sm shadow-md rounded-md border-[2px] duration-500 border-base-primary bg-base-primary/20 hover:bg-base-primary/50"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            )}

            {/* your recipes */}
            {filter === "recipes" && (
                <div className="w-full flex flex-col items-center gap-8">
                    <h2 className=" font-primary text-xl font-semibold text-slate-800">
                        Your recipies
                    </h2>

                    <div className="w-[500px] flex flex-col gap-5 mt-5">
                        {userRecipes.map((recipe, i) => (
                        <Result key={i} name={recipe.name} action={() => { setRecipe(recipe); setShowRecipe(true) }} />
                    ))}
                    </div>
                </div>
            )}

            {/* add new ingredient */}
            {addIngredients && (
                <AddIngredient
                    setAddIngredients={setAddIngredients}
                    submit={submitIngredients}
                    ingredientsList={ingredientsList}
                />
            )}

            {/* show recipe */}
            {showRecipe && (
                <Show
                    setShowRecipe={setShowRecipe}
                    setEditRecipe={setEditRecipe}
                    recipe={recipe}
                    edit={true}
                />
            )}

            {/* edit recipe */}
            {editRecipe && (
                <Edit
                    setShowRecipe={setShowRecipe}
                    setEditRecipe={setEditRecipe}
                    recipe={recipe}
                    closeView={() => setShowRecipe(false)}
                />
            )}
        </>
    );
}
