import { Combobox, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { RxMagnifyingGlass } from "react-icons/rx";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { GET_CATEGORIES } from "../../utils/queries";
import { mostWantedProductDataArray } from "../../utils/mostWantedProductDataArray";
import ProductsListComponent from "../../components/ProductsListComponent";

function HomePage() {
    const navigate = useNavigate();

    const [selected, setSelected] = useState({});
    const [query, setQuery] = useState("");
    const [inSearch, setInSearch] = useState(false);

    const { data } = useQuery(GET_CATEGORIES);

    const sortedData =
        data?.getCategories &&
        Array.from(data?.getCategories).sort((a, b) =>
            a.name.localeCompare(b.name),
        );

    const filteredProduct =
        query === ""
            ? sortedData
            : sortedData?.filter((product) =>
                  product.name
                      .toLowerCase()
                      .replace(/\s+/g, "")
                      .includes(query.toLowerCase().replace(/\s+/g, "")),
              );

    useEffect(() => {
        if (selected && "name" in selected) {
            navigate(`/products/list/${selected.name}`);
        }
    }, [navigate, selected]);

    const mostWantedOrSearchResultRender = () => {
        if (inSearch) {
        }

        return mostWantedProductDataArray.map((product) => (
            <div className="sm:basis-1/12 border-black border-8">
                <ProductsListComponent
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    picture={product.picture}
                    available={product.available}
                />
            </div>
        ));
    };

    return (
        <div>
            <div className="flex flex-col items-center gap-5  border-green-900 border-8 ">
                {/* <div className="relative flex flex-col items-center justify-around w-4/5 mx-auto"> */}
                <div className="basis-1/4 border-red-900 border-2">
                    <Combobox value={selected} onChange={setSelected}>
                        <div className="relative mt-1">
                            <Combobox.Label className="opacity-50">
                                Trouvez votre matériel
                            </Combobox.Label>
                            <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-sm shadow-main focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                                <Combobox.Input
                                    className="w-full border-none py-2 pl-3 pr-10 text-sm rounded-lg leading-5 text-gray-900 focus:outline-main"
                                    onChange={(event) =>
                                        setQuery(event.target.value)
                                    }
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                                    <RxMagnifyingGlass
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </div>
                            </div>
                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                                afterLeave={() => setQuery("")}
                            >
                                <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {filteredProduct?.length === 0 &&
                                    query !== "" ? (
                                        <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                            Aucun produit ne correspond à votre
                                            recherche
                                        </div>
                                    ) : (
                                        filteredProduct?.map((product) => (
                                            <Combobox.Option
                                                key={product.id}
                                                className={({ active }) =>
                                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                        active
                                                            ? "bg-main text-white"
                                                            : "text-gray-900"
                                                    }`
                                                }
                                                value={product}
                                            >
                                                <span
                                                    className={`block truncate font-normal`}
                                                >
                                                    {product.name}
                                                </span>
                                            </Combobox.Option>
                                        ))
                                    )}
                                </Combobox.Options>
                            </Transition>
                        </div>
                    </Combobox>
                </div>
                <div className="flex flex-col basis-1/4 items-center  border-orange-900 border-8 rounded-xl shadow-sm py-8 mb-36 sm:w-80 sm-height:mb-0">
                    <h1 className="text-4xl font-bold mb-4">Wildrent</h1>
                    <p className="text-xl text-center ">
                        Nos produits les plus demandés
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row sm:flex-wrap  gap-2 border-blue-900 border-8">
                    {mostWantedOrSearchResultRender()}
                </div>
            </div>
        </div>
    );
}

export default HomePage;
