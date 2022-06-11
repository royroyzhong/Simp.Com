import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import SellerNavigator from "../navigator/SellerNavigator";
import BuyerNavigator from "../navigator/BuyerNavigator";
import CustomerPageRigheContent from "../customerPageComponent/CustomerPageRightContent";
import ProductBoard from "../sellerDashboard/ProductCompactView";
import Dashboard from "../sellerDashboard/Dashboard";

let theme = createTheme({});
theme = {
  ...theme,
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          // background: "linear-gradient(125deg, rgba(171,214,153,1) 0%, rgba(117,201,183,1) 100%)",
          // background: "linear-gradient(250deg, rgba(230,222,173,1) 0%, rgba(198,208,194,1) 9%, rgba(98,156,142,1) 32%, rgba(41,96,82,1) 56%, rgba(24,40,31,1) 86%)"
          background: "linear-gradient(316deg, #310e68 0%, #5f0f40 74%)",
          // Nav-bar background
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            color: "#ffffff",
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: 14,
          fontWeight: theme.typography.fontWeightMedium,
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: "inherit",
          minWidth: "auto",
          marginRight: theme.spacing(2),
          "& svg": {
            fontSize: 20,
          },
        },
      },
    },
  },
};

const drawerWidth = 256;

export default function Paperbase(props) {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", minHeight: "200vh" }}>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          {props.role === "seller" && (
            <SellerNavigator
              PaperProps={{ style: { width: drawerWidth } }}
              sx={{ display: { sm: "block", xs: "none" } }}
            />
          )}
          {props.role === "buyer" && (
            <BuyerNavigator
              PaperProps={{ style: { width: drawerWidth } }}
              sx={{ display: { sm: "block", xs: "none" } }}
            />
          )}
        </Box>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            bgcolor: "#F7F8FC",  // wrapper for right
          }}
        >
          {props.children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
