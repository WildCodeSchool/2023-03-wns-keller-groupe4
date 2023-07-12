import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import convertBase64 from "../utils/convertBase64";
import { gql } from "../__generated__";

// INTERFACES
interface IFormCreateProduct {
  name: string;
  description: string;
  price: string;
  category: string[];
  image: FileList;
}

// QUERIES & MUTATIONS
const GET_CATEGORIES = gql(`
  query GetCategories {
    getCategories {
      id
      name
    }
  }
`)

const CREATE_PRODUCT = gql(`
  mutation Mutation($createProductInput: CreateProductInput!) {
    createProduct(createProductInput: $createProductInput) {
      id
    }
  }
`)

// COMPONENT
const CreateProduct = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormCreateProduct>();

  const { data } = useQuery(GET_CATEGORIES);
  const [createProduct] = useMutation(CREATE_PRODUCT);

  const sortedCategories = data?.getCategories && Array.from(data.getCategories).sort((a, b) => a.name.localeCompare(b.name));

  const submitCreateProduct = async (data: IFormCreateProduct) => {
    const imgBase64 = await convertBase64(data.image[0]);

    const createProductInput = {
      name: data.name,
      description: data.description,
      price: parseInt(data.price),
      category: [data.category],
      picture: imgBase64,
      stock: 0,
      available: false,
    };

    const newProduct = await createProduct({ variables: { createProductInput } });

    if (newProduct.data) {
      navigate(`/admin/stock/${newProduct.data.createProduct.id}`);
    }
    // TODO: handle error (toast ?)
  };

  return (
    <div className="w-4/5 m-auto my-4 sm:w-3/5 md:w-2/5">
      <h1 className="text-2xl my-4 text-center">Créer une fiche produit</h1>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(submitCreateProduct)}
      >
        {/* Name */}
        <div>
          <label htmlFor="name">Nom du produit</label>
          <input
            type="text"
            id="name"
            className="w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-main focus:border-transparent"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <p className="text-sm text-red-400 text-right">
              Ce champ est requis
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description">Description du produit</label>
          <textarea
            id="description"
            className="w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-main focus:border-transparent"
            {...register("description", { required: true })}
          />
          {errors.description && (
            <p className="text-sm text-red-400 text-right">
              Ce champ est requis
            </p>
          )}
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price">Prix du produit par jour</label>
          <input
            type="number"
            id="price"
            className="w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-main focus:border-transparent"
            {...register("price", { required: true })}
          />
          {errors.price && (
            <p className="text-sm text-red-400 text-right">
              Ce champ est requis
            </p>
          )}
        </div>

        {/* Image */}
        <div>
          <label htmlFor="image">Image du produit</label>
          <input
            type="file"
            id="image"
            className="w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-main focus:border-transparent"
            {...register("image", { required: true })}
          />
          {errors.image && (
            <p className="text-sm text-red-400 text-right">
              Ce champ est requis
            </p>
          )}
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category">Catégorie du produit</label>

          <select
            id="category"
            defaultValue={""}
            className="w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-main focus:border-transparent"
            {...register("category", { required: true })}
          >
            <option value="" disabled >Choisir une catégorie</option>
            {sortedCategories?.map((category) => (
              <option value={category.id} key={category.id}>{category.name}</option>
            ))}
          </select>
          {errors.category && (
            <p className="text-sm text-red-400 text-right">
              Ce champ est requis
            </p>
          )}
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            className="border border-main px-4 py-1 rounded-md active:bg-yellow-400"
          >
            Créer le produit
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateProduct;
