import type { NextPageWithLayout } from "./_app";
import Layout from "@/components/Layout";
import type { ReactElement } from "react";
import { useState } from "react";

import Recipies from "@/components/Recipies";
import Ingredients from "@/components/ingredients/Ingredients";

const Account: NextPageWithLayout = () => {
    const [filter, setFilter] = useState("recipies");
    return (
        <div className="flex flex-col items-center min-h-screen">
            <div className="h-[250px] w-full bg-base-primary flex flex-col items-center text-slate-200 py-10">
                <h1 className=" text-4xl font-primary font-semibold">
                    Your account
                </h1>
                <p className=" font-semibold text-lg mt-3">Actions:</p>

                {/* filtros */}
                <div className="flex flex-row gap-5 mt-5">
                    <button
                        onClick={() => setFilter("recipies")}
                        className={` text-center w-[150px] py-2 text-lg shadow-md rounded-md border-[2px] duration-300 ${
                            filter === "recipies"
                                ? "border-base-secondary bg-base-secondary/50"
                                : "border-slate-300 hover:bg-slate-300/50"
                        } `}
                    >
                        Recipies
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
                {filter === "recipies" && <Recipies />}
                {filter === "ingredients" && <Ingredients />}
            </div>
        </div>
    );
}

Account.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};

export default Account;
