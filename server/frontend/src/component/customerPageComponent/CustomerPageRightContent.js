// MUI Components
import { Box, Grid, TextField } from "@mui/material";
import { Container } from "@mui/system";

// Other Imports
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDisplayProductList,
  getProducts
} from "../../controller/buyerSlice";
import "../../css/dashboard.css";
import Product from "./Product";

export default function CustomerPageRightContent() {
  let products = useSelector(getDisplayProductList);
  let [regex, setRegex] = useState('');
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <Container
      maxWidth={false}
      className="dashboard"
      sx={{ bgcolor: "#F7F8FC", mt: 4, md: 4 }}
    >
      <Box sx={{ textAlign: 'left', margin: 2}}>
        <TextField label="Search Product" value={regex} onChange={e => setRegex(e.target.value)} />
      </Box>
      
      <Grid container spacing={{ xs: 2 }} columns={{ xs: 2, md: 2, lg: 16 }}>
        {products
        .filter(product => product.name.toLowerCase().includes(regex.toLowerCase()))
        .map((item, index) => (
          <Grid item xs={16} sm={8} md={4} lg={4} key={index}>
            <Product title={index} data={item} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
