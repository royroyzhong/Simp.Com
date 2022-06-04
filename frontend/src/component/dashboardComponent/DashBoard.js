import { Container } from "@mui/system";
import { Box } from "@mui/system";
import Grid from '@mui/material/Grid';
import { Card } from "@mui/material";

function OrderStatusLine(props) {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 4, md: 12 }}>
                {Array.from(Array(4)).map((_, index) => (
                <Grid item xs={4} sm={2} md={3} key={index}>
                    <Card>
                        <p>hello world</p>
                    </Card>
                </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default function DashBoard(props) {

    return (
        <Container maxWidth="bg">
            <OrderStatusLine />
        </Container>
    )
}