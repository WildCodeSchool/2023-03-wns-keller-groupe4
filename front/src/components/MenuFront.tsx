import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from '../utils/queries';

interface INavbarFrontProps {
  openNav: boolean;
  setOpenNav: React.Dispatch<React.SetStateAction<boolean>>;
}

function MenuFront({ openNav, setOpenNav }: INavbarFrontProps) {

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

      <nav className="overflow-x-hidden">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-3 gap-x-2 sm:gap-2 pt-3 pb-2 text-center">
          <Link to={"products/list/all"} key="0" className="bg-orange-600 hover:bg-orange-700 text-white block rounded-md px-3 py-2 mx-2 text-base font-medium"
            onClick={() => setOpenNav(false)}
          >
            <div className="flex items-center h-full px-2"><div className="w-full">Tous</div></div>
          </Link>
          {categories.map((category:any) => (
            <Link to={"products/list/"+category.name.toLowerCase()} key={category.id} className="bg-orange-600 hover:bg-orange-700 text-white block rounded-md px-3 py-2 mx-2 text-base font-medium"
              onClick={() => setOpenNav(false)}
            >
              <div className="flex items-center h-full px-2"><div className="w-full">{category.name}</div></div>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}

export default MenuFront;
