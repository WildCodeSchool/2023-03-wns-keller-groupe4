import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { decodeToken, getIDToken } from "../../utils/jwtHandler";
import { GET_USER, GET_USER_CART } from "../../utils/queries";
import { REMOVE_PRODUCT_FROM_RESERVATION, UPDATE_RESERVATION_STATUS } from "../../utils/mutations";
import { EnumStatusReservation } from "../../__generated__/graphql";
import { toast } from "react-toastify";
import { BsBox2Fill, BsCartCheckFill } from "react-icons/bs";
import { GrValidate } from "react-icons/gr";
import { FaShippingFast } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

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
    const userId = decodeToken(getIDToken()).userId;
    const [show, setShow] = useState(false);
    const [profileClass, setProfileClass] = useState("border-gray-200 dark:bg-gray-100 dark:border-gray-200");
    const [payButtonColor, setPayButtonColor] = useState("bg-gray-500 border-gray-600 ring-gray-500");
    const [payButtonDisabled, setPayButtonDisabled] = useState(true);

    const { loading, error, data, refetch } = useQuery(GET_USER_CART, {
        variables: { getCartReservationOfUserId: userId },
    });

    const {data: userData} = useQuery(GET_USER, {
        variables: { getUserByIdId: userId },
    });
    const [updateCart] = useMutation(UPDATE_RESERVATION_STATUS);
    const [removeProductFromCart] = useMutation(REMOVE_PRODUCT_FROM_RESERVATION);

    if (loading) return <p>Chargement du panier en cours...</p>;
    // if (error) return <p>Erreur : Impossible d'afficher le panier</p>;

    let cartSummary:ICartSummary|null = null;
    let cartReservations:IReservation[]|null = null;
    let products:any = null;
    let productDuration:number = 0;
    let totalSubtotal = 0;
    let tSubtotal = "0";
    let totalTaxes = "0";
    let payingButton = "Panier vide";

    
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
                totalSubtotal: totalSubtotal += reservation.product.price * reservation.quantity * productDuration,
            }
        });

        if(products) {
            payingButton = "Valider et Payer";
        }
    }

    // Get user data
    let userFirstName = null;
    let userLastName = null;
    let userStreet = null;
    let userPostalCode = null;
    let userCity = "Paris";
    let userCountry = null;

    if(userData) {
        userFirstName = userData.getUserById.user_profile.firstname;
        userLastName = userData.getUserById.user_profile?.lastname;
        userPostalCode = userData.getUserById.user_profile.postal_code;
        userStreet = userData.getUserById.user_profile.street;
        userCountry = userData.getUserById.user_profile.country;
    }

    // Submit cart when payment is validated
    const submitCart = async (e:React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const cartId = cartSummary?.id;

        if(cartId) {
            const updatedCart = await updateCart({ 
                variables: {
                    status: EnumStatusReservation.Paying,
                    updateStatusOfReservationId: cartId,
                } 
            });

            if(updatedCart) {
                toast.success(
                    "Votre réservation est validée.", { 
                    icon: <GrValidate size="2rem" />,
                });
                refetch();
            } else {
                toast.error("Erreur : La réservation n'a pas pu être confirmée.");
            }
        }
    }

    // Remove a specific product from cart
    const removeProduct = async (e:React.FormEvent<HTMLAnchorElement>, product:string) => {
        e.preventDefault();
        const cartId = cartSummary?.id;

        if(cartId) {
            const removedProduct = await removeProductFromCart({ 
                variables: {
                    productsIds: [product],
                    removeProductsFromReservationId: cartId,
                } 
            });

            if(removedProduct) {
                toast.success(
                    "Le produit a été supprimé du panier.", { 
                    icon: <GrValidate size="2rem" />,
                });
                refetch();
            } else {
                toast.error("Erreur : Impossible de supprimer le produit.");
            }
        }
    }

    return (
        <>
            <div className="w-full h-full" id="chec-div">
                <div className="w-full absolute z-10 h-full overflow-x-hidden" id="checkout">
                    <div className="flex md:flex-row flex-col" id="cart">
                        <div 
                            className="w-3/4 md:pl-10 pl-4 pr-10 md:pr-4 md:py-12 py-6 bg-white overflow-y-auto overflow-x-hidden h-screen" 
                            id="scroll"
                        >
                            { products ? (
                                <p className="text-3xl font-black leading-10 text-gray-800 py-4">
                                    <BsCartCheckFill size="2rem" className="inline mr-3" />
                                    Votre panier de réservation
                                </p> 
                                && products.map((product:any) => (
                                <div className="md:flex items-center py-4 border-t border-gray-200">
                                    <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                        <img src={ product.picture } className="w-full h-full object-center object-cover" />
                                    </div>
                                    <div className="w-1/2 ml-5 leading-none">
                                        <p className="text-base font-black text-gray-800 pb-2">{ product.name }</p>
                                        <p className="text-sm text-gray-600">Mis à disposition le : { product.start_at }</p>
                                        <p className="text-sm text-gray-600">A retourner le : { product.end_at }</p>
                                        <p className="text-sm text-gray-600">Durée de location : { product.duration } jours</p>
                                    </div>
                                    <div className="md:pl-3 md:w-1/2">
                                        <div className="flex flex-row-reverse w-full">
                                            <div className="items-center">
                                                <div className="p-3 bg-gray-200 mx-auto focus:outline-none border rounded-lg">
                                                    <BsBox2Fill size="0.9rem" className="inline mr-2" />
                                                    { product.reservedQuantity } pièces
                                                </div>
                                                <a 
                                                    href="#"
                                                    onClick={(e) => { 
                                                        removeProduct(e, product.id);
                                                    }}
                                                    className="mt-2 text-xs text-center underline text-red-500 cursor-pointer"
                                                >
                                                    <MdDelete size="1rem" className="inline mr-1" />
                                                    Supprimer
                                                </a>
                                            </div>
                                        </div>
                                        <div className="pt-10">
                                            <p className="text-base text-right font-black leading-none text-gray-600">Sous-total produit: { product.subtotal } €</p>
                                        </div>
                                    </div>
                                </div>    
                                ))
                                && <div className="pt-5 mb-20">
                                        <div className="text-3xl font-black leading-10 text-gray-800 py-4 mt-5">
                                            <FaShippingFast className="inline mr-3" size="2rem" />
                                            Votre adresse de livraison
                                        </div>
                                        <div className={ "w-full max-w-sm items-center border rounded-lg shadow" + profileClass}>
                                            <div className="flex flex-col items-center p-5 text-sm text-gray-600">
                                                <h5 className="mb-1 text-xl font-medium text-gray-800">{ userFirstName + ' ' + userLastName }</h5>
                                                <span>{ userStreet }</span>
                                                <span>{ userPostalCode + ' ' + userCity }</span>
                                                <span>{ userCountry }</span>
                                                <div className="flex mt-4 space-x-3 md:mt-6">
                                                    <a 
                                                        href="#" 
                                                        onClick={(e) => e.preventDefault() }
                                                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Modifier</a>
                                                    <a 
                                                        href="#" 
                                                        onClick={(e) => { 
                                                            e.preventDefault(); 
                                                            setProfileClass("border-blue-700 bg-gray-300 dark:border-blue-700 dark:bg-gray-300");
                                                            setPayButtonDisabled(false);
                                                            setPayButtonColor("bg-green-500 border-green-600 ring-green-500"); 
                                                        }}
                                                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Valider</a>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                                ) : (
                                    <div className="flex items-stretch h-full">   
                                        <div className="self-center w-full max-w-lg mx-auto text-center p-6 bg-white border border-gray-200 rounded-lg shadow">
                                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Oups, votre panier de réservation est vide</h5>
                                            <p className="mb-3 font-normal text-gray-700">Et si vous commenciez une nouvelle réservation ?</p>
                                            <Link to={"/products/list/all"} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                                                Voir tous nos produits
                                                <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        <div className="sm:w-1/2 md:w-1/4 xl:w-1/4 w-full bg-gray-100 h-full fixed bottom-0 right-0 top-[70px]">
                            <div className="flex flex-col md:h-screen p-10 pb-24 justify-between overflow-y-auto">
                                <div>
                                    <p className="text-2xl text-center font-black leading-9 text-gray-800">Détails du paiement</p>
                                    <div className="flex items-center justify-between pt-16">
                                        <p className="text-base leading-none text-gray-800">Sous-total</p>
                                        <p className="text-base leading-none text-gray-800">{ tSubtotal = totalSubtotal.toFixed(2) } €</p>
                                    </div>
                                    <div className="flex items-center justify-between pt-5">
                                        <p className="text-base leading-none text-gray-800">TVA (20%)</p>
                                        <p className="text-base leading-none text-gray-800">{ totalTaxes = (+tSubtotal * (20/100)).toFixed(2) } €</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-center text-gray-500">Vous devez valider votre adresse de livraison pour pouvoir payer</p>
                                </div>
                                <div>
                                    <div className="flex items-center pb-6 justify-between lg:pt-5 pt-20">
                                        <p className="text-lg font-bold leading-normal text-gray-700">TOTAL TTC</p>
                                        <p className="text-lg font-bold leading-normal text-right text-blue-600">{ (+tSubtotal + +totalTaxes).toFixed(2) } €</p>
                                    </div>
                                    <button 
                                    onClick={(e) => { submitCart(e); setShow(!show)}} 
                                    className={ "rounded-sm text-base leading-none w-full py-5 text-white ring " + payButtonColor + " ring-offset-2" }
                                    disabled={ payButtonDisabled }
                                    >
                                        { payingButton }
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ShoppingCart;