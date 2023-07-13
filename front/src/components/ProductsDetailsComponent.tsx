import {useState} from "react";
import defaultImage from "./../assets/products/default.jpg";
import {useMutation, useQuery} from "@apollo/client";
import {gql} from "@apollo/client";
import {GET_ONE_PRODUCT} from "../pages/Front-Office/ProductsDetailsPage";
// import {gql} from "../__generated__";

export interface IProductProps {
	id: string;
	name: string;
	description: string;
	price: number;
	stock: number;
	picture: string;
	available: boolean;
	isAdmin: boolean;
}

// INTERFACES
interface IFormUpdateProduct {
	name?: string;
	description?: string;
	price?: number;
	category?: string;
	image?: FileList;
	stock?: number;
	available?: boolean;
}

const UPDATE_PRODUCT = gql(`
mutation Mutation($updateProductInput: UpdateProductInput!, $updateProductId: String!) {
	updateProduct(updateProductInput: $updateProductInput, id: $updateProductId) {
	  name
	}
  }
`);

// This component is Used both for front and back office. For a non admin user it will just display product detail, for an admin it will give the user the possibility to update the product.

const ProductsDetailsComponent = ({
	id,
	name,
	description,
	price,
	stock,
	picture,
	available,
	isAdmin,
}: IProductProps) => {
	// We passed the props isAdmin to the component so that it knows if he has to show product detail in front office or back office mode, in this case this is set to true in the parent component

	// TODO : generate type

	// this state controls input and is used as data for the update mutation
	const [updateProductInput, setUpdateProductInput] = useState({
		name: name,
		description: description,
		price: price,
		picture: picture,
		stock: stock,
		available: available,
	});

	// This state controls if we are in dupdate mode or not wich will trigger showing the update form or not
	const [updateToggle, setUpdateToogle] = useState(false);
	const [updateProduct] = useMutation(UPDATE_PRODUCT, {
		refetchQueries: [GET_ONE_PRODUCT],
	});

	const submitUpdateProduct = async (id: string, data: IFormUpdateProduct) => {
		try {
			await updateProduct({
				variables: {updateProductId: id, updateProductInput: data},
			});
			togglingUpdate();
		} catch (error) {
			console.log(error);
		}
	};

	const togglingUpdate = () => {
		setUpdateToogle(!updateToggle);
	};

	// When we choose if a product is available or not the select returns a string but we need a boolean to send to our back end. This fonction translates the str to a boolean
	const strToBoolean = (str: string) => {
		if (str === "true") {
			return true;
		} else {
			return false;
		}
	};

	// Description
	description = description !== "" ? description : "No description available";

	// Availability
	const availability = available ? " Available" : " Unavailable";
	const buttonState = available ? false : true;

	return (
		<section className="text-gray-700 body-font overflow-hidden bg-white">
			<div className="container px-5 py-12 mx-auto sm:py-20">
				<div className="lg:w-5/6 mx-auto flex flex-wrap">
					<img
						alt="ecommerce"
						className="sm:w-1/2 lg:w-1/3 w-full object-cover object-center rounded border border-gray-200"
						src={defaultImage}
					/>
					<div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 text-center md:text-left">
						{/* Brand */}
						<div
							className="inline-block bg-red-100 border border-red-400 text-red-700 px-2 my-3 rounded relative"
							role="alert"
						>
							<h2 className="text-sm title-font text-gray-500 tracking-widest">
								BRAND NAME
							</h2>
						</div>
						{/* Name */}
						{updateToggle ? (
							<div className=" flex-col text-center justify-center">
								<label htmlFor="productNameInput">Nom du produit : </label>
								<input
									className="text-gray-900 text-3xl title-font font-medium mb-1 px-2 py-1  border block mx-auto my-auto text-center"
									type="text"
									id="name"
									value={updateProductInput.name}
									onChange={(e) =>
										setUpdateProductInput({
											...updateProductInput,
											name: e.target.value,
										})
									}
								/>
							</div>
						) : (
							<h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
								{name}
							</h1>
						)}
						<div
							className="inline-block bg-red-100 border border-red-400 text-red-700 px-2 my-3 rounded relative"
							role="alert"
						>
							<div className="flex mb-4">
								{/* Rating */}
								<span className="flex items-center">
									<svg
										fill="currentColor"
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										className="w-4 h-4 text-red-500"
										viewBox="0 0 24 24"
									>
										<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
									</svg>
									<svg
										fill="currentColor"
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										className="w-4 h-4 text-red-500"
										viewBox="0 0 24 24"
									>
										<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
									</svg>
									<svg
										fill="currentColor"
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										className="w-4 h-4 text-red-500"
										viewBox="0 0 24 24"
									>
										<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
									</svg>
									<svg
										fill="currentColor"
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										className="w-4 h-4 text-red-500"
										viewBox="0 0 24 24"
									>
										<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
									</svg>
									<svg
										fill="none"
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										className="w-4 h-4 text-red-500"
										viewBox="0 0 24 24"
									>
										<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
									</svg>
									<span className="text-gray-600 ml-3">4 Reviews</span>
								</span>
								{/* Social Networks */}
								<span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
									<a
										href="#a"
										className="text-gray-500"
									>
										<svg
											fill="currentColor"
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											className="w-5 h-5"
											viewBox="0 0 24 24"
										>
											<path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
										</svg>
									</a>
									<a
										href="#b"
										className="ml-2 text-gray-500"
									>
										<svg
											fill="currentColor"
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											className="w-5 h-5"
											viewBox="0 0 24 24"
										>
											<path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
										</svg>
									</a>
									<a
										href="#c"
										className="ml-2 text-gray-500"
									>
										<svg
											fill="currentColor"
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											className="w-5 h-5"
											viewBox="0 0 24 24"
										>
											<path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
										</svg>
									</a>
								</span>
							</div>
						</div>
						{/* Description */}
						{updateToggle ? (
							<div className="text-center">
								<label htmlFor="description">Description : </label>
								<textarea
									className="text-gray-700 mb-2 block w-full border-gray-200 rounded border-b-2 pt-2 px-2"
									id="description"
									value={updateProductInput.description}
									onChange={(e) =>
										setUpdateProductInput({
											...updateProductInput,
											description: e.target.value,
										})
									}
								/>
							</div>
						) : (
							<p className="leading-relaxed">{description}</p>
						)}
						<div className="flex justify-around mt-2  pb-5 border-b-2 border-gray-200 mb-5">
							{/* Stocks and availability */}
							<div className="flex title-font text-gray-900 flex-col items-center ">
								<span className="font-medium px-2">Availability</span>
								{updateToggle ? (
									<select
										className="border"
										id="availabilitySelect"
										onChange={(e) =>
											setUpdateProductInput({
												...updateProductInput,
												available: strToBoolean(e.target.value),
											})
										}
									>
										<option value="true">Dispo</option>
										<option value="false">Non Dispo</option>
									</select>
								) : (
									availability
								)}
							</div>
							<div className="  flex title-font text-gray-900 flex-col items-center ">
								<span className=" title-font font-medium block md:inline px-2 ">
									Stock
								</span>
								{updateToggle ? (
									<input
										className=" block w-10 md:inline border text-center  "
										id="stock"
										type="number"
										value={updateProductInput.stock}
										onChange={(e) =>
											setUpdateProductInput({
												...updateProductInput,
												stock: parseInt(e.target.value),
											})
										}
									/>
								) : (
									<span className="block md:inline"> {stock} pieces</span>
								)}
							</div>
						</div>

						<div className="flex justify-around">
							{/* Price */}
							{updateToggle ? (
								<div className="flex flex-col text-center">
									<span className="title-font font-medium">Price</span>
									<input
										className=" w-16 block md:inline border-2 text-center "
										id="priceInput"
										type="number"
										value={updateProductInput.price}
										onChange={(e) =>
											setUpdateProductInput({
												...updateProductInput,
												price: parseInt(e.target.value),
											})
										}
									/>
								</div>
							) : (
								<span className="title-font font-medium text-3xl text-gray-900">
									{price} €
								</span>
							)}
							<div className="flex items-stretch">
								{updateToggle && (
									<button
										className=" text-white text-xs px-2 mx-1 my-1 sm:text-xs lg:text-lg bg-yellow-400  border-0  sm:px-3  md:px-4 lg:px-6 focus:outline-none hover:bg-main  active:bg-yellow-400 rounded  "
										onClick={() => submitUpdateProduct(id, updateProductInput)}
									>
										Envoyer
									</button>
								)}

								{isAdmin ? (
									<button
										className=" text-white text-xs px-2 mx-1 my-1 sm:text-xs lg:text-lg bg-red-500 border-0 py-2 sm:px-3 md:px-4 lg:px-6 focus:outline-none hover:bg-red-600 rounded"
										onClick={() => {
											togglingUpdate();
										}}
									>
										{updateToggle ? "annuler" : "Modifier"}
									</button>
								) : (
									<button
										className=" text-white text-xs px-2 mx-1 my-1 sm:text-xs lg:text-lg bg-red-500 border-0 py-2 sm:px-3 md:px-4 lg:px-6 focus:outline-none hover:bg-red-600 rounded"
										onClick={() => {
											alert("produit réservé ! ");
										}}
										disabled={buttonState}
									>
										Réservation
									</button>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ProductsDetailsComponent;
