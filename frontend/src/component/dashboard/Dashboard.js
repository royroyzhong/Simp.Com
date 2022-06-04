import { Card } from "@mui/material";
import { Box, Container} from "@mui/system";
import { Grid } from "@mui/material";

export default function Dashboard(props) {

    return (
        <Container maxWidth="bg">
            <OrderStatus></OrderStatus>
        </Container>
    )
}

function OrderStatus(props) {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid spacing={{xs:2}} container columns={{ xs: 4, md: 4, bg: 12 }}>
                {Array.from(Array(4)).map((_, index) => (
                <Grid item xs={4} md={2} bg={3} key={index}>
                    <Card>
                        hello world
                    </Card>    
                </Grid>
                ))}
            </Grid>
        </Box>
    )
}