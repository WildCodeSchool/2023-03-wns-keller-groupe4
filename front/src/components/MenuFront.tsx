import { Link } from "react-router-dom";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_CATEGORIES, GET_CATEGORY_BY_SEARCH } from "../utils/queries";
import { useEffect, useState } from "react";
import { useDebounce } from "../utils/utils";

interface INavbarFrontProps {
    openNav: boolean;
    setOpenNav: React.Dispatch<React.SetStateAction<boolean>>;
}

function MenuFront({ openNav, setOpenNav }: INavbarFrontProps) {
    // Categories from API
    const { loading, error, data } = useQuery(GET_CATEGORIES);
    const [categorySearchInput, setCategorySearchInput] = useState("");
    const debouncedSearchInput = useDebounce(categorySearchInput, 1000);
    console.log(debouncedSearchInput);

    const [searchCategory, { data: filteredCategories }] = useLazyQuery(
        GET_CATEGORY_BY_SEARCH,
    );
    useEffect(() => {
        if (debouncedSearchInput.length > 5) {
            console.log("debouncedSearchInput sup à 2 ");

            submitSearch();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categorySearchInput]);
    if (loading) return <p>Loading...</p>;

    if (error)
        return (
            <p>
                Erreur : Une erreur est survenue. La barre de navigation ne peut
                pas être affichée pour le moment.
            </p>
        );

    const isSearching =
        categorySearchInput.length > 2 &&
        filteredCategories?.getCategoriesBySearch &&
        filteredCategories?.getCategoriesBySearch.length > 0;

    const categories = isSearching
        ? filteredCategories.getCategoriesBySearch
        : data?.getCategories;

    async function submitSearch() {
        await searchCategory({
            variables: {
                searchCategoryInput: categorySearchInput,
            },
        });
    }

    return (
        <div className="menuFront">
            <label htmlFor="searchMenu" className="sr-only">
                Tous nos matériels
            </label>
            <input
                type="text"
                name="searchMenu"
                id="searchMenu"
                value={categorySearchInput}
                onChange={(e) => setCategorySearchInput(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 mb-2 focus:outline-main focus:border-transparent"
                placeholder="Chercher un matériel"
            />

            <nav className="overflow-x-hidden">
                <div className="text-center flex flex-col gap-2">
                    <Link
                        to={"products/list/all"}
                        key="0"
                        // className="bg-orange-600 hover:bg-orange-700 text-white basis-7 block rounded-md px-3 py-2 mx-2 text-base font-medium"
                        className="bg-orange-600 hover:bg-orange-700 text-white basis-7 block rounded-md text-base font-medium"
                        onClick={() => setOpenNav(false)}
                    >
                        <div className="flex items-center h-full px-2 basis-7">
                            <div className="w-full">Tous</div>
                        </div>
                    </Link>
                    {categories?.map((category) => (
                        <Link
                            to={"products/list/" + category.name.toLowerCase()}
                            key={category.id}
                            // className="bg-orange-600 hover:bg-orange-700  text-white basis-7 block rounded-md px-3 py-2 mx-2 text-base font-medium"
                            className="bg-orange-600 hover:bg-orange-700  text-white basis-7 block rounded-md  text-base font-medium"
                            onClick={() => setOpenNav(false)}
                        >
                            <div className="flex items-center h-full px-2 basis-7">
                                <div className="w-full">{category.name}</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </nav>
        </div>
    );
}

export default MenuFront;
