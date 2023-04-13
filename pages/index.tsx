import { useEffect, useState } from "react";
import Link from "next/link";

import Icon from "@/components/Icon";
import Result from "@/components/Result";
import { withSessionSsr } from "@/utils/withSession";
import { Ingredient, Recipe, User } from "@/utils/types";
import * as api from "@/utils/api";
import * as gptApi from "@/utils/chatGptApi";
import { useRecipeStore } from "@/stores/recipeStore";
import { useIngredientStore } from "@/stores/ingredientStore";
import Show from "@/components/recipes/Show";
import AddIngredient from "@/components/recipes/AddIngredient";
import { useUserStore } from "@/stores/userStore";

export default function Home({ userId }: any) {
    const [filter, setFilter] = useState("name");
    const [search, setSearch] = useState("");
    const [selectIngredients, setSelectIngredients] = useState(false);
    const [ingredientsList, setIngredientsList] = useState([] as string[]);
    const [foundRecipes, setFoundRecipes] = useState([] as Recipe[]);

    const [showRecipe, setShowRecipe] = useState(false);
    const [recipe, setRecipe] = useState({} as Recipe);

    const [showDDMenu, setShowDDMenu] = useState(false);

    const recipes = useRecipeStore((state) => state.recipes);
    const fetchRecipes = useRecipeStore((state) => state.fetchRecipes);

    const ingredients = useIngredientStore((state) => state.ingredients);
    const fetchIngredients = useIngredientStore(
        (state) => state.fetchIngredients
    );

    const user = useUserStore((state) => state.user);
    const setUser = useUserStore((state) => state.setUser);

    // busca las recetas e ingredientes y si no hay usuario busca el usuario
    useEffect(() => {
        fetchRecipes();
        fetchIngredients();

        if (!user) {
            const getUser = async () => {
                try {
                    const user = await api.getUser(userId);
                    setUser(user.data.data);
                } catch (error) {
                    console.log(error);
                }
            };
            getUser();
        }
    }, []);

    const searchRecipes = () => {
        if (filter === "name") {
            const found = recipes.filter((recipe) =>
                recipe.name.toLowerCase().includes(search.toLowerCase())
            );
            setFoundRecipes(found);
        }
    };

    const submitIngredients = (ingredients: Ingredient[]) => {
        const ids = ingredients.map((i) => i._id);
        setIngredientsList(ids);

        const found = recipes.filter((recipe) => {
            return recipe.ingredients.every((i) => ids.includes(i._id));
        });

        setFoundRecipes(found);
    };

    const correctFilter = (filter: string) => {
        setFoundRecipes([]);
        setFilter(filter);
    };

    const chatGptSearch = async () => {
        console.log("searching...");
        const ingredientListTodo = ingredients.filter((ing) =>
            ingredientsList.find((i) => i === ing._id)
        );
        const response = await gptApi.getSuggestions(ingredientListTodo);
        const recipesResponse = JSON.parse(response.choices[0].message.content);
        console.log("recipesResponse: ", recipesResponse);
        const recipesWithCompleteIngredients = recipesResponse.recetas.map((recipe: Recipe) => {
            const ingredientsAux = recipe.ingredients.map((ing) => {
                const ingredient = ingredients.find((i) => i.name.toLowerCase() === ing.toString().toLowerCase());
                return ingredient;
            });
            return { ...recipe, ingredients: ingredientsAux };
        } );
        console.log('Recipes after completition: ', recipesWithCompleteIngredients)
        setFoundRecipes(recipesWithCompleteIngredients);
    };

    return (
        <>
            <div className="flex flex-col items-center min-h-screen">
                {/* header */}
                <div className="h-[300px] w-full bg-base-primary flex flex-col items-center text-slate-200 ">
                    <div className="self-end p-0 m-2 mb-6 relative">
                        <button
                            onMouseOver={() => setShowDDMenu(true)}
                            onClick={() => setShowDDMenu(!showDDMenu)}
                        >
                            <Icon
                                icon="user"
                                className="h-8 w-8 cursor-pointer hover:fill-slate-400 duration-300 fill-slate-200"
                            />
                        </button>
                        {showDDMenu && (
                            <div
                                onMouseLeave={() => setShowDDMenu(false)}
                                className="fixed right-2 flex flex-col w-[120px] bg-slate-200 rounded "
                            >
                                <Link
                                    className=" text-slate-700 font-primary text-sm p-1 font-semibold hover:bg-slate-400/50 duration-300"
                                    href="/account"
                                >
                                    Account
                                </Link>
                                <span className="bg-slate-400 h-[1.5px] w-full self-center">
                                    {" "}
                                </span>
                                <Link
                                    className=" text-slate-700 font-primary text-sm p-1 font-semibold hover:bg-slate-400/50 duration-300"
                                    href="/myFridge"
                                >
                                    My Fridge
                                </Link>
                            </div>
                        )}
                    </div>

                    <h1 className=" text-4xl font-primary font-semibold">
                        What do you want to eat?
                    </h1>
                    <p className=" font-semibold text-lg mt-3">Filter by</p>

                    {/* filtros */}
                    <div className="flex flex-row gap-5 mt-5">
                        <button
                            onClick={() => correctFilter("name")}
                            className={` text-center w-[150px] py-2 text-lg shadow-md rounded-md border-[2px] duration-300 ${
                                filter === "name"
                                    ? "border-base-secondary bg-base-secondary/50"
                                    : "border-slate-300 hover:bg-slate-300/50"
                            }  `}
                        >
                            Name
                        </button>
                        <button
                            onClick={() => correctFilter("ingredients")}
                            className={` text-center w-[150px] py-2 text-lg shadow-md rounded-md border-[2px] duration-300 ${
                                filter === "ingredients"
                                    ? "border-base-secondary bg-base-secondary/50"
                                    : "border-slate-300 hover:bg-slate-300/50"
                            }  `}
                        >
                            Ingredients
                        </button>
                    </div>

                    {filter === "name" ? (
                        <div className="flex gap-2 mt-6">
                            {/* input */}
                            <input
                                placeholder="Search a recipe by name..."
                                onChange={(e) => setSearch(e.target.value)}
                                type="text"
                                className="h-[50px] w-[400px] rounded-md bg-transparent border-slate-300 border-2 px-4 text-lg font-primary outline-0 placeholder:text-slate-200 placeholder:text-base"
                            />
                            <button
                                onClick={searchRecipes}
                                className="w-[50px] h-[50px] border-2 rounded-md border-base-secondary grid place-items-center hover:bg-base-secondary/50 duration-300"
                            >
                                <Icon
                                    icon="arrow"
                                    className="w-8 h-8 fill-base-secondary"
                                />
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-grow w-full items-center justify-center">
                            <h2 className="text-2xl font-primary font-semibold">
                                Tell us what you got
                            </h2>
                        </div>
                    )}
                </div>

                {/* results */}
                {filter === "name" ? (
                    <div className="flex-grow w-[600px] flex flex-col items-center">
                        {foundRecipes.length !== 0 ? (
                            <>
                                <h2 className="pt-4 font-primary text-2xl font-semibold text-slate-900">
                                    What we found:
                                </h2>

                                <div className="w-[500px] flex flex-col gap-5 mt-5">
                                    {foundRecipes.map((recipe, i) => (
                                        <Result
                                            key={i}
                                            name={recipe.name}
                                            action={() => {
                                                setRecipe(recipe);
                                                setShowRecipe(true);
                                            }}
                                        />
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="h-full flex-grow w-[600px] grid place-items-center ">
                                <span>
                                    <Icon
                                        icon="magnifier"
                                        className="w-28 h-28 fill-slate-900"
                                    />
                                    <p className="text-xl font-secondary mt-3 mb-24">
                                        No search results...
                                    </p>
                                </span>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <div className=" w-[350px] flex justify-center flex-col gap-3">
                            <button
                                onClick={() => setSelectIngredients(true)}
                                className="mt-4 bg-slate-400 border-2 border-slate-500 px-3 py-1 font-primary rounded text-slate-200 hover:bg-slate-500 duration-300"
                            >
                                Select ingredients
                            </button>
                            <button
                                onClick={() => chatGptSearch()}
                                className="bg-green-500 border-2 border-green-600 px-3 py-1 font-primary rounded text-slate-200 hover:bg-green-600 duration-300"
                            >
                                Discover
                            </button>

                            <div className="w-full flex flex-wrap gap-2">
                                {ingredients
                                    .filter((ing) =>
                                        ingredientsList.find(
                                            (i) => i === ing._id
                                        )
                                    )
                                    .map((ing, i) => (
                                        <div
                                            className="duration-300 cursor-pointer flex flex-row items-center gap-1 px-2  border-2  rounded-md font-primary font-medium text-sm text-slate-200 shadow bg-gray-500 border-gray-600"
                                            key={ing._id}
                                        >
                                            {ing.name}
                                        </div>
                                    ))}
                            </div>
                        </div>
                        <div className="w-[600px} flex justify-center items-center flex-col gap-3">
                            <h2 className="pt-4 font-primary text-2xl font-semibold text-slate-900">
                                What we found:
                            </h2>

                            {foundRecipes.length > 0 ? (
                                <div className="w-[500px] flex flex-col gap-5 mt-5">
                                    {foundRecipes.map((recipe, i) => (
                                        <Result
                                            key={i}
                                            name={recipe.name}
                                            action={() => {
                                                setRecipe(recipe);
                                                setShowRecipe(true);
                                            }}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="h-full flex-grow w-[600px] mt-4 grid place-items-center ">
                                    <span className="flex flex-col justify-center items-center">
                                        <Icon
                                            icon="magnifier"
                                            className="w-24 h-24 fill-slate-900"
                                        />
                                        <p className="text-xl font-secondary mt-3 mb-24">
                                            No search results...
                                        </p>
                                    </span>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>

            {/* show recipe */}
            {showRecipe && (
                <Show
                    setShowRecipe={setShowRecipe}
                    setEditRecipe={() => {}}
                    recipe={recipe}
                    edit={false}
                />
            )}

            {selectIngredients && (
                <AddIngredient
                    setAddIngredients={setSelectIngredients}
                    submit={submitIngredients}
                    ingredientsList={ingredientsList}
                    loadFridge={true}
                />
            )}
        </>
    );
}

export const getServerSideProps = withSessionSsr(
    async function getServerSideProps({ req }) {
        const id = req.session.user?.userId;
        if (id) {
            return {
                props: {
                    userId: id,
                },
            };
        } else {
            return {
                redirect: {
                    destination: "/login",
                    permanent: false,
                },
            };
        }
    }
);
