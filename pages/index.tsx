import { useState } from "react";

import Icon from "@/components/Icon";
import Result from "@/components/Result";

interface Recipe {
    name: string;
    otherNames?: string[];
}

export default function Home() {
    const [filter, setFilter] = useState("name");
    const [search, setSearch] = useState("");
    const [foundRecipies, setFoundRecipies] = useState([] as Recipe[]);

    const recipies = [
        {
            name: "Pasta",
            otherNames: ["Fideos", "Spaghetti"],
        },
        {
            name: "Pizza",
            otherNames: ["Pizza", "Pizza"],
        },
        {
            name: "Hamburguesa",
            otherNames: ["Hamburguesa", "Hamburguesa"],
        },
        {
            name: "Papas fritas",
            otherNames: ["Papas fritas", "Papas fritas"],
        },
        {
            name: "Sugus",
        },
    ];

    const searchRecipies = () => {
        if (filter === "name") {
            const found = recipies.filter((recipe) =>
                recipe.name.toLowerCase().includes(search.toLowerCase())
            );
            setFoundRecipies(found);
        }
    };

    const nada = () => {
        console.log("nada");
    };

    return (
        <div className="flex flex-col items-center min-h-screen">
            {/* header */}
            <div className="h-[300px] w-full bg-base-primary flex flex-col items-center text-slate-200 py-10">
                <h1 className=" text-4xl font-primary font-semibold">
                    What do you want to eat?
                </h1>
                <p className=" font-semibold text-lg mt-3">Filter by</p>

                {/* filtros */}
                <div className="flex flex-row gap-5 mt-5">
                    <button
                        onClick={() => setFilter("name")}
                        className={` text-center w-[150px] py-2 text-lg shadow-md rounded-md border-[2px] duration-300 ${
                            filter === "name"
                                ? "border-base-secondary bg-base-secondary/50"
                                : "border-slate-300 hover:bg-slate-300/50"
                        }  `}
                    >
                        Name
                    </button>
                    <button
                        onClick={() => setFilter("ingredients")}
                        className={` text-center w-[150px] py-2 text-lg shadow-md rounded-md border-[2px] duration-300 ${
                            filter === "ingredients"
                                ? "border-base-secondary bg-base-secondary/50"
                                : "border-slate-300 hover:bg-slate-300/50"
                        }  `}
                    >
                        Ingredients
                    </button>
                </div>

                {/* input */}
                <div className="flex gap-2 mt-6">
                    <input
                        placeholder="Search a recipe by name..."
                        onChange={(e) => setSearch(e.target.value)}
                        type="text"
                        className="h-[50px] w-[400px] rounded-md bg-transparent border-slate-300 border-2 px-4 text-lg font-primary outline-0 placeholder:text-slate-200 placeholder:text-base"
                    />
                    <button
                        onClick={searchRecipies}
                        className="w-[50px] h-[50px] border-2 rounded-md border-base-secondary grid place-items-center hover:bg-base-secondary/50 duration-300"
                    >
                        <Icon
                            icon="arrow"
                            className="w-8 h-8 fill-base-secondary"
                        />
                    </button>
                </div>
            </div>

            {/* results */}
            <div className="flex-grow w-[600px] flex flex-col items-center">
                {foundRecipies.length !== 0 ? (
                    <>
                        <h2 className="pt-4 font-primary text-2xl font-semibold text-slate-900">
                            What we found:
                        </h2>

                        <div className="w-[500px] flex flex-col gap-5 mt-5">
                            {foundRecipies.map((recipe, i) => (
                                <Result key={i} name={recipe.name} action={nada} />
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
                            <p className="text-xl font-secondary mt-3 mb-24">No search results...</p>
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
