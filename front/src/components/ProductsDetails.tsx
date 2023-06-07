export interface IProductProps {
    id: number;
    name: string;
    reference: string;
    description: string;
    quantity: number;
    price: number;
}

const Product = ({ id, name, reference, description, quantity, price }: IProductProps) => {
    return (
        <article className="card">
            <span>product id: {id}</span>
            <img src="" alt="" />
            <h3>{name} ({reference})</h3>
            <p>{description}</p>
            <h4>{price}€ - Quantity : {quantity}</h4>
        </article>
    );
};
  export default Product;