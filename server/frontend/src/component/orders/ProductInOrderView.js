export default function ProductInOrderView(props) {
  return (
    <div className="productInOrderView">
      <p>
        Product ID: {Object.values(props)[0]._id} Product Name:{" "}
        {Object.values(props)[0].productName}{" "}
      </p>
    </div>
  );
}
