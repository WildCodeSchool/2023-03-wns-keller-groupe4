// export const util = () => console.log("bonjour je susi utile");
import { useEffect, useState } from "react";

export function useDebounce(value: string, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(timerId);
    }, [value, delay]);

    return debouncedValue;
}
