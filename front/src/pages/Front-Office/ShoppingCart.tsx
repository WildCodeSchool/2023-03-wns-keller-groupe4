import { useState } from "react";
import { Link } from "react-router-dom";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { decodeToken, getIDToken } from "../../utils/jwtHandler";
import { GET_INVOICE_BY_RESERVATION_ID, GET_USER, GET_USER_CART } from "../../utils/queries";
import { CREATE_INVOICE, REMOVE_PRODUCT_FROM_RESERVATION, UPDATE_RESERVATION_STATUS, UPDATE_RESERVATION_DATES } from "../../utils/mutations";
import { EnumStatusReservation } from "../../__generated__/graphql";
import AddBillingAddress from "../../components/AddBillingAddress";
import { toast } from "react-toastify";
import { BsBox2Fill, BsCartCheckFill } from "react-icons/bs";
import { GrValidate } from "react-icons/gr";
import { FaFileInvoiceDollar } from "react-icons/fa";
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

export interface IUserBilling {
    id?: string,
    firstname: string,
    lastname: string,
    street: string,
    postal_code: string,
    // city: string|null,
    country: string,
}

const ShoppingCart = () => {
    const userId = getIDToken() ? decodeToken(getIDToken()).userId : ""; 
    const [profileClass, setProfileClass] = useState("border-gray-200 dark:bg-gray-100 dark:border-gray-200");
    const [addressSelected, setAddressSelected] = useState(false);
    const [payButtonColor, setPayButtonColor] = useState("bg-gray-500 border-gray-600 ring-gray-500");
    const [payButtonDisabled, setPayButtonDisabled] = useState(true);
    const [openModal, setOpenModal] = useState(false);

    const { loading, data, refetch } = useQuery(GET_USER_CART, {
        variables: { getCartReservationOfUserId: userId },
        skip: userId === "",
    });

    const {data: userData} = useQuery(GET_USER, {
        variables: { getUserByIdId: userId },
        skip: userId === "",
    });

    const [getTemporaryInvoice, {data: temporaryInvoiceData, called: temporaryInvoiceCalled}] = useLazyQuery(GET_INVOICE_BY_RESERVATION_ID);
    const [createInvoice] = useMutation(CREATE_INVOICE);
    const [updateCart] = useMutation(UPDATE_RESERVATION_STATUS);
    const [updateReservationDates] = useMutation(UPDATE_RESERVATION_DATES);
    const [removeProductFromCart] = useMutation(REMOVE_PRODUCT_FROM_RESERVATION);

    if (loading) return <p className="text-center p-10">Chargement du panier en cours...</p>;

    // Cart initialization
    let cartSummary:ICartSummary|null = null;
    let cartReservations:IReservation[]|null = null;
    let cartId:string = "";
    let products:any = null;
    let productDuration:number = 0;
    let totalSubtotal = 0;
    let reservation_start_at = 0;
    let reservation_end_at = 0;
    let tSubtotal = "0";
    let totalTaxes = "0";
    let payingButton = "Panier vide";

    // User billing object initialization
    let userBilling = {
        id: "",
        firstname: "",
        lastname: "",
        street: "",
        postal_code: "",
        // city: null,
        country: "",
    };

    // let userBilling = {};

    // User billing address and cart reservation details
    if(userId && data?.getCartReservationOfUser) {
        cartSummary = data?.getCartReservationOfUser;
        cartReservations = cartSummary.reservationsDetails;
        cartId = cartSummary?.id;
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

        // Get temporary invoice: This is not the definitive invoice.
        // Only used to retrieve an existing custom user billing address not saved in its profile,
        // But previously associated to the current cart
        const temporaryInvoice = async () => {
            await getTemporaryInvoice({
                variables: { idReservation: cartId },
            });
        }

        if(!temporaryInvoiceCalled) {
            temporaryInvoice();
        }


        if(temporaryInvoiceData?.getInvoiceByIdReservation?.UserBilling) {
            userBilling.id = temporaryInvoiceData.getInvoiceByIdReservation.UserBilling.id;
            userBilling.firstname = temporaryInvoiceData.getInvoiceByIdReservation.UserBilling.firstname;
            userBilling.lastname = temporaryInvoiceData.getInvoiceByIdReservation.UserBilling.lastname;
            userBilling.street = temporaryInvoiceData.getInvoiceByIdReservation.UserBilling.street;
            userBilling.postal_code = temporaryInvoiceData.getInvoiceByIdReservation.UserBilling.postal_code;
            // userBilling.city = temporaryInvoiceData.getInvoiceByIdReservation.UserBilling.city;
            userBilling.country = temporaryInvoiceData.getInvoiceByIdReservation.UserBilling.country;
        }

        if(products) {
            payingButton = "Valider et Payer";
        }
    }

    if(userData) {
        const userProfile = userData.getUserById.user_profile;
        userBilling.id = userBilling.id || "";
        userBilling.firstname = userBilling.firstname || userProfile.firstname || "";
        userBilling.lastname = userBilling.lastname || userProfile.lastname || "";
        userBilling.postal_code = userBilling.postal_code || userProfile.postal_code || "";
        userBilling.street = userBilling.street || userProfile.street || "";
        // userBilling.city = 'Paris'; //userBilling?.city || userProfile.city;
        userBilling.country = userBilling.country || userProfile.country || "";
    }

    // Submit cart when payment is validated
    const submitCart = async () => {
        if(cartId) {
            // Save user billing address
            if (userBilling.id?.length === 0) {
                console.log("TEST");
                const updateUserBillingInput:IUserBilling = {
                    firstname: userBilling.firstname,
                    lastname: userBilling.lastname,
                    street: userBilling.street,
                    postal_code: userBilling.postal_code,
                    // city: userBilling.city,
                    country: userBilling.country,
                };

                const createInvoiceInput = {
                    reservation_id: cartId,
                    user_id: userId,
                };
    
                const newInvoice = await createInvoice({ 
                    variables: { updateUserBillingInput, createInvoiceInput } 
                });
    
                if (newInvoice.data) {
                    userBilling.id = newInvoice.data.createInvoice.UserBilling.id;
                } else {
                    toast.error("Erreur : Un problème est survenu lors de l'enregistrement de vos données de facturation.");
                    return;
                }
            }
            await updateReservationDates({
                variables: {
                    startAt: new Date(reservation_start_at).toISOString(),
                    endAt: new Date(reservation_end_at).toISOString(),
                    updateDateOfReservationId: cartId,
                }
            })
            .then((res:any) => {
                updateCart({ 
                    variables: {
                        status: EnumStatusReservation.Paying,
                        updateStatusOfReservationId: cartId,
                    } 
                });
                // refetch();
                toast.success(
                    "Votre réservation est validée.", { 
                    icon: <GrValidate size="2rem" />,
                });
            })
            .catch((err:any) => {
                toast.error("Erreur : La réservation n'a pas pu être confirmée.");
            });
        }
    };

    // Remove a specific product from cart
    const removeProduct = async (product:string) => {
        if(cartId) {
            const removedProduct = await removeProductFromCart({ 
                variables: {
                    productsIds: [product],
                    removeProductsFromReservationId: cartId,
                } 
            });

            if(removedProduct) {
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
                                    
                                    // Products list
                                    products.map((product:any) => (
                                        reservation_start_at = reservation_start_at > product.start_at.getTime() ? product.start_at.getTime() : reservation_start_at,
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
                                    
                                    <div className="sm:flex-iniital md:flex justify-between mt-5 mb-20">
                                        {/* Shipping address */}
                                        <div className="sm:w-full md:w-1/2">
                                            <div className="text-3xl text-center lg:text-left font-black leading-10 text-orange-600 py-4 mt-5">
                                                {/* <FaShippingFast className="inline mr-3" size="2rem" /> */}
                                                <FaFileInvoiceDollar className="inline mr-3" size="2rem" />
                                                Adresse de facturation
                                            </div>
                                            <div className={ "w-full max-w-sm items-center mt-3 border rounded-lg shadow" + profileClass}>
                                                <div className="flex flex-col items-center p-5 text-sm text-gray-600">
                                                    { userBilling.firstname && userBilling.lastname && userBilling.street && userBilling.postal_code && userBilling.country ? (
                                                        <>
                                                            <h5 className="mb-1 text-xl font-medium text-gray-800">{ userBilling.firstname + ' ' + userBilling.lastname }</h5>
                                                            <span>{ userBilling.street }</span>
                                                            <span>{ userBilling.postal_code + ' // TODO' }</span>
                                                            <span>{ userBilling.country }</span>
                                                            <div className="flex mt-4 space-x-3 md:mt-6">
                                                                <button 
                                                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        setOpenModal(true);
                                                                    }}
                                                                >
                                                                    Modifier
                                                                </button>
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
                                                        </>
                                                    ) : (
                                                        <div className="sm:pb-3 md:pb-12 text-center">
                                                            <span className="pt-3">Votre adresse de facturation n'est pas complète. Veuillez la corriger.</span>
                                                            <div className="flex mt-4 space-x-3 md:mt-6">
                                                                <button
                                                                    className="inline-flex mx-auto px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        setOpenModal(true);
                                                                    }}
                                                                >
                                                                    Renseigner mon adresse
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Pickup address */}
                                        <div className="sm:w-full md:w-1/2">
                                            <div className="text-3xl text-center lg:text-left font-black leading-10 text-orange-600 py-4 mt-5">
                                                <FaShippingFast className="inline mr-3" size="2rem" />
                                                Notre adresse de retrait
                                            </div>
                                            <div className={ "w-full max-w-sm items-center mr-0 mt-3 border rounded-lg shadow" + profileClass}>
                                                <div className="flex flex-col items-center text-center p-5 text-sm text-gray-600">
                                                    <h5 className="mb-1 text-xl font-medium text-gray-800">Wildrent Pickup Location</h5>
                                                    <span>44 Rue Alphonse Penaud</span>
                                                    <span>75 020 Paris</span>
                                                    <span className="pb-5">France</span>
                                                    <span>Nous sommes ouvert du lundi au samedi<br />de 9h00 à 18h00</span>
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
                                        <p className="text-center text-red-500 sm:pt-5 pt-0">Vous devez selectionner une adresse de facturation pour pouvoir payer</p>
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

            {/* Billing address form */}
            <AddBillingAddress
                userId = {userId}
                cartId = {cartId}
                userBilling = {userBilling}
                openModal = {openModal}
                setOpenModal = {setOpenModal}
            />                        
        </>
    );
}

export default ShoppingCart;