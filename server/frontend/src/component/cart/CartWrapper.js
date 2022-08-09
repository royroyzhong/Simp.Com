import Cart from "./Cart";
import { Button } from "@mantine/core"


export default function CartWrapper () {
    const [page, setPage] = useState(0);

    const handleNext = () => {
        if (page === 3) {
            setPage(0);
        } else {
        setPage(page + 1);
        }
    }

    const handleBack = () => {
        setPage(page - 1);
    }

    const conditionalComponent = () => {
        switch(page) {
            case 0: 
            return <Cart> </Cart>
            case 1: 
            case 2:
            case 3:
            default: <Cart> </Cart>
        }
    }

    return (
        <Box> 
            {conditionalComponent()}
            <Button onClick={handleNext}> 
            {page === 0 || page === 3 ? "Next" : "Back to Cart"}
            </Button>
            {
                page > 0 && 
                <Button onClick={handleBack}> Back</Button>
            }
            
        </Box>
    )
}