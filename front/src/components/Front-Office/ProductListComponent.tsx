import React, {useState} from "react"
export interface IProductProps {
    id: number;
    name: string;
    reference: string;
    price: number;
    picture: string;
}

const Product = ({ id, name, reference, price, picture }: IProductProps) => {
    const [image, setImage] = useState("");
    (function (imageName) {
        import(
          './../../assets/products/'+picture
        ).then((image) => setImage(image.default));
    })();

    return (
        <div key={id} className="group relative">
            <div className="flex flex-col justify-center sm:w-24 md:w-32 lg:w-48 h-64 overflow-hidden align-middle mx-auto rounded-md lg:aspect-none group-hover:opacity-75">
                <img
                    src={image}
                    alt={name}
                    className="sm:w-24 md:w-32 lg:w-48"
                />
            </div>
            <div className="mt-4 flex justify-between">
                <div>
                    <h3 className="text-sm text-gray-700">
                    <a href="">
                        <span aria-hidden="true" className="absolute inset-0" />
                        {name}
                    </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{ price } €/day</p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                <button className="bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded inline-flex items-center">
                    <span className="me-1">Details</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
                    </button>
                </p>
            </div>
        </div> 
    );
};

export default Product;