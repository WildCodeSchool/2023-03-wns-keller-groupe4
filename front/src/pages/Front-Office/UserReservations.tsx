import { useNavigate } from "react-router-dom";
import { useLazyQuery, useQuery } from "@apollo/client";
import { decodeToken, getIDToken } from "../../utils/jwtHandler";
import { GET_RESERVATION_BY_ID, GET_RESERVATIONS_BY_USER_ID } from "../../utils/queries"
import { IUserProfile } from "./Profile";
import { toast } from "react-toastify";

const UserReservations = () => {
    const navigate = useNavigate();
    const userId = getIDToken() ? decodeToken(getIDToken()).userId : ""; 

    const [getReservation] = useLazyQuery(GET_RESERVATION_BY_ID);
    const {data, error, loading} = useQuery(GET_RESERVATIONS_BY_USER_ID, {
        variables: { getReservationsByUserIdId: userId },
    });

    if (loading) return (<p className="text-center font-bold">Recherche des réservations...</p>);
    if (error) return (<p className="text-center font-bold text-red-800">Une erreur est survenue : Votre liste de réservations n'a pas pu être chargée. Veuillez réessayer.</p>);

    const showOrder = (idReservation:string, userProfile:IUserProfile) => {
        console.log(idReservation);
        console.log(userProfile);
        const reservation = async () => {
            await getReservation({
                variables: { getReservationByIdId: idReservation },
            }).then((res) => {
                return navigate(
                    "/cart/checkout-confirmation", { 
                        state: { 
                            reservation: res.data?.getReservationById, 
                            userBilling: userProfile 
                        } 
                    }
                );
            }).catch((err) => {
                toast.error("Une erreur est survenue : Votre réservation n'a pas pu être affichée. Veuillez réessayer.");
            });
        };

        reservation();
    };
    console.log(data);
    return (
        <main className="container mx-auto p-20">
            <h1>Vos réservations</h1>
            <table className="table-fixed mb-10">
                <thead>
                    <tr>
                        <th className="w-1/2 px-4 py-2">N° de réservation</th>
                        <th className="w-1/5 px-4 py-2">A récupérer le</th>
                        <th className="w-1/5 px-4 py-2">A retourner le</th>
                        <th className="w-full px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    { data?.getReservationsByUserId ? data.getReservationsByUserId.map((reservation:any) => (
                        <tr>
                            <td className="border px-4 py-2">{reservation.id}</td>
                            <td className="border px-4 py-2 text-right">{reservation.start_at.toLocaleDateString("fr-FR")}</td>
                            <td className="border px-4 py-2 text-right">{reservation.end_at.toLocaleDateString("fr-FR")} €</td>
                            <td className="border px-4 py-2 text-right">
                                <button 
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => { showOrder(reservation.id, reservation.user.user_profile) }}
                                >
                                    Détails
                                </button>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td className="border px-4 py-2 text-right" colSpan={4}>Vous n'avez passé aucune réservation</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </main>
    )
}

export default UserReservations