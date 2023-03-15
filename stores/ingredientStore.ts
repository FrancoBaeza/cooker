import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { Ingredient } from "@/utils/types";
import * as api from "@/utils/api";

interface IngredientState {
    ingredients: Ingredient[];
    seted: boolean;
    setIngredients: (ingredients: []) => void;
    fetchIngredients: () => Promise<void>;
}

export const useIngredientStore = create<IngredientState>()(
    devtools(
        (set) => ({
            ingredients: [],
            seted: false,
            setIngredients: (ingredients: []) => set({ ingredients, seted: true }),
            fetchIngredients: async () => {
                const ingredients = await api.getIngredients();
                set({ ingredients: ingredients.data.data, seted: true });
            }
        })
    )
)