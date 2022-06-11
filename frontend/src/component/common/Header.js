// MUI Components
import { Avatar, Grid, TextField } from "@mui/material";
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
  return (
    <Grid container spacing={3}>
      <Grid item xs>
        <Box>
          <p>Hello {quinn.name}</p>
        </Box>
      </Grid>
      <Grid item xs={"auto"}>
        {prop.display == null && <SearchBar />}
      </Grid>
      <Grid item xs={"auto"}>
        <Box>
          <h4>{quinn.name}</h4>
        </Box>
      </Grid>
      <Grid item xs={"auto"}>
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
          <MenuItem onClick={() => navigate("/login")}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Grid>
    </Grid>
  );
}

function SearchBar(props) {
  return (
    <Box>
      <SearchIcon sx={{ fontSize: 40, color: "grey" }}></SearchIcon>
      <TextField variant="outlined" label="Search" size="small"></TextField>
    </Box>
  );
}