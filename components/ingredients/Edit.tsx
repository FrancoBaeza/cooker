import { useEffect, useState } from "react";

import { Ingredient } from "@/utils/types";
import Icon from "../Icon";
import { useAlertStore } from "@/stores/alertStore";
import { useIngredientStore } from "@/stores/ingredientStore";
import * as api from "@/utils/api";

interface ShowProps {
    ingredient: Ingredient;
    setEditIngredient: (op: boolean) => void;
    setShowIngredient: (op: boolean) => void;
}

export default function Edit({
    ingredient,
    setEditIngredient,
    setShowIngredient,
}: ShowProps) {
    const [start, setStart] = useState(false);

    // ingredient variables
    const [name, setName] = useState(ingredient.name);
    const [description, setDescription] = useState(ingredient.description);
    const [error, setError] = useState("");

    // setting the start state to true
    useEffect(() => {
        setStart(true);
    }, []);

    // close the modal
    const close = () => {
        setStart(false);
        setTimeout(() => {
            setEditIngredient(false);
            setShowIngredient(true);
        }, 300);
    };

    // alert store functions
    const setAlert = useAlertStore((state) => state.setAlert);

    // submit the edited ingredient
    const updateIngredient = async () => {
        try {
            const updatedIngredient = await api.updateIngredient({
                name,
                description,
            }, ingredient._id);
            setError("");

            // setting alert params
            setAlert("Ingredient edited successfully", "success");

            close();
        } catch (error: any) {
            console.log(
                `[${new Date().toLocaleString()}]- Fail to edit ingredient (c):`
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
        <div
            className={`fixed top-0 left-0 w-screen h-screen bg-black/30 grid place-content-center duration-300 ${
                start ? "opacity-1" : "opacity-0"
            }`}
        >
            <div
                className={`w-[400px] bg-[#E0E0E0] border-4 border-base-primary rounded-md shadow text-center p-4 flex flex-col gap-2 relative `}
            >
                <button
                    onClick={close}
                    className="absolute h-6 w-6 top-1 right-1"
                >
                    <Icon icon="close" className="fill-slate-900" />
                </button>
                <h2 className=" font-primary text-xl font-semibold text-slate-800">
                    Edit ingredient
                </h2>

                {/* inputs */}
                <div className="items-center w-full flex flex-col gap-4 ">
                    {/* name */}
                    <div className="flex flex-col items-start w-5/6">
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
                    <div className="flex flex-col items-start w-5/6">
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

                    <div className="flex flex-row-reverse w-5/6">
                        <button
                            onClick={updateIngredient}
                            className="font-primary font-semibold text-sm text-slate-200 shadow-md text-center w-[70px] py-0.5 rounded-md border-[2px] duration-300 border-base-primary bg-base-primary/70 hover:bg-base-primary"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
