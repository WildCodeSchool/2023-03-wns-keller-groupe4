import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { decodeToken, getIDToken } from "../../utils/jwtHandler";
import { GET_USER, GET_USER_CART } from "../../utils/queries";
import { REMOVE_PRODUCT_FROM_RESERVATION, UPDATE_RESERVATION_STATUS, UPDATE_RESERVATION_DATES } from "../../utils/mutations";
import { EnumStatusReservation } from "../../__generated__/graphql";
import { toast } from "react-toastify";
import { BsBox2Fill, BsCartCheckFill } from "react-icons/bs";
import { GrValidate } from "react-icons/gr";
import { FaShippingFast } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { PrevButton } from "../../components/tools/PrevButton";

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
    const userId = getIDToken() ? decodeToken(getIDToken()).userId : ""; 
    const [profileClass, setProfileClass] = useState("border-gray-200 dark:bg-gray-100 dark:border-gray-200");
    const [addressSelected, setAddressSelected] = useState(false);
    const [payButtonColor, setPayButtonColor] = useState("bg-gray-500 border-gray-600 ring-gray-500");
    const [payButtonDisabled, setPayButtonDisabled] = useState(true);
    const [errorStartDate, setErrorStartDate] = useState("hidden");

    const { loading, data, refetch } = useQuery(GET_USER_CART, {
        variables: { getCartReservationOfUserId: userId },
        skip: userId === "",
    });

    const {data: userData} = useQuery(GET_USER, {
        variables: { getUserByIdId: userId },
        skip: userId === "",
    });

    const [updateCart] = useMutation(UPDATE_RESERVATION_STATUS);
    const [updateReservationDates] = useMutation(UPDATE_RESERVATION_DATES);
    const [removeProductFromCart] = useMutation(REMOVE_PRODUCT_FROM_RESERVATION);

    if (loading) return <p className="text-center p-10">Chargement du panier en cours...</p>;

    let cartSummary:ICartSummary|null = null;
    let cartReservations:IReservation[]|null = null;
    let products:any = null;
    let productDuration:number = 0;
    let totalSubtotal = 0;
    let reservation_start_at = 0;
    let reservation_end_at = 0;
    let tSubtotal = "0";
    let totalTaxes = "0";
    let payingButton = "Panier vide";

    if(userId && data?.getCartReservationOfUser) {
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
                start_at: new Date(reservation.start_at),
                end_at: new Date(reservation.end_at),
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
    const submitCart = async () => {
        if(errorStartDate === "hidden") {
            const cartId = cartSummary?.id;

            if(cartId) {
                await updateReservationDates({
                    variables: {
                        startAt: new Date(reservation_start_at).toISOString(),
                        endAt: new Date(reservation_end_at).toISOString(),
                        updateDateOfReservationId: cartId,
                    }
                })
                .then((res:any) => {
                    console.log(res);
                    updateCart({ 
                        variables: {
                            status: EnumStatusReservation.Paying,
                            updateStatusOfReservationId: cartId,
                        } 
                    });
                    refetch();
                    toast.success(
                        "Votre réservation est validée.", { 
                        icon: <GrValidate size="2rem" />,
                    });
                })
                .catch((err:any) => {
                    console.log(err);
                    toast.error("Erreur : La réservation n'a pas pu être confirmée.");
                });
            }
        } else {
            toast.error("Erreur : La date de début de réservation de tous les produits du panier n'est pas identique.");
        }
    };

    // Remove a specific product from cart
    const removeProduct = async (product:string) => {
        const cartId = cartSummary?.id;

        if(cartId) {
            const removedProduct = await removeProductFromCart({ 
                variables: {
                    productsIds: [product],
                    removeProductsFromReservationId: cartId,
                } 
            });

            if(removedProduct) {
                if(errorStartDate === "visible") {
                    setErrorStartDate("hidden");
                }
                refetch();
                toast.success(
                    "Le produit a été supprimé du panier.", { 
                    icon: <GrValidate size="2rem" />,
                });
            } else {
                toast.error("Erreur : Impossible de supprimer le produit.");
            }
        }
    };

    return (
        <>
            <div className="w-full h-full">
                <div className="w-full absolute z-10 h-full overflow-x-hidden">
                    <div className="flex md:flex-row flex-col">
                        <div 
                            className="md:w-3/5 lg:w-3/4 w-full md:pl-10 pl-4 pr-4 md:pr-4 md:py-12 py-6 lg:mr-5 mr-0 bg-white overflow-y-auto overflow-x-hidden lg:h-screen h-auto" 
                            id="scroll"
                        >
                            <div className="lg:block hidden">
                                <PrevButton />
                            </div>
                            { products ? (
                                // Cart with products
                                [
                                    <p className="text-3xl text-center lg:text-left font-black leading-10 text-orange-600 py-4">
                                        <BsCartCheckFill size="2rem" className="inline mr-3" />
                                        Votre panier de réservation
                                    </p>,

                                    <div className={ errorStartDate + " bg-red-100 border border-red-400 text-red-700 text-center px-4 py-3 rounded relative"} role="alert">
                                        <strong className="font-bold">Attention ! </strong>
                                        <span className="block sm:inline">La date de début de réservation de chaque produit doit être identique. Veuillez corriger ce problème.</span>
                                    </div>,
                                    
                                    // Products list
                                    products.map((product:any) => (
                                        // Set start and end date of the global reservation
                                        reservation_start_at === 0 ? ( 
                                            reservation_start_at = product.start_at.getTime()
                                        ) : (
                                            reservation_start_at !== product.start_at.getTime() && errorStartDate == "hidden" ? (
                                                // Set error message if start date is not the same for all products
                                                setErrorStartDate("visible")
                                            ) : ("") 
                                        ),
                                        
                                        reservation_end_at = reservation_end_at < product.end_at.getTime() ? product.end_at.getTime() : reservation_end_at,
                                        
                                        <div className="lg:flex items-center py-4 border-t border-gray-200">
                                            {/* Product name (mobile) */}
                                            <p className="block lg:hidden text-base text-center font-black text-blue-800 pb-2">{ product.name }</p>
                                            
                                            {/* Product image */}
                                            <div className="basis-1/5 lg:basis-1/6 relative mx-auto lg:mx-0 pb-2 md:pb-0 overflow-hidden rounded-md border border-b-0 lg:border-b border-gray-200 shadow-md lg:shadow-none">
                                                <img src={ product.picture } alt={ product.name } className="w-24 h-24 object-center object-cover mx-auto" />
                                                
                                                {/* Product quantity (mobile) */}
                                                <span className="block lg:hidden absolute top-1 left-1 items-center rounded-md bg-gray-100 p-2 text-sm font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                                                    { product.reservedQuantity } pièces
                                                </span>

                                                {/* Delete button (mobile) */}
                                                <button 
                                                    className="block lg:hidden absolute top-1 right-1"
                                                    onClick={() => removeProduct(product.id)}
                                                >
                                                    <MdDelete size="1.4rem" />
                                                </button>
                                            </div>

                                            {/* Product reserved dates and subtotal (mobile) */}
                                            <div className="basis-1/5 lg:basis-1/6 relative visible lg:hidden mx-auto p-2 text-center lg:mx-0 mt-[-0.2rem] overflow-hidden rounded-md rounded-t-none border border-t-0 border-gray-200 bg-gray-200 shadow-md lg:shadow-none">
                                                <p className="text-sm text-gray-600 leading-5">
                                                    Location du { product.start_at.toLocaleDateString("fr-FR") } au { product.end_at.toLocaleDateString("fr-FR") } ({ product.duration } jours)
                                                </p>
                                                <p className="text-base font-black text-gray-800">
                                                    Sous-total produit: { product.subtotal } €
                                                </p>
                                            </div>

                                            {/* Product reserved dates and subtotal (desktop) */}
                                            <div className="basis-4/5 lg:basis-3/6 hidden lg:block text-center lg:text-left mt-5 lg:mt-0 ml-0 lg:ml-5 leading-none">
                                                <p className="text-base font-black text-gray-800 pb-2">{ product.name }</p>
                                                <p className="text-sm text-gray-600">Mis à disposition le : { product.start_at.toLocaleDateString("fr-FR") }</p>
                                                <p className="text-sm text-gray-600">A retourner le : { product.end_at.toLocaleDateString("fr-FR") }</p>
                                                <p className="text-sm text-gray-600">Durée de location : { product.duration } jours</p>
                                            </div>

                                            {/* Product quantity and delete button (desktop) */}
                                            <div className="basis-full lg:basis-2/6 sm:grow hidden lg:block ml-10">
                                                <div className="lg:flex flex-row-reverse w-full">
                                                    <div className="items-center">
                                                        <div className="p-3 bg-gray-200 mx-auto focus:outline-none border rounded-lg">
                                                            <BsBox2Fill size="0.9rem" className="inline mr-2" />
                                                            { product.reservedQuantity } pièces
                                                        </div>
                                                        <button
                                                            onClick={() => removeProduct(product.id)}
                                                            className="mt-2 text-xs text-center underline text-red-500 cursor-pointer"
                                                        >
                                                            <MdDelete size="1rem" className="inline mr-1" />
                                                            Supprimer
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="pt-10">
                                                    <p className="text-base text-right font-black leading-none text-gray-600">Sous-total produit: { product.subtotal } €</p>
                                                </div>
                                            </div>
                                        </div>    
                                    )),
                                    
                                    // Shipping address
                                    <div className="mt-5 mb-20">
                                        <div className="text-3xl text-center lg:text-left font-black leading-10 text-orange-600 py-4 mt-5">
                                            <FaShippingFast className="inline mr-3" size="2rem" />
                                            Votre adresse de livraison
                                        </div>
                                        <div className={ "w-full max-w-sm items-center mx-auto mt-5 border rounded-lg shadow" + profileClass}>
                                            <div className="flex flex-col items-center p-5 text-sm text-gray-600">
                                                <h5 className="mb-1 text-xl font-medium text-gray-800">{ userFirstName + ' ' + userLastName }</h5>
                                                <span>{ userStreet }</span>
                                                <span>{ userPostalCode + ' ' + userCity }</span>
                                                <span>{ userCountry }</span>
                                                <div className="flex mt-4 space-x-3 md:mt-6">
                                                    <Link to={getIDToken() ? "/profile" : "/connect"} 
                                                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">
                                                        Modifier
                                                    </Link>
                                                    <button  
                                                        onClick={() => { 
                                                            setProfileClass("border-orange-500 ring-4 ring-orange-500 bg-gray-100 dark:border-orange-500");
                                                            setAddressSelected(true);
                                                            setPayButtonDisabled(false);
                                                            setPayButtonColor("bg-orange-500 border-orange-600 ring-orange-500"); 
                                                        }}
                                                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-orange-700 rounded-lg hover:bg-orange-800 focus:outline-none dark:bg-orange-600 dark:hover:bg-orange-700"
                                                        >
                                                            Valider
                                                        </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ]
                            ) : (
                                // Empty cart
                                <div className="flex items-stretch sm:w-full w-auto lg:h-full">   
                                    <div className="self-center w-full max-w-lg mx-auto text-center p-10 lg:mt-[-6rem] mt-0 bg-white border border-gray-300 rounded-lg shadow-lg">
                                    <BsCartCheckFill size="2rem" className="inline mb-3" />
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Oups,<br /> Votre panier de réservation est vide</h5>
                                        <p className="mb-3 font-normal text-gray-700">Et si vous commenciez une nouvelle réservation ?</p>
                                        <Link to={"/products/list/all"} className="inline-flex items-center px-3 py-2 mt-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                                            Voir tous nos produits
                                            <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Payment details */}
                        <div className="md:w-1/2 lg:w-1/4 w-full bg-gray-100 shadow-sm h-full sm:relative lg:fixed lg:bottom-0 lg:right-0 lg:top-0">
                            <div className="flex flex-col md:h-full p-10 pb-24 justify-between overflow-y-hidden">
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
                                { userId && products && addressSelected === false ? (
                                    <div>
                                        <p className="text-center text-red-500 sm:pt-5 pt-0">Vous devez selectionner une adresse de livraison pour pouvoir payer</p>
                                    </div>
                                ) : ("")}
                                <div>
                                    <div className="flex items-center pb-6 justify-between lg:pt-5 pt-20">
                                        <p className="text-lg font-bold leading-normal text-gray-700">TOTAL TTC</p>
                                        <p className="text-lg font-bold leading-normal text-right text-blue-600">{ (+tSubtotal + +totalTaxes).toFixed(2) } €</p>
                                    </div>
                                    <button 
                                    onClick={() => { submitCart(); }} 
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