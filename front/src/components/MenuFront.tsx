import { Link } from "react-router-dom";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_CATEGORIES, GET_CATEGORY_BY_SEARCH } from "../utils/queries";
import { useEffect, useState } from "react";
import { useDebounce } from "../utils/hooks/useDebounce.hook";
import { Category } from "../__generated__/graphql";

interface INavbarFrontProps {
    setOpenNav: React.Dispatch<React.SetStateAction<boolean>>;
}

function MenuFront({ setOpenNav }: INavbarFrontProps) {
    // Categories from API
    const { loading, error, data } = useQuery(GET_CATEGORIES);
    const [searchCategory, { data: filteredCategories }] = useLazyQuery(
        GET_CATEGORY_BY_SEARCH,
    );
    const [categories, setCategories] = useState<Partial<Category>[]>();
    const [categorySearchInput, setCategorySearchInput] = useState("");
    const debouncedSearchInput = useDebounce(categorySearchInput, 500);
    // Nous permets d'afficher la bonne liste de catégorie
    const [searchSuccess, setSearchSuccess] = useState(false);

    const areSearchResultFound = () => {
        return (
            filteredCategories?.getCategoriesBySearch &&
            filteredCategories?.getCategoriesBySearch.length > 0
        );
    };

    console.log(categories);

    useEffect(() => {
        // On vérifie que l'input de recherche retardé est bien supérieur à 1 caractère puis que le résultat de la recherche n'est pas vide
        // On set searchSuccess a true
        if (debouncedSearchInput.length > 1) {
            submitSearch().then(() =>
                areSearchResultFound() ? setSearchSuccess(true) : "",
            );
        } else if (debouncedSearchInput.length <= 1) {
            setSearchSuccess(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearchInput]);

    // ici on vérifie si une recherche de catégorie à été faites, si elles comportent des résultats
    // la liste des catégories correspond à ceux-ci sinon on affiche toute les catégories.
    useEffect(() => {
        setCategories(
            searchSuccess
                ? filteredCategories?.getCategoriesBySearch
                : data?.getCategories,
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchSuccess]);

    if (loading) return <p>Loading...</p>;

    if (error)
        return (
            <p>
                Erreur : Une erreur est survenue. La barre de navigation ne peut
                pas être affichée pour le moment.
            </p>
        );

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
                            to={"products/list/" + category.name?.toLowerCase()}
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
