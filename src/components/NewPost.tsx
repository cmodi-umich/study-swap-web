import React, { useState, useContext } from "react";
import { UserContext } from "../constants/UserContext";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SendIcon from "@material-ui/icons/Send";
import Avatar from "@material-ui/core/Avatar";
import CardContent from "@material-ui/core/CardContent";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import { addPost } from "../utils/firebaseUtils";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",

    flexDirection: "column",
    maxHeight: 200,
    width: 486,
  },
  input: {
    marginLeft: theme.spacing(2),
    flex: 1,
    overflow: "auto",
  },
  iconButton: {
    padding: 10,
  },
  mainDiv: { display: "flex", flexDirection: "row" },
  bottomRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  lengthLimit: { marginBottom: 8, fontSize: 15, marginRight: 5 },
}));

const options = [
  "Choose Category",
  "Announcement",
  "HW",
  "Exam",
  "Project",
  "Social",
];

interface newPostProps {
  onClick: Function;
}

export default function NewPost({ onClick }: newPostProps) {
  // Context
  const { user, setUser } = useContext(UserContext);

  const classes = useStyles();
  const [value, setValue] = useState("");
  const [len, setLen] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleChange = (event: any) => {
    if (event.target.value.length <= 1000) {
      setValue(event.target.value);
      setLen(event.target.value.length);
    }
  };

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event: any, index: any) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Paper component="form" className={classes.root}>
      <div className={classes.mainDiv}>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {options.map((option, index) => (
            <MenuItem
              key={option}
              disabled={index === 0}
              selected={index === selectedIndex}
              onClick={(event) => handleMenuItemClick(event, index)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
        <InputBase
          className={classes.input}
          placeholder="Type a post..."
          inputProps={{ "aria-label": "post to feed" }}
          multiline={true}
          rowsMax={7}
          value={value}
          fullWidth
          onChange={handleChange}
        />
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="Send"
          disabled={selectedIndex === 0 || len === 0}
          onClick={() => {
            onClick({
              //id?: string;
              // foreign key relations
              userId: user.id,
              classId: "1",
              // post specific
              postText: value,
              postUserName: `${user.firstName} ${user.lastName}`,
              postCategory: options[selectedIndex],
              postClassName: "ENGR 100",
              //timestamp?: any;
              edited: false,
              likedBy: [],
              postUserProfilePic: user.profilePicture
                ? user.profilePicture
                : "",
            });
            setValue("");
            setLen(0);
            setSelectedIndex(0);
          }}
        >
          <SendIcon />
        </IconButton>
      </div>
      <div className={classes.bottomRow}>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
          style={{ marginLeft: 5 }}
        >
          {options[selectedIndex]}
        </Button>
        <div className={classes.lengthLimit}>{len}/1000</div>
      </div>
    </Paper>
  );
}
