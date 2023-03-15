import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface AlertState {
    message: string;
    type: "success" | "danger" | "warning" | "info";
    active: boolean;
    setMessage: (message: string) => void;
    setType: (type: "success" | "danger" | "warning" | "info") => void;
    setActive: (active: boolean) => void;
    setAlert: (message: string, type: "success" | "danger" | "warning" | "info") => void;
}

export const useAlertStore = create<AlertState>()(
    devtools(
        (set) => ({
            message: "",
            type: "success",
            active: false,
            setMessage: (message: string) => set({ message }),
            setType: (type: "success" | "danger" | "warning" | "info") => set({ type }),
            setActive: (active: boolean) => set({ active }),
            setAlert(message: string, type: "success" | "danger" | "warning" | "info") {
                set({ message, type, active: true })
            }
        })
    )
)