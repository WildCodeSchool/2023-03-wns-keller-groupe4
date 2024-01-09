import { useState } from "react";
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

    const [image, setImage] = useState(picture);
    const [backgroundColorImage, setBackgroundColorImage] = useState("");

    // Availability
    const availability = available ? "Details" : "Indisponible";
    const buttonState = available ? " comp-background" : " opacity-50";

    return (
        <div
            key={id}
            className={`component group relative border ${
                mostWanted ? " border-2 border-lightmain" : "border-gray-300"
            } hover:border-gray-500 rounded h-full pb-1`}
        >
            <div className={backgroundColorImage}>
                <div className="flex flex-col justify-center sm:w-10 md:w-32 lg:w-48 h-28 lg:h-36 overflow-hidden align-middle mx-auto rounded-md lg:aspect-none opacity-70 group-hover:opacity-100">
                    <img
                        src={image}
                        alt={name}
                        className="sm:w-10 md:w-32 lg:w-48 h-28 lg:h-36 object-cover object-center"
                    />
                </div>
            </div>
            <div className="flex-none md:flex justify-between items-center border-t pt-4 px-2 py-1 comp-border text-center md:text-left">
                <div>
                    <h3 className="text-sm text-gray-700">{name}</h3>
                    <p className="mt-1 text-sm text-orange-500 font-medium">
                        {price} €/day
                    </p>
                </div>
                <div className="flex justify-center m-2 md:m-0 text-sm font-bold text-white">
                    <Link to={`/product/${id}/${name}`}>
                        <button
                            className={
                                "flex justify-evenly bg-gray-600 py-1 px-2 rounded items-center" +
                                buttonState
                            }
                        >
                            <span className="me-1">{availability}</span>
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
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductsListComponent;
