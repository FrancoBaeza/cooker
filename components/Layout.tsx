import { PropsWithChildren, useState } from "react";
import Head from "next/head";

import { usePromiseTracker } from "react-promise-tracker";
import { TailSpin } from "react-loader-spinner";

import { useAlertStore } from "@/stores/alertStore";
import Alert from "./Alert";
import Icon from "./Icon";
import Link from "next/link";

export default function Layout(props: PropsWithChildren) {
    const { promiseInProgress } = usePromiseTracker();

    const [sideBarOpen, setSideBarOpen] = useState(true);
    const [sideBarFullyOpen, setSideBarFullyOpen] = useState(false);

    // get the alert store properties
    const alertActive = useAlertStore((state) => state.active);
    const alertMessage = useAlertStore((state) => state.message);
    const alertType = useAlertStore((state) => state.type);

    const toggleSideBar = () => {
        setSideBarOpen(true);
        setTimeout(() => {
            setSideBarFullyOpen(true);
        }, 100);
    };

    return (
        <>
            <Head>
                <title>Cooker</title>
                <link rel="icon" href="/images/favicon.ico" />
            </Head>

            {/* loading indicator */}
            {promiseInProgress && (
                <div className="fixed h-screen w-screen grid place-items-center backdrop-brightness-50 z-50">
                    <TailSpin
                        height="80"
                        width="80"
                        color="#157D9D"
                        ariaLabel="tail-spin-loading"
                        radius="1"
                        visible={true}
                    />
                </div>
            )}

            {/* main */}
            <main className="h-full flex flex-col">
                {/* top bar */}
                <span className="w-screen h-[10px] bg-[#00718F]"></span>
                <div className="flex w-full">
                    {/* sidebar */}
                    <div className="flex w-[290px] w-full bg-[#00718F]">
                        {/* thin sidebar */}
                        <div className="w-[70px] flex flex-col items-center justify-between">
                            <div className="flex flex-col gap-10">
                                <span className="w-[40px] h-[40px] rounded-md cursor-pointer bg-nice-white"></span>
                                <div className="flex flex-col gap-3">

                                    <Link href={`/`} className="w-[40px] h-[40px] rounded-md cursor-pointer grid place-content-center hover:bg-[#6FC5DC]/60 duration-300">
                                        <Icon icon="home" className="w-6 fill-slate-200" />
                                    </Link>
                                    <Link href={`/ingredients`} className="w-[40px] h-[40px] rounded-md cursor-pointer grid place-content-center hover:bg-[#6FC5DC]/60 duration-300">
                                        <Icon icon="ingredient" className="w-7 fill-slate-200" />
                                    </Link>
                                    <Link href={`/recipes`} className="w-[40px] h-[40px] rounded-md cursor-pointer grid place-content-center hover:bg-[#6FC5DC]/60 duration-300">
                                        <Icon icon="recipe" className="w-6 fill-slate-200" />
                                    </Link>
                                    <Link href={`/account/myFridge`} className="w-[40px] h-[40px] rounded-md cursor-pointer grid place-content-center hover:bg-[#6FC5DC]/60 duration-300">
                                        <Icon icon="fridge" className="w-8 fill-slate-200" />
                                    </Link>
                                </div>
                            </div>

                            <div className="rounded-full w-[35px] h-[35px] bg-nice-white"></div>
                        </div>

                        {/* thick sidebar */}
                        <div className="w-[220px] bg-[#5299B6] rounded-tl-[30px]"></div>
                    </div>
                    <div className="flex-grow">{props.children}</div>
                </div>
            </main>

            {/* alert */}
            {alertActive && <Alert message={alertMessage} type={alertType} />}
        </>
    );
}
