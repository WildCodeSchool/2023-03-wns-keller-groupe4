import { useState } from "react";
import { PrevButton } from "./tools/PrevButton";
import convertBase64 from "../utils/convertBase64";
import { useMutation } from "@apollo/client";
import { UPDATE_PRODUCT } from "../utils/mutations";
import { GET_ONE_PRODUCT } from "../utils/queries";
import AddReservation from "./AddReservation";
import AdminProductDetailComponent from "./AdminProductDetailComponent";
// import {gql} from "../__generated__";

export interface IProductProps {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    picture: string;
    available: boolean;
    isAdmin: boolean;
}

// INTERFACES
interface IFormUpdateProduct {
    name?: string;
    description?: string;
    price?: number;
    category?: string;
    image?: FileList;
    stock?: number;
    available?: boolean;
}

// This component is Used both for front and back office. For a non admin user it will just display product detail, for an admin it will give the user the possibility to update the product.

const ProductsDetailsComponent = ({
    id,
    name,
    description,
    price,
    stock,
    picture,
    available,
    isAdmin,
}: IProductProps) => {
    // We passed the props isAdmin to the component so that it knows if he has to show product detail in front office or back office mode, in this case this is set to true in the parent component

    // Description
    description = description !== "" ? description : "Aucune description";

    // Availability
    const availability = available ? " Disponible" : " Non disponible";
    const buttonState = available ? false : true;
    const [openModal, setOpenModal] = useState(false);

    // ******************************This is the componnent when used in the back office, for front office use scroll down**************************
    if (isAdmin === true) {
        return (
            <AdminProductDetailComponent
                id={id}
                name={name}
                description={description}
                price={price}
                stock={stock}
                picture={picture}
                available={available}
            />
        );

        // ******************************This is the componnent when used in the front office, for back office use scroll up**************************
    }
    return (
        <>
            {/* Products detail  */}
            <section className="mx-2 md:mx-5 lg:mx-10 my-10 text-gray-700 body-font overflow-hidden bg-white">
                <PrevButton />
                <div className="container px-5 py-12 mx-auto">
                    <div className="flex flex-wrap lg:w-5/6 mx-auto justify-center">
                        <img
                            src={picture}
                            alt=""
                            className="w-full sm:w-1/2 lg:w-1/3 object-cover object-center rounded border border-gray-200"
                        />
                        <div className="w-full lg:w-1/2 lg:pl-10 lg:py-6 mt-6 lg:mt-0 text-center lg:text-left">
                            {/* Brand */}
                            <div
                                className="inline-block bg-red-100 border border-red-400 text-red-700 px-2 my-3 rounded relative"
                                role="alert"
                            >
                                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                                    BRAND NAME
                                </h2>
                            </div>
                            {/* Name */}
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                                {name}
                            </h1>
                            <div
                                className="inline-block bg-red-100 border border-red-400 text-red-700 px-2 my-3 rounded relative"
                                role="alert"
                            >
                                <div className="flex mb-4">
                                    {/* Rating */}
                                    <span className="flex items-center">
                                        <svg
                                            fill="currentColor"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="w-4 h-4 text-red-500"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                        </svg>
                                        <svg
                                            fill="currentColor"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="w-4 h-4 text-red-500"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                        </svg>
                                        <svg
                                            fill="currentColor"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="w-4 h-4 text-red-500"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                        </svg>
                                        <svg
                                            fill="currentColor"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="w-4 h-4 text-red-500"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                        </svg>
                                        <svg
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="w-4 h-4 text-red-500"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                        </svg>
                                        <span className="text-gray-600 ml-3">
                                            4 Reviews
                                        </span>
                                    </span>
                                    {/* Social Networks */}
                                    <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                                        <a href="#a" className="text-gray-500">
                                            <svg
                                                fill="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                className="w-5 h-5"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                            </svg>
                                        </a>
                                        <a
                                            href="#b"
                                            className="ml-2 text-gray-500"
                                        >
                                            <svg
                                                fill="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                className="w-5 h-5"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                            </svg>
                                        </a>
                                        <a
                                            href="#c"
                                            className="ml-2 text-gray-500"
                                        >
                                            <svg
                                                fill="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                className="w-5 h-5"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                            </svg>
                                        </a>
                                    </span>
                                </div>
                            </div>
                            {/* Description */}
                            <p className="leading-relaxed">{description}</p>
                            <div className="flex mt-2 items-center pb-5 border-b-2 border-gray-200 mb-5"></div>
                            <div className="flex">
                                {/* Stocks and availability */}
                                <div className="title-font text-gray-900">
                                    <span className="font-medium">
                                        Disponibilité :
                                    </span>{" "}
                                    {availability}
                                </div>
                                <div className="flex ml-auto title-font text-gray-900">
                                    <span className="font-medium pr-1">
                                        Quantité :
                                    </span>
                                    {stock} pieces
                                </div>
                            </div>
                            <div className="flex mt-2 items-center pb-5 border-b-2 border-gray-200 mb-5"></div>
                            <div className="flex">
                                {/* Price */}
                                <span className="title-font font-medium text-3xl text-gray-900">
                                    {price} €
                                </span>
                                <button
                                    className="flex ml-auto text-white sm:text-xs lg:text-lg bg-red-500 border-0 p-2 sm:px-3 md:px-4 lg:px-6 focus:outline-none hover:bg-red-600 rounded"
                                    disabled={buttonState}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setOpenModal(true);
                                    }}
                                >
                                    {stock > 0
                                        ? "Reservation"
                                        : "Rupture de stock"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Reservation form */}
            <AddReservation
                productId={id}
                name={name}
                stock={stock}
                openModal={openModal}
                setOpenModal={setOpenModal}
            />
        </>
    );
};

export default ProductsDetailsComponent;
