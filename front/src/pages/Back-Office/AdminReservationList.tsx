import React, { useEffect, useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import {
    GET_RESERVATIONS,
    GET_RESERVATIONS_BY_SEARCH_FILTER,
} from "../../utils/queries";
import {
    EnumStatusReservation,
    SearchReservationInput,
} from "../../__generated__/graphql";

const AdminReservationList = () => {
    const [filteredReservationList, setFilteredReservationList] =
        useState<any>();

    const [searchInputs, setSearchInputs] = useState({
        idSearchInput: "",
        emailSearchInput: "",
        dateSearchInput: {
            startDate: "",
            endDate: "",
        },
        status: "",
    });

    const [filterClear, setFilterClear] = useState(false);

    const [getAllReservation] = useLazyQuery(GET_RESERVATIONS);

    const [searchReservationByFilters, { data: filteredReservations }] =
        useLazyQuery(GET_RESERVATIONS_BY_SEARCH_FILTER);

    let reservationStatusEnum = EnumStatusReservation;

    const reservationStatusOptions = Object.values(reservationStatusEnum).map(
        (status) => {
            return <option value={status}>{status}</option>;
        },
    );

    useEffect(() => {
        getAllReservation().then((res) => {
            setFilteredReservationList(res.data?.getReservations);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (areAllValuesEmpty(searchInputs)) {
            getAllReservation().then((res) => {
                setFilteredReservationList(res.data?.getReservations);
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterClear]);

    console.log("filteredList", filteredReservationList);

    async function handleSubmit(e: any) {
        e.preventDefault();
        console.log("in submit function");

        const searchReservationInput = {
            id: searchInputs.idSearchInput,
            userEmail: searchInputs.emailSearchInput,
            date: {
                startDate:
                    searchInputs.dateSearchInput.startDate === ""
                        ? undefined
                        : searchInputs.dateSearchInput.startDate,
                endDate:
                    searchInputs.dateSearchInput.endDate === ""
                        ? undefined
                        : searchInputs.dateSearchInput.endDate,
            },
            status:
                searchInputs.status === ""
                    ? undefined
                    : Object.values(EnumStatusReservation).find(
                          (value) => value === searchInputs.status,
                      ),
        };

        const res = await searchReservationByFilters({
            variables: {
                searchReservationInput,
            },
        });
        setFilteredReservationList(res.data?.getReservationsBySearchFilter);
    }

    function handleFilterClear() {
        setSearchInputs({
            idSearchInput: "",
            emailSearchInput: "",
            dateSearchInput: {
                startDate: "",
                endDate: "",
            },
            status: "",
        });

        setFilterClear(!filterClear);
    }

    function areAllValuesEmpty(obj: SearchReservationInput | Object): boolean {
        return Object.values(obj).every((objValues) => {
            if (typeof objValues === "object") {
                return areAllValuesEmpty(objValues);
            } else if (objValues !== "") {
                return false;
            }
            return true;
        });
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
                            value={searchInputs.idSearchInput}
                            onChange={(e) =>
                                setSearchInputs((prevInputs) => ({
                                    ...prevInputs,
                                    idSearchInput: e.target.value,
                                }))
                            }
                            className="px-2 py-1 w-full rounded-lg bg-white text-left shadow-sm shadow-main focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-main sm:w-auto"
                            placeholder="Rechercher une réservation"
                        />
                        <button className="hidden" type="submit">
                            Submit
                        </button>
                    </form>
                    <form className="px-2 my-4 flex gap-4 justify-between sm:justify-center sm:p-0">
                        <label htmlFor="search">Par id</label>
                        <input
                            type="date"
                            name="startDateSearchInput"
                            id="startDateSearchInput"
                            value={searchInputs.dateSearchInput.startDate}
                            onChange={(e) =>
                                setSearchInputs((prevInputs) => ({
                                    ...prevInputs,
                                    dateSearchInput: {
                                        ...prevInputs.dateSearchInput,
                                        startDate: e.target.value,
                                    },
                                }))
                            }
                            className="px-2 py-1 w-full rounded-lg bg-white text-left shadow-sm shadow-main focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-main sm:w-auto"
                            placeholder="Rechercher une réservation"
                        />
                    </form>
                    <form className="px-2 my-4 flex gap-4 justify-between sm:justify-center sm:p-0">
                        <label htmlFor="search">Par id</label>
                        <input
                            type="date"
                            name="endDateSearchInput"
                            id="endDateSearchInput"
                            value={searchInputs.dateSearchInput.endDate}
                            onChange={(e) =>
                                setSearchInputs((prevInputs) => ({
                                    ...prevInputs,
                                    dateSearchInput: {
                                        ...prevInputs.dateSearchInput,
                                        endDate: e.target.value,
                                    },
                                }))
                            }
                            className="px-2 py-1 w-full rounded-lg bg-white text-left shadow-sm shadow-main focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-main sm:w-auto"
                            placeholder="Rechercher une réservation"
                        />
                    </form>
                    <form className="px-2 my-4 flex gap-4 justify-between sm:justify-center sm:p-0">
                        <label htmlFor="search">Par Email</label>
                        <input
                            type="search"
                            name="emailSearchInput"
                            id="emailSearchInput"
                            value={searchInputs.emailSearchInput}
                            onChange={(e) =>
                                setSearchInputs((prevInputs) => ({
                                    ...prevInputs,
                                    emailSearchInput: e.target.value,
                                }))
                            }
                            className="px-2 py-1 w-full rounded-lg bg-white text-left shadow-sm shadow-main focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-main sm:w-auto"
                            placeholder="Rechercher une réservation"
                        />
                    </form>
                    <form
                        className="px-2 my-4 flex gap-4 justify-between sm:justify-center sm:p-0"
                        onSubmit={handleSubmit}
                    >
                        <label htmlFor="search">Par Status</label>
                        <select
                            className="px-2 py-1 w-full rounded-lg bg-white text-left shadow-sm shadow-main focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-main sm:w-auto"
                            name="statusSearchInput"
                            id="statusSearchInput"
                            onChange={(e) =>
                                setSearchInputs((prevInputs) => ({
                                    ...prevInputs,
                                    status: e.target.value,
                                }))
                            }
                            value={searchInputs.status}
                        >
                            <option defaultChecked value="">
                                Status
                            </option>
                            {reservationStatusOptions}
                        </select>
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
                            <th className="border-b p-4 w-9/12">
                                <button className="opacity-50 flex items-center gap-2">
                                    {" "}
                                    status{" "}
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
                                <td className="border-b p-4">
                                    {reservation.status}
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
