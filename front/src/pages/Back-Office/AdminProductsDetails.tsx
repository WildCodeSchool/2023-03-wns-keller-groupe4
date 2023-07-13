import React from "react";
import {useParams} from "react-router-dom";
import {useQuery, gql} from "@apollo/client";
import Products from "../../components/ProductsDetailsComponent";
import {GET_ONE_PRODUCT} from "../Front-Office/ProductsDetailsPage";

const AdminProductsDetails = () => {
	const {productId} = useParams();
	console.log(productId);

	const {loading, error, data} = useQuery(GET_ONE_PRODUCT, {
		variables: {getProductId: productId},
	});
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error : {error.message}</p>;
	return (
		<div>
			<main className="container mx-auto">
				<section className="card-row mx-1">
					<Products
						key={data.getProduct.id}
						id={data.getProduct.id}
						name={data.getProduct.name}
						description={data.getProduct.description}
						stock={data.getProduct.stock}
						price={data.getProduct.price}
						picture={data.getProduct.picture}
						available={data.getProduct.available}
						isAdmin={true}
					/>
				</section>
			</main>
		</div>
	);
};

export default AdminProductsDetails;
