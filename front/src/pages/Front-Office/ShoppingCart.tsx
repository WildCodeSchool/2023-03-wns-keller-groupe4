import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER_CART } from "../../utils/queries";
import { Interface } from "readline";

interface ICartSummary {
    id: string,
    start_at?: Date,
    end_at?: Date,
    reservationsDetails: IReservation[],
}

interface IReservation {
    product: IProduct,
    quantity: number,
    start_at: Date,
    end_at: Date,
}

interface IProduct {
    id: string,
    name: string,
    picture: string,
    price: number,
    stock: number,
    available: boolean,
}

const ShoppingCart = () => {
    const [show, setShow] = useState(false);

    const { loading, error, data } = useQuery(GET_USER_CART, {
        variables: { getCartReservationOfUserId: "a85ae2bc-9765-4ad8-a30b-f4b949550e8c" },
    });

    if (loading) return <p>Chargement du panier en cours...</p>;
    if (error) return <p>Erreur : Impossible d'afficher le panier</p>;

    let cartSummary:ICartSummary|null = null;
    let cartReservations:IReservation[]|null = null;
    let products:any = null;
    let productDuration:number = 0;

    if(data?.getCartReservationOfUser) {
        cartSummary = data?.getCartReservationOfUser;
        cartReservations = cartSummary.reservationsDetails;
        const msInDay = 1000 * 60 * 60 * 24;
        products = cartReservations.map((reservation) => {
            productDuration = Math.round((new Date(reservation.end_at).getTime() - new Date(reservation.start_at).getTime()) / msInDay);
            return {
                id: reservation.product.id,
                name: reservation.product.name,
                picture: reservation.product.picture,
                price: reservation.product.price,
                stock: reservation.product.stock,
                available: reservation.product.available,
                reservedQuantity: reservation.quantity,
                start_at: new Date(reservation.start_at).toLocaleDateString("fr-FR"),
                end_at: new Date(reservation.end_at).toLocaleDateString("fr-FR"),
                duration: productDuration,
                subtotal: reservation.product.price * reservation.quantity * productDuration,
            }
        });
    }

    return (
        <>
            <div className="w-full h-full" id="chec-div">
                <div className="w-full absolute z-10 h-full overflow-x-hidden" id="checkout">
                    <div className="flex md:flex-row flex-col justify-end" id="cart">
                        <div className="w-full md:pl-10 pl-4 pr-10 md:pr-4 md:py-12 py-6 bg-white overflow-y-auto overflow-x-hidden h-screen" id="scroll">
                            <p className="text-3xl font-black leading-10 text-gray-800 py-4">Votre panier de réservation</p>
                            { products ? products.map((product:any) => (
                                <div className="md:flex items-center py-4 border-t border-gray-200">
                                    <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                        <img src={ product.picture } className="w-full h-full object-center object-cover" />
                                    </div>
                                    <div className="ml-5 leading-none">
                                        <p className="text-base font-black text-gray-800 pb-2">{ product.name }</p>
                                        <p className="text-sm text-gray-600">Mis à disposition le : { product.start_at }</p>
                                        <p className="text-sm text-gray-600">A retourner le : { product.end_at }</p>
                                        <p className="text-sm text-gray-600">Durée de location : { product.duration } jours</p>
                                    </div>
                                    <div className="md:pl-3 md:w-1/2">
                                        <div className="flex flex-row-reverse w-full">
                                            <div className="items-center">
                                                <div className="p-3 bg-gray-200 mx-auto focus:outline-none">
                                                    { product.reservedQuantity } pièces
                                                </div>
                                                <div className="mt-2 text-xs text-center underline text-red-500 cursor-pointer">Supprimer</div>
                                            </div>
                                        </div>
                                        <div className="pt-10">
                                            <p className="text-base text-right font-black leading-none text-gray-600">Sous-total produit: { product.subtotal } €</p>
                                        </div>
                                    </div>
                                </div>
                                )) : ("")
                            }
                        </div>
                        <div className="sm:w-1/2 md:w-1/3 xl:w-1/3 w-full bg-gray-100 h-full">
                            <div className="flex flex-col md:h-screen p-10 pb-24 justify-between overflow-y-auto">
                                <div>
                                    <p className="text-2xl text-center font-black leading-9 text-gray-800">Détails du paiement</p>
                                    <div className="flex items-center justify-between pt-16">
                                        <p className="text-base leading-none text-gray-800">Sous-total</p>
                                        <p className="text-base leading-none text-gray-800">9000.00 €</p>
                                    </div>
                                    <div className="flex items-center justify-between pt-5">
                                        <p className="text-base leading-none text-gray-800">TVA (20.00%)</p>
                                        <p className="text-base leading-none text-gray-800">1240.00 €</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center pb-6 justify-between lg:pt-5 pt-20">
                                        <p className="text-lg font-bold leading-normal text-gray-700">TOTAL TTC: </p>
                                        <p className="text-lg font-bold leading-normal text-right text-blue-600">10240.00 €</p>
                                    </div>
                                    <button onClick={() => setShow(!show)} className="rounded-sm text-base leading-none w-full py-5 bg-green-500 border-green-600 ring ring-offset-2 ring-green-500 text-white">
                                        Valider et Payer
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>
                {` /* width */
                #scroll::-webkit-scrollbar {
                    width: 1px;
                }

                /* Track */
                #scroll::-webkit-scrollbar-track {
                    background: #f1f1f1;
                }

                /* Handle */
                #scroll::-webkit-scrollbar-thumb {
                    background: rgb(133, 132, 132);
                }
`}
            </style>
        </>
    );
}

export default ShoppingCart;