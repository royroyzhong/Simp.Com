import React from "react";
import { Box } from "@mui/system";

import CircularProgress from "@mui/material/CircularProgress";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import "react-chat-elements/dist/main.css";
import { MessageList, Input, Button } from "react-chat-elements";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";

const socket = io.connect("https://dogecom.herokuapp.com");
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
  const [openAlert, setOpenAlert] = React.useState(false);
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState([]);
  const inputReferance = React.createRef();
  let navigate = useNavigate();

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
      message: prop.self.firstName + " just leave the room",
    });
    socket.disconnect();
    setMessageReceived([]);
  };
  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
    navigate("./login");
  };
  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3);

      if (active) {
        try {
          setOptions([...prop.data]);
        } catch (err) {
          setOpenAlert(true);
        }
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
      socket.emit("send_message", {
        room: data.email,
        message: prop.self.firstName + " just enter the room",
      });
      let tempEle = {
        position: "right",
        type: "text",
        text: prop.self.firstName + " Join the room ",
      };
      setMessageReceived((oldArray) => [...oldArray, tempEle]);
    } catch (err) {
      setOpenAlert(true);
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
        position: "right",
        type: "text",
        text: message,
      };
      setMessageReceived((oldArray) => [...oldArray, tempEle]);
    }
    setMessage("");
    inputReferance.current.value = "";
  };
  const handleAutoCompleteSubmit = (event, value) => {
    setWarming(false);
    if (value !== null) {
      if (value.onlineStatus) {
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
        position: "left",
        type: "text",
        text: data.message,
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
          maxWidth="sm"
          fullWidth
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {chatTarget === null
              ? "None"
              : "Chat With " + chatTarget.firstName + " " + chatTarget.lastName}
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers sx={{ height: "50vh" }}>
            <MessageList
              className="message-list"
              lockable={true}
              toBottomHeight={"100%"}
              dataSource={messageReceived}
            />
          </DialogContent>
          <DialogActions>
            <Input
              referance={inputReferance}
              placeholder="Type here..."
              multiline={true}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              rightButtons={
                <Button
                  type="outlined"
                  color="white"
                  backgroundColor="black"
                  text="Send"
                  onClick={handleSent}
                />
              }
            />
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
      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity="error"
          sx={{ width: "100%" }}
        >
          Please Log in to continue.
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default BuyerSearch;
