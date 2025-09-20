import { useState, useEffect } from 'react';

function useLocalStorage<T>(initiavlValue: T, key: string) {
    function getValue() {
        const storage = localStorage.getItem(key);
        if (storage) {
            return JSON.parse(storage);
        }
        return initiavlValue;
    }

    const [value, setValue] = useState(getValue);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}
export default useLocalStorage;
