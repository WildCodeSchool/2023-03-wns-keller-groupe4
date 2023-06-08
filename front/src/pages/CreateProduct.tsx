import { useForm } from "react-hook-form";

// INTERFACES
interface IFormCreateProduct {
  name: string;
  description: string;
  price: number;
  category: string;
  image: FileList;
}

function CreateProduct() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormCreateProduct>();

  const createProduct = async (data: IFormCreateProduct) => {
    console.log(data);
  };

  return (
    <div className="w-4/5 m-auto my-4 sm:w-3/5 md:w-2/5">
      <h1 className="text-2xl my-4 text-center">Créer une fiche produit</h1>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(createProduct)}
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
            className="w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-main focus:border-transparent"
            {...register("category", { required: true })}
          >
            <option value="1">Pelle</option>
            <option value="2">Bétonnière</option>
            <option value="3">Perforateur</option>
            <option value="4">Scie</option>
            <option value="5">Echafaudage</option>
            <option value="6">Echelle</option>
            <option value="7">Compresseur</option>
            <option value="8">Groupe électrogène</option>
            <option value="9">Tronçonneuse</option>
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
