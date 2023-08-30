import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { Link } from "react-router-dom";

import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { VscBlank } from "react-icons/vsc";
import { GET_PRODUCTS, GET_PRODUCT_COUNT } from "../../utils/queries";

const LIMIT = 10;

// COMPONENT
const Stock = () => {
  const [getLazyProductCount, { data: productCount }] = useLazyQuery(GET_PRODUCT_COUNT);
  const [getLazyProducts, { data: lazyData }] = useLazyQuery(GET_PRODUCTS);

  const [search, setSearch] = useState("");
  const [orderBy, setOrderBy] = useState("name");
  const [orderDirection, setOrderDirection] = useState("ASC");
  const [currentPage, setCurrentPage] = useState(1);

  const pageCount = productCount && Math.ceil(productCount.getProductsCount / LIMIT);
  const offset = (currentPage - 1) * LIMIT;
  const pageNumbers = [];
  if (pageCount) {
    for (let i = 1; i <= pageCount; i++) {
      pageNumbers.push(i);
    }
  }

  const getSortIndicator = (column: string) => {
    if (column === orderBy) {
      if (column === "stock") {
        return orderDirection === "DESC" ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />;
      }
      return orderDirection === "DESC" ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />;
    } else {
      return <VscBlank />;
    }
  };

  const handleProductSort = () => {
    setOrderBy("name");
    setOrderDirection(orderDirection === "ASC" ? "DESC" : "ASC");
  };

  const handleQuantitySort = () => {
    setOrderBy("stock");
    setOrderDirection(orderDirection === "ASC" ? "DESC" : "ASC");
  };

  const searchProducts = (e: any) => {
    e.preventDefault();
    setCurrentPage(1);
    getLazyProductCount({ variables: { name: search } });
    getLazyProducts({ variables: { getProductsInput: {name: search, offset: 0, limit: LIMIT, orderBy, orderDirection} } });
  };

  useEffect(() => {
    getLazyProductCount({ variables: { name: search } });
    getLazyProducts({ variables: { getProductsInput: {name: search, offset, limit: LIMIT, orderBy, orderDirection} } });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  useEffect(() => {
    setCurrentPage(1);
    getLazyProductCount({ variables: { name: search } });
    getLazyProducts({ variables: { getProductsInput: {name: search, offset: 0, limit: LIMIT, orderBy, orderDirection} } });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderBy, orderDirection]);

  return (
    <div>
      <h1 className="text-2xl text-center my-6 sm:my-8">Stock</h1>

      {/* Search Bar */}
      <form onSubmit={searchProducts} className="px-2 my-4 flex gap-4 justify-between sm:justify-center sm:p-0">
        <label htmlFor="search" className="sr-only">
          Rechercher un produit
        </label>
        <input
          id="search"
          type="text"
          placeholder="Rechercher un produit..."
          className="px-2 py-1 w-full rounded-lg bg-white text-left shadow-sm shadow-main focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-main sm:w-auto"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type="submit"
          className="border border-main px-4 py-1 rounded-md active:bg-yellow-400"
        >
          <HiOutlineMagnifyingGlass />
        </button>
      </form>

      {/* Table */}
      <div className="h-full text-sm sm:text-base">
        <table className="table-fixed text-left max-w-screen-sm w-full mx-auto sm:w-4/5">
          <thead>
            <tr>
              <th className="border-b p-4 w-9/12">
                <button
                  onClick={handleProductSort}
                  className="opacity-50 flex items-center gap-2"
                >
                  Produit {getSortIndicator("name")}
                </button>
              </th>
              <th className="border-b p-4">
                <button
                  onClick={handleQuantitySort}
                  className="opacity-50 flex items-center gap-2"
                >
                  Quantité {getSortIndicator("stock")}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {lazyData?.getProducts.map((product) => {
              let color = "";
              if (product.stock <= 3) color = "text-yellow-500";
              if (product.stock > 3) color = "text-green-500";
              if (product.available === false) color = "text-red-500";
              return (
                <tr key={product.id} className="even:bg-gray-100">
                  <td className="p-4">
                    <Link to={`/admin/stock/${product.id}`} className="underline cursor-pointer">
                      {product.name}
                    </Link>
                  </td>
                  <td className="p-4 pl-10">
                    <p className={color}>{product.stock}</p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center py-10 lg:px-0 sm:px-6 px-4">
        <div className="lg:w-3/5 w-full  flex items-center justify-between border-t border-gray-200">
          {/* Previous Page */}
          <button 
            disabled={currentPage === 1} 
            onClick={() => setCurrentPage(currentPage - 1)} 
            className="flex items-center pt-3 text-gray-600 hover:text-main cursor-pointer"
          >
            <svg width={14} height={8} viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.1665 4H12.8332" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M1.1665 4L4.49984 7.33333" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M1.1665 4.00002L4.49984 0.666687" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="text-sm ml-3 font-medium leading-none ">Previous</p>
          </button>

          {/* Page Numbers */}
          <div className="sm:flex hidden">
            {pageNumbers.map((number) => (
                <p 
                  key={number} 
                  onClick={() => setCurrentPage(number)} 
                  className={`pt-3 mr-4 px-2 text-sm font-medium leading-none cursor-pointer border-t ${currentPage === number ? "text-main border-main" : "text-gray-600 border-transparent hover:border-main"}`}
                >
                  {number}
                </p>
            ))
            }
          </div>

          {/* Next Page */}
          <button 
            disabled={currentPage === pageCount} 
            onClick={() => setCurrentPage(currentPage + 1)} 
            className="flex items-center pt-3 text-gray-600 hover:text-main cursor-pointer"
          >
              <p className="text-sm font-medium leading-none mr-3">Next</p>
              <svg width={14} height={8} viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.1665 4H12.8332" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9.5 7.33333L12.8333 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9.5 0.666687L12.8333 4.00002" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Stock;
