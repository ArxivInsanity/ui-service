import * as React from "react";
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import { MuiChipsInput } from "mui-chips-input";
import { styled } from "@mui/material/styles";
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

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const DataDisp = () => {
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
    if(row.tags === null) 
      setProjectTags([]);
    else
      setProjectTags(row.tags);
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
        // window.location.reload();
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
    // window.open("http://localhost:3000/projects/" + row.name, "_blank");
  };

  const [tableData, setTableData] = useState([]);

  const getTableData = () => {
    axiosConfig
      .get("api/projects")
      .then((response) => {
        console.log("Got Collection Success", response);
        const results = response.data;
        console.log(results);
        // setTableData({"id":1,"col1" :results[0].name,"col2" :results[0].lastModifiedAt});
        let tableData = [];
        results.map((result, id) => {
          return tableData.push({
            id: id,
            name: result.name,
            lastModifiedAt: result.lastModifiedAt,
            description: result.description,
            tags: result.tags,
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
      })
      .catch((error) => {
        console.log("Error Failed", error);
      });
  };

  const columns = [
    {
      field: "name",
      headerName: "Project Name",
      flex: 1,
      description: "The name of the project",
    },
    {
      field: "tags",
      headerName: "Tags",
      flex: 1,
      description: "Project Tags",
      renderCell: (cellValue) => {
        if (cellValue.row.tags === null) return;
        else {
          return cellValue.row.tags.map((data, id) => {
            return (
              <ListItem key={id}>
                <Chip label={data} size="small" variant="outlined" />
              </ListItem>
            );
          });
        }
      },
    },
    {
      field: "lastModifiedAt",
      headerName: "Last modified",
      flex: 1,
      description: "The last modified date of the project",
    },
    {
      field: "deleteAndEditButton",
      headerName: "Actions",
      description: "Actions column.",
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
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Project details</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    To change the project details, please enter the fields given
                    below.
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
                  {/* <TextField
                    autoFocus
                    margin="dense"
                    label="Project tags"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={projectTags}
                    onChange={(e) => setProjectTags(e.target.value)}
                  /> */}
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
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={handleEditClose}>Save</Button>
                </DialogActions>
              </Dialog>
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

  // console.log(tableData)

  return (
    <Grid container spacing={2}>
      <Grid item xs={2}></Grid>
      <Grid item xs={8}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 2,
          }}
        >
          <Button
            variant="contained"
            startIcon={<OpenInNewIcon />}
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
              {/* <TextField
                                autoFocus
                                margin="dense"
                                label="Project tags"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={projectTags}
                                onChange={(e) => setProjectTags(e.target.value)}
                            /> */}
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
  );
};

export default DataDisp;
