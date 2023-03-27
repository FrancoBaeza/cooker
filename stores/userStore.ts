import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { Ingredient, User, Recipe } from "@/utils/types";
import * as api from "@/utils/api";

interface UserState {
    userRecipes: Recipe[];
    userRecipesSeted: boolean;
    user: User | null;
    fetchUser: (id: string) => Promise<User>;
    fetchUserRecipes: (id: string) => Promise<Ingredient[]>;
}

export const useUserStore = create<UserState>()(
    devtools(
        (set) => ({
            userRecipes: [] as Recipe[],
            userRecipesSeted: false,
            user: null,
            fetchUser: async (id: string) => {
                const user = await api.getUser(id);
                set({ user: user.data.data });
                return user.data.data;
            },
            fetchUserRecipes: async (id: string) => {
                const recipes = await api.getUserRecipes(id);
                set({ userRecipes: recipes.data.recipes, userRecipesSeted: true });
                console.log('recipes', recipes.data.recipes)
                return recipes.data.data;
            }
        })
    )
)