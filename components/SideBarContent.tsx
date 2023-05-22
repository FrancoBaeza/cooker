import { useRouter } from "next/router";
import Icon from "./Icon";
import Link from "next/link";

export default function SideBarContent() {
    const router = useRouter();
    const path = router.pathname;

    const menuOptions = [
        {
            paths: ["/", "/AiSearch", "/Favourites"],
            title: "Home",
            options: [
                {
                    title: "Search recipes",
                    path: "/",
                    icon: "search",
                },
                {
                    title: "AI search",
                    path: "/AiSearch",
                    icon: "AI",
                },
                {
                    title: "Favourites",
                    path: "/favourites",
                    icon: "star",
                },
            ],
        },
        {
            paths: ["/ingredients", "/newIngredient"],
            title: "Ingredients",
            options: [
                {
                    title: "All ingredients",
                    path: "/ingredients",
                    icon: "search",
                },
                {
                    title: "Add new ingredient",
                    path: "/newIngredient",
                    icon: "AI",
                },
            ],
        },
    ];

    const selectedMenu = menuOptions.find((option) =>
        option.paths.includes(path)
    );

    return (
        <div className="flex flex-col justify-between h-full px-4 py-4">
            <div className="flex flex-col gap-10">
                {selectedMenu && (
                    <>
                        <h3 className=" font-semibold text-xl text-nice-white font-primary pl-2">
                            {selectedMenu.title}
                        </h3>

                        <div className="flex flex-col gap-3">
                            {selectedMenu.options.map((option, index) => (
                                <Link
                                    href={option.path}
                                    key={index}
                                    className={`w-full px-3 h-[40px] rounded-md cursor-pointer flex items-center ${
                                        path === option.path
                                            ? "bg-[#6FC5DC]/60"
                                            : "hover:bg-[#6FC5DC]/60"
                                    } duration-300`}
                                >
                                    <Icon
                                        icon={option.icon}
                                        className="w-6 fill-slate-200"
                                    />
                                    <p className="font-medium text-slate-200 font-primary pl-2">
                                        {" "}
                                        {option.title}{" "}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </>
                )}
            </div>
            <div className="flex justify-between">
                <div className="flex flex-col">
                    <p className="font-medium text-slate-200 text-sm font-primary pl-2">Franco Baeza</p>
                    <p className=" text-slate-200/70 text-xs font-primary pl-2">Francobaezagraf@gmail.com</p>
                </div>
            </div>
        </div>
    );
}
