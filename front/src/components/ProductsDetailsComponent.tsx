import { Fragment, useRef, useState } from "react"
import defaultImage from "./../assets/products/default.png";
import verifyBase64 from "../utils/verifyBase64Image";
import { PrevButton } from "./Tools";
import { Dialog, Transition } from '@headlessui/react'

export interface IProductProps {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    picture: string;
    available: boolean;
}

const ProductsDetailsComponent = ({ name, description, price, stock, picture, available }: IProductProps) => {
    
    // Description
    description = description !=='' ? description : "No description available";
    
    // Availability
    const availability = available ? " Available" : " Unavailable";
    const buttonState = available ? false : true;
    
    verifyBase64(picture)
    .then((res) => {
        if (res === false) {
            setImage(defaultImage);
        }
    }).catch((err) => {
        console.log(err);
    });

    const [image, setImage] = useState(picture);
    const [open, setOpen] = useState(false);
    const cancelButtonRef = useRef(null);

    return (
        <>
            {/* Products details */}
            <section className="mx-2 md:mx-5 lg:mx-10 my-10 text-gray-700 body-font overflow-hidden bg-white">
                <PrevButton />
                <div className="container px-5 py-12 mx-auto">
                    <div className="flex flex-wrap lg:w-5/6 mx-auto justify-center">
                        <img src={ image } className="w-full sm:w-1/2 lg:w-1/3 object-cover object-center rounded border border-gray-200" />
                        <div className="w-full lg:w-1/2 lg:pl-10 lg:py-6 mt-6 lg:mt-0 text-center lg:text-left">
                            {/* Brand */}
                            <div className="inline-block bg-red-100 border border-red-400 text-red-700 px-2 my-3 rounded relative" role="alert">
                                <h2 className="text-sm title-font text-gray-500 tracking-widest">BRAND NAME</h2>
                            </div>
                            {/* Name */}
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{ name }</h1>
                            <div className="inline-block bg-red-100 border border-red-400 text-red-700 px-2 my-3 rounded relative" role="alert">
                                <div className="flex mb-4">
                                    {/* Rating */}
                                    <span className="flex items-center">
                                        <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                        </svg>
                                        <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                        </svg>
                                        <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                        </svg>
                                        <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                        </svg>
                                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                        </svg>
                                        <span className="text-gray-600 ml-3">4 Reviews</span>
                                    </span>
                                    {/* Social Networks */}
                                    <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                                        <a href="#a" className="text-gray-500">
                                        <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                        </svg>
                                        </a>
                                        <a href="#b" className="ml-2 text-gray-500">
                                        <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                        </svg>
                                        </a>
                                        <a href="#c" className="ml-2 text-gray-500">
                                        <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                        </svg>
                                        </a>
                                    </span>
                                </div>
                            </div>
                            {/* Description */}
                            <p className="leading-relaxed">{ description }</p>
                            <div className="flex mt-2 items-center pb-5 border-b-2 border-gray-200 mb-5"></div>
                            <div className="flex">
                                {/* Stocks and availability */}
                                <div className="title-font text-gray-900"><span className="font-medium">Availability:</span> { availability }</div>
                                <div className="flex ml-auto title-font text-gray-900"><span className="font-medium block md:inline">Quantity: </span><span className="block md:inline"> { stock } pieces</span></div>
                            </div>
                            <div className="flex mt-2 items-center pb-5 border-b-2 border-gray-200 mb-5"></div>
                            <div className="flex">
                                {/* Price */}
                                <span className="title-font font-medium text-3xl text-gray-900">{ price } €</span>
                                <button className="flex ml-auto text-white sm:text-xs lg:text-lg bg-red-500 border-0 p-2 sm:px-3 md:px-4 lg:px-6 focus:outline-none hover:bg-red-600 rounded" 
                                    // disabled={buttonState}
                                    onClick={() => { setOpen(true)}}>
                                    Reservation
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Add To Cart Modal */}
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                    <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 font-medium">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                                </svg>
                                            </div>
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                    Le produit { name } a été ajouté au panier
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">
                                                    Vous pouvez à présent vous rendre dans votre panier de produits pour confirmer votre/vos réservations ou continuer vos achats.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <h4 className="text-base font-semibold leading-4 text-gray-500 sm:pl-20 pt-5">Votre panier contient </h4>
                                    <div className="flex ps-5 pe-10 md:px-20 lg:px-24 pt-5 pb-10 text-gray-500">
                                        <div className="flex-1"><span className="font-semibold">Articles : </span>1</div>
                                        <div className="flex-1 text-right"><span className="font-semibold">Total : </span> { price } €</div>
                                    </div>
                                    
                                    <hr />
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                            onClick={() => setOpen(false)}
                                        >
                                            Voir mon panier
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={() => setOpen(false)}
                                            ref={cancelButtonRef}
                                        >
                                            Ajouter d'autres produits
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
};

export default ProductsDetailsComponent;