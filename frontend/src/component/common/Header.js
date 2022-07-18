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
import { useDispatch } from "react-redux";
import { logoutAsync } from "../../controller/login/thunks";
import ChatIcon from "@mui/icons-material/Chat";
import PersonIcon from "@mui/icons-material/Person";
import CircularProgress from "@mui/material/CircularProgress";
import Autocomplete from "@mui/material/Autocomplete";
import { getUserAsync } from "../../controller/login/thunks";
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
function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}
export default function Header(prop) {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [openChat, setOpenChat] = React.useState(false);
  const [chatTarget, setChatTarget] = React.useState({});
  const [options, setOptions] = React.useState([]);
  const loading = openChat && options.length === 0;
  const [userInfo, setUserInfo] = React.useState(null);
  const [sellers, setSellers] = React.useState(null);
  React.useEffect(() => {
    dispatch(getUserAsync()).then((result, err) => {
      if (err) {
        console.log(err);
      } else {
        let user = result.payload.data;
        setUserInfo(user);
      }
    });
    getSellerData().then((result, err) => {
      setSellers(result.data);
    });
  }, []);

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3); // For demo purposes.

      if (active) {
        setOptions([...sellers]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!openChat) {
      setOptions([]);
    }
  }, [openChat]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    dispatch(logoutAsync());
    navigate("/login");
  };
  const handleDisplay = (option) => {
    return (
      "Name: " +
      option.firstName +
      " " +
      option.lastName +
      ", Company: " +
      option.company +
      ", Status: " +
      (option.onlineStatus === true ? "online" : "offline")
    );
  };
  const handleTarget = () => {};

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
          Hello,
          {userInfo == null
            ? " Guest"
            : " " + userInfo.firstName + " " + userInfo.lastName}
        </Typography>

        <Box>
          <Autocomplete
            onKeyDown={(event, value) => {
              if (event.key === "Enter") {
                // your handler code
                // console.log(chatTarget);
                // console.log(chatTarget);
                // console.log(event);
              }
            }}
            id="asynchronous-demo"
            sx={{ width: 300 }}
            onChange={(event, value) => {
              return console.log(value);
            }}
            open={openChat}
            onOpen={() => {
              setOpenChat(true);
            }}
            onClose={() => {
              setOpenChat(false);
            }}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            getOptionLabel={handleDisplay}
            options={options}
            loading={loading}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search to Chat"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
          />
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
const sellerList = [
  { name: "A", company: "B" },
  { name: "A1", company: "B1" },
  { name: "A2", company: "B2" },
  { name: "A3", company: "B3" },
  { name: "A4", company: "B4" },
  { name: "A5", company: "B5" },
  { name: "AA", company: "BB" },
  { name: "AA1", company: "BB1" },
  { name: "AA2", company: "BB2" },
  { name: "AA3", company: "BB3" },
  { name: "AA4", company: "BB4" },
  { name: "AA5", company: "BB5" },
];
async function getSellerData() {
  let response, data;
  try {
    response = await fetch("http://localhost:8888/user/sellers", {
      method: "GET",
      credentials: "include",
      body: JSON.stringify(),
    });

    data = await response.json();
    if (!response.ok) {
      return response.status;
    }

    return { data, statusCode: response.status };
  } catch (err) {
    return { status: response.status, error: data.errors };
  }
}
