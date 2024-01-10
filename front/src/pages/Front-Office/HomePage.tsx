import { Combobox, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { RxMagnifyingGlass } from "react-icons/rx";
import { useLazyQuery, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import {
    GET_CATEGORIES,
    GET_PRODUCTS,
    GET_PRODUCTS_BY_SEARCH_FILTER,
} from "../../utils/queries";
import { mostWantedProductDataArray } from "../../utils/mostWantedProductDataArray";
import ProductsListComponent from "../../components/ProductsListComponent";
import { useDebounce } from "../../utils/hooks/useDebounce.hook";
import { CSSTransition, TransitionGroup } from "react-transition-group";

enum ProductRequestState {
    IN_PROGRESS = "IN_PROGRESS",
    SUCCESS = "SUCCESS",
    NO_CONTENT = "NO_CONTENT",
    NOT_SEARCHING = "NOT_SEARCHING",
}

function HomePage() {
    const navigate = useNavigate();

    const [selected, setSelected] = useState({});
    const [query, setQuery] = useState("");
    const [productSearchInput, setProductSearchInput] = useState({ name: "" });
    const debouncedSearchInput = useDebounce(productSearchInput.name, 600);

    const [searchState, setSearchState] = useState<ProductRequestState>(
        ProductRequestState.NOT_SEARCHING,
    );
    const [searchProduct, { data: searchProductData }] = useLazyQuery(
        GET_PRODUCTS_BY_SEARCH_FILTER,
    );

    const { data: mostWantedData } = useQuery(GET_PRODUCTS_BY_SEARCH_FILTER, {
        variables: { searchProductInput: { mostWanted: true } },
    });

    useEffect(() => {
        console.log("in use effect");

        if (debouncedSearchInput.length > 2) {
            setSearchState(ProductRequestState.IN_PROGRESS);
            // setTransitionState(true);
            submitSearch().then((result) => {
                setSearchState(
                    result.data &&
                        result.data.getProductBySearchFilter.length > 0
                        ? ProductRequestState.SUCCESS
                        : ProductRequestState.NO_CONTENT,
                );
            });
        }

        if (debouncedSearchInput.length <= 2) {
            console.log("debouncedSearchInput.length <= 2 condition");

            setSearchState(ProductRequestState.NOT_SEARCHING);
            // setTransitionState(true);
        }

        if (selected && "name" in selected) {
            navigate(`/products/list/${selected.name}`);
        }
    }, [navigate, selected, debouncedSearchInput]);

    async function submitSearch() {
        return await searchProduct({
            variables: {
                searchProductInput: productSearchInput,
            },
        });
    }

    const mostWantedOrSearchResultRender = () => {
        return (
            <TransitionGroup className="flex sm:flex-row justify-center sm:flex-wrap gap-2">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 items-center">
                    {searchState === ProductRequestState.SUCCESS &&
                        searchProductData?.getProductBySearchFilter.map(
                            (product: any) => (
                                <CSSTransition
                                    key={product.id}
                                    in={true}
                                    timeout={500}
                                    classNames="fade"
                                >
                                    <div key={product.id} className="">
                                        <ProductsListComponent
                                            id={product.id}
                                            name={product.name}
                                            price={product.price}
                                            picture={product.picture}
                                            available={product.available}
                                            mostWanted={false}
                                        />
                                    </div>
                                </CSSTransition>
                            ),
                        )}
                    {searchState === ProductRequestState.NOT_SEARCHING &&
                        mostWantedData?.getProductBySearchFilter.map(
                            (product) => (
                                <CSSTransition
                                    key={product.id}
                                    in={true}
                                    timeout={500}
                                    classNames="fade"
                                >
                                    <div key={product.id} className="">
                                        <ProductsListComponent
                                            id={product.id}
                                            name={product.name}
                                            price={product.price}
                                            picture={product.picture}
                                            available={product.available}
                                            mostWanted={true}
                                        />
                                    </div>
                                </CSSTransition>
                            ),
                        )}
                </div>
            </TransitionGroup>
        );
    };

    return (
        <div className="flex items-center justify-center mt-32 ">
            <div className="flex flex-col items-center gap-10">
                <div className="flex flex-col items-center  border-main border-2 rounded-xl shadow-sm py-8 mb-36 sm:w-80 sm-height:mb-0">
                    <h1 className="text-4xl font-bold mb-4">Wildrent</h1>
                    <p className="text-xl text-center ">
                        {searchState === ProductRequestState.NOT_SEARCHING
                            ? "Nos produits les plus demandés"
                            : "recherchez parmi tout nos produits"}
                    </p>
                </div>
                <div className="flex flex-col justify-center, items-center ">
                    <Combobox value={selected} onChange={setSelected}>
                        <div className="relative mt-1 w-96 sm:w-[40rem]">
                            <Combobox.Label className="opacity-50">
                                Trouvez votre matériel
                            </Combobox.Label>
                            <div className="w-full relative cursor-default overflow-hidden rounded-lg bg-white text-left shadow-sm shadow-main focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                                <Combobox.Input
                                    value={productSearchInput.name}
                                    className="w-full border-none py-2 pl-3 pr-10 text-sm rounded-lg leading-5 text-gray-900 focus:outline-main"
                                    onChange={(event) =>
                                        setProductSearchInput({
                                            name: event.target.value,
                                        })
                                    }
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                                    <RxMagnifyingGlass
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </div>
                            </div>
                        </div>
                    </Combobox>
                </div>

                {mostWantedOrSearchResultRender()}
            </div>
        </div>
    );
}

export default HomePage;
