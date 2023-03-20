import Icon from "../Icon";

interface SelectIngredientsProps{
    name: string,
    id: string,
    addIngredient: () => void;
}

export default function SelectIngredient({name, id, addIngredient}: SelectIngredientsProps) {
    return (
        <button
            onClick={addIngredient}
            className=" hover:scale-[1.02] duration-300 cursor-pointer flex flex-row items-center gap-1 px-2 bg-gray-500 border-2 border-gray-600 rounded-md font-primary font-medium text-sm text-slate-200 shadow"
        >
            <Icon icon="close" className={` rotate-45 w-4 h-4 fill-slate-200`} />
            {name}
        </button>
    );
}
