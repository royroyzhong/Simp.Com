// MUI Components
import { Avatar, TextField } from "@mui/material";
import { Box } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import * as React from "react";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import Logout from "@mui/icons-material/Logout";
import { quinn } from "../../utils/mockFetch"; // mock user
import quinnAvatar from "../../assets/avatar.jpg"; // mock avatar
import IconButton from "@mui/material/IconButton";
import PeopleIcon from "@mui/icons-material/People";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";

const drawerWidth = 240;

const PaperCssStyle = {
  elevation: 0,
  sx: {
    overflow: "visible",
    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
    mt: 1.5,
    "& .MuiAvatar-root": {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    "&:before": {
      content: '""',
      display: "block",
      position: "absolute",
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: "background.paper",
      transform: "translateY(-50%) rotate(45deg)",
      zIndex: 0,
    },
  },
};

// Header style
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  background: "#ffffff",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function Header(prop) {
  let navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    sessionStorage.clear();
    navigate("/login");
  };
  return (
    <AppBar position="absolute" open={prop.open}>
      <Toolbar
        sx={{
          pr: "24px", // keep right padding when drawer closed
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={() => prop.childToParent(!prop.open)}
          sx={{
            marginRight: "36px",
            ...(prop.open && { display: "none" }),
            color: "black",
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="black"
          noWrap
          textAlign="left"
          sx={{ flexGrow: 1 }}
        >
          Hello, {quinn.name}
        </Typography>
        <Box>
          <SearchIcon sx={{ fontSize: 40, color: "black" }}></SearchIcon>
          <TextField variant="outlined" label="Search" size="small"></TextField>
        </Box>
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar alt="Remy Sharp" src={quinnAvatar} />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={PaperCssStyle}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={() => navigate("/userX/profile")}>
            <ListItemIcon>
              <PeopleIcon fontSize="small" />
            </ListItemIcon>
            Profile
          </MenuItem>
          <MenuItem onClick={() => navigate("/")}>
            <ListItemIcon>
              <SwitchAccountIcon fontSize="small" />
            </ListItemIcon>
            Switch to Customer
          </MenuItem>
          <MenuItem onClick={() => navigate("/sellerX/dashboard")}>
            <ListItemIcon>
              <SwitchAccountIcon fontSize="small" />
            </ListItemIcon>
            Switch to Seller
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogOut}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
