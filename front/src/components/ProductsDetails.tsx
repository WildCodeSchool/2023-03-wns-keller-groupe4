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
            <h1 className="text-3xl font-bold">{name} ({reference})</h1>
            <p>{description}</p>
            <h4>{price}€ - Quantity : {quantity}</h4>
        </article>
    );
};
  export default Product;