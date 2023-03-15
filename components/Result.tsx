import Icon from "./Icon";

interface ResultParams {
    name: string;
    action: () => void;
}

export default function Result({name, action}: ResultParams) {
    return (
        <div
            className="min-h-[55px] px-2 w-full flex flex-row justify-between items-center text-slate-800 duration-300 hover:bg-base-secondary/20 rounded-md cursor-pointer"
        >
            <div className="flex">
                <span className=" shadow-md h-[40px] w-[40px] rounded-md bg-base-secondary"></span>
                <h5 className=" text-xl font-primary font-semibold flex-grow flex items-center pl-2">
                    {name}
                </h5>
            </div>
            <button onClick={action}>
                <Icon
                    icon="arrow"
                    className="w-8 h-8 fill-slate-800 hover:fill-base-secodnary hover:scale-[1.1] duration-300"
                />
            </button>
        </div>
    );
}
