import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import {
    GET_RESERVATIONS_BY_SEARCH_FILTER,
    GET_RESERVATION_LIST_COUNT,
} from "../../utils/queries";
import {
    EnumStatusReservation,
    SearchReservationInput,
} from "../../__generated__/graphql";
import PaginationNavbar from "../../components/tools/PaginationNavbar";
import SortIndicator from "../../components/tools/SortIndicator";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

const LIMIT = 10;

const AdminReservationList = () => {
    const [searchInputs, setSearchInputs] = useState({
        idSearchInput: "",
        emailSearchInput: "",
        dateSearchInput: {
            startDate: "",
            endDate: "",
        },
        status: "",
        orderBy: "id",
        orderDirection: "ASC",
        currentPage: 1,
    });

    const [filterClear, setFilterClear] = useState(false);

    const [getAllReservation] = useLazyQuery(GET_RESERVATIONS_BY_SEARCH_FILTER);

    const [searchReservationByFilters, { data: filteredReservations }] =
        useLazyQuery(GET_RESERVATIONS_BY_SEARCH_FILTER);

    const [getReservationCount, { data: reservationCount }] = useLazyQuery(
        GET_RESERVATION_LIST_COUNT,
    );

    let reservationStatusEnum = EnumStatusReservation;

    const offset = (searchInputs.currentPage - 1) * LIMIT;

    // this use effect fetchs all reservation (except in_cart status)
    useEffect(() => {
        const reservationInput = {
            limit: LIMIT,
            offset: 0,
        };

        getAllReservation({
            variables: {
                searchReservationInput: reservationInput,
            },
        });

        getReservationCount();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // this use effect fetches all reservation (except in car status) if all search inputs are empty (means the user cleared filter)
    // or get reservations by submit the searchInputs in case the user changed pages or order
    useEffect(() => {
        if (areAllValuesEmpty(searchInputs)) {
            getAllReservation();
        } else {
            handleSubmit();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        filterClear,
        offset,
        searchInputs.orderBy,
        searchInputs.orderDirection,
    ]);

    // getting page count
    const pageCount =
        reservationCount &&
        Math.ceil(reservationCount.getReservationCountBySearchInput / LIMIT);
    const pageNumbers = [];

    if (pageCount) {
        for (let i = 1; i <= pageCount; i++) {
            pageNumbers.push(i);
        }
    }

    // handling sort order and direction modifications
    async function handleSort(column: string) {
        setSearchInputs((prevInputs) => ({
            ...prevInputs,
            orderBy: column,
            orderDirection:
                prevInputs.orderDirection === "ASC" ? "DESC" : "ASC",
        }));
    }

    // submit with search input values
    async function handleSubmit(e?: any) {
        if (e) {
            e.preventDefault();
        }

        const searchReservationInput = generateReservationInput();

        await searchReservationByFilters({
            variables: {
                searchReservationInput,
            },
        });

        await getReservationCount({
            variables: {
                searchReservationInput: generateReservationInput(),
            },
        });
    }
    // resets all the searchinputs state
    function handleFilterClear() {
        setSearchInputs({
            idSearchInput: "",
            emailSearchInput: "",
            dateSearchInput: {
                startDate: "",
                endDate: "",
            },
            status: "",
            orderBy: "id",
            orderDirection: "ASC",
            currentPage: 1,
        });

        setFilterClear(!filterClear);
    }
    // used in handleSubbmit function, is used to convert state values to the right format to request the API
    function generateReservationInput(): SearchReservationInput {
        const {
            idSearchInput,
            emailSearchInput,
            dateSearchInput,
            status,
            orderBy,
            orderDirection,
        } = searchInputs;

        const searchReservationInput = {
            id: idSearchInput,
            userEmail: emailSearchInput,
            date: {
                startDate:
                    dateSearchInput?.startDate === ""
                        ? undefined
                        : dateSearchInput.startDate,
                endDate:
                    dateSearchInput?.endDate === ""
                        ? undefined
                        : searchInputs.dateSearchInput.endDate,
            },
            status:
                status === ""
                    ? undefined
                    : Object.values(EnumStatusReservation).find(
                          (value) => value === status,
                      ),

            limit: LIMIT,
            offset: offset,
            orderBy,
            orderDirection,
        };

        return searchReservationInput;
    }
    // Check if all values are empty so the second use effect knows which actions to trigger
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
    // formating date to FR format to display them in reservation table
    function formatDateForDisplay(date: string) {
        if (date) {
            return new Date(date).toLocaleString("fr-FR", {
                timeZone: "UTC",
            });
        } else {
            return "Date non définie";
        }
    }

    // generating options for the status select input
    const reservationStatusOptions = Object.values(reservationStatusEnum)
        .filter((e) => e !== "IN_CART")
        .map((status) => {
            return <option value={status}>{status}</option>;
        });
    return (
        <div className="text-center">
            <h1 className="text-2xl text-center my-6 sm:my-8">Réservations</h1>

            <div>
                <div className="flex gap-1 my-4 justify-center sm:flex-row sm:gap-3 ">
                    <form
                        className="flex text-center flex-wrap justify-center  sm:flex-row xl:flex-nowrap sm:gap-3 "
                        onSubmit={handleSubmit}
                    >
                        <button
                            className="shadow-md text-white bg-yellow-400 focus:outline-none hover:bg-main active:bg-yellow-400 rounded-lg px-2 sm:mt-8 md:h-[25%]  xl:h-3/6  h-1/6 mt-10"
                            onClick={handleFilterClear}
                            type="button"
                        >
                            Effacer les filtres
                        </button>
                        <div className="px-2 my-4 flex flex-col items-center basis-1/4 ">
                            <label htmlFor="idSearchInput">Id</label>

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
                                className="px-2 py-1 w-3/4 rounded-lg bg-white text-left shadow-sm shadow-main focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-main"
                                placeholder="Rechercher une réservation"
                            />
                        </div>
                        <div className="px-2 my-4 flex flex-col items-center basis-1/4 sm:basis-0 ">
                            <label htmlFor="idSearchInput">Date de début</label>
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
                                className="px-2 py-1 w-3/4 rounded-lg bg-white text-left shadow-sm shadow-main focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-main sm:w-auto"
                                placeholder="Rechercher une réservation"
                            />
                        </div>
                        <div className="px-2 my-4 flex flex-col items-center basis-1/4 sm:basis-0 ">
                            <label htmlFor="idSearchInput">Date de fin</label>
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
                                className="px-2 py-1  w-3/4 rounded-lg bg-white text-left shadow-sm shadow-main focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-main sm:w-auto"
                                placeholder="Rechercher une réservation"
                            />
                        </div>
                        <div className="px-2 my-4 flex flex-col items-center basis-1/4 sm:basis-0">
                            <label htmlFor="idSearchInput">Email</label>
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
                                className="px-2 py-1 w-3/4 rounded-lg bg-white text-left shadow-sm shadow-main focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-main sm:w-auto"
                                placeholder="Rechercher une réservation"
                            />
                        </div>
                        <div className="px-2 my-4 flex flex-col items-center basis-1/4 sm:basis-0 ">
                            <label htmlFor="idSearchInput">Status</label>
                            <select
                                className="px-2 py-1 w-3/4 rounded-lg bg-white text-left shadow-sm shadow-main focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-main sm:w-auto"
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
                                <option defaultChecked value=""></option>
                                {reservationStatusOptions}
                            </select>
                        </div>
                        <div className="mt-[2.5rem] md:mt-[2.5rem] xl:mt-[2.5rem] mx-2 ">
                            <button
                                type="submit"
                                className=" border border-main px-4 py-1 rounded-md active:bg-yellow-400 sm:mx-4 "
                            >
                                <HiOutlineMagnifyingGlass />
                            </button>
                        </div>
                    </form>
                </div>
                <div className="h-full text-sm xl:text-base">
                    <table className="table-auto text-left md:max-w-screen-sm mx-auto lg:table-fixed w-5/6">
                        <thead>
                            <tr>
                                <th className="border-b p-4 w-9/12">
                                    <button
                                        onClick={() => handleSort("id")}
                                        className="opacity-50 flex items-center gap-2"
                                    >
                                        id{" "}
                                        <SortIndicator
                                            column="id"
                                            orderBy={searchInputs.orderBy}
                                            orderDirection={
                                                searchInputs.orderDirection
                                            }
                                        />{" "}
                                    </button>
                                </th>
                                <th className="border-b p-4 w-9/12">
                                    <button
                                        onClick={() => handleSort("start_at")}
                                        className="opacity-50 flex items-center gap-2"
                                    >
                                        date de début{" "}
                                        <SortIndicator
                                            column="start_at"
                                            orderBy={searchInputs.orderBy}
                                            orderDirection={
                                                searchInputs.orderDirection
                                            }
                                        />{" "}
                                    </button>
                                </th>
                                <th className="border-b p-4 w-9/12">
                                    <button
                                        onClick={() => handleSort("end_at")}
                                        className="opacity-50 flex items-center gap-2"
                                    >
                                        Date de fin{" "}
                                        <SortIndicator
                                            column="end_at"
                                            orderBy={searchInputs.orderBy}
                                            orderDirection={
                                                searchInputs.orderDirection
                                            }
                                        />{" "}
                                    </button>
                                </th>
                                <th className="border-b p-4 w-9/12">
                                    <button
                                        onClick={() => handleSort("email")}
                                        className="opacity-50 flex items-center gap-2"
                                    >
                                        email{" "}
                                        <SortIndicator
                                            column="email"
                                            orderBy={searchInputs.orderBy}
                                            orderDirection={
                                                searchInputs.orderDirection
                                            }
                                        />{" "}
                                    </button>
                                </th>
                                <th className="border-b p-4 w-9/12">
                                    <button
                                        onClick={() => handleSort("status")}
                                        className="opacity-50 flex items-center gap-2"
                                    >
                                        status{" "}
                                        <SortIndicator
                                            column="status"
                                            orderBy={searchInputs.orderBy}
                                            orderDirection={
                                                searchInputs.orderDirection
                                            }
                                        />{" "}
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredReservations?.getReservationsBySearchFilter.map(
                                (reservation: any) => (
                                    <tr
                                        key={reservation.id}
                                        className="even:bg-gray-100
                                    ke"
                                    >
                                        <td className="border-b p-4">
                                            {reservation.id}
                                        </td>
                                        <td className="border-b p-4">
                                            {formatDateForDisplay(
                                                reservation.start_at,
                                            )}
                                        </td>
                                        <td className="border-b p-4">
                                            {formatDateForDisplay(
                                                reservation.start_at,
                                            )}
                                        </td>
                                        <td className="border-b p-4">
                                            {reservation.user.email}
                                        </td>
                                        <td className="border-b p-4">
                                            {reservation.status}
                                        </td>
                                    </tr>
                                ),
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <PaginationNavbar
                currentPage={searchInputs.currentPage}
                setCurrentPage={(newPage) =>
                    setSearchInputs((prevInputs) => ({
                        ...prevInputs,
                        currentPage: newPage,
                    }))
                }
                pageNumbers={pageNumbers}
                pageCount={pageCount}
            />
        </div>
    );
};

export default AdminReservationList;
