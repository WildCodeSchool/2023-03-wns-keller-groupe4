import React from "react";
import {useParams} from "react-router-dom";

const AdminProductsDetails = () => {
	const {productId} = useParams();
	console.log(productId);

	return <div>{productId}</div>;
};

export default AdminProductsDetails;
