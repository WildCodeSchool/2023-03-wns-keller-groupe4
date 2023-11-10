import React, { useEffect, useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import {
    GET_RESERVATIONS,
    GET_RESERVATIONS_BY_DATES,
    GET_RESERVATIONS_BY_ID,
    GET_RESERVATIONS_BY_SEARCH_FILTER,
    GET_RESERVATIONS_BY_USER_EMAIL,
    SEARCH_RESERVATION_BY_ID,
} from "../../utils/queries";
import Calendar from "react-calendar";
import { createTypeReferenceDirectiveResolutionCache } from "typescript";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const AdminReservationList = () => {
    const [idSearchInput, setIdSearchInput] = useState("");
    const [emailSearchInput, setEmailSearchInput] = useState("");
    // const [dateSearchInput, setDateSearchInput] = useState("");
    const [filterClear, setFilterClear] = useState(false);
    const [dateSearchInput, setDateSearchInput] = useState({
        startDate: "",
        endDate: "",
    });
    const [multipleFilters, setMultipleFilters] = useState(false);

    // const [dateValue, setDateValue] = useState<Value>(new Date());

    // const { loading, error, data } = useQuery(GET_RESERVATIONS);

    const [getAllReservation] = useLazyQuery(GET_RESERVATIONS);
    const [getReservationByUserEmail, { data: emailFilteredReservations }] =
        useLazyQuery(GET_RESERVATIONS_BY_USER_EMAIL);

    const [searchReservationById, { data: idFilteredReservations }] =
        useLazyQuery(SEARCH_RESERVATION_BY_ID);
    const [searchReservationsByDate, { data: dateFilteredReservations }] =
        useLazyQuery(GET_RESERVATIONS_BY_DATES);
    const [filteredReservationList, setFilteredReservationList] =
        useState<any>();

    const [searchReservationByFilters, { data: filteredReservations }] =
        useLazyQuery(GET_RESERVATIONS_BY_SEARCH_FILTER);

    useEffect(() => {
        if (!idSearchInput && !emailSearchInput) {
            getAllReservation().then((res) => {
                setFilteredReservationList(res.data?.getReservations);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterClear]);

    console.log("filteredList", filteredReservationList);

    // I need a submit fonction for 3 possibles input (id, email, date), the functions has to be called when the user click on the button or press enter

    async function handleSubmit(e: any) {
        e.preventDefault();
        console.log("in submit function");

        console.log(dateSearchInput.startDate);

        const searchReservationInput = {
            id: idSearchInput,
            userEmail: emailSearchInput,
            date: {
                startDate:
                    dateSearchInput.startDate === ""
                        ? undefined
                        : dateSearchInput.startDate,
                endDate:
                    dateSearchInput.endDate === ""
                        ? undefined
                        : dateSearchInput.endDate,
            },
            status: null,
        };
        console.log(searchReservationInput);

        const res = await searchReservationByFilters({
            variables: {
                searchReservationInput,
            },
        });

        console.log(dateSearchInput.startDate);
        console.log(
            "filteredRequestResponse",
            res.data?.getReservationsBySearchFilter,
        );

        setFilteredReservationList(res.data?.getReservationsBySearchFilter);

        // if (emailSearchInput) {
        //     console.log("emailSearchInput", emailSearchInput);
        //     const res = await getReservationByUserEmail({
        //         variables: {
        //             email: emailSearchInput,
        //         },
        //     });
        //     console.log(
        //         "getResaByUserEmailResponse",
        //         res.data?.getReservationsByUserEmail,
        //     );

        //     setFilteredReservationList(res.data?.getReservationsByUserEmail);
        //     if (emailSearchInput && multipleFilters) {
        // }

        // if (idSearchInput) {
        //     console.log("idSearchInput", idSearchInput);

        //     const res = await searchReservationById({
        //         variables: {
        //             searchReservationByIdId: idSearchInput,
        //         },
        //     });

        //     setFilteredReservationList(res.data?.searchReservationById);
        // }

        // // setEmailSearchInput("");

        // if (dateSearchInput.startDate || dateSearchInput.endDate) {
        //     const res = await searchReservationsByDate({
        //         variables: {
        //             startDate: dateSearchInput.startDate,
        //             endDate: dateSearchInput.endDate,
        //         },
        //     });
        //     setFilteredReservationList(res.data?.getReservationsByDates);
        // }
    }

    function handleFilterClear() {
        setIdSearchInput("");
        setEmailSearchInput("");
        setDateSearchInput({
            startDate: "",
            endDate: "",
        });

        setFilterClear(!filterClear);
    }

    return (
        <div>
            <h1 className="text-2xl text-center my-6 sm:my-8">Réservations</h1>
            <div>
                <div className="flex justify-center gap-3 px-2 my-4">
                    <button onClick={handleFilterClear}>clearAllFilters</button>
                    <form
                        className="px-2 my-4 flex gap-4 justify-between sm:justify-center sm:p-0"
                        onSubmit={handleSubmit}
                    >
                        <label htmlFor="search">Par id</label>
                        <input
                            type="search"
                            name="idSearchInput"
                            id="idSearchInput"
                            value={idSearchInput}
                            onChange={(e) => setIdSearchInput(e.target.value)}
                            className="px-2 py-1 w-full rounded-lg bg-white text-left shadow-sm shadow-main focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-main sm:w-auto"
                            placeholder="Rechercher une réservation"
                        />
                        <button className="hidden" type="submit">
                            Submit
                        </button>
                    </form>
                    {/* <Calendar onChange={setDateValue} value={dateValue} /> */}
                    <form className="px-2 my-4 flex gap-4 justify-between sm:justify-center sm:p-0">
                        <label htmlFor="search">Par id</label>
                        <input
                            type="date"
                            name="startDateSearchInput"
                            id="startDateSearchInput"
                            value={dateSearchInput.startDate}
                            onChange={(e) =>
                                setDateSearchInput({
                                    ...dateSearchInput,
                                    startDate: e.target.value,
                                })
                            }
                            className="px-2 py-1 w-full rounded-lg bg-white text-left shadow-sm shadow-main focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-main sm:w-auto"
                            placeholder="Rechercher une réservation"
                        />
                        {/* <button className="hidden" type="submit">
                            Submit
                        </button> */}
                    </form>
                    <form className="px-2 my-4 flex gap-4 justify-between sm:justify-center sm:p-0">
                        <label htmlFor="search">Par id</label>
                        <input
                            type="date"
                            name="endDateSearchInput"
                            id="endDateSearchInput"
                            value={dateSearchInput.endDate}
                            onChange={(e) =>
                                setDateSearchInput({
                                    ...dateSearchInput,
                                    endDate: e.target.value,
                                })
                            }
                            className="px-2 py-1 w-full rounded-lg bg-white text-left shadow-sm shadow-main focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-main sm:w-auto"
                            placeholder="Rechercher une réservation"
                        />
                        {/* <button className="hidden" type="submit">
                            Submit
                        </button> */}
                    </form>
                    <form
                        className="px-2 my-4 flex gap-4 justify-between sm:justify-center sm:p-0"
                        onSubmit={handleSubmit}
                    >
                        <label htmlFor="search">Par Email</label>
                        <input
                            type="search"
                            name="emailSearchInput"
                            id="emailSearchInput"
                            value={emailSearchInput}
                            onChange={(e) =>
                                setEmailSearchInput(e.target.value)
                            }
                            className="px-2 py-1 w-full rounded-lg bg-white text-left shadow-sm shadow-main focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-main sm:w-auto"
                            placeholder="Rechercher une réservation"
                        />
                        <button className="" type="submit">
                            Submit
                        </button>
                    </form>
                </div>
                <table className="table-fixed text-left max-w-screen-sm w-full mx-auto sm:w-4/5">
                    <thead>
                        <tr>
                            <th className="border-b p-4 w-9/12">
                                <button className="opacity-50 flex items-center gap-2">
                                    {" "}
                                    id
                                </button>
                            </th>
                            <th className="border-b p-4 w-9/12">
                                <button className="opacity-50 flex items-center gap-2">
                                    {" "}
                                    Date de début
                                </button>
                            </th>
                            <th className="border-b p-4 w-9/12">
                                <button className="opacity-50 flex items-center gap-2">
                                    {" "}
                                    Date de fin{" "}
                                </button>
                            </th>
                            <th className="border-b p-4 w-9/12">
                                <button className="opacity-50 flex items-center gap-2">
                                    {" "}
                                    Client{" "}
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredReservationList?.map((reservation: any) => (
                            <tr key={reservation.id}>
                                <td className="border-b p-4">
                                    {reservation.id}
                                </td>
                                <td className="border-b p-4">
                                    {new Date(
                                        reservation.start_at,
                                    ).toLocaleString("fr-FR", {
                                        timeZone: "UTC",
                                    })}
                                </td>
                                <td className="border-b p-4">
                                    {new Date(
                                        reservation.end_at,
                                    ).toLocaleString("fr-FR", {
                                        timeZone: "UTC",
                                    })}
                                </td>
                                <td className="border-b p-4">
                                    {reservation.user.email}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminReservationList;
