import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import EditIcon from "@material-ui/icons/Edit";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";

import useWindowDimensions from "../hooks/useWindowDimensions";

const useStyles = makeStyles((theme) => ({
  checkButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    borderStyle: "solid",
    borderWidth: 2,
    padding: 3,
    borderRadius: 4,
    marginBottom: 4,
    borderColor: "grey",
    "&:hover": {
      boxShadow: "3px 3px 3px #9E9E9E",
    },
  },
  rightTop: {
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "flex-end",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(5),
    overflow: "auto",
  },
}));

interface CheckEnrolledProps {
  setEditing: Function;
}

export default function CheckEnrolled({ setEditing }: CheckEnrolledProps) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.rightTop}>
      <IconButton aria-label="more-options" onClick={handleClick}>
        <MoreVertIcon fontSize="default" />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
          }}
          onClick={() => {
            setEditing(true);
            handleClose();
          }}
        >
          <EditIcon />
          <div style={{ fontSize: 15, marginLeft: 5 }}>Edit</div>
        </MenuItem>
      </Menu>

      <div className={classes.checkButton}>
        <CheckRoundedIcon
          fontSize="default"
          style={{ marginBottom: 4 }}
          color="action"
        />
        <Typography style={{ fontSize: 20 }}>Enrolled</Typography>
      </div>
    </div>
  );
}
