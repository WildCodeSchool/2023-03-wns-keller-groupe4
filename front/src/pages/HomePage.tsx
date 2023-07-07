import { Combobox, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { RxMagnifyingGlass } from "react-icons/rx";
import { gql } from "../__generated__";
import { useQuery } from "@apollo/client";

const GET_CATEGORIES = gql(`
  query GetCategories {
    getCategories {
      id
      name
    }
  }
`);

function HomePage() {
  const [selected, setSelected] = useState({});
  const [query, setQuery] = useState("");

  const { data } = useQuery(GET_CATEGORIES);

  const filteredProduct =
    query === ""
      ? data?.getCategories
      : data?.getCategories.filter((product) =>
          product.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  useEffect(() => {
    if (selected && "id" in selected) {
      window.location.href = `/products/list?category=${selected.id}`;
    }
  }, [selected]);

  return (
    <div className="relative flex flex-col items-center justify-around w-4/5 mx-auto h-[calc(100vh-58px)] lg:h-[calc(100vh-74px)]">
      <div className="absolute top-8 w-4/5 sm:w-96 lg:top-24">
        <Combobox value={selected} onChange={setSelected}>
          <div className="relative mt-1">
            <Combobox.Label className="opacity-50">
              Trouvez votre matériel
            </Combobox.Label>
            <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-sm shadow-main focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
              <Combobox.Input
                className="w-full border-none py-2 pl-3 pr-10 text-sm rounded-lg leading-5 text-gray-900 focus:outline-main"
                onChange={(event) => setQuery(event.target.value)}
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
                {filteredProduct?.length === 0 && query !== "" ? (
                  <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                    Aucun produit ne correspond à votre recherche
                  </div>
                ) : (
                  filteredProduct?.map((product) => (
                    <Combobox.Option
                      key={product.id}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? "bg-main text-white" : "text-gray-900"
                        }`
                      }
                      value={product}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {product.name}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? "text-white" : "text-main"
                              }`}
                            >
                              <AiOutlineCheck
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
      </div>
      <div className="flex flex-col items-center border border-main rounded-xl shadow-sm py-8 mb-36 sm:w-80">
        <h1 className="text-4xl font-bold mb-4">Wildrent</h1>
        <p className="text-xl text-center">
          Louez votre matériel de chantier sans difficulté
        </p>
      </div>
    </div>
  );
}

export default HomePage;
