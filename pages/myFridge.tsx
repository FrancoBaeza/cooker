import Link from "next/link";
import type { NextPageWithLayout } from "./_app";
import { ReactElement, useEffect } from "react";
import { useState } from "react";

import Layout from "@/components/Layout";
import Recipes from "@/components/recipes/Recipes";
import Ingredients from "@/components/ingredients/Ingredients";
import { useAlertStore } from "@/stores/alertStore";
import * as api from "@/utils/api";
import { withSessionSsr } from "@/utils/withSession";
import { useUserStore } from "@/stores/userStore";
import Icon from "@/components/Icon";
import { Ingredient } from "@/utils/types";

const MyFridge: NextPageWithLayout = ({ userId, ingredients }: any) => {
    const user = useUserStore((state) => state.user);
    const setUser = useUserStore((state) => state.setUser);

    const [filter, setFilter] = useState("myFridge");
    const [ingredientsFilter, setIngredientsFilter] = useState("");
    const [fridge, setFridge] = useState(
        user?.fridge.map((ing: Ingredient) => ing._id)
    );
    const [showDDMenu, setShowDDMenu] = useState(false);

    useEffect(() => {
        if (!user) {
            const getUser = async () => {
                try {
                    const user = await api.getUser(userId);
                    setUser(user.data.data);
                    setFridge(
                        user.data.data.fridge.map((ing: Ingredient) => ing._id)
                    );
                } catch (error) {
                    console.log(error);
                }
            };
            getUser();
        }
    }, [user]);

    const removeItemFromFridge = async (ingredientId: string) => {
        try {
            const updatedUser = await api.updateUserFridge(
                {
                    fridge: fridge
                        ? fridge.filter((ing) => ing !== ingredientId)
                        : fridge,
                },
                user ? user._id : ""
            );

            setUser(updatedUser.data.data);
            setFridge(
                updatedUser.data.data.fridge.map((ing: Ingredient) => ing._id)
            );
        } catch (error) {
            console.log(error);
        }
    };

    const addItemToFridge = async (ingredientId: string) => {
        try {
            const updatedUser = await api.updateUserFridge(
                { fridge: fridge ? [...fridge, ingredientId] : [ingredientId] },
                user ? user._id : ""
            );

            setUser(updatedUser.data.data);

            setFridge(
                updatedUser.data.data.fridge.map((ing: Ingredient) => ing._id)
            );
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="flex flex-col items-center min-h-screen">
                <div className="h-[300px] w-full bg-base-primary flex flex-col items-center text-slate-200 ">
                    <Link href="/" className="self-start absolute p-0 m-2 mb-6">
                        <Icon
                            icon="thickArrow"
                            className="h-8 w-8 cursor-pointer hover:fill-slate-500 duration-300 fill-slate-200"
                        />
                    </Link>

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
                        My Fridge
                    </h1>
                    <h2 className=" text-3xl font-primary font-semibold mt-4">
                        Let&apos;s see what you got
                    </h2>

                    {/* filtros */}
                    <div className="flex flex-row gap-5 mt-5">
                        <button
                            onClick={() => setFilter("myFridge")}
                            className={` text-center w-[150px] py-2 text-lg shadow-md rounded-md border-[2px] duration-300 ${
                                filter === "myFridge"
                                    ? "border-base-secondary bg-base-secondary/50"
                                    : "border-slate-300 hover:bg-slate-300/50"
                            } `}
                        >
                            View Fridge
                        </button>
                        <button
                            onClick={() => setFilter("addIngredient")}
                            className={` text-center w-[150px] py-2 text-lg shadow-md rounded-md border-[2px] duration-300 ${
                                filter === "addIngredient"
                                    ? "border-base-secondary bg-base-secondary/50"
                                    : "border-slate-300 hover:bg-slate-300/50"
                            } `}
                        >
                            Add Ingredient
                        </button>
                    </div>
                </div>
                <div className="w-[600px] flex flex-col items-center p-5">
                    {filter === "myFridge" && (
                        <div className="w-full flex flex-col gap-2 items-center">
                            <h3 className=" font-primary text-2xl font-semibold text-slate-900">
                                Your fridge
                            </h3>

                            {user?.fridge.map((ingredient: Ingredient) => {
                                return (
                                    <div
                                        key={ingredient._id}
                                        className="w-[60%] py-1 flex items-center font-medium justify-between border-slate-500 bg-slate-300 border-2 rounded text-sm text-salte-200 font-primary px-2"
                                    >
                                        {ingredient.name}
                                        <button
                                            onClick={() =>
                                                removeItemFromFridge(
                                                    ingredient._id
                                                )
                                            }
                                            className=" bg-red-500 border-red-600 p-0.5 rounded border-2 hover:bg-red-600 duration-300"
                                        >
                                            <Icon
                                                icon="trashcan"
                                                className="w-4 "
                                            />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                    {filter === "addIngredient" && (
                        <div className="w-full flex flex-col gap-2 items-center">
                            <input
                                placeholder="Search a ingredient by name..."
                                onChange={(e) =>
                                    setIngredientsFilter(e.target.value)
                                }
                                type="text"
                                className="h-[45px] w-[400px] rounded-md bg-transparent border-slate-500 border-2 px-4 text-lg font-primary outline-0 placeholder:text-slate-800 placeholder:text-base"
                            />

                            {fridge &&
                                ingredients
                                    .filter((ing: Ingredient) =>
                                        ing.name.includes(ingredientsFilter)
                                    )
                                    .filter(
                                        (ing: Ingredient) =>
                                            !fridge.find(
                                                (ing2: string) =>
                                                    ing2 === ing._id
                                            )
                                    ) //filter out the ingredients that the user already has in the fridge
                                    .map((ingredient: Ingredient) => {
                                        return (
                                            <div
                                                key={ingredient._id}
                                                className="w-[60%] py-1 flex items-center font-medium justify-between border-slate-500 bg-slate-300 border-2 rounded text-sm text-salte-200 font-primary px-2"
                                            >
                                                {ingredient.name}
                                                <button
                                                    onClick={() =>
                                                        addItemToFridge(
                                                            ingredient._id
                                                        )
                                                    }
                                                    className=" bg-green-500 border-green-600 p-0.5 rounded border-2 hover:bg-green-600 duration-300"
                                                >
                                                    <Icon
                                                        icon="close"
                                                        className="w-4 rotate-45"
                                                    />
                                                </button>
                                            </div>
                                        );
                                    })}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

MyFridge.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};

export default MyFridge;

export const getServerSideProps = withSessionSsr(
    async function getServerSideProps({ req }) {
        const id = req.session.user?.userId;
        if (id) {
            const ingredients = await api.getIngredients();
            return {
                props: {
                    userId: id,
                    ingredients: ingredients.data.data,
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
