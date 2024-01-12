import { Fragment, useRef } from "react";
import { Dialog, Transition } from '@headlessui/react';

const AddressForm = ({
    userBilling,
    openModal,
    setOpenModal,
    submitAddressForm
}:any) => {
    
    const cancelButtonRef = useRef(null);

    return (
        <>
            {/* Billing address form */}
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
                                                                    defaultValue={ userBilling.firstname || "" }
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
                                                                    defaultValue={ userBilling.lastname || "" }
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
                                                                    defaultValue={ userBilling.street || "" }
                                                                    placeholder="1 bis, rue de la Paix"
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-wrap -mx-3 mb-6">
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
                                                                    defaultValue={ userBilling.postal_code || "" }
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
                                                                    defaultValue="Paris" 
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
                                                                        defaultValue={ userBilling.country || "" }
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
                                                        <div className="-mx-3 mb-6 sm:mt-5 md:mt-10">
                                                            <div className="w-full px-3">
                                                                <label className="flex font-semibold text-gray-700" htmlFor="memorize">
                                                                    <div className="flex-initial">
                                                                        <input 
                                                                            className="appearance-none border-solid border-2 border-gray-900 checked:bg-gray-900 w-4 h-4 mr-2 leading-tight"
                                                                            id="memorize" 
                                                                            name="memorize"
                                                                            type="checkbox"
                                                                        />
                                                                    </div>
                                                                    <div className="flex-initial text-sm">
                                                                        Enregistrer cette adresse pour mes prochaines réservations
                                                                    </div>
                                                                </label>
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

export default AddressForm;