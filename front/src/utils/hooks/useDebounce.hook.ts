// export const util = () => console.log("bonjour je susi utile");
import { useEffect, useState } from "react";

/**
 * Permet de gérer les inputs de recherche qui necessite un TimeOut
 * @param value : valeur que l'on veut récupérer après un delau
 * @param delay  : delay pour lequel on va attentdre avant de renvoyer la valeur
 * @returns la valeur après que le delay fournis soit passé
 */
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
