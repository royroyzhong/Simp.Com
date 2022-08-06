// MUI Components
import { Grid } from "@mui/material";
import { Container } from "@mui/system";

// Other Imports
import { useDispatch, useSelector } from "react-redux";
import Product from "./Product";
import "../../css/dashboard.css";
import {
  getDisplayProductList,
  getProducts,
} from "../../controller/buyerSlice";
import { useEffect } from "react";

export default function CustomerPageRightContent() {
  let products = useSelector(getDisplayProductList);
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
      <Grid container spacing={{ xs: 2 }} columns={{ xs: 2, md: 2, lg: 16 }}>
        {products.map((item, index) => (
          <Grid item xs={16} sm={8} md={4} lg={4} key={index}>
            <Product title={index} data={item} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
