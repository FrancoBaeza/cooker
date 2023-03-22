import Icon from "../Icon";

interface SelectIngredientsProps {
    name: string;
    id: string;
    click: () => void;
    added: boolean;
}

export default function SelectIngredient({
    name,
    id,
    click,
    added,
}: SelectIngredientsProps) {
    return (
        <button
            onClick={click}
            className={` hover:scale-[1.02] duration-300 cursor-pointer flex flex-row items-center gap-1 px-2  border-2  rounded-md font-primary font-medium text-sm text-slate-200 shadow
            ${
                added
                    ? " bg-base-primary/80 border-400-primary/50"
                    : "bg-gray-500 border-gray-600"
            }`}
        >
            {added ? (
                <Icon icon="remove" className={` w-4 h-4 fill-slate-200`} />
            ) : (
                <Icon
                    icon="close"
                    className={` rotate-45 w-4 h-4 fill-slate-200`}
                />
            )}

            {name}
        </button>
    );
}
