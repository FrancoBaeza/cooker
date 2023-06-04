import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { Recipe } from "@/utils/types";
import * as api from "@/utils/api";

interface RecipeState {
    recipes: Recipe[];
    seted: boolean;
    setRecipes: (recipes: []) => void;
    fetchRecipes: () => Promise<void>;
}

export const useRecipeStore = create<RecipeState>()(
    devtools(
        (set) => ({
            recipes: [],
            seted: false,
            setRecipes: (recipes: []) => set({ recipes, seted: true }),
            fetchRecipes: async () => {
                const recipes = await api.getRecipes();
                set({ recipes: recipes.data.data, seted: true });
                console.log('hola: ', recipes.data.data)
                return recipes;
            }
        })
    )
)