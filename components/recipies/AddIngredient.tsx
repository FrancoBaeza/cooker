import { useEffect, useState } from "react";



export default function AddIngredient( {setAddIngredients}: AddIngredientProps}) {

    const [start, setStart] = useState(false);

    // setting the start state to true
    useEffect(() => {
        setStart(true);
    }, []);
    return (
        <div
            className={`fixed top-0 left-0 w-screen h-screen bg-black/30 grid place-content-center duration-300 ${start ? "opacity-1" : "opacity-0"}`}
        >
            <div
                className={`w-[400px] h-[500px] bg-[#E0E0E0] border-4 border-base-primary rounded-md shadow text-center p-4 flex flex-col gap-2 relative `}
            ></div>
        </div>
    );
}
