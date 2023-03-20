import { useState, useEffect } from "react";

import { useAlertStore } from "@/stores/alertStore";
import { useIngredientStore } from "@/stores/ingredientStore";

import AddIngredient from "./AddIngredient";

export default function Recipies() {
    const [filter, setFilter] = useState("recipies");

    // recipie attributes
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [ingredientsList, setIngredientsList] = useState([] as string[]);
    const [addIngredients, setAddIngredients] = useState(false);
    const [error, setError] = useState("");

    // variables to handle the ingredient selection
    const [ingredientsFilter, setIngredientsFilter] = useState("");

    // getting the ingredients store functions
    const fetchIngredients = useIngredientStore(
        (state) => state.fetchIngredients
    );
    const allIngredients = useIngredientStore((state) => state.ingredients);
    const ingredientsSeted = useIngredientStore((state) => state.seted);

    // getting all the ingredients
    useEffect(() => {
        // if i already setead the ingredients i dont need to get them again
        if (
            filter === "ingredients" &&
            allIngredients.length === 0 &&
            !ingredientsSeted
        ) {
            const getIngredients = async () => {
                await fetchIngredients();
            };
            getIngredients();
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
                    onClick={() => setFilter("recipies")}
                    className={`text-center w-[120px] py-1 text-base shadow-md rounded-md border-[2px] duration-500 ${
                        filter === "recipies"
                            ? "border-base-secondary bg-base-secondary/50"
                            : "border-slate-400 hover:bg-slate-400/70 bg-slate-300 text-slate-600"
                    } `}
                >
                    Your Recipies
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

                        {/* ingredients */}
                        <div className="flex flex-row justify-between w-full">
                            <p
                                className={`font-primary font-semibold text-base ${
                                    error === "ingredients"
                                        ? "text-red-600"
                                        : "text-slate-500"
                                } `}
                            >
                                Ingredients
                            </p>
                            <button onClick={() => setAddIngredients(true)} className="border-2 border-green-600 bg-green-500 px-2 font-semibold text-sm text-slate-200 font-primary rounded-md duration-300 hover:bg-green-600">Add new</button>
                        </div>

                        <button
                            // onClick={createIngredient}
                            className=" hover:scale-[1.02] self-end text-300-primary text-center w-[100px] py-1 text-sm shadow-md rounded-md border-[2px] duration-500 border-base-primary bg-base-primary/20 hover:bg-base-primary/50"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            )}

            {/* your recipies */}
            {filter === "recipies" && <div className=""></div>}

            {/* add new ingredient */}
            {addIngredients && (
                <AddIngredient setAddIngredients={setAddIngredients} />
            )}
        </>
    );
}
