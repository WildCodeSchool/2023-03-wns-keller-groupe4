import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import INavbarFrontProps  from "./NavbarFront";
import { GET_CATEGORIES } from '../utils/queries';

function MenuFront() {

  // Categories from API
  const { loading, error, data } = useQuery(GET_CATEGORIES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Erreur : Une erreur est survenue. La barre de navigation ne peut pas être affichée pour le moment.</p>;
  const categories = data.getCategories;

  return (
    <div>
      <label htmlFor="searchMenu" className="sr-only">
        Tous nos matériels
      </label>
      <input
        type="text"
        name="searchMenu"
        id="searchMenu"
        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-main focus:border-transparent"
        placeholder="Chercher un matériel"
      />

      <nav>
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-7 gap-y-2 gap-x-1 sm:gap-1 justify-between text-center pt-3 pb-2 overflow-hidden">
            <Link to={"products/list/all"} key="0" className="bg-orange-600 hover:bg-orange-700 text-white block rounded-md px-3 py-2 mx-2 text-base font-medium">
              <span className="inline-block px-2">Tous</span>
            </Link>
            {categories.map((category:any) => (
              <Link to={"products/list/"+category.name.toLowerCase()} key={category.id} className="bg-orange-600 hover:bg-orange-700 text-white block rounded-md px-3 py-2 mx-2 text-base font-medium"
                onClick={() => INavbarFrontProps.arguments.setOpenNav(false)}
              >
                <span className="inline-block px-2">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default MenuFront;
