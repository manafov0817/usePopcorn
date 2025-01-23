import { useEffect, useState } from "react";

export function useLocalStorageState(initialState, key) {
    const [value, setValue] = useState(function () {
        const watched = localStorage.getItem(key);
        return watched ? JSON.parse(watched) : [];
    });


    useEffect(function () {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key])

    return [value, setValue];
}