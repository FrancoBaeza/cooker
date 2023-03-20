import { useEffect, useState } from "react";

import { TailSpin } from "react-loader-spinner";

import * as api from "@/utils/api";
import { Ingredient } from "@/utils/types";
import { useAlertStore } from "@/stores/alertStore";
import { useIngredientStore } from "@/stores/ingredientStore";
import Result from "../Result";
import Icon from "../Icon";
import Show from "./Show";
import Edit from "./Edit";

export default function Ingredients() {
    const [filter, setFilter] = useState("ingredients");
    const [ingredientsFilter, setIngredientsFilter] = useState("");

    // getting the ingredients store functions
    const fetchIngredients = useIngredientStore(
        (state) => state.fetchIngredients
    );
    const ingredients = useIngredientStore((state) => state.ingredients);
    const ingredientsSeted = useIngredientStore((state) => state.seted);

    // getting all the ingredients
    useEffect(() => {
        // if i already setead the ingredients i dont need to get them again
        if (
            filter === "ingredients" &&
            ingredients.length === 0 &&
            !ingredientsSeted
        ) {
            const getIngredients = async () => {
                await fetchIngredients();
            };
            getIngredients();
        }
    }, []);

    // ingredient variables
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");

    // selected ingredient
    const [ingredient, setIngredient] = useState(ingredients[0]);

    // varaible to show the ingredient
    const [showIngredient, setShowIngredient] = useState(false);

    // variable to edit the ingredient
    const [editIngredient, setEditIngredient] = useState(false);

    // use effect to prvent scrolling when showing an ingredient
    useEffect(() => {
        if (showIngredient) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [showIngredient]);

    // alert store functions
    const setAlert = useAlertStore((state) => state.setAlert);

    // submit new ingredient
    const createIngredient = async () => {
        try {
            const ingredient = await api.createIngredient({
                name,
                description,
            });
            setName("");
            setDescription("");
            setError("");

            // setting alert params
            setAlert("Ingredient created successfully", "success");
        } catch (error: any) {
            console.log(
                `[${new Date().toLocaleString()}]- Fail to create ingredient (c):`
            );
            console.log(error);

            if (error.path) {
                setError(error.path);
                // setting alert params
                setAlert(error.message, "danger");
            }
        }
    };

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
                    onClick={() => setFilter("ingredients")}
                    className={`text-center w-[120px] py-1 text-base shadow-md rounded-md border-[2px] duration-500 ${
                        filter === "ingredients"
                            ? "border-base-secondary bg-base-secondary/50"
                            : "border-slate-400 hover:bg-slate-400/70 bg-slate-300 text-slate-600"
                    } `}
                >
                    Ingredients
                </button>
            </div>

            {/* CONTENT */}

            {/* add new ingredient */}
            {filter === "add" && (
                <div className="w-full flex flex-col items-center gap-8">
                    <h2 className=" font-primary text-xl font-semibold text-slate-800">
                        Add new ingredient
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

                        <button
                            onClick={createIngredient}
                            className=" hover:scale-[1.02] self-end text-300-primary text-center w-[100px] py-1 text-sm shadow-md rounded-md border-[2px] duration-500 border-base-primary bg-base-primary/20 hover:bg-base-primary/50"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            )}

            {/* your ingredients */}
            {filter === "ingredients" && (
                <div className="flex flex-col">
                    {/* search input */}
                    <div className="flex justify-center gap-2">
                        <input
                            placeholder="Search a ingredient by name..."
                            onChange={(e) =>
                                setIngredientsFilter(e.target.value)
                            }
                            type="text"
                            className="h-[45px] w-[400px] rounded-md bg-transparent border-base-secondary border-2 px-4 text-lg font-primary outline-0 placeholder:text-slate-800 placeholder:text-base"
                        />
                    </div>

                    <div className="w-[500px] max-h-[540px] overflow-y-scroll flex flex-col gap-5 mt-5 scrollbar-none">
                        {ingredients.length > 0 ? (
                            ingredients
                                .filter((i) =>
                                    ingredientsFilter !== ""
                                        ? i.name.includes(ingredientsFilter)
                                        : true
                                )
                                .map((ingredient) => (
                                    <Result
                                        key={ingredient._id}
                                        name={ingredient.name}
                                        action={() => {
                                            setIngredient(ingredient);
                                            setShowIngredient(true);
                                        }}
                                    />
                                ))
                        ) : (
                            <div className="w-full h-[300px] grid place-content-center ">
                                <TailSpin
                                    height="80"
                                    width="80"
                                    color="#00718F"
                                    ariaLabel="tail-spin-loading"
                                    radius="1"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                    visible={true}
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* show ingredient */}
            {showIngredient && (
                <Show
                    ingredient={ingredient}
                    setShowIngredient={setShowIngredient}
                    setEditIngredient={setEditIngredient}
                />
            )}

            {/* edit ingredient*/}
            {editIngredient && (
                <Edit
                    ingredient={ingredient}
                    setEditIngredient={setEditIngredient}
                    setShowIngredient={setShowIngredient}
                />
            )}
        </>
    );
}
