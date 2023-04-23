import { Fragment } from "react";
import React, { useState } from 'react';
import axios from "axios";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import "./Dashboard.css";
import SearchData from '../components/ProjectComponent'
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Box from '@mui/material/Box';


// import citationImage from "../assets/citationImage.png";
// import treeImage from "../assets/ourlogo.jpeg";
// import classes from "../components/Layout/Header.module.css";

import Header from "../components/Layout/Header"
import { Button } from "@mui/material";

function Dashboard() {
  const [open, setOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectTags, setProjectTags] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const onClickNewProject = () => {
    console.log("onClickNewProject");
    axios({
      method: "post",
      url: "http://localhost:8080/api/projects",
      withCredentials: true,
      data: {
        "name": projectName,
        "description": projectDescription,
        "tags": projectTags
      }
    })
      .then((response) => {
        console.log("Created", response);
        setOpen(false);
        window.location.reload();
      })
      .catch((error) => {
        console.log("Error Failed", error);
      })
  }

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Fragment>
      <Box className="App">
        <Header />
        <Box sx={{
          display: 'flex', justifyContent: 'center', mt: 2
        }}>
          <Button variant="contained" startIcon={<OpenInNewIcon />} size="large" onClick={handleClickOpen}>
            New Project
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create new project</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To add project, please enter the fields given below.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="PEname"
                label="Project Name"
                type="text"
                fullWidth
                variant="standard"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
              <TextField
                autoFocus
                margin="dense"
                id="PEdescription"
                label="Project Description"
                type="text"
                fullWidth
                variant="standard"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
              />
              <TextField
                autoFocus
                margin="dense"
                id="PEtags"
                label="Project tags"
                type="text"
                fullWidth
                variant="standard"
                value={projectTags}
                onChange={(e) => setProjectTags(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={onClickNewProject}>Create</Button>
              <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
          </Dialog>
        </Box>
        <SearchData />
      </Box>
    </Fragment>
  );
}

export default Dashboard;
