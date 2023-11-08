import React, { useEffect, useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_RESERVATIONS } from "../../utils/queries";
import { log } from "console";

const AdminReservationList = () => {
    // const [getLazyReservations, { data: lazyData }] =
    //     useLazyQuery(GET_RESERVATIONS);

    const [idSearchInput, setIdSearchInput] = useState("");

    const { loading, error, data } = useQuery(GET_RESERVATIONS);

    // useEffect(() => {
    //     getLazyReservations();
    // }, []);
    console.log(data?.getReservations);

    return (
        <div>
            <h1 className="text-2xl text-center my-6 sm:my-8">Réservations</h1>
            <div>
                <div className="flex justify-center gap-3 px-2 my-4">
                    <form className="px-2 my-4 flex gap-4 justify-between sm:justify-center sm:p-0">
                        <label htmlFor="search">Par id</label>
                        <input
                            type="search"
                            name="search"
                            id="search"
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
                            name="search"
                            id="search"
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
                            type="search"
                            name="search"
                            id="search"
                            className="px-2 py-1 w-full rounded-lg bg-white text-left shadow-sm shadow-main focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-main sm:w-auto"
                            placeholder="Rechercher une réservation"
                        />
                        <button className="hidden" type="submit">
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
                        {data?.getReservations.map((reservation) => (
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
