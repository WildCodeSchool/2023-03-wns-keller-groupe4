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
        <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 text-3xl font-bold text-center">{name}</div>
            <div className="flex justify-center col-span-2">
                <img className="md:w-32 lg:w-48" src={image} alt={name} />
            </div>
            <div className="col-span-2 text-center">{description}</div>
            <div className="text-left"><span className="font-bold">Status :</span>{ availability }</div>
            <div className="text-right"><span className="font-bold">Price :</span> {price} €/day</div>
            <div className="col-span-2 font-bold text-center">
                <button className="bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded inline-flex items-center" disabled={buttonState}>
                <span className="me-1">Add To Cart</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                </button>
            </div>
        </div>   
    );
};

export default Product;