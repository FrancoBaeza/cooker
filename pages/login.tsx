import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";


import { trackPromise } from "react-promise-tracker";

import type { NextPageWithLayout } from "./_app";
import Layout from "@/components/Layout";
import type { ReactElement } from "react";

import styles from "../styles/login.module.scss";
import * as api from "@/utils/api";

const Login: NextPageWithLayout = () => {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const login = async () => {
        try {
            await trackPromise(api.login({ email, password }));
            router.push("/");
        } catch (e: any) {
            console.log(e);
            setErrorMessage(e.message);
        }
    };

    return (
        <div className=" h-screen bg-[#E0E0E0] flex flex-col gap-3 items-center justify-center ">
            <div className="bg-slate-200 w-[700px] h-[500px] flex flex-row items-center rounded-md shadow-lg">
                {/* green side */}
                <div className=" rounded-l-md bg-login-food-banner bg-base-primary w-2/5 h-full">
                    
                </div>
                <div className="w-3/5 h-full flex flex-col px-8">
                    <h1 className="mt-10 font-semibold text-xl">
                        Welcome back to{" "}
                        <strong className="text-base-secondary">Cooker</strong>
                    </h1>
                    <p className=" py-5 text-sm">
                        Lorem ipsum dolor st amet, consectetur adipiscing elit,
                        sed do eiusmod tempor.
                    </p>

                    {/* email */}
                    <div className={styles.floating_label}>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            className={styles.login}
                            placeholder="Email"
                            type="email"
                            name="email"
                            id="email"
                            autoComplete="off"
                        />
                        <label className={styles.login} htmlFor="email">
                            Email:
                        </label>
                        <div className={styles.icon}>
                            <svg
                                className={`${
                                    errorMessage !== "" && styles.shakey
                                }`}
                                width="800px"
                                height="800px"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    className={`${
                                        errorMessage !== "" && "!fill-red-500"
                                    }`}
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M19.2 5H4.8C3.81 5 3.009 5.81 3.009 6.8L3 17.6C3 18.59 3.81 19.4 4.8 19.4H19.2C20.19 19.4 21 18.59 21 17.6V6.8C21 5.81 20.19 5 19.2 5ZM19.2 17.6H4.8V8.6L12 13.1L19.2 8.6V17.6ZM4.8 6.8L12 11.3L19.2 6.8H4.8Z"
                                    fill="#000000"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* password */}
                    <div className={styles.floating_label}>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            className={styles.login}
                            placeholder="Password"
                            type="password"
                            name="password"
                            id="password"
                            autoComplete="off"
                        />
                        <label className={styles.login} htmlFor="password">
                            Password:
                        </label>
                        <div className={styles.icon}>
                            <svg
                                className={`${
                                    errorMessage !== "" && styles.shakey
                                }`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#000000"
                                width="800px"
                                height="800px"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    className={`${
                                        errorMessage !== "" && "!fill-red-500"
                                    }`}
                                    d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6-5.1c1.71 0 3.1 1.39 3.1 3.1v2H9V6h-.1c0-1.71 1.39-3.1 3.1-3.1zM18 20H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* error display */}
                    {errorMessage !== "" && (
                        <p className=" mb-2 text-xs text-red-500 font-bold">
                            {errorMessage}
                        </p>
                    )}

                    {/* login button */}
                    <button
                        onClick={login}
                        className=" self-end mt-4 rounded-full bg-base-primary hover:bg-base-secondary  duration-300 hover:translate-y-[-4px] px-7 py-3 text-slate-100 text-sm "
                    >
                        Log in
                    </button>

                    {/* register redirect */}
                    <div className="flex items-end justify-end mb-5 flex-grow text-xs text-slate-500">
                        {" "}
                        <Link
                            href="/register"
                            className="cursor-pointer hover:underline"
                        >
                            {" "}
                            {`New to the site? Register here for free! `}{" "}
                        </Link>{" "}
                    </div>
                </div>
            </div>
        </div>
    );
};

Login.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};

export default Login;
