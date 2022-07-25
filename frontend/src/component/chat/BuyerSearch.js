import React from "react";
import { Box } from "@mui/system";
import Paper from "@mui/material/Paper";
import Input from "@mui/material/Input";

import CircularProgress from "@mui/material/CircularProgress";
import Autocomplete from "@mui/material/Autocomplete";
import { Avatar, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("https://doge-commerce.herokuapp.com");
function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}
function BuyerSearch(prop) {
  const [openSearchChat, setOpenSearchChat] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [warming, setWarming] = React.useState(false);
  const [chatTarget, setChatTarget] = React.useState({});
  const [options, setOptions] = React.useState([]);
  const loading = openSearchChat && options.length === 0;

  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState([]);

  // const theme = useTheme();
  // const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleCloseWarming = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setWarming(false);
  };
  const handleClose = () => {
    setOpen(false);
    socket.emit("send_message", {
      room: chatTarget.email,
      user: prop.self.firstName,
      message: "Leave the Room",
    });
    socket.disconnect();
    setMessageReceived([]);
  };

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3);

      if (active) {
        setOptions([...prop.data]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!openSearchChat) {
      setOptions([]);
    }
  }, [openSearchChat]);
  const handleDisplay = (option) => {
    return (
      "Name: " +
      option.firstName +
      " " +
      option.lastName +
      ", Company: " +
      option.company +
      ", Status: " +
      (option.onlineStatus === true ? "Online" : "Offline")
    );
  };
  const handleChatTarget = (data) => {
    socket.connect();
    try {
      socket.emit("join_room", data.email);
      console.log(chatTarget.email);
      socket.emit("send_message", {
        room: data.email,
        user: prop.self.firstName,
        message: "Enter the Room",
      });
    } catch (err) {
      console.log(err);
    }
  };
  const handleSent = () => {
    if (message !== "") {
      socket.emit("send_message", {
        room: chatTarget.email,
        user: prop.self.firstName,
        message,
      });
      let tempEle = {
        user: prop.self.firstName,
        message: message,
      };
      setMessageReceived((oldArray) => [...oldArray, tempEle]);
    }
  };
  const handleAutoCompleteSubmit = (event, value) => {
    console.log(value);
    setWarming(false);
    if (value !== null) {
      if (value.onlineStatus) {
        console.log("OPEN 146");
        setChatTarget(value);
        handleChatTarget(value);
        handleClickOpen(value);
      } else {
        setWarming(true);
      }
    }
  };
  useEffect(() => {
    socket.on("receive_message", (data) => {
      let tempEle = {
        user: data.userName,
        message: data.message,
      };
      setMessageReceived((oldArray) => [...oldArray, tempEle]);
    });
  }, []);
  return (
    <Box>
      <Autocomplete
        id="asynchronous-demo"
        sx={{ width: 400 }}
        onChange={(event, value) => {
          handleAutoCompleteSubmit(event, value);
        }}
        open={openSearchChat}
        onOpen={() => {
          setOpenSearchChat(true);
        }}
        onClose={() => {
          setOpenSearchChat(false);
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
                    <CircularProgress color="inherit" size={30} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
      <Box>
        <Dialog
          // fullScreen={fullScreen}
          maxWidth="md"
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {chatTarget === null
              ? "None"
              : "Chat With " +
                chatTarget.firstName +
                " " +
                chatTarget.lastName}{" "}
          </DialogTitle>
          <DialogContent>
            {messageReceived.map((i) => {
              if (i.user === prop.self.firstName) {
                return (
                  <DialogContentText sx={{ textAlign: "left" }}>
                    {i.user} : {i.message}
                  </DialogContentText>
                );
              } else {
                return (
                  <DialogContentText sx={{ textAlign: "right" }}>
                    {i.user} : {i.message}
                  </DialogContentText>
                );
              }
            })}
          </DialogContent>
          <DialogActions>
            <TextField
              fullWidth
              variant="standard"
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />

            <Button autoFocus onClick={handleSent}>
              Send
            </Button>
            <Button onClick={handleClose} autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      <Snackbar
        open={warming}
        autoHideDuration={2000}
        onClose={handleCloseWarming}
      >
        <Alert
          onClose={handleCloseWarming}
          severity="warning"
          sx={{ width: "100%" }}
        >
          Please select online user!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default BuyerSearch;
