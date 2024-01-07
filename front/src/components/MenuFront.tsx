import { Link } from "react-router-dom";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_CATEGORIES, GET_CATEGORY_BY_SEARCH } from "../utils/queries";
import { useEffect, useState } from "react";
import { useDebounce } from "../utils/hooks/useDebounce.hook";

interface INavbarFrontProps {
    setOpenNav: React.Dispatch<React.SetStateAction<boolean>>;
}

// Categories from API
enum CategoryRequestState {
    IN_PROGRESS = "IN_PROGRESS",
    SUCCESS = "SUCCESS",
    NO_CONTENT = "NO_CONTENT",
    NOT_SEARCHING = "NOT_SEARCHING",
}
function MenuFront({ setOpenNav }: INavbarFrontProps) {
    // Toutes les catégories de l'API
    const { loading, error, data } = useQuery(GET_CATEGORIES);

    const [searchCategory, { data: filteredCategories }] = useLazyQuery(
        GET_CATEGORY_BY_SEARCH,
    );
    const [categorySearchInput, setCategorySearchInput] = useState("");
    // custom hook qui permets de soumettre la saisie utilisateur avec un délai
    // pour éviter les requêtes à chaque nouveau caractère
    const debouncedSearchInput = useDebounce(categorySearchInput, 500);
    // state qui gère le statue de la requête de recherche de catégorie
    const [searchState, setSearchState] = useState<CategoryRequestState>(
        CategoryRequestState.NOT_SEARCHING,
    );

    useEffect(() => {
        // On vérifie que l'input de recherche retardé est bien supérieur à 1 caractère puis que le résultat de la recherche n'est pas vide. On set setSearchState selon le résultat
        if (debouncedSearchInput.length > 1) {
            setSearchState(CategoryRequestState.IN_PROGRESS);
            submitSearch().then(
                (result) => {
                    setSearchState(
                        result.data &&
                            result.data.getCategoriesBySearch.length > 0
                            ? CategoryRequestState.SUCCESS
                            : CategoryRequestState.NO_CONTENT,
                    );
                },

                //
            );
        } else if (debouncedSearchInput.length <= 1) {
            setSearchState(CategoryRequestState.NOT_SEARCHING);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearchInput]);

    if (loading) return <p>Loading...</p>;

    if (error)
        return (
            <p>
                Erreur : Une erreur est survenue. La barre de navigation ne peut
                pas être affichée pour le moment.
            </p>
        );

    function computeCategories() {
        switch (searchState) {
            case CategoryRequestState.NOT_SEARCHING:
                return data?.getCategories;

            case CategoryRequestState.IN_PROGRESS:
            case CategoryRequestState.SUCCESS:
                return filteredCategories?.getCategoriesBySearch;

            case CategoryRequestState.NO_CONTENT:
                return [];

            default:
                return data?.getCategories;
        }
    }

    // la variable catégorie est dynamique et déterminé par la valeur de searchState
    const categories = computeCategories();

    async function submitSearch() {
        return await searchCategory({
            variables: {
                searchCategoryInput: categorySearchInput,
            },
        });
    }

    return (
        <div className="menuFront">
            <label htmlFor="searchMenu" className="sr-only">
                Toute nos catégories
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
                <div className="text-center grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-3 gap-x-2 sm:gap-2 pt-3 pb-2">
                    <Link
                        to={"products/list/all"}
                        key="0"
                        className="bg-orange-600 hover:bg-orange-700 text-white  block rounded-md text-base font-medium"
                        onClick={() => setOpenNav(false)}
                    >
                        <div className="flex items-center h-full px-2 ">
                            <div className="w-full">Tous</div>
                        </div>
                    </Link>
                    {categories?.map((category) => (
                        <Link
                            to={`products/list/${category.name?.toLowerCase()}`}
                            key={category.id}
                            className="bg-orange-600 hover:bg-orange-700  text-white  block rounded-md  text-base font-medium"
                            onClick={() => setOpenNav(false)}
                        >
                            <div className="flex items-center h-full px-2 ">
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
