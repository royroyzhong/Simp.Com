import { Card } from "@mui/material";

export default function Products(props) {

    return (
        <Card variant="outlined">
            <div className="card-wrapper">
                <p className="card-display" >{props.data.title}</p>
            </div>
        </Card>
    )
    }