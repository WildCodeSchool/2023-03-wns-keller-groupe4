import { Link, Navigate, useLocation } from "react-router-dom";
import { ICartSummary, IUserBilling } from "./ShoppingCart";
import { FaRegCheckCircle } from "react-icons/fa";

interface ICkeckoutProps {
    reservation: ICartSummary;
    userBilling: IUserBilling;
};


const CheckoutConfirmation = () => {
    const location = useLocation();

    // Access to this page is only allowed if the user comes from the shopping cart
    if (!location.state) {
        return <Navigate to='/'/>
    }

    const { reservation, userBilling } = location.state as ICkeckoutProps;
    let subtotal = "";
    let totalTaxes = "";
    let totalSubtotal = 0;

    return(
        <main className="container mx-auto p-20">
            <h1 className="text-center font-bold pb-10 text-green-700 text-2xl">
                <span><FaRegCheckCircle className="inline text-3xl pr-1" /> Votre réservation est confirmée !</span>
            </h1>
            <div className="bg-green-100 border-l-4 border-green-500 text-black p-4 mb-10" role="alert">
                <p className="font-bold">Merci pour votre commande</p>
                <p>
                    Votre réservation est désormais validée et est en cours de préparation par notre équipe. Vous allez recevoir dans quelques instants un e-mail récapitulant les détails de celle-ci.
                    Vous pouvez suivre et gérer votre réservation dans la rubrique "Mes réservations" de votre compte client.
                </p>
            </div>

            <div className="bg-gray-400 text-center py-4 lg:px-4 mb-5">
                <div className="p-2 bg-gray-600 items-center text-white leading-none lg:rounded-full flex lg:inline-flex" role="alert">
                    <span className="flex rounded-full bg-orange-700 uppercase px-2 py-1 text-xs font-bold mr-3">Récapitulatif de votre réservation</span>
                    <span className="mr-2 text-left flex-auto"><span className="font-bold">Commande numéro :</span> {reservation.id}</span>
                </div>
            </div>

            <table className="table-fixed mb-10">
                <thead>
                    <tr>
                        <th className="w-1/2 px-4 py-2">Nom</th>
                        <th className="w-1/5 px-4 py-2">Quantité</th>
                        <th className="w-1/5 px-4 py-2">Prix</th>
                        <th className="w-full px-4 py-2">Sous-total</th>
                    </tr>
                </thead>
                <tbody>
                    { reservation.reservationsDetails.map((reservation) => (
                        subtotal = (+reservation.product.price * (+reservation.quantity)).toFixed(2),
                        totalSubtotal += parseFloat(subtotal),
                        (
                            <tr>
                                <td className="border px-4 py-2">{reservation.product.name}</td>
                                <td className="border px-4 py-2 text-right">{reservation.quantity}</td>
                                <td className="border px-4 py-2 text-right">{reservation.product.price} €</td>
                                <td className="border px-4 py-2 text-right">{subtotal} €</td>
                            </tr>
                        )
                    ))}
                    <tr>
                        <td className="border px-4 py-2 text-right" colSpan={3}>Sous-total HT</td>
                        <td className="border px-4 py-2 text-right">{totalSubtotal} €</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2 text-right" colSpan={3}>TVA 20%</td>
                        <td className="border px-4 py-2 text-right">{ totalTaxes = (totalSubtotal * (20/100)).toFixed(2) }€</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2 text-right font-bold" colSpan={3}>TOTAL TTC</td>
                        <td className="border px-4 py-2 text-right">{(totalSubtotal + (+totalTaxes)).toFixed(2)} €</td>
                    </tr>
                </tbody>
            </table>
            <div className="flex text-center py-4 lg:px-4 mb-10">
                <div className="flex-1 border-4 rounded p-5 mx-5">
                    <h2 className="text-center font-bold text-orange-500 pb-5 text-xl">
                        Adresse de facturation
                    </h2>
                    <div className="text-left">
                        <p className="py-1"><span className="font-bold">Nom :</span> {userBilling.lastname}</p>
                        <p className="py-1"><span className="font-bold">Prénom :</span> {userBilling.firstname}</p>
                        <p className="py-1"><span className="font-bold">Adresse :</span> {userBilling.street}</p>
                        <div className="flex py-1">
                            <div className="flex-1">
                                <span className="font-bold">Code postal :</span> {userBilling.postal_code}
                            </div>
                            <div className="flex-1">
                                <span className="font-bold">Ville :</span> City
                            </div>
                            <div className="flex-1">
                                <span className="font-bold">Pays :</span> {userBilling.country}
                            </div>
                        </div>
                        <p className="py-1"><span className="font-bold">Email de contact :</span> email@email.com</p>
                    </div>
                </div>
                <div className="flex-1 border-4 rounded p-5 mx-5">
                    <h2 className="text-center font-bold text-orange-500 pb-5 text-xl">
                        Adresse de livraison
                    </h2>
                    <div className="text-center">
                        <p className="py-1"><span className="font-bold">Wildrent Pickup Location</span></p>
                        <p className="py-1">44 Rue Alphonse Penaud</p>
                        <p className="py-1">75 020 Paris</p>
                        <p className="py-1">France</p>
                        <p className="py-1">Nous sommes ouvert du lundi au samedi<br />de 9h00 à 18h00</p>
                    </div>
                </div>
            </div>
            <div className="my-10 text-center">
                <Link to="/">
                    <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
                        Retour à la page d'accueil
                    </button>
                </Link>
            </div>
        </main>
    )
}

export default CheckoutConfirmation;