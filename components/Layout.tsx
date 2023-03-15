import { PropsWithChildren } from "react";
import Head from "next/head";

import { usePromiseTracker } from "react-promise-tracker";
import { TailSpin } from "react-loader-spinner";

import { useAlertStore } from "@/stores/alertStore";
import Alert from "./Alert";

export default function Layout(props: PropsWithChildren) {
    const { promiseInProgress } = usePromiseTracker();

	// get the alert store properties
	const alertActive = useAlertStore((state) => state.active);
	const alertMessage = useAlertStore((state) => state.message);
	const alertType = useAlertStore((state) => state.type);

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
            <main>{props.children}</main>


            {/* alert */}
            {alertActive && (
                <Alert
                    message={alertMessage}
                    type={alertType}
                />
            )}
        </>
    );
}
