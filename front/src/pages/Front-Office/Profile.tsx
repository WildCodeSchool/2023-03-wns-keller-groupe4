import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useMutation, useLazyQuery, useQuery } from "@apollo/client";
import { decodeToken, getIDToken, setIDToken } from "../../utils/jwtHandler";
import { GET_USER, GET_RESERVATION_BY_ID } from "../../utils/queries";
import { LOGOUT, UPDATE_USER_PROFILE } from "../../utils/mutations";
import AddressForm from "../../components/AddressForm";
import { IUserBilling } from "../../pages/Front-Office/ShoppingCart";
import { toast } from "react-toastify";

interface IReservation {
    id: string;
    status: string;
    created_at: string;
    updated_at: string;
    start_at?: string;
    end_at?: string;
}

const Profile = () => {
    const navigate = useNavigate();
    const userId = getIDToken() ? decodeToken(getIDToken()).userId : ""; 
    const [openModal, setOpenModal] = useState(false);

    const {data, error, loading, refetch} = useQuery(GET_USER, {
        variables: { getUserByIdId: userId },
    });
    const [getReservation] = useLazyQuery(GET_RESERVATION_BY_ID);

    const [updateUserProfile] = useMutation(UPDATE_USER_PROFILE);

    const [logout] = useMutation(LOGOUT, {
        onCompleted: () => {
            setIDToken("");
            navigate("/");
        },
    });

    const handleLogout = async () => {
        await logout();
    };

    const submitAddressForm = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!userId) {
            setOpenModal(false);
            return <Navigate to='/login'/>
        }

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const formEntries = formData.entries();
        const data = Object.fromEntries(formEntries);

        // Save address in user profile
        const updateUserInput:IUserBilling = {
            firstname: data.firstname as string,
            lastname: data.lastname as string,
            street: data.street as string,
            postal_code: data.postcode as string,
            country: data.country as string,
        };

        const userProfileUpdated = await updateUserProfile({ 
            variables: { 
                updateUserId: userId, 
                updateUserInput 
            } 
        });

        if (userProfileUpdated.data) {
            toast.success("Votre nouvelle adresse a bien été sauvegardée pour vos prochaines commandes");
            refetch();
            setOpenModal(false);
        } else {
            toast.error("La nouvelle adresse n'a pas pu être sauvegardée pour vos prochaines commandes");
        }
    };

    if (loading) return (<p className="text-center font-bold">Chargement...</p>);
    if (error) return (<p className="text-center font-bold text-red-800">Une erreur est survenue : Votre profile n'a pas pu être chargé. Veuillez réessayer.</p>);

    const user = data?.getUserById;
    const userBilling = user?.user_profile;
    const registrationDate = new Date(user?.created_at).toLocaleDateString("fr-FR");
    const orders = user?.reservations ? user.reservations.filter((order:any) => order.status === "paying") : [];
    const lastOrder = orders.sort((a:IReservation, b:IReservation) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())[0];
    const lastOrderUpdatedDate = new Date(lastOrder?.updated_at).toLocaleDateString("fr-FR");
    const lastOrderStartAt = new Date(lastOrder?.start_at as string).toLocaleDateString("fr-FR");
    const lastOrderEndAt = new Date(lastOrder?.end_at as string).toLocaleDateString("fr-FR");
    
    const showOrder = (idReservation:string) => {
        const reservation = async () => {
            await getReservation({
                variables: { getReservationByIdId: idReservation },
            }).then((res) => {
                return navigate(
                    "/cart/checkout-confirmation", { 
                        state: { 
                            reservation: res.data?.getReservationById, 
                            userBilling: userBilling 
                        } 
                    }
                );
            }).catch((err) => {
                toast.error("Une erreur est survenue : Votre commande n'a pas pu être chargée. Veuillez réessayer.");
            });
        };

        reservation();
    }

    return (
        <>
            <div className="p-16">
                <div className="p-8 shadow-md shadow-orange-200 border-orange-400 border mt-5">
                    <div className="grid grid-cols-1 md:grid-cols-3">    
                        <div className="space-x-8 flex flex-grow justify-between mt-32 md:mt-0 md:justify-center">
                            <div className="text-gray-400 text-center py-2 px-4 uppercase rounded border-2 border-gray-400">        
                                <p className="font-bold text-gray-700 text-xl">{ orders.length }</p>
                                <p>réservations effectuées</p>
                            </div>
                            
                            <button  className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                                Voir mes réservations
                            </button>  
                        </div>    
                        <div className="relative">      
                            <div className="w-40 h-40 bg-orange-300 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-20 flex items-center justify-center text-orange-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" viewBox="0 0 20 20" fill="currentColor">  
                                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                                </svg>      
                            </div>    
                        </div>    
                        <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
                            <button 
                                className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setOpenModal(true);
                                }}
                            >
                                Editer mes informations
                            </button>
                            <button  
                                className="text-white py-2 px-4 uppercase rounded bg-red-400 hover:bg-red-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                                onClick={handleLogout}
                            >  
                                Déconnexion
                            </button>    
                        </div>  
                    </div>
                    <div className="flex gap-20 mt-10">
                        <div className="flex-1 border-2 border-orange-300 shadow rounded px-5 py-7">
                            <div className="text-center">
                                <h2 className="font-bold text-orange-600 py-3">MA DERNIERE RESERVATION</h2>
                                { 
                                    lastOrder ? 
                                    ( 
                                        <>
                                            <span className="text-xl font-medium text-blue-700">
                                                Commande# {lastOrder?.id}
                                            </span>
                                            <p className="font-light text-gray-600 mt-3">Passée le {lastOrderUpdatedDate}</p>    
                                            <p className="mt-8 text-gray-500">
                                                <span className="font-bold pr-2">Statut :</span> 
                                                    {
                                                        lastOrder.status === "paying" ? 
                                                        (
                                                            <span className="inline-flex items-center rounded-md bg-orange-200 px-2 py-1 text-sm font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                                                                En cours de préparation
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center rounded-md bg-green-800 px-2 py-1 text-sm font-medium text-white ring-1 ring-inset ring-gray-500/10">
                                                            Expédiée
                                                            </span>
                                                        )
                                                    }
                                            </p>
                                            <p className="mt-5 text-gray-500"><span className="font-bold">Date de mise à disposition :</span> {lastOrderStartAt}</p>
                                            <p className="mt-2 text-gray-500"><span className="font-bold">Date de retour :</span>{lastOrderEndAt}</p> 
                                            <button 
                                                className="text-white py-2 px-4 uppercase rounded bg-orange-500 hover:bg-orange-600 shadow hover:shadow-lg font-medium mt-10"
                                                onClick={() => showOrder(lastOrder?.id)}
                                            >
                                                Voir la commande
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <div>
                                                <p className="text-gray-500 pt-10">Vous n'avez pas encore passé de commande.</p>
                                                <button 
                                                    className="text-white py-2 px-4 uppercase rounded bg-orange-500 hover:bg-orange-600 shadow hover:shadow-lg font-medium mt-5"
                                                    onClick={() => navigate("/products/list/all")}
                                                >
                                                    Voir Tous nos produits
                                                </button>
                                            </div>
                                        </>
                                    )
                                }
                            </div>  
                        </div>
                        <div className="flex-1 border-2 border-orange-300 shadow rounded px-5 py-7">
                            <div className="pb-5 mb-5 text-center border-b">
                                <h2 className="font-bold text-orange-600 py-3">MES INFORMATIONS PERSONNELLES</h2> 
                                { 
                                    user?.user_profile.firstname && user?.user_profile.lastname ? 
                                    (  
                                        <span className="text-3xl font-medium text-blue-700">
                                            {user?.user_profile.firstname} {user?.user_profile.lastname}
                                        </span>
                                    ) : (
                                        <div className="bg-yellow-200 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
                                            <div><strong className="font-bold">Votre identité</strong></div>
                                            <span className="block sm:inline">Vous n'avez pas encore rempli vos informations</span>
                                        </div>
                                    )
                                }
                                <p className="font-light text-gray-600 mt-3">Client depuis le {registrationDate}</p>
                            </div>

                            <div className="mt-5 text-center">
                                <h2 className="text-center font-bold text-orange-600 py-3">MON ADRESSE DE FACTURATION</h2>
                                {
                                    user?.user_profile.street && user?.user_profile.postal_code && user?.user_profile.country ? 
                                    (
                                        <>
                                            <p className="mt-5 text-gray-500"><span className="font-bold">Numéro, rue :</span> {user?.user_profile.street}</p>    
                                            <p className="mt-2 text-gray-500"><span className="font-bold">Code postal, ville :</span> {user?.user_profile.postal_code}, Paris</p>
                                            <p className="mt-2 text-gray-500"><span className="font-bold">Pays :</span> {user?.user_profile.country}</p>  
                                        </>
                                    ) : (
                                        <>
                                            <div className="bg-yellow-200 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
                                                <div><strong className="font-bold">Votre adresse enregistrée</strong></div>
                                                <span className="block sm:inline">Vous n'avez pas encore renseignée votre adresse de facturation</span>
                                            </div>
                                        </>
                                    )
                                }
                                
                            </div>  
                        </div>
                    </div>
                </div>
            </div>
            <AddressForm 
                userBilling={userBilling}
                openModal = {openModal}
                setOpenModal = {setOpenModal} 
                submitAddressForm = {submitAddressForm}
            />
        </>
    );
};

export default Profile;
