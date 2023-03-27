const port = process.env.API_PORT || 'http://localhost:3000';

export const login = async (data: object) => {
    const response = await fetch(`${port}/api/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const value = await response.json();

    if (response.status !== 200) {
        console.log(`[${new Date().toLocaleString()}]- Fail to login: ${response.status} - ${response.statusText}`)
        return Promise.reject(value);
    }

    return value;
}

export const register = async (data : object) => {
    const response = await fetch(`${port}/api/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(data)
    });

    const value = await response.json();

    if (response.status !== 201) {
        console.log(`[${new Date().toLocaleString()}]- Fail to register: ${response.status} - ${response.statusText}`)
        return Promise.reject(value);
    }

    return value;
}

///////////////////////// USERS

export const getUser = async (id: string) => {
    const response = await fetch(`${port}/api/users/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    
    const value = await response.json();

    if (response.status !== 200) {
        console.log(`[${new Date().toLocaleString()}]- Fail to get user (api call): ${response.status} - ${response.statusText}`)
        return Promise.reject(value);
    }

    return value;
}

///////////////////////// INGREDIENTS

export const createIngredient = async (data: object) => {
    const response = await fetch(`${port}/api/ingredients`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const value = await response.json();

    if (response.status !== 201) {
        console.log(`[${new Date().toLocaleString()}]- Fail to create ingredient (api call): ${response.status} - ${response.statusText}`)
        return Promise.reject(value);
    }

    return value;
}

export const getIngredients = async () => {
    const response = await fetch(`${port}/api/ingredients`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    const value = await response.json();

    if (response.status !== 200) {
        console.log(`[${new Date().toLocaleString()}]- Fail to get ingredients (api call): ${response.status} - ${response.statusText}`)
        return Promise.reject(value);
    }

    return value;
}

export const updateIngredient = async (data: object, id: string) => {
    const response = await fetch(`${port}/api/ingredients/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const value = await response.json();

    if (response.status !== 200) {
        console.log(`[${new Date().toLocaleString()}]- Fail to update ingredient (api call): ${response.status} - ${response.statusText}`)
        return Promise.reject(value);
    }

    return value;
}

export const deleteIngredient = async (id: string) => {
    const response = await fetch(`${port}/api/ingredients/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (response.status !== 204) {
        console.log(response)
        console.log(`[${new Date().toLocaleString()}]- Fail to delete ingredient (api call): ${response.status} - ${response.statusText}`)
        return Promise.reject(response);
    }

    return 'Success';
}

///////////////////////// RECIPES

export const createRecipe = async (data: object) => {
    const response = await fetch(`${port}/api/recipes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const value = await response.json();

    if (response.status !== 201) {
        console.log(`[${new Date().toLocaleString()}]- Fail to create recipe (api call): ${response.status} - ${response.statusText}`)
        return Promise.reject(value);
    }

    return value;
}

export const getUserRecipes = async (userId: string) => {
    const response = await fetch(`${port}/api/users/${userId}/recipes`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    const value = await response.json();

    console.log(`[${new Date().toLocaleString()}]- API RESPONSE: `, value)

    if (response.status !== 200) {
        console.log(`[${new Date().toLocaleString()}]- Fail to get user recipes (api call): ${response.status} - ${response.statusText}`)
        return Promise.reject(value);
    }

    return value;
}
