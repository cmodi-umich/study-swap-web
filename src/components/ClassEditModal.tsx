import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Modal from "@material-ui/core/Modal";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import useWindowDimensions from "../hooks/useWindowDimensions";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(5),
    overflow: "auto",
  },
  input: {
    width: "80%",
    padding: theme.spacing(2, 0),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  mainDiv: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  buttons: {
    width: "60%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
}));

interface ClassEditModalProps {
  editing: boolean;
  setEditing: Function;
  classTitle: string;
  setClassTitle: Function;
  classTime: string;
  setClassTime: Function;
  classSection: string;
  setClassSection: Function;
  profName: string;
  setProfName: Function;
  gsiName: string;
  setGSIName: Function;
  iaNames: string;
  setIANames: Function;
  canvasLink: string;
  setCanvasLink: Function;
  emailLink: string;
  setEmailLinks: Function;
  classWebsiteLinks: string;
  setClassWebsiteLink: Function;
}

export default function ClassEditModal({
  editing,
  setEditing,
  classTitle,
  setClassTitle,
  classTime,
  setClassTime,
  classSection,
  setClassSection,
  profName,
  setProfName,
  gsiName,
  setGSIName,
  iaNames,
  setIANames,
  canvasLink,
  setCanvasLink,
  emailLink,
  setEmailLinks,
  classWebsiteLinks,
  setClassWebsiteLink,
}: ClassEditModalProps) {
  const classes = useStyles();

  // Edit State Variables
  const [editClassTitle, setEditClassTitle] = useState<string>(classTitle);
  const [editClassTime, setEditClassTime] = useState<string>(classTime);
  const [editClassSection, setEditClassSection] = useState<string>(
    classSection
  );
  const [editProfName, setEditProfName] = useState<string>(profName);
  const [editGSIName, setEditGSIName] = useState<string>(gsiName);
  const [editIANames, setEditIANames] = useState<string>(iaNames);
  const [editCanvasLink, setEditCanvasLink] = useState<string>(canvasLink);
  const [editEmailLink, setEditEmailLink] = useState<string>(emailLink);
  const [editClassWebsiteLinks, setEditClassWebsiteLinks] = useState<string>(
    classWebsiteLinks
  );

  useEffect(() => {
    // Sometimes state vars dont reset on close
    if (editing) {
      setEditClassTitle(classTitle);
      setEditClassTime(classTime);
      setEditClassSection(classSection);
      setEditProfName(profName);
      setEditGSIName(gsiName);
      setEditIANames(iaNames);
    }
  }, [editing]);

  const { innerWidth, innerHeight } = useWindowDimensions();

  return (
    <Modal
      open={editing}
      onClose={() => setEditing(false)}
      aria-labelledby="edit-modal-title"
      aria-describedby="edit-modal-description"
      className={classes.modal}
    >
      <Paper
        className={classes.paper}
        style={{ width: innerWidth * 0.8, height: innerHeight * 0.75 }}
      >
        <div className={classes.mainDiv}>
          <Avatar
            style={{ height: 90, width: 90 }}
            alt="Engineering"
            src={require("../DummyData/Engineering.jpg")}
          />
          <div className={classes.input}>
            <TextField
              variant="outlined"
              fullWidth
              id="class name"
              label="Class Name"
              name="name"
              value={editClassTitle}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setEditClassTitle(event.target.value);
              }}
            />
          </div>
          <div className={classes.input}>
            <TextField
              variant="outlined"
              fullWidth
              id="class time"
              label="Class Time"
              name="name"
              value={editClassTime}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setEditClassTime(event.target.value);
              }}
            />
          </div>
          <div className={classes.input}>
            <TextField
              variant="outlined"
              fullWidth
              id="class section"
              label="Section"
              name="name"
              value={editClassSection}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setEditClassSection(event.target.value);
              }}
            />
          </div>
          <div className={classes.input}>
            <TextField
              variant="outlined"
              fullWidth
              id="professor name"
              label="Professor Name"
              name="name"
              value={editProfName}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setEditProfName(event.target.value);
              }}
            />
          </div>
          <div className={classes.input}>
            <TextField
              variant="outlined"
              fullWidth
              id="gsi name"
              label="GSI Name"
              name="name"
              value={editGSIName}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setEditGSIName(event.target.value);
              }}
            />
          </div>
          <div className={classes.input}>
            <TextField
              variant="outlined"
              fullWidth
              id="is names"
              label="IA Names"
              name="name"
              value={editIANames}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setEditIANames(event.target.value);
              }}
            />
          </div>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setClassTitle(editClassTitle);
                setClassTime(editClassTime);
                setClassSection(editClassTime);
                setProfName(editProfName);
                setGSIName(editGSIName);
                setIANames(editIANames);
                setEditing(false);
              }}
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setEditing(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Paper>
    </Modal>
  );
}
