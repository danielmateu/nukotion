import { create } from "zustand"

type SearchStore = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    toggle: () => void;
}

/* The code is creating a custom hook called `useSearch` using the `create` function from the `zustand`
library. */
export const useSearch = create<SearchStore>((set, get) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    toggle: () => set(({ isOpen: !get().isOpen }))
}))
