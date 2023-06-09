import * as React from "react";
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import { MuiChipsInput } from "mui-chips-input";
import { useState, useEffect } from "react";

import { Grid, IconButton, Button, Chip } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CreateNewFolderOutlinedIcon from "@mui/icons-material/CreateNewFolderOutlined";
import FolderIcon from "@mui/icons-material/Folder";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import DeleteIcon from "@mui/icons-material/Delete";
import axiosConfig from "../Util/AxiosConfig";
import { useNavigate } from "react-router-dom";

export function QuickSearchToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarQuickFilter sx={{ width: "600px" }} />
    </GridToolbarContainer>
  );
}

const DataDisp = () => {
  const [isCreated, setCreated] = React.useState(false);
  const [isEdited, setEdited] = React.useState(false);
  const [isDeleted, setDeleted] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [openNew, setOpenNew] = React.useState(false);
  const [projectName, setProjectName] = React.useState("");
  const [projectDescription, setProjectDescription] = React.useState("");
  const [projectTags, setProjectTags] = React.useState([]);
  const [prevProjectName, setPrevProjectName] = React.useState("");

  const navigate = useNavigate();

  const handleClickOpen = (e, row) => {
    e.stopPropagation();
    console.log("Clicked edit ", row.name);
    setProjectName(row.name);
    setPrevProjectName(row.name);
    setProjectDescription(row.description);
    if (row.tags === null) setProjectTags([]);
    else setProjectTags(row.tags);
    setOpen(true);
  };

  const handleClickOpenForNewProject = () => {
    setOpenNew(true);
    setProjectName("");
    setProjectDescription("");
    setProjectTags("");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseNew = () => {
    setOpenNew(false);
  };

  const handleEditClose = () => {
    console.log("Project Name ", projectName);
    console.log("Prev Project Name ", prevProjectName);
    axiosConfig
      .put("api/projects/" + prevProjectName, {
        name: projectName,
        description: projectDescription,
        tags: projectTags,
      })
      .then((response) => {
        console.log("Edited", response);
        const results = response.data;
        console.log(results);
        getTableData();
        setEdited(true);
      })
      .catch((error) => {
        console.log("Error Failed", error);
      });
    setOpen(false);
  };

  const onClickNewProject = () => {
    console.log("onClickNewProject");
    console.log(projectTags);
    axiosConfig
      .post("api/projects", {
        name: projectName,
        description: projectDescription,
        tags: projectTags,
      })
      .then((response) => {
        console.log("Created", response);
        getTableData();
        setCreated(true);
      })
      .catch((error) => {
        console.log("Error Failed", error);
      });
    setOpenNew(false);
  };

  const onOpenProject = (e, row) => {
    e.preventDefault();
    console.log("Open Project ", row.name);
    navigate("/project", { state: { data: row } });
  };

  const [tableData, setTableData] = useState([]);

  const getTableData = () => {
    axiosConfig
      .get("api/projects")
      .then((response) => {
        console.log("Got Collection Success", response);
        const results = response.data;
        console.log(results);
        let tableData = [];
        results.map((result, id) => {
          return tableData.push({
            id: id,
            name: result.name,
            lastModifiedAt: result.lastModifiedAt,
            description: result.description,
            tags: result.tags,
            seedPapers: result.seedPapers,
          });
        });
        setTableData(tableData);
      })
      .catch((error) => {
        console.log("Error Failed", error);
      });
  };

  const onButtonClick = (e, row) => {
    e.stopPropagation();
    axiosConfig
      .delete("api/projects/" + row.name)
      .then((response) => {
        console.log("Deleted", response);
        const results = response.data;
        console.log(results);
        getTableData();
        setDeleted(true);
      })
      .catch((error) => {
        console.log("Error Failed", error);
      });
  };

  const columns = [
    {
      field: "name",
      headerName: "Project Name",
      flex: 0.75,
      description: "The name of the project",
      renderCell: (cellValue) => {
        return (
          <Grid
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FolderIcon />
            <Typography
              sx={{
                p: 1,
              }}
              color="#8a2b06"
            >
              {cellValue.row.name}
            </Typography>
          </Grid>
        );
      },
    },
    {
      field: "tags",
      headerName: "Tags",
      flex: 1,
      description: "Project Tags",
      renderCell: (cellValue) => {
        if (cellValue.row.tags.length === 0) return;
        else {
          return (
            <Grid container spacing={1}>
              {cellValue.row.tags.map((data, id) => {
                return (
                  <Grid item key={id} xs={2}>
                    <Chip
                      label={data}
                      size="small"
                      variant="filled"
                      sx={{ color: "#8a2b06", fontWeight: "bold" }}
                    />
                  </Grid>
                );
              })}
            </Grid>
          );
        }
      },
    },
    {
      field: "lastModifiedAt",
      headerName: "Last modified",
      flex: 0.5,
      description: "The last modified date of the project",
    },
    {
      field: "deleteAndEditButton",
      headerName: "Actions",
      description: "Actions column.",
      flex: 0.4,
      sortable: false,
      width: 160,
      renderCell: (params) => {
        return (
          <>
            <IconButton
              size={"medium"}
              onClick={(e) => onButtonClick(e, params.row)}
              color={"warning"}
            >
              <DeleteIcon />
            </IconButton>
            <Box sx={{ display: "flex" }}>
              <Button onClick={(e) => handleClickOpen(e, params.row)}>
                <EditIcon />
              </Button>
            </Box>
            <IconButton
              size={"medium"}
              onClick={(e) => onOpenProject(e, params.row)}
              color="primary"
            >
              <OpenInNewIcon />
            </IconButton>
            <Box sx={{ display: "flex" }}></Box>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    getTableData();
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              mt: 2,
            }}
          >
            <Button
              variant="contained"
              startIcon={<CreateNewFolderOutlinedIcon />}
              size="large"
              onClick={handleClickOpenForNewProject}
            >
              New Project
            </Button>
            <Dialog open={openNew} onClose={handleCloseNew}>
              <DialogTitle>Create new project</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  To add project, please enter the fields given below.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
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
                  label="Project Description"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                />
                <MuiChipsInput
                  autoFocus
                  margin="dense"
                  label="Project tags"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={projectTags}
                  onChange={(chips) => setProjectTags(chips)}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseNew}>Cancel</Button>
                <Button onClick={onClickNewProject}>Create</Button>
              </DialogActions>
            </Dialog>
          </Box>
          <Box sx={{ height: 500, width: "100%", mt: 3 }}>
            <DataGrid
              showCellRightBorder={true}
              showColumnVerticalBorder={true}
              sx={{
                boxShadow: 2,
                border: 2,
                borderColor: "warning.main",
                "& .MuiDataGrid-cell:hover": {
                  color: "primary.main",
                },
              }}
              rows={tableData}
              getRowId={(row) => row.name + row.lastModifiedAt}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              slots={{ toolbar: QuickSearchToolbar }}
            />
          </Box>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Project details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To change the project details, please enter the fields given below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
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
            label="Project Description"
            type="text"
            fullWidth
            variant="standard"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
          />
          <MuiChipsInput
            autoFocus
            margin="dense"
            label="Tags"
            type="text"
            fullWidth
            variant="standard"
            value={projectTags}
            onChange={(chips) => setProjectTags(chips)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleEditClose}>Save</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={isCreated}
        autoHideDuration={3000}
        onClose={() => setCreated(false)}
      >
        <Alert severity="success" variant="filled" elevation={6}>
          <strong>Success - </strong> New Project created !!
        </Alert>
      </Snackbar>
      <Snackbar
        open={isDeleted}
        autoHideDuration={3000}
        onClose={() => setDeleted(false)}
      >
        <Alert severity="success" variant="filled" elevation={6}>
          Project deleted !!
        </Alert>
      </Snackbar>
      <Snackbar
        open={isEdited}
        autoHideDuration={3000}
        onClose={() => setEdited(false)}
      >
        <Alert severity="info" variant="filled" elevation={6}>
          <strong>Success - </strong> Project edited !!
        </Alert>
      </Snackbar>
    </>
  );
};

export default DataDisp;
