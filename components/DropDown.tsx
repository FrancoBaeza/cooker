import { useEffect, useState, useRef } from "react";
import Icon from "./Icon";

interface DropDownProps {
    options: string[];
    label: string;
    width: string;
    height: string;
    onChange: (value: string) => void;
}

export default function DropDown({
    options,
    label,
    width,
    height,
    onChange,
}: DropDownProps) {
    const [selected, setSelected] = useState(options[0]);
    const [isOpen, setIsOpen] = useState(false);
    const [startAnimation, setStartAnimation] = useState(false);

    const ref = useRef(null);
    useOutsideAlerter(ref);


    const open = () => {
        setIsOpen(true);
        setTimeout(() => {
            setStartAnimation(true);
        }, 100);
    };

    const close = () => {
        setStartAnimation(false);
        setTimeout(() => {
            setIsOpen(false);
        }, 300);
    };

    //stack overflow for the win
    function useOutsideAlerter(ref: any) {

        useEffect(() => {
            
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event: any) {
                if (ref.current && !ref.current.contains(event.target)) {
                    close();
                }
            }
            if(isOpen){
                document.addEventListener("mousedown", handleClickOutside);

            }
            // Bind the event listener
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [isOpen, ref]);
    }


    return (
        <div className="relative w-fit" ref={ref}>
            <div className="flex flex-col gap-3">
                <label className="text-sm font-medium font-primary text-base-gray">
                    {label}
                </label>
                <span
                    onClick={() => (isOpen ? close() : open())}
                    className={`${width} ${height} cursor-pointer hover:bg-base-gray/10 duration-300 flex justify-between h-[40px] bg-[#F6F6F6] text-base-gray rounded-md border-[1px] outline-0 border-base-gray font-primary p-3`}
                >
                    <p>{selected}</p>

                    <Icon
                        icon="arrow2"
                        className={`w-3 fill-base-gray duration-300 ${
                            isOpen && startAnimation
                                ? "-rotate-90"
                                : " rotate-90"
                        }`}
                    />
                </span>
            </div>

            {/* options */}
            {isOpen && (
                <div
                    className={` ${
                        startAnimation ? "opacity-1" : "opacity-0"
                    } duration-300 absolute top-[calc(100%+3px)] left-0 w-full bg-white rounded-md shadow-md border-[1px] border-base-gray `}
                >
                    {options.map((option) => (
                        <div
                            key={option}
                            onClick={() => {
                                setSelected(option);
                                setIsOpen(false);
                                onChange(option);
                            }}
                            className="p-3 hover:bg-base-gray/10 cursor-pointer text-sm font-medium font-primary text-base-gray"
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
