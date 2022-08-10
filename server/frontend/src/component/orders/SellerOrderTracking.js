import {
  getSellerOrderDetail,
  getSellerOrderStatus
} from "../../controller/sellerSlice";
import { REQUEST_STATE } from "../../controller/utils";

// MUI Components
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { confirm } from "react-confirm-box";
import { useDispatch, useSelector } from "react-redux";
import "../../css/orderTracking.css";
import { changeStatusAsync, getSellerOrderAsync } from "../orders/orderThunks";

// Reference: https://mui.com/material-ui/react-alert/
// https://mui.com/material-ui/react-snackbar/

function SellerOrderTracking(props) {
  const [finalClickInfo, setFinalClickInfo] = useState(null);
  let orders = useSelector(getSellerOrderDetail);
  let getOrderStatus = useSelector(getSellerOrderStatus);
  const dispatch = useDispatch();

  const options = {
    labels: {
      confirmable: "Confirm",
      cancellable: "Cancel",
    },
  };

  const renderPopUp = async (options, params, text, type) => {
    const result = await confirm(text, options);
    if (result) {
      if (type === "send") {
        dispatch(changeStatusAsync({ id: params.id, type }));
      } else {
        dispatch(changeStatusAsync({ id: params.id, type }));
      }
      return;
    }
  };

  useEffect(() => {
    if (getOrderStatus !== REQUEST_STATE.FULFILLED) {
      dispatch(getSellerOrderAsync());
    }
  }, [dispatch, getOrderStatus]);

  const columnsForUnprocessed = [
    { field: "orderNumber", headerName: "Order Number", width: 130, flex: 1 },
    {
      field: "products",
      headerName: "Products",
      width: 450,
      flex: 3,
      renderCell: (products) => (
        <ul style={{ textAlign: "left" }}>
          {products.value.map((product, index) => (
            <li key={index} style={{ textAlign: "left" }}>
              Name: {product.name}, Price: {product.price}
            </li>
          ))}
        </ul>
      ),
    },
    { field: "status", headerName: "Status", width: 130, flex: 1 },
    {
      field: "actions",
      type: "actions",
      headerName: "Action",
      width: 80,
      flex: 1,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<SendIcon color="primary" />}
          label="Send"
          onClick={handleProcessedSingleOrder(params)}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon sx={{ color: "#d32f2f" }} />}
          label="Delete"
          onClick={handleRemoveSingleOrder(params)}
        />,
      ],
    },
  ];

  const columns = [
    { field: "orderNumber", headerName: "Order Number", width: 130, flex: 1 },
    {
      field: "products",
      headerName: "Products",
      width: 450,
      flex: 3,
      renderCell: (products) => (
        <ul style={{ textAlign: "left" }}>
          {products.value.map((product, index) => (
            <li key={index} style={{ textAlign: "left" }}>
              Name: {product.name}, Price: {product.price}
            </li>
          ))}
        </ul>
      ),
    },
    { field: "status", headerName: "Status", width: 130, flex: 1 },
  ];
  const handleRemoveSingleOrder = (params) => () => {
    setFinalClickInfo(params._id);
    renderPopUp(
      options,
      params,
      "Are you sure to remove from order?",
      "remove"
    );
  };
  const handleProcessedSingleOrder = (params) => () => {
    setFinalClickInfo(params._id);
    renderPopUp(options, params, "Are you sure to send?", "send");
  };
  return (
    <Container maxWidth="xl" className="dashboard" sx={{ bgcolor: "#F7F8FC" }}>
      <Grid
        container
        rowSpacing={5}
        sx={{ marginLeft: "8vw", marginTop: "2vw" }}
        className="orderTrackingContent"
      >
        <Grid item xs={10} className="orderTrackingHeader">
          Unprocessed Orders
        </Grid>
        <Grid item xs={10} style={{ height: 400 }}>
          <DataGrid
            rows={Object.keys(orders).length === 0 ? [] : orders.Unprocessed}
            getRowId={(order) => order.orderNumber}
            columns={columnsForUnprocessed}
            pageSize={5}
            getRowHeight={() => "auto"}
            rowsPerPageOptions={[5]}
            sx={{ m: 1 }}
            components={{ Toolbar: GridToolbar }}
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            componentsProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
          />
        </Grid>

        <Grid item xs={10} className="orderTrackingHeader">
          {" "}
          In Shipment Orders
        </Grid>
        <Grid item xs={10} style={{ height: 400 }}>
          <DataGrid
            rows={Object.keys(orders).length === 0 ? [] : orders.Shipped}
            getRowId={(order) => order.orderNumber}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            getRowHeight={() => "auto"}
            components={{ Toolbar: GridToolbar }}
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            componentsProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
          />
        </Grid>

        <Grid item xs={10} className="orderTrackingHeader">
          {" "}
          Delivered Orders
        </Grid>
        <Grid item xs={10} style={{ height: 400 }}>
          <DataGrid
            rows={Object.keys(orders).length === 0 ? [] : orders.Delivered}
            getRowId={(order) => order.orderNumber}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            getRowHeight={() => "auto"}
            components={{ Toolbar: GridToolbar }}
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            componentsProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
          />
        </Grid>
        <Grid item xs={10} className="orderTrackingHeader">
          Refunded Orders
        </Grid>
        <Grid item xs={10} style={{ height: 400 }}>
          <DataGrid
            rows={Object.keys(orders).length === 0 ? [] : orders.Refunded}
            getRowId={(order) => order.orderNumber}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            getRowHeight={() => "auto"}
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            components={{ Toolbar: GridToolbar }}
            componentsProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default SellerOrderTracking;
