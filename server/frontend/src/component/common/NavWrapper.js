import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import {
  createTheme,
  styled,
  ThemeProvider,
  useTheme,
} from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as React from "react";
import BuyerNavigationList from "../navigator/BuyerNavigationList";
import SellerNavigationList from "../navigator/SellerNavigationList";
import Header from "./Header";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    background: "linear-gradient(316deg, #310e68 0%, #5f0f40 74%)",
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

export default function NavWrapper(props) {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = (childdata) => {
    setOpen(childdata);
  };
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  if (matches) {
    if (open !== false) {
      setOpen(false);
    }
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Header role={props.role} open={open} childToParent={toggleDrawer} />

        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <Typography
              component="h2"
              variant="h6"
              color="white"
              textAlign="left"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Simp.com
            </Typography>
            {!matches && (
              <IconButton
                onClick={() => {
                  setOpen(!open);
                }}
                sx={{ color: "#ffffff" }}
              >
                <ChevronLeftIcon />
              </IconButton>
            )}
          </Toolbar>
          <Divider />
          {props.role === "seller" && <SellerNavigationList />}
          {props.role === "buyer" && <BuyerNavigationList />}
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: "#F7F8FC",
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          {props.children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
