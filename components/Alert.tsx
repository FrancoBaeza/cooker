import { MouseEventHandler, useEffect, useState } from "react";

import { useAlertStore } from "@/stores/alertStore";
import Icon from "./Icon";

interface AlertProps {
    message: string;
    type: "success" | "danger" | "warning" | "info";
}

export default function Alert({ message, type }: AlertProps) {
    // handles the animation
    const [start, setStart] = useState(false);

    // get the alert store
    const setActive = useAlertStore((state) => state.setActive);
    const setMessage = useAlertStore((state) => state.setMessage);
    const setType = useAlertStore((state) => state.setType);

    useEffect(() => {

        setTimeout(() => {
            setStart(true);
        }, 100);

        setTimeout(() => {
            setStart(false);

            setTimeout(() => {
                setActive(false);
                setMessage("");
                setType("success");
            }, 2000);
        }, 3000);
    }, []);

    // setting the color of the alert
    let color = "";
    switch (type) {
        case "success":
            color = "bg-green-500 border-green-600";
            break;
        case "danger":
            color = "bg-red-500 border-red-600";
            break;
        case "warning":
            color = "bg-yellow-500 border-yellow-600";
            break;
        case "info":
            color = "bg-blue-500 border-blue-600";
            break;
    }

    return (
        <div
            className={`w-[400px] rounded-md fixed ${color} border-2 text-slate-200 font-semibold text-center right-0 left-0 m-auto bottom-0 py-4 duration-1000
            ${
                start ? " -translate-y-10 opacity-1" : "translate-y-0 opacity-0"
            }`}
        >
            <p>{message}</p>
            <button
                onClick={() => setActive(false)}
                className="absolute w-4 top-1 right-1"
            >
                <Icon icon="close" className="fill-slate-200" />
            </button>
        </div>
    );
}
