import { useEffect, useState } from "react";

export default function Test() {
    const [response, setResponse] = useState("");

    useEffect(() => {
        fetch(
            "https://api.openai.com/v1/engines/text-davinci-003/completions",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer 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",
                },
                body: JSON.stringify({
                    prompt: "Hola, ¿cómo estás?",
                    max_tokens: 5,
                }),
            }
        )
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <div className="">
            <h1>Response</h1>
            {response}
        </div>
    );
}
