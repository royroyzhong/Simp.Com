import { useSelector } from "react-redux";
import ProductInOrderView from './ProductInOrderView';

const InShipment = (props) => {
    let productsPerInShipment = Object.values(props)[0].Products

    const renderedProducts = productsPerInShipment?.map((tempProduct, index) => {
        return <ProductInOrderView key={index}  productsPerUnprocessed = {tempProduct} />
    })

    return (
        <div className="inShipment">
            <h4>OrderNumber: {Object.values(props)[0].Order_Number}</h4>      
            <span> {renderedProducts} </span>
        </div>
    )
}

export default InShipment