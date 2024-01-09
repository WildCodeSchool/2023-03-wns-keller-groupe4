import { Fragment, useEffect, useRef, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { CREATE_INVOICE, UPDATE_USER_BILLING_BY_ID } from "../utils/mutations";
import { Dialog, Transition } from '@headlessui/react';
import { toast } from "react-toastify";
import { TfiShoppingCartFull } from "react-icons/tfi";
import { IuserBilling } from "../pages/Front-Office/ShoppingCart";

interface IUserCart {
    userId: string;
    cartId: string;
    userBillingObj: IuserBilling;
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddBillingAddress = ({ 
    userId,
    cartId,
    userBillingObj,
    openModal,
    setOpenModal
}: IUserCart) => {

    const navigate = useNavigate();

    // Reset the form
    const initForm = () => {
        setOpenModal(false);
    }

    const cancelButtonRef = useRef(null);

    const [createInvoice] = useMutation(CREATE_INVOICE);
    const [updateUserBillingById] = useMutation(UPDATE_USER_BILLING_BY_ID);

    const submitAddressForm = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!userId) {
            setOpenModal(false);
            // TODO: Redirect to login page
            redirect('/login');
            return;
        }

        // alert(e.target.firstname.value);

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const formEntries = formData.entries();
        const data = Object.fromEntries(formEntries);

        const updateUserBillingInput = {
            firstname: data.firstname,
            lastname: data.lastname,
            street: data.street,
            postal_code: data.postcode,
            // city: data.city,
            country: data.country,
        };

        // Update user billing address
        if(userBillingObj.id) {
            const updateUserBilling = await updateUserBillingById({ 
                variables: { 
                    updateUserBillingByIdId: userBillingObj.id, 
                    updateUserBillingInput 
                } 
            });

            if (updateUserBilling.data) {
                toast.success("Votre adresse de facturation a bien été mise à jour.");
                setOpenModal(false);
                initForm();
            }
        } else {
            // or create new user billing address
            const createInvoiceInput = {
                reservation_id: cartId,
                user_id: userId,
            };

            const newInvoice = await createInvoice({ 
                variables: { updateUserBillingInput, createInvoiceInput } 
            });

            console.log(newInvoice.data);
            if (newInvoice.data) {
                toast.success("Votre adresse de facturation a bien été enregistrée.");
                setOpenModal(false);
                initForm(); 
            }
        }

        // if(newInvoice.data) invoiceId = newInvoice.data.id;
    }

    return (
        <>
            {/* Add billing address form in modal */}
            <Transition.Root show={openModal} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-10"
                    initialFocus={cancelButtonRef}
                    onClose={() => setOpenModal(true)}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-300"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <form id="form-address" onSubmit={e => submitAddressForm(e)}>
                                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                            <div className="sm:flex sm:items-start">
                                                <div className="mx-auto flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-15 sm:w-15">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                                                    </svg>
                                                </div>
                                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                    <Dialog.Title
                                                        as="h3"
                                                        className="text-base font-semibold leading-6 text-gray-900"
                                                    >
                                                        <p className="text-center">Ajout d'une nouvelle adresse<br /><span className="text-blue-600">Adresse de facturation</span></p>
                                                    </Dialog.Title>
                                                    <div className="mt-2">
                                                        <p className="text-red-500 text-xs text-center italic">
                                                            Les champs marqués par un astérix (*) sont obligatoires.
                                                        </p>
                                                    </div>
                                                    <div className="mt-5">  
                                                        <div className="flex flex-wrap -mx-3 mb-6">
                                                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                                <label 
                                                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
                                                                    htmlFor="firstname"
                                                                >
                                                                    Prénom <span className="text-red-500">*</span>
                                                                </label>
                                                                <input 
                                                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                                                                    id="firstname"
                                                                    name="firstname" 
                                                                    type="text" 
                                                                    defaultValue={ userBillingObj.firstname || "" }
                                                                    placeholder="Jean"
                                                                    required
                                                                />
                                                            </div>
                                                            <div className="w-full md:w-1/2 px-3">
                                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="lastname">
                                                                    Nom <span className="text-red-500">*</span>
                                                                </label>
                                                                <input 
                                                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                                                    id="lastname"
                                                                    name="lastname" 
                                                                    type="text"
                                                                    defaultValue={ userBillingObj.lastname || "" }
                                                                    placeholder="Dupont"
                                                                    required 
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-wrap -mx-3 mb-6">
                                                            <div className="w-full px-3">
                                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="street">
                                                                    N° et rue <span className="text-red-500">*</span>
                                                                </label>
                                                                <input 
                                                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                                                    id="street"
                                                                    name="street" 
                                                                    type="text" 
                                                                    defaultValue={ userBillingObj.street || "" }
                                                                    placeholder="1 bis, rue de la Paix"
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-wrap -mx-3 mb-2">
                                                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                                                <label 
                                                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
                                                                    htmlFor="postcode"
                                                                >
                                                                    Code postal <span className="text-red-500">*</span>
                                                                </label>
                                                                <input 
                                                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                                                    id="postcode"
                                                                    name="postcode" 
                                                                    type="text" 
                                                                    defaultValue={ userBillingObj.postal_code || "" }
                                                                    placeholder="75000"
                                                                    required
                                                                />
                                                            </div>
                                                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                                                <label 
                                                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
                                                                    htmlFor="city"
                                                                >
                                                                    City <span className="text-red-500">*</span>
                                                                </label>
                                                                <input 
                                                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                                                    id="city"
                                                                    name="city" 
                                                                    type="text" 
                                                                    // defaultValue={ userBillingObj.city || "" }
                                                                    placeholder="Paris"
                                                                    required
                                                                />
                                                            </div>
                                                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                                                <label 
                                                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
                                                                    htmlFor="country">
                                                                    Pays <span className="text-red-500">*</span>
                                                                </label>
                                                                <div className="relative">
                                                                    <select 
                                                                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                                                        id="country"
                                                                        name="country"
                                                                        defaultValue={ userBillingObj.country || "" }
                                                                        required
                                                                    >
                                                                    <option value="France">France</option>
                                                                    <option value="Belgique">Belgique</option>
                                                                    <option value="Suisse">Suisse</option>
                                                                    <option value="Royaume-Uni">Royaume-Uni</option>
                                                                    </select>
                                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                                        <svg 
                                                                            className="fill-current h-4 w-4" 
                                                                            xmlns="http://www.w3.org/2000/svg" 
                                                                            viewBox="0 0 20 20"
                                                                        >
                                                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-row-reverse bg-gray-50 px-4 py-3 sm:px-6">
                                            <div>
                                                <button
                                                    type="submit"
                                                    className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto mx-auto"
                                                >
                                                    Ajouter et continuer
                                                </button>
                                            </div>
                                            <div className="flex-auto">
                                                <button
                                                    type="button"
                                                    className="rounded-md bg-gray-300 px-3 py-2 shadow-sm leading-tight ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                    onClick={() => setOpenModal(false)}
                                                    ref={cancelButtonRef}
                                                >
                                                    Annuler
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
};

export default AddBillingAddress;