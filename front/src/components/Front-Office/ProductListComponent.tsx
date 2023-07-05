import React, { useState } from "react"
import { Link } from "react-router-dom";
export interface IProductProps {
    id: number;
    name: string;
    // reference: string;
    price: number;
    stock: number;
    picture: string;
}

const Product = ({ id, name, price, stock, picture }: IProductProps) => {
    const [image, setImage] = useState("");

    (function (imageName) {
        import(
          './../../assets/products/'+picture
        ).then((image) => setImage(image.default));
    })();

    return (
        <div key={id} className="component group relative border border-gray-300 hover:border-gray-500 rounded">
            <div className="flex flex-col justify-center sm:w-24 md:w-32 lg:w-48 h-64 overflow-hidden align-middle mx-auto rounded-md lg:aspect-none opacity-70 group-hover:opacity-100">
                <img
                    src={image}
                    alt={name}
                    className="sm:w-24 md:w-32 lg:w-48"
                />
            </div>
            <div className="flex justify-between items-center border-t mt-4 px-2 py-1 comp-border">
                <div>
                    <h3 className="text-sm text-gray-700">{name}</h3>
                    <p className="mt-1 text-sm text-gray-500">{ price } €/day</p>
                </div>
                <div className="text-sm font-bold text-white">
                    <button className="flex justify-evenly bg-gray-600 py-1 px-2 rounded items-center comp-background">
                        <span className="me-1"><Link to={"/products/item/"+id}>Details</Link></span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div> 
    );
};

export default Product;