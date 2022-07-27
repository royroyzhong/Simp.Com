

export default function ProductInOrderView(props) {
    console.log(props)
    return (
        <div className="productInOrderView">
            <p> Product ID: {Object.values(props)[0].id} Product Name: {Object.values(props)[0].productName} </p> 
        </div>
    )
}