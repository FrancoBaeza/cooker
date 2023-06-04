import { useEffect, useState } from "react";
import Link from "next/link";

import Icon from "@/components/Icon";

import type { NextPageWithLayout } from "./_app";
import Layout from "@/components/Layout";
import type { ReactElement } from "react";

import addData from "@/utils/fireStore/addData";
import getData from "@/utils/fireStore/getData";

import { app, database } from "@/utils/firebase";
import { collection, addDoc, getDocs, doc, onSnapshot } from 'firebase/firestore';


const Chat: NextPageWithLayout = () => {
    const [chatData, setChatData] = useState([]);

    // const addDataToFirestore = async () => {
    //     const res = await addData("chat", "v9yPgrkCQtkNirpV0dcU", {
    //         text: "Hellos",
    //         userId: "user",
    //     });
    //     console.log("RES: ", res);
    // };

    // const getDataFromFirestore = async () => {
    //     const res = await getData("chat", "v9yPgrkCQtkNirpV0dcU");
    //     console.log("RES: ", res);
    // };

    const dbInstance = collection(database, 'chat');

    const uploadMessage = async () => {
        const docRef = await addDoc(dbInstance, {
            text: "Hellos 2",
            userId: "user 2",
        });
        console.log("Document written with ID: ", docRef.id);
    };

    const getMessages = async () => {
        const querySnapshot = await getDocs(dbInstance);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        }
        );
    }

    // set event listener for chat data
    useEffect(() => {
        const unsubscribe = onSnapshot(dbInstance, (querySnapshot) => {
            const messages = querySnapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            });
            console.log("NUEVOS MENSAJESSSS: ", messages);
        });
        return () => unsubscribe();
    }, []);

    return (
        <div className="flex flex-col p-5">
            {/* page header breadcum*/}
            <div className="flex gap-3">
                <Icon icon="solidHome" className="w-6 fill-base-gray" />
                <Icon icon="arrow2" className="w-4 fill-base-gray" />
                <span
                    className={`grid place-content-center bg-[#B6DDE8]/70 rounded-md py-1 px-2 font-primary text-[#5299B6] text-sm font-semibold `}
                >
                    Chat
                </span>
            </div>
            <button onClick={uploadMessage}>Add</button>
            <button onClick={getMessages}>Get</button>
        </div>
    );
};

Chat.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};

export default Chat;
