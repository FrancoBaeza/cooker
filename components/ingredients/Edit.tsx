import { useEffect, useState } from "react";

import { Ingredient } from "@/utils/types";
import Icon from "../Icon";
import { useAlertStore } from "@/stores/alertStore";
import { useIngredientStore } from "@/stores/ingredientStore";
import * as api from "@/utils/api";

interface ShowProps {
    ingredient: Ingredient;
    setEditIngredient: (op: boolean) => void;
}

export default function Edit({ ingredient, setEditIngredient }: ShowProps) {
    const [start, setStart] = useState(false);

    // setting the start state to true
    useEffect(() => {
        setStart(true);
    }, []);

    // close the modal FIXME:
    const close = () => {
        setStart(false);
        setTimeout(() => {
            setEditIngredient(false);
        }, 300);
    };
    return (
        <div
            className={`fixed top-0 left-0 w-screen h-screen bg-black/30 grid place-content-center duration-300 ${
                start ? "opacity-1" : "opacity-0"
            }`}
        >
            <div
                className={`w-[400px] h-[500px] bg-[#E0E0E0] border-4 border-base-primary rounded-md shadow text-center p-4 flex flex-col gap-2 relative `}
            >
                <button
                    onClick={close}
                    className="absolute h-6 w-6 top-1 right-1"
                >
                    <Icon icon="close" className="fill-slate-900" />
                </button>
                <h2 className=" font-primary text-2xl font-semibold">
                    {ingredient.name}
                </h2>
                <p className="font-primary text-sm font-semibold">
                    {ingredient.description}
                </p>
                {/* <div className="flex-grow flex justify-center items-end w-full">
                    <Icon icon="image" className={` w-[300px] h-[300px] `} />
                </div> */}
                <div className=" w-full flex justify-center gap-2">
                    <button className="w-[70px] bg-blue-500 border-2 border-blue-600 rounded-md font-primary font-semibold text-sm text-slate-200 shadow-md duration-300 hover:bg-blue-600 ">
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
}
