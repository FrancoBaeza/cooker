import { useEffect, useState } from "react";

import { useIngredientStore } from "@/stores/ingredientStore";
import SelectIngredient from "./SelectIngredient";
import { Ingredient } from "@/utils/types";

interface AddIngredientProps {
    setAddIngredients: (op: boolean) => void;
}

export default function AddIngredient({
    setAddIngredients,
}: AddIngredientProps) {
    // getting the ingredients store functions
    const fetchIngredients = useIngredientStore(
        (state) => state.fetchIngredients
    );
    const ingredients = useIngredientStore((state) => state.ingredients);
    const ingredientsSeted = useIngredientStore((state) => state.seted);
    const [allIngredients, setAllIngredients] = useState(ingredients);
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

    const [start, setStart] = useState(false);

    // setting the start state to true
    useEffect(() => {
        setStart(true);
    }, []);

    const addIngredient = (id: string) => {
        const ingredient = allIngredients.filter((i) => i._id === id)[0];
        setAddedIngredients([...addedIngredients, ingredient]);
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
                <h2 className=" font-primary text-2xl font-semibold">
                    Choose Ingredietns
                </h2>

                <h3 className=" font-primary text-lg font-semibold">Added</h3>
                <div className="flex flex-wrap gap-2">
                    {addedIngredients.map((i) => (
                        <SelectIngredient
                            key={i._id}
                            name={i.name}
                            id={i._id}
                            addIngredient={() => addIngredient(i._id)}
                        />
                    ))}
                </div>
                <h3 className=" font-primary text-lg font-semibold">
                    Available
                </h3>
                <input
                placeholder="Select Ingredients"
                    className={`w-full self-center bg-transparent rounded-md border-slate-500 border-2 outline-0 px-2 py-1 font-primary text-sm placeholder:text-slate-700 text-slate-700`}
                    type="text"
                    value={addIngredientsFilter}
                    onChange={(e) => setAddIngredientsFilter(e.target.value)}
                />
                <div className="flex flex-wrap gap-2">
                    {allIngredients
                        .filter((ingre) =>
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
                                key={i._id}
                                name={i.name}
                                id={i._id}
                                addIngredient={() => addIngredient(i._id)}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
}
