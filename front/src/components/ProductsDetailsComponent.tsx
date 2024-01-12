import { useState } from "react";
import { PrevButton } from "./tools/PrevButton";
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
    description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eu augue et mauris euismod posuere ut in turpis. Aenean scelerisque elit aliquet tristique convallis. Aliquam tincidunt nunc a quam finibus vulputate. Vivamus non est sollicitudin, ultricies urna at, pellentesque sapien. Mauris in nisi tincidunt, pharetra metus eu, semper massa";
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
                <div className="container px-5 pt-3 pb-32 mx-auto">
                    <div className="flex flex-wrap lg:w-5/6 mx-auto justify-center">
                        <img
                            src={picture}
                            alt=""
                            className="sm:w-2/5 md:w-1/3 sm:h-2/5 md:h-2/3 p-5 mb-6 object-cover object-center rounded border border-gray-200"
                        />
                        <div className="w-full lg:w-1/2 lg:pl-10 text-center lg:text-left">
                            {/* Name */}
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                                {name}
                            </h1>
                            {/* Description */}
                            <p className="leading-relaxed" data-testid="description">{description}</p>
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
