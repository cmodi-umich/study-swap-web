// eslint-disable-next-line
import React, { useState, useContext } from "react";
import { UserContext } from "../constants/UserContext";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Card from "@material-ui/core/Card";
import EditChat from "../components/EditChat";
import NewChat from "../components/NewChat";
import Modal from "@material-ui/core/Modal";
import IconButton from "@material-ui/core/Button";
import CreateIcon from "@material-ui/icons/Create";
import InfoIcon from "@material-ui/icons/Info";
import Popper from "@material-ui/core/Popper";

import ChatSelect from "../components/ChatSelector";
import MessageBox from "../components/MessageBox";
import WriteMessage from "../components/WriteMessage";

import { chatsModel } from "../constants/Models";
import { dummyChatsData } from "../DummyData/chats";

// eslint-disable-next-line
import history from "../utils/historyUtils";
import { Autorenew } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  newChatModal: {
    position: "absolute",
    left: "50%",
    top: " 50%",

    //might switch to:
    //position: fixed;
    //top: 50%;
    //left: 50%;
    //transform: translate(-50%, -50%);
  },
}));

export default function ChatToolbar() {
  //get the ChatSelect working with the .map() function.
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const [modalOpen, setModalOpen] = React.useState(false);

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <React.Fragment>
      <Grid item xs={3}></Grid>

      <Grid item xs={1}>
        <IconButton type="button" onClick={handleOpen}>
          <CreateIcon />
        </IconButton>
        <Modal
          className={classes.newChatModal}
          open={modalOpen}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <NewChat />
        </Modal>
      </Grid>

      <Grid item xs={7}></Grid>

      <Grid item xs={1}>
        <IconButton aria-describedby={id} type="button" onClick={handleClick}>
          <InfoIcon />
        </IconButton>
        <Popper id={id} open={open} anchorEl={anchorEl} placement="bottom-end">
          <div>
            {" "}
            <EditChat />
          </div>
        </Popper>
      </Grid>
    </React.Fragment>
  );
}

/* 

*/
