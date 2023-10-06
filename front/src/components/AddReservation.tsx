import { Fragment, useEffect, useRef, useState } from "react";
import { useMutation } from "@apollo/client";
// import { CREATE_RESERVATION } from "../../utils/mutations";
import { Dialog, Transition } from '@headlessui/react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { isWithinInterval } from "date-fns";
interface IProduct {
    productId: string;
    name: string;
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

// Calendar reservation
// List of unavailables dates of the product
const disabledRanges = [
    [new Date(2023,9,6), new Date(2023,9,11)],
];

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const tileDisabled = ({ date, view }:any) => {
    // Add class to tiles in month view only
    if (view === 'month') {
      // Check if a date React-Calendar wants to check is within any of the ranges
      return isWithinRanges(date, disabledRanges);
    }
}

const isWithinRange = (date:any, range:any) => {
    return isWithinInterval(date, { start: range[0], end: range[1] });
}
  
const isWithinRanges = (date:any, ranges:any) => {
    return ranges.some((range: any) => isWithinRange(date, range));
}

const AddReservation = ({ 
    productId, 
    name,
    openModal,
    setOpenModal
}: IProduct) => {

    // Create reservation
    // const [addToReservation, { data, error, loading }] = useMutation(CREATE_RESERVATION, {
        
    // });

    // Calendar reservations
    const [date, onDateChange] = useState<Value>();
    console.log(date);

    // Form elements initialization
    const initFormState = () => {
        setOpenModal(false);
        setSelectedQuantity(0);
        setDisabledConfirmButton(true);
        setDisabledQuantity(true);
        setOptions([0]);
        onDateChange(undefined);
    }

    // Quantity and states (enabled or disabled)
    const [quantity, setQuantity] = useState(5);
    const [selectedQuantity, setSelectedQuantity] = useState(0);
    const [disabledQuantity, setDisabledQuantity] = useState(true);
    const [disabledConfirmButton, setDisabledConfirmButton] = useState(true);
    const [options, setOptions] = useState([0]); 
    // const [openModal, setOpenModal] = useState(false);
    const cancelButtonRef = useRef(null);

    useEffect(() => {
        // If there is a quantity and a date range is selected then we update options values with quantity
        if (quantity > 0 && typeof date !== 'undefined') {
            for (let i = 1; i <= quantity; i++) {
                options.push(i);
            }
            setDisabledQuantity(false);
            // If selected quantity is > 0 then we enable the confirm button
            if (selectedQuantity > 0) setDisabledConfirmButton(false);
        } else {
            initFormState();
        }
        if (openModal === true) setOpenModal(true);
        else setOpenModal(false);
    }, [quantity, selectedQuantity, date, openModal]);

    // Add product to cart
    const addToCart = (productId:string, quantity:number, date:any) => {
        let reservationId = 1;
        let dateStart = date[0];
        let dateEnd = date[1];
        alert(quantity + " produit en cours de réservation du " + dateStart + " au " + dateEnd + " pour le produit id " + productId);
        addToReservation({ 
            details: { 
                product_id: productId,
                quantity:  quantity,
                start_at: dateStart,
                end_at: dateEnd
            },
            updateDetailFromReservationId: reservationId
        });
        setOpenModal(false);
        initFormState();
    }

    return (
        <>
            {/* Add-To-Cart and calendar reservation Modal */}
            <Transition.Root show={openModal} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-10"
                    initialFocus={cancelButtonRef}
                    onClose={setOpenModal}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
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
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
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
                                                    <p className="text-center">Dates de réservation souhaitées<br /><span className="text-blue-600">{name}</span></p>
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500 text-center">
                                                        Veuillez choisir la durée de location.
                                                    </p>
                                                </div>
                                                <div className="mt-2">
                                                    <Calendar 
                                                        onChange={onDateChange} 
                                                        minDate={new Date()}
                                                        value={date} 
                                                        tileDisabled={tileDisabled} 
                                                        selectRange 
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap bg-gray-50 px-4 py-3 sm:px-6 text-center">
                                        <div className="w-full md:w-1/2">
                                            <select className="appearance-none bg-white border border-gray-400 hover:border-gray-500 px-3 py-2 ms-[90px] rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                                onChange={(e) => setSelectedQuantity(parseInt(e.target.value))}
                                                disabled={disabledQuantity}
                                            >
                                                <option value="">Quantité désirée</option>
                                                {options.map((qty) => {
                                                    return (
                                                        <option value={qty} key={qty}>
                                                            {qty}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                        <div className="w-full md:w-1/2">
                                            <button
                                                type="button"
                                                className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto mx-auto"
                                                onClick={() => addToCart(productId, selectedQuantity, date)}
                                                disabled={disabledConfirmButton}
                                            >
                                                Ajouter au panier
                                            </button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
};

export default AddReservation;






    // const [date, setDate] = useState(new Date());
    // const [addReservation] = useMutation(ADD_RESERVATION);
    // const onChange = (date:Value) => {
    //     setDate(date as Date);
    // }
    // const onSubmit = (e:any) => {
    //     e.preventDefault();
    //     addReservation({ variables: { id, date } });
    // }

    // return (
    //     <div>
    //         <form onSubmit={onSubmit}>
    //             <Calendar
    //                 onChange={onChange}
    //                 value={date}
    //                 tileDisabled={tileDisabled}
    //             />
    //             <button type="submit">Add reservation</button>
    //         </form>
    //     </div>
    // );