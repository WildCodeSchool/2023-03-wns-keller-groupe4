import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const GET_CATEGORIES = gql(`
  query GetCategories {
    getCategories {
      id
      name
    }
  }
`);

function MenuFront() {

  // Categories from API
  const { loading, error, data } = useQuery(GET_CATEGORIES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  var categories = data.getCategories;

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
            <Link to={"products/list/all"} className="bg-orange-600 hover:bg-orange-700 text-white block rounded-md px-3 py-2 mx-2 text-base font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="inline w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
              </svg>
              <span className="inline-block px-2">Tous</span>
            </Link>
            <Link to={"products/list/TEST"} className="bg-orange-600 hover:bg-orange-700 text-white block rounded-md px-3 py-2 mx-2 text-base font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="inline w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
              </svg>
              <span className="inline-block px-2">TEST</span>
            </Link>
            {categories.map((category:any) => (
              <Link to={"products/list/"+category.name.toLowerCase()} className="bg-orange-600 hover:bg-orange-700 text-white block rounded-md px-3 py-2 mx-2 text-base font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="inline w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276-3.276a4.5 4.5 0 00-6.336 4.486c.048.58.024 1.193-.14 1.743" />
                </svg>
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
