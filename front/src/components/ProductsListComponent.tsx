import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import defaultImage from "./../assets/products/default.png";
import verifyBase64 from "../utils/verifyBase64Image";

export interface IProductProps {
    id: string;
    name: string;
    price: number;
    picture: string;
    available: boolean;
    mostWanted: boolean;
}

const ProductsListComponent = ({
    id,
    name,
    price,
    picture,
    available,
    mostWanted,
}: IProductProps) => {
    const [image, setImage] = useState(picture);
    const [backgroundColorImage, setBackgroundColorImage] =
        useState("bg-white");

    useEffect(() => {
        verifyBase64(picture)
            .then((res) => {
                if (res === false) {
                    setImage(defaultImage);
                    setBackgroundColorImage("bg-gray-200");
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }, [picture]);

    const availability = available ? "Details" : "Indisponible";
    const buttonState = available
        ? " bg-slate-900 hover:bg-gray-700"
        : " bg-gray-300";

    return (
        <div
            className={`relative m-5 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 shadow-md ${backgroundColorImage}`}
        >
            <Link
                to={`/product/${id}/${name}`}
                className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
            >
                <div className="flex items-center justify-center w-full">
                    <img
                        className="object-scale-down h-60"
                        src={image}
                        alt={name}
                    />
                </div>
                {mostWanted && (
                    <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                        Meilleure vente
                    </span>
                )}
            </Link>
            <div className="mt-4 px-5 pb-5">
                <Link to={`/product/${id}/${name}`}>
                    <h5 className="text-xl tracking-tight text-slate-900 truncate w-11/12">
                        {name}
                    </h5>
                </Link>
                <div className="mt-2 mb-5 flex items-center justify-between">
                    <p>
                        <span className="text-3xl font-bold text-slate-900">
                            {price} €/jour
                        </span>
                    </p>
                    {/* Add rating or other elements here */}
                </div>
                <Link
                    to={`/product/${id}/${name}`}
                    className={`flex items-center justify-center rounded-md px-5 py-2.5 text-center text-sm font-medium text-white${buttonState}`}
                >
                    <span className="mx-2">{availability}</span>
                    {available ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    ) : (
                        ""
                    )}
                </Link>
            </div>
        </div>
    );
};

export default ProductsListComponent;
