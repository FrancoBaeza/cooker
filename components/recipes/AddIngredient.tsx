import { useEffect, useState } from "react";

import { TailSpin } from "react-loader-spinner";

import { useIngredientStore } from "@/stores/ingredientStore";
import SelectIngredient from "./SelectIngredient";
import { Ingredient } from "@/utils/types";
import Icon from "../Icon";

interface AddIngredientProps {
    setAddIngredients: (op: boolean) => void;
    submit: (ingredients: Ingredient[]) => void;
    ingredientsList: string[];
}

export default function AddIngredient({
    setAddIngredients,
    submit,
    ingredientsList,
}: AddIngredientProps) {
    // getting the ingredients store functions
    const fetchIngredients = useIngredientStore(
        (state) => state.fetchIngredients
    );
    const ingredients = useIngredientStore((state) => state.ingredients);
    const ingredientsSeted = useIngredientStore((state) => state.seted);
    const [addedIngredients, setAddedIngredients] = useState(
        [] as Ingredient[]
    );
    const [addIngredientsFilter, setAddIngredientsFilter] = useState("");

    // getting all the ingredients
    useEffect(() => {
        // if i already setead the ingredients i dont need to get them again
        if (ingredients.length === 0 && !ingredientsSeted) {
            const getIngredients = async () => {
                await fetchIngredients();
            };
            getIngredients();
        }
    }, []);

    const close = () => {
        setStart(false);
        setTimeout(() => {
            setAddIngredients(false);
        }, 300);
    };

    const [start, setStart] = useState(false);

    // setting the start state to true
    useEffect(() => {
        setStart(true);

        if (ingredientsList.length > 0) {
            const added = ingredients.filter((i) =>
                ingredientsList.includes(i._id)
            );
            setAddedIngredients(added);
        }
    }, []);

    const addIngredient = (id: string) => {
        const ingredient = ingredients.filter((i) => i._id === id)[0];
        setAddedIngredients([...addedIngredients, ingredient]);
    };

    const removeIngredient = (id: string) => {
        const newAddedIngredients = addedIngredients.filter(
            (i) => i._id !== id
        );
        setAddedIngredients(newAddedIngredients);
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
                    Choose Ingredietns
                </h2>

                <h3 className=" font-primary text-lg font-semibold">Added</h3>
                <div className="flex flex-wrap gap-2">
                    {addedIngredients.map((i) => (
                        <SelectIngredient
                            added={true}
                            key={i._id}
                            name={i.name}
                            id={i._id}
                            click={() => removeIngredient(i._id)}
                        />
                    ))}
                </div>
                <h3 className=" font-primary text-lg font-semibold">
                    Available
                </h3>
                <input
                    placeholder="Search Ingredients"
                    className={`w-full self-center bg-transparent rounded-md border-slate-500 border-2 outline-0 px-2 py-1 font-primary text-sm placeholder:text-slate-700 text-slate-700`}
                    type="text"
                    value={addIngredientsFilter}
                    onChange={(e) => setAddIngredientsFilter(e.target.value)}
                />
                <div className="flex flex-wrap gap-2">
                    {ingredients.length > 0 ? (
                        ingredients
                            .filter(
                                (ingre) =>
                                    addIngredientsFilter === "" ||
                                    ingre.name.includes(addIngredientsFilter)
                            )
                            .filter(
                                (ing) =>
                                    !addedIngredients.find(
                                        (aing) => aing._id === ing._id
                                    )
                            )
                            .map((i) => (
                                <SelectIngredient
                                    added={false}
                                    key={i._id}
                                    name={i.name}
                                    id={i._id}
                                    click={() => addIngredient(i._id)}
                                />
                            ))
                    ) : (
                        <div className="w-full h-[200px] grid place-items-center">
                            <TailSpin
                                height="60"
                                width="60"
                                color="#82c126"
                                ariaLabel="tail-spin-loading"
                                radius="1"
                                visible={true}
                            />
                        </div>
                    )}
                </div>
                <div className="w-full h-full flex-grow flex flex-col-reverse items-center">
                    <button
                        onClick={() => {
                            submit(addedIngredients);
                            close();
                        }}
                        className=" w-[80px] border-2 border-green-600 bg-green-500 px-2 font-semibold text-sm text-slate-200 font-primary rounded-md duration-300 hover:bg-green-600"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
