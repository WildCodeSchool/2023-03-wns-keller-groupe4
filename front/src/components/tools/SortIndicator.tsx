import React from "react";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { VscBlank } from "react-icons/vsc";

interface SortIndicatorInterface {
    column: string;
    orderBy: string;
    orderDirection: string;
}

const SortIndicator = ({
    column,
    orderBy,
    orderDirection,
}: SortIndicatorInterface) => {
    if (column === orderBy) {
        console.log("column === orderBy");

        // if (column === "stock") {
        //     return orderDirection === "DESC" ? (
        //         <AiOutlineArrowDown />
        //     ) : (
        //         <AiOutlineArrowUp />
        //     );
        // }
        return orderDirection === "DESC" ? (
            <AiOutlineArrowUp />
        ) : (
            <AiOutlineArrowDown />
        );
    } else {
        return <VscBlank />;
    }
};

export default SortIndicator;
