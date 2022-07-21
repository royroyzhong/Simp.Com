import React from "react";
import MailIcon from "@mui/icons-material/Mail";
import InboxIcon from "@mui/icons-material/Inbox";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Input from "@mui/material/Input";
import io from "socket.io-client";
import { useEffect, useState } from "react";
function SellerSearch(prop) {
  const [open, setOpen] = React.useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const socket = io.connect("http://localhost:8888");
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState([]);
  useEffect(() => {
    socket.on("receive_message", (data) => {
      let tempEle = {
        user: data.userName,
        message: data.message,
      };
      setMessageReceived((oldArray) => [...oldArray, tempEle]);
    });
  }, [socket]);
  const handleSent = () => {
    if (message !== "") {
      socket.emit("send_message", { message });
      let tempEle = {
        user: prop.self,
        message: message,
      };
      setMessageReceived((oldArray) => [...oldArray, tempEle]);
    }
  };
  return (
    <>
      <InboxIcon
        sx={{ fontSize: 39, color: "black", marginRight: "1vw" }}
        onClick={handleClickOpen}
      />
      <Box>
        <Dialog
          fullScreen={fullScreen}
          maxWidth="sm"
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Chat With "}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </DialogContentText>
            <DialogContentText sx={{ position: "relative", left: "10vw" }}>
              {" "}
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </DialogContentText>
            <DialogContentText>
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </DialogContentText>
            <DialogContentText sx={{ position: "relative", left: "10vw" }}>
              {" "}
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </DialogContentText>
            {/* {messageReceived.map((i) => {
              return <DialogContentText>{i.message}</DialogContentText>;
            })} */}
          </DialogContent>
          <DialogActions>
            <Input fullWidth defaultValue="Enter Text here" />
            <Button
              autoFocus
              onClick={handleSent}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            >
              Send
            </Button>
            <Button onClick={handleClose} autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}

export default SellerSearch;
