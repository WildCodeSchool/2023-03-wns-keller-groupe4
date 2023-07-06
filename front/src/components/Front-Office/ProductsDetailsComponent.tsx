import React, {useState} from "react"
import { Link } from "react-router-dom";
import { tryRequire } from "../../components/TryRequire";

export interface IProductProps {
    id: string;
    name: string;
    // reference: string;
    description: string;
    price: number;
    stock: number;
    picture: string;
    available: boolean;
}

const Product = ({ id, name, description, price, stock, picture, available }: IProductProps) => {
    
    // Availability
    const availability = available ? " Available" : " Unavailable";
    const buttonState = available ? false : true;
    
    // Image
    const defaultImage = "product-1.jpg";
    const tryImage = tryRequire('./../../assets/products/${picture}')
        ? tryRequire('./../../assets/products/${picture}')
        : defaultImage;
    const [image, setImage] = useState();

    (function (imageName) {
        import(
          './../../assets/products/' + tryImage
        ).then((image) => setImage(image.default));
    })();

    return (
        <div className="min-h-screen">
            <div className="w-2/3 fill-height">
            {/* <div className="grid grid-cols-2 gap-4 w-2/3 h-full"> */}
                {/* <div className="col-span-2 text-3xl font-bold text-center">{name}</div> */}
                <div className="flex justify-center">
                    <img className="md:w-48 lg:w-72" src={image} alt={name} />
                </div>
                {/* <div className="col-span-2 text-center">{description}</div>
                <div className="text-left"><span className="font-bold">Status :</span>{ availability }</div>
                <div className="text-right"><span className="font-bold">Price :</span> {price} €/day</div>
                <div className="col-span-2 font-bold text-center">
                    <button className="bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded inline-flex items-center" disabled={buttonState}>
                    <span className="me-1">Add To Cart</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
                    </button>
                </div> */}

                <div className="grid gap-4 grid-cols-5 grid-rows-1 my-5">
                <img
                    src={image}
                    alt={name}
                    className="sm:w-24 md:w-32 lg:w-32 border border-gray-300 hover:border-gray-500 rounded"
                />
                <img
                    src={image}
                    alt={name}
                    className="sm:w-24 md:w-32 lg:w-32 border border-gray-300 hover:border-gray-500 rounded"
                />
                <img
                    src={image}
                    alt={name}
                    className="sm:w-24 md:w-32 lg:w-32 border border-gray-300 hover:border-gray-500 rounded"
                />
                <img
                    src={image}
                    alt={name}
                    className="sm:w-24 md:w-32 lg:w-32 border border-gray-300 hover:border-gray-500 rounded"
                />
                <img
                    src={image}
                    alt={name}
                    className="sm:w-24 md:w-32 lg:w-32 border border-gray-300 hover:border-gray-500 rounded"
                />
                </div>
            </div>
            <div className="text-center absolute w-1/3 top-0 right-0 bottom-0 p-10 bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] data-[te-sidenav-hidden='false']:translate-x-0 dark:bg-zinc-800"
                data-te-sidenav-init data-te-sidenav-hidden="false" data-te-sidenav-position="absolute"
            >
                <h1 className="mb-1 text-3xl font-bold text-white">{name}</h1>
                <span className="block my-3 text-xl font-bold text-white">{price} €/day</span>
                <p className="mb-6 text-lg font-normal text-gray-500 dark:text-gray-400">Here at Wildrent we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
                <hr className="text-gray-500" />
                    <div className="grid grid-cols-2 py-5 text-yellow-500">
                        <div className=""><span className="font-bold">Status :</span>{ availability }</div>
                        <div className=""><span className="font-bold">Stock :</span> {stock}</div>
                    </div>
                <hr />
                <a href="#" className="inline-flex items-center justify-center mt-10 mb-5 px-5 py-3 text-base font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                    Add To Cart
                    <svg className="w-6 h-6 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/>
                    </svg>
                </a>
            </div>
        </div>
    );
};

export default Product;