import { useState } from "react"
import defaultImage from "./../../assets/products/default.jpg";

export interface IProductProps {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    picture: string;
    available: boolean;
}

const Product = ({ name, description, price, stock, picture, available }: IProductProps) => {
    
    // Description
    description = description !=='' ? description : "No description available";
    
    // Availability
    const availability = available ? " Available" : " Unavailable";
    const buttonState = available ? false : true;
    
    // Image
    const [image, setImage] = useState(defaultImage);

    (function () {
        import(
          './../../assets/products/' + picture
        ).then((image) => {
            setImage(image.default)}
        )
        .catch((image) => { 
            setImage(defaultImage)
        })
    })();

    return (
        <section className="text-gray-700 body-font overflow-hidden bg-white">
        <div className="container px-5 py-12 mx-auto">
            <div className="lg:w-5/6 mx-auto flex flex-wrap">
                <img alt="ecommerce" className="sm:w-1/2 lg:w-1/3 w-full object-cover object-center rounded border border-gray-200" src={ image } />
                <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 text-center md:text-left">
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
                                <a className="text-gray-500">
                                <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                </svg>
                                </a>
                                <a className="ml-2 text-gray-500">
                                <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                </svg>
                                </a>
                                <a className="ml-2 text-gray-500">
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
                        <button className="flex ml-auto text-white sm:text-xs lg:text-lg bg-red-500 border-0 py-2 sm:px-3 md:px-4 lg:px-6 focus:outline-none hover:bg-red-600 rounded" disabled={buttonState}>Reservation</button>
                    </div>
                </div>
            </div>
        </div>
        </section>
    );
};

export default Product;