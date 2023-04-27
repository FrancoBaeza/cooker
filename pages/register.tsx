import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

import { trackPromise } from "react-promise-tracker";

import * as api from "@/utils/api";
import styles from "../styles/register.module.scss";

export default function Register() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [nameError, setNameError] = useState("");

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");

    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [passwordConfirmError, setPasswordConfirmError] = useState("");

    const register = async () => {
        setNameError("");
        setEmailError("");
        setPasswordError("");
        setPasswordConfirmError("");
        try {
            await trackPromise(
                api.register({ name, email, password, passwordConfirm })
            );
            router.push("/");
        } catch (e: any) {
            if (e?.status === "error") {
                if (
                    e.errors.find(
                        (error: any) => Object.keys(error)[0] === "name"
                    )
                )
                    setNameError(
                        e.errors.find(
                            (error: any) => Object.keys(error)[0] === "name"
                        ).name
                    );

                if (
                    e.errors.find(
                        (error: any) => Object.keys(error)[0] === "email"
                    )
                )
                    setEmailError(
                        e.errors.find(
                            (error: any) => Object.keys(error)[0] === "email"
                        ).email
                    );

                if (
                    e.errors.find(
                        (error: any) => Object.keys(error)[0] === "password"
                    )
                )
                    setPasswordError(
                        e.errors.find(
                            (error: any) => Object.keys(error)[0] === "password"
                        ).password
                    );

                if (
                    e.errors.find(
                        (error: any) =>
                            Object.keys(error)[0] === "passwordConfirm"
                    )
                )
                    setPasswordConfirmError(
                        e.errors.find(
                            (error: any) =>
                                Object.keys(error)[0] === "passwordConfirm"
                        ).passwordConfirm
                    );
            }
        }
    };

    return (
        <div className=" h-screen bg-selected_green flex flex-col gap-3 items-center justify-center ">
            <div className="bg-slate-200 w-[700px] h-[600px] flex flex-row items-center rounded-md shadow-lg">
                <div className=" rounded-l-md bg-base-primary bg-cover w-2/5 h-full">
                    {/* logo */}
                </div>
                <div className="w-3/5 h-full flex flex-col px-8">
                    <h1 className="mt-10 font-semibold text-xl">
                        Welcome to{" "}
                        <strong className="text-base-secondary">Cooker</strong>
                    </h1>
                    <p className=" pt-5 text-sm">{` We'll make your choices way easier. `}</p>
                    <p className=" pb-5 text-sm">{` Tell us about your self. `}</p>

                    {/* name */}
                    <div className={styles.floating_label}>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            className={styles.login}
                            placeholder="Name"
                            type="text"
                            name="name"
                            id="name"
                            autoComplete="off"
                        />
                        <label className={styles.login} htmlFor="name">
                            Your name:
                        </label>
                        <div className={styles.icon}>
                            <svg
                                fill="#000000"
                                width="800px"
                                height="800px"
                                viewBox="0 0 56 56"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    className={`${
                                        nameError !== "" && "!fill-red-500"
                                    }`}
                                    d="M 28.0117 27.3672 C 33.0508 27.3672 37.3867 22.8672 37.3867 17.0078 C 37.3867 11.2187 33.0274 6.9297 28.0117 6.9297 C 22.9961 6.9297 18.6367 11.3125 18.6367 17.0547 C 18.6367 22.8672 22.9961 27.3672 28.0117 27.3672 Z M 13.2930 49.0703 L 42.7305 49.0703 C 46.4101 49.0703 47.7226 48.0156 47.7226 45.9531 C 47.7226 39.9062 40.1523 31.5625 28.0117 31.5625 C 15.8477 31.5625 8.2774 39.9062 8.2774 45.9531 C 8.2774 48.0156 9.5898 49.0703 13.2930 49.0703 Z"
                                />
                            </svg>
                        </div>
                        {/* error name display */}
                        {nameError !== "" && (
                            <div className="absolute">
                                <p className="relative z-50 pl-11 text-xs text-red-500 font-bold">
                                    {nameError}
                                </p>
                            </div>
                        )}
                    </div>

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
                                width="800px"
                                height="800px"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    className={`${
                                        emailError !== "" && "!fill-red-500"
                                    }`}
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M19.2 5H4.8C3.81 5 3.009 5.81 3.009 6.8L3 17.6C3 18.59 3.81 19.4 4.8 19.4H19.2C20.19 19.4 21 18.59 21 17.6V6.8C21 5.81 20.19 5 19.2 5ZM19.2 17.6H4.8V8.6L12 13.1L19.2 8.6V17.6ZM4.8 6.8L12 11.3L19.2 6.8H4.8Z"
                                    fill="#000000"
                                />
                            </svg>
                        </div>
                        {/* error email display */}
                        {emailError !== "" && (
                            <div className="absolute">
                                <p className="relative z-50 pl-11 text-xs text-red-500 font-bold">
                                    {emailError}
                                </p>
                            </div>
                        )}
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
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#000000"
                                width="800px"
                                height="800px"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    className={`${
                                        passwordError !== "" && "!fill-red-500"
                                    }`}
                                    d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6-5.1c1.71 0 3.1 1.39 3.1 3.1v2H9V6h-.1c0-1.71 1.39-3.1 3.1-3.1zM18 20H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"
                                />
                            </svg>
                        </div>
                        {/* error password display */}
                        {passwordError !== "" && (
                            <div className="absolute">
                                <p className="relative z-50 pl-11 text-xs text-red-500 font-bold">
                                    {passwordError}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* password confirmation */}
                    <div className={styles.floating_label}>
                        <input
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            className={styles.login}
                            placeholder="Password confirmation"
                            type="password"
                            name="password-confirm"
                            id="password-confirm"
                            autoComplete="off"
                        />
                        <label
                            className={styles.login}
                            htmlFor="password-confirm"
                        >
                            Password confirmation:
                        </label>
                        <div className={styles.icon}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#000000"
                                width="800px"
                                height="800px"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    className={`${
                                        passwordConfirmError !== "" &&
                                        "!fill-red-500"
                                    }`}
                                    d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6-5.1c1.71 0 3.1 1.39 3.1 3.1v2H9V6h-.1c0-1.71 1.39-3.1 3.1-3.1zM18 20H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"
                                />
                            </svg>
                        </div>
                        {/* error password confirm display */}
                        {passwordConfirmError !== "" && (
                            <div className="absolute">
                                <p className="relative z-50 pl-11 text-xs text-red-500 font-bold">
                                    {passwordConfirmError}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* login button */}
                    <button
                        onClick={register}
                        className=" self-end mt-4 rounded-full bg-base-primary hover:bg-base-secondary duration-300 hover:translate-y-[-4px] px-7 py-3 text-slate-100 text-sm "
                    >
                        Register
                    </button>

                    {/* login redirect */}
                    <div className="flex items-end justify-end mb-5 flex-grow text-xs text-slate-500">
                        {" "}
                        <Link
                            href="/login"
                            className="cursor-pointer hover:underline"
                        >
                            {" "}
                            {`Aready got an account? Log in! `}{" "}
                        </Link>{" "}
                    </div>
                </div>
            </div>
        </div>
    );
}
