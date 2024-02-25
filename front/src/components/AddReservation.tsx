import { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { decodeToken, getIDToken } from "../utils/jwtHandler";
import { CREATE_CART, UPDATE_CART } from "../utils/mutations";
import {
    GET_RESERVED_QUANTITIES_OF_ONE_PRODUCT,
    GET_USER_CART,
} from "../utils/queries";
import { Dialog, Transition } from "@headlessui/react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { toast } from "react-toastify";
import { TfiShoppingCartFull } from "react-icons/tfi";

interface IProduct {
    productId: string;
    name: string;
    stock: number;
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddReservation = ({
    productId,
    name,
    stock,
    openModal,
    setOpenModal,
}: IProduct) => {
    const navigate = useNavigate();

    // Reset the form
    const initForm = () => {
        setOpenModal(false);
        setSelectedQuantity(0);
        setDisabledQuantity(true);
        setOptions([0]);
        setDate(undefined);
    };

    const userId = getIDToken() ? decodeToken(getIDToken()).userId : "";

    const cancelButtonRef = useRef(null);

    const [date, setDate] = useState<any>();
    const [selectedQuantity, setSelectedQuantity] = useState(0);
    const [disabledQuantity, setDisabledQuantity] = useState(true);
    const [options, setOptions] = useState([0]);

    // Component to display a toast message when non-logged user try to add a product to cart
    const LoginButton = () => {
        return (
            <div className="items-center text-center font-bold">
                Vous devez être connecté pour ajouter un produit à votre panier
                de réservation.
                <button
                    className="bg-orange-600 hover:bg-orange-700 text-white p-2 rounded-md mt-4"
                    onClick={() => navigate("/connect")}
                >
                    Se connecter / S'inscrire
                </button>
            </div>
        );
    };

    // Quantity of product in reservation
    const [productQuantityReservedByDates] = useLazyQuery(
        GET_RESERVED_QUANTITIES_OF_ONE_PRODUCT,
    );

    // User cart
    const { data: GetUserCart } = useQuery(GET_USER_CART, {
        variables: { getCartReservationOfUserId: userId },
        skip: userId === "",
    });

    const [createCart] = useMutation(CREATE_CART);
    const [updateCart] = useMutation(UPDATE_CART);

    const quantityInReservation = async () => {
        if (date && Array.isArray(date) && date[0] && date[1]) {
            let { data } = await productQuantityReservedByDates({
                variables: {
                    getProductReservationQuantityByDatesInput: {
                        product_id: productId,
                        start_at: date
                            ? date[0].toLocaleString("en-US", {
                                  timeZone: "Europe/Paris",
                              })
                            : null,
                        end_at: date
                            ? date[1].toLocaleString("en-US", {
                                  timeZone: "Europe/Paris",
                              })
                            : null,
                    },
                },
            });

            let stockAvailable = 0;
            let reservedQuantity = 0;

            if (
                typeof data?.getProductReservationQuantityByDates !==
                "undefined"
            ) {
                reservedQuantity = Number(
                    data ? data.getProductReservationQuantityByDates : 0,
                );
            }

            stockAvailable = stock - reservedQuantity;
            stockAvailable = stockAvailable < 0 ? 0 : stockAvailable;

            // If a date range is selected then we update options values with quantity for the select field
            if (typeof date !== "undefined") {
                const formSelectOptions = [];

                for (let i = 1; i <= stockAvailable; i++)
                    formSelectOptions.push(i);

                // If no quantity available, we set the select field to 0
                if (formSelectOptions.length === 0) formSelectOptions.push(0);

                setOptions(formSelectOptions);
                setDisabledQuantity(false);
            } else {
                initForm();
            }

            // Close the calendar
            if (openModal === true) setOpenModal(true);
            else setOpenModal(false);
        }
    };

    useEffect(() => {
        quantityInReservation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date]);

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!userId) {
            setOpenModal(false);
            toast.error(<LoginButton />);

            return;
        }

        if (!date || !Array.isArray(date) || !date[0] || !date[1]) {
            toast.error(
                "Vous devez choisir une date de début et une date de fin pour cette location.",
                {
                    icon: <TfiShoppingCartFull size="2rem" />,
                },
            );

            return;
        }

        if (!selectedQuantity) {
            toast.error(
                "Veuillez sélectionner une quantité avant d'ajouter le produit au panier.",
                {
                    icon: <TfiShoppingCartFull size="2rem" />,
                },
            );

            return;
        }

        let cartId = "";
        let dateStart = null;
        let dateEnd = null;

        if (date && Array.isArray(date) && date[0] && date[1]) {
            dateStart = date[0].toLocaleString("en-US", {
                timeZone: "Europe/Paris",
            });
            dateEnd = date[1].toLocaleString("en-US", {
                timeZone: "Europe/Paris",
            });

            // Retrieve existing cart or create a new one if not exist
            if (GetUserCart?.getCartReservationOfUser !== undefined) {
                cartId = GetUserCart.getCartReservationOfUser.id;
            } else {
                const createReservationInput = {
                    user_id: userId,
                };
                const newCart = await createCart({
                    variables: { createReservationInput },
                });

                if (newCart.data) cartId = newCart.data.createReservation.id;
            }

            // Update cart with the product
            const updateDetailFromReservation = {
                updateDetailFromReservationId: cartId,
                detail: {
                    quantity: selectedQuantity,
                    start_at: dateStart,
                    end_at: dateEnd,
                    product_id: productId,
                },
            };
            await updateCart({
                variables: { ...updateDetailFromReservation },
            });
            initForm();
            toast.success(
                selectedQuantity +
                    "x " +
                    name +
                    " ajouté à votre panier de réservation.",
                {
                    icon: <TfiShoppingCartFull size="2rem" />,
                },
            );
        }
    };

    return (
        <>
            {/* Add-To-Cart and calendar reservation Modal */}
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
                                    <form
                                        id="form-reservation"
                                        onSubmit={(e) => submitForm(e)}
                                    >
                                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                            <div className="sm:flex sm:items-start">
                                                <div className="mx-auto flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-15 sm:w-15">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="1.5"
                                                        stroke="currentColor"
                                                        className="w-12 h-12"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                                                        />
                                                    </svg>
                                                </div>
                                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                    <Dialog.Title
                                                        as="h3"
                                                        className="text-base font-semibold leading-6 text-gray-900"
                                                    >
                                                        <p className="text-center">
                                                            Dates de réservation
                                                            souhaitées
                                                            <br />
                                                            <span className="text-blue-600">
                                                                {name}
                                                            </span>
                                                        </p>
                                                    </Dialog.Title>
                                                    <div className="mt-2">
                                                        <p className="text-sm text-gray-500 text-center">
                                                            Veuillez choisir la
                                                            durée de location.
                                                        </p>
                                                    </div>
                                                    <div className="mt-2">
                                                        <Calendar
                                                            onChange={setDate}
                                                            minDate={new Date()}
                                                            value={date}
                                                            // tileDisabled={tileDisabled}
                                                            selectRange
                                                        />
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
                                                    Ajouter au panier
                                                </button>
                                            </div>
                                            <div>
                                                <select
                                                    className="appearance-none bg-white border border-gray-400 hover:border-gray-500 px-3 py-2 rounded-md shadow leading-tight focus:outline-none focus:shadow-outline"
                                                    onChange={(e) =>
                                                        setSelectedQuantity(
                                                            parseInt(
                                                                e.target.value,
                                                            ),
                                                        )
                                                    }
                                                    disabled={disabledQuantity}
                                                >
                                                    <option value="">
                                                        Quantité
                                                    </option>
                                                    {options.map((qty) => {
                                                        return (
                                                            <option
                                                                value={qty}
                                                                key={qty}
                                                            >
                                                                {qty}
                                                            </option>
                                                        );
                                                    })}
                                                </select>
                                            </div>
                                            <div className="flex-auto">
                                                <button
                                                    type="button"
                                                    className="rounded-md bg-gray-300 px-3 py-2 shadow-sm leading-tight ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                    onClick={() =>
                                                        setOpenModal(false)
                                                    }
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

export default AddReservation;
