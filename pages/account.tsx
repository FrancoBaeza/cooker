import Link from "next/link";
import type { NextPageWithLayout } from "./_app";
import { ReactElement, useEffect } from "react";
import { useState } from "react";

import Layout from "@/components/Layout";
import Recipes from "@/components/recipes/Recipes";
import Ingredients from "@/components/ingredients/Ingredients";
import * as api from "@/utils/api";
import { withSessionSsr } from "@/utils/withSession";
import { useUserStore } from "@/stores/userStore";
import Icon from "@/components/Icon";

const Account: NextPageWithLayout = ({ user, userRecipes }: any) => {
    const [filter, setFilter] = useState("recipes");
    const [showDDMenu, setShowDDMenu] = useState(false);

    const userInStore = useUserStore((state) => state.user);
    const setUser = useUserStore((state) => state.setUser);

    useEffect(() => {
        if (!userInStore) {
            setUser(user);
        }
    }, []);

    return (
        <div className="flex flex-col items-center min-h-screen">
            <div className="h-[250px] w-full bg-base-primary flex flex-col items-center text-slate-200">
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
                    Your account
                </h1>
                <p className=" font-semibold text-lg mt-3">Actions:</p>

                {/* filtros */}
                <div className="flex flex-row gap-5 mt-5">
                    <button
                        onClick={() => setFilter("recipes")}
                        className={` text-center w-[150px] py-2 text-lg shadow-md rounded-md border-[2px] duration-300 ${
                            filter === "recipes"
                                ? "border-base-secondary bg-base-secondary/50"
                                : "border-slate-300 hover:bg-slate-300/50"
                        } `}
                    >
                        Recipes
                    </button>
                    <button
                        onClick={() => setFilter("ingredients")}
                        className={` text-center w-[150px] py-2 text-lg shadow-md rounded-md border-[2px] duration-300 ${
                            filter === "ingredients"
                                ? "border-base-secondary bg-base-secondary/50"
                                : "border-slate-300 hover:bg-slate-300/50"
                        } `}
                    >
                        Ingredients
                    </button>
                </div>
            </div>
            <div className="w-[600px] flex flex-col items-center p-5">
                {filter === "recipes" && <Recipes user={user} />}
                {filter === "ingredients" && <Ingredients />}
            </div>
        </div>
    );
};

Account.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};

export default Account;

export const getServerSideProps = withSessionSsr(
    async function getServerSideProps({ req }) {
        const id = req.session.user?.userId;
        if (id) {
            const user = await api.getUser(id);
            const userRecipes = await api.getUserRecipes(id);
            return {
                props: {
                    user: user.data.data,
                    userRecipes: userRecipes.data.recipes,
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
