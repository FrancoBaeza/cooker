import { useState, useEffect } from "react";

import { User } from "@/utils/types";
import { useUserStore } from "@/stores/userStore";

export default function useUser(id: string = "") {
    const fetchUser = useUserStore((state) => state.fetchUser);
    const storeUser = useUserStore((state) => state.user);
    const [user, setUser] = useState(storeUser);

    useEffect(() => {
        const getUser = async () => {
            if (id !== "" && storeUser === null) {
                const foundUser = await fetchUser(id);
                setUser(foundUser);
            }
        }
        getUser();
    }, []);

    return user;
}
