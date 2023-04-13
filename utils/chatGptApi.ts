import { Ingredient } from "./types";

export const getSuggestions = async (ingredients: Ingredient[]) => {

    const message = `Necesito que me armes una lista de 5 recetas que puedo cocinar con los sigueintes ingredientes: ${
                        ingredients.map((ingredient) => ingredient.name).join(', ')
                    }, solo tengo estos ingredientes, no puedo comprar mas. 
                    Necesito que la respuesta me la des en un formato que pueda convertir facilmente a JSON. El formato del json de cada receta debe ser el siguiente:
                    {
                        "recetas": [
                            {   
                                "name": "Nombre de la receta",
                                "ingredients": [
                                    "papa",
                                    "tomate",
                                    "pan",
                                    "mayonesa",
                                    "milanesas de carne",
                                    "lechuga",
                                    "huevo",
                                    "queso"
                                ],
                                "description": "Una breve descripción de la receta",
                                "difficulty": "un numero de 1 a 10",
                                "duration": "cantidad de minutos aproximada que tarda en hacerse la receta"
                            }
                        ]
                    }
                    Recordá que la receta UNICAMENTE debe contener los ingredientes que te pase, no puede contener ningun otro ingrediente.
                `;

    console.log('Message to send: ', message);

    const response = await fetch(`https://api.openai.com/v1/chat/completions`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer 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`,
            },
            body: JSON.stringify({
                "messages": [{
                    "role": "user",
                    "content": message
                }],
                "model": "gpt-3.5-turbo"
            }),
        })

    const value = await response.json();

    console.log('RESPUESTA--------------------------')
    console.log(value)

    if (response.status !== 200) {
        console.log(`[${new Date().toLocaleString()}]- Fail to get suggestions: ${response.status} - ${response.statusText}`)
        return Promise.reject(value);
    }

    return value;
}