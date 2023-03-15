import { useState } from "react";

export default function Recipies() {
    const [filter, setFilter] = useState("recipies");
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
                    <h2 className=" font-primary text-xl font-semibold text-slate-900">Add new recipie</h2>
                </div>
            )}

            {/* your recipies */}
            {filter === "recipies" && (
                <div className=""></div>
            )}
        </>
    );
}