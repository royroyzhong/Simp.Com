import React from "react";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { TextField } from "@mui/material";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import MarkUnreadChatAltIcon from "@mui/icons-material/MarkUnreadChatAlt";
import ChatIcon from "@mui/icons-material/Chat";
const socket = io.connect("http://localhost:8888");
function SellerSearch(prop) {
  socket.emit("join_room", prop.self.email);
  const [open, setOpen] = React.useState(false);

  // const theme = useTheme();
  // const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleClose = () => {
    setOpen(false);
    // socket.disconnect();
  };
  const handleClickOpen = () => {
    setOpen(true);
    // socket.connect();
    setMsgUnread(false);
  };

  const [message, setMessage] = useState("");
  const [MsgUnread, setMsgUnread] = useState(false);
  const [messageReceived, setMessageReceived] = useState([]);

  useEffect(() => {
    socket.connect();
    socket.on("receive_message", (data) => {
      let tempEle = {
        user: data.userName,
        message: data.message,
      };
      setMessageReceived((oldArray) => [...oldArray, tempEle]);
      setMsgUnread(true);
    });
  }, []);

  const handleSent = () => {
    if (message !== "") {
      socket.emit("send_message", {
        room: prop.self.email,
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
  console.log(socket);

  return (
    <>
      {!MsgUnread && (
        <ChatIcon
          sx={{ fontSize: 39, color: "black", marginRight: "1vw" }}
          onClick={handleClickOpen}
        />
      )}
      {MsgUnread && (
        <MarkUnreadChatAltIcon
          sx={{ fontSize: 39, color: "black", marginRight: "1vw" }}
          onClick={handleClickOpen}
        />
      )}

      <Box>
        <Dialog
          // fullScreen={fullScreen}
          maxWidth="md"
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Chat "}</DialogTitle>
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
    </>
  );
}

export default SellerSearch;
