import { useSelector } from "react-redux";
import ProductInOrderView from './ProductInOrderView';
import AddTaskIcon from '@mui/icons-material/AddTask';

function handleOnclick() {

}

const Unprocess = (props) => {
    let productsPerUnprocessed = Object.values(props)[0].Products

    const renderedProducts = productsPerUnprocessed?.map((tempProduct, index) => {
        return <ProductInOrderView key={index}  productsPerUnprocessed = {tempProduct} />
    })

    return (
        <div className="unprocess">
            <h4>OrderNumber: {Object.values(props)[0].Order_Number}</h4>      
            {renderedProducts}
            <button className="Btn" onClick={handleOnclick} id="actionIcon"> <AddTaskIcon></AddTaskIcon></button> 
        </div>
    )
}

export default Unprocess