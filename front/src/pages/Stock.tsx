import { useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { gql } from "../__generated__";

import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { VscBlank } from "react-icons/vsc";

// QUERIES
const GET_PRODUCTS = gql(`
  query Query {
    getProducts {
      id
      name
      stock
      available
    }
}`);

const GET_PRODUCT_BY_NAME = gql(`
  query GetProductsByName($name: String!) {
    getProductsByName(name: $name) {
      id
      name
      stock
      available
    }
  }
`) 

// COMPONENT
const Stock = () => {
  const { data, loading } = useQuery(GET_PRODUCTS);
  const [getProductsByName, { data: dataByName }] = useLazyQuery(GET_PRODUCT_BY_NAME);

  const { register, handleSubmit } = useForm();

  const [sortColumn, setSortColumn] = useState("product");
  const [sortDirection, setSortDirection] = useState("desc");

  if (loading) return <p>Loading...</p>;
  if (data?.getProducts === undefined || data.getProducts.length === 0) return <p>Aucun produit</p>;

  const sortProducts = (products: typeof data.getProducts, sortColumn: string, sortOrder: string ) => {
    return [...products].sort((a, b) => {
      if (sortColumn === "product") {
        if (sortOrder === "desc") {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      } else if (sortColumn === "quantity") {
        if (a.stock === b.stock) {
          return a.name.localeCompare(b.name);
        }
        if (sortOrder === "asc") {
          return a.stock - b.stock;
        } else {
          return b.stock - a.stock;
        }
      }
      return 0;
    });
  };

  const getSortIndicator = (column: string) => {
    if (column === sortColumn) {
      return sortDirection === "asc" ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />;
    } else {
      return <VscBlank />;
    }
  };

  const handleProductSort = () => {
    setSortColumn("product");
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  const handleQuantitySort = () => {
    setSortColumn("quantity");
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  const searchProducts = (data: any) => {
    getProductsByName({ variables: { name: data.search } });
  }

  const sortedProducts = sortProducts(dataByName ? dataByName.getProductsByName : data?.getProducts, sortColumn, sortDirection);

  return (
    <div>
      <h1 className="text-2xl text-center my-6 sm:my-8">Stock</h1>

      {/* Search Bar */}
      <form onSubmit={handleSubmit(searchProducts)} className="px-2 my-4 flex gap-4 justify-between sm:justify-center sm:p-0">
        <label htmlFor="search" className="sr-only">
          Rechercher un produit
        </label>
        <input
          id="search"
          type="text"
          placeholder="Rechercher un produit..."
          className="px-2 py-1 w-full rounded-lg bg-white text-left shadow-sm shadow-main focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-main sm:w-auto"
          {...register("search")}
        />
        <button
          type="submit"
          className="border border-main px-4 py-1 rounded-md active:bg-yellow-400"
        >
          <HiOutlineMagnifyingGlass />
        </button>
      </form>

      {/* Table */}
      <div className="overflow-scroll h-full text-sm sm:text-base">
        <table className="table-auto text-left max-w-screen-sm sm:mx-auto sm:w-4/5">
          <thead>
            <tr>
              <th className="border-b p-4">
                <button
                  onClick={handleProductSort}
                  className="opacity-50 flex items-center gap-2"
                >
                  Produit {getSortIndicator("product")}
                </button>
              </th>
              <th className="border-b p-4">
                <button
                  onClick={handleQuantitySort}
                  className="opacity-50 flex items-center gap-2"
                >
                  Quantité {getSortIndicator("quantity")}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts.map((product) => {
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
                  <td className="p-4">
                    <p className={color}>{product.stock}</p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Stock;
