import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import picture from "../../assets/picture.svg";
import { Marginer } from "../../css/CommonStyle";

export default function Product(props) {

    return (
        <Card variant="outlined">
             <CardActionArea>
                <CardContent>
                    <Marginer margin="40px" />
                    <CardMedia
                        image={picture}
                        height={100}
                        sx={{ objectFit: "contain" }}
                        component={"img"}
                    />
                    <Marginer margin="40px" />
                    <Typography gutterBottom variant="h5">
                        product name
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
    }