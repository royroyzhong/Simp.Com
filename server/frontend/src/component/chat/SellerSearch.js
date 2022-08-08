import React from "react";
import { Box } from "@mui/system";

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
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import "react-chat-elements/dist/main.css";
import { MessageList, Input, Button } from "react-chat-elements";

const socket = io.connect("https://dogecom.herokuapp.com");
function SellerSearch(prop) {
  socket.emit("join_room", prop.self.email);
  const [open, setOpen] = React.useState(false);
  const inputReferance = React.createRef();

  const handleClose = () => {
    setOpen(false);
    setMsgUnread(false);
    setMessageReceived([]);
  };
  const handleClickOpen = () => {
    setOpen(true);
    setMsgUnread(false);
  };

  const [message, setMessage] = useState("");
  const [MsgUnread, setMsgUnread] = useState(false);
  const [messageReceived, setMessageReceived] = useState([]);

  useEffect(() => {
    socket.connect();
    socket.on("receive_message", (data) => {
      let tempEle = {
        position: "left",
        type: "text",
        text: data.message,
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
        position: "right",
        type: "text",
        text: message,
      };
      setMessageReceived((oldArray) => [...oldArray, tempEle]);
      setMessage("");
      inputReferance.current.value = "";
    }
  };

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
          maxWidth="sm"
          fullWidth
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"Chat Room"}
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
    </>
  );
}

export default SellerSearch;
