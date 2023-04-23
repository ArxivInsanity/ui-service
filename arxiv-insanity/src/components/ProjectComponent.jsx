import * as React from 'react';
import { DataGrid, GridToolbarQuickFilter, GridToolbarContainer } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import axios from "axios";
import { Grid, IconButton, Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import DeleteIcon from '@mui/icons-material/Delete';

export function QuickSearchToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarQuickFilter sx={{ width: '600px' }} />
        </GridToolbarContainer>
    );
}

const DataDisp = () => {
    const [open, setOpen] = React.useState(false);
    const [projectName, setProjectName] = React.useState("");
    const [projectDescription, setProjectDescription] = React.useState("");
    const [projectTags, setProjectTags] = React.useState("");
    const [prevProjectName, setPrevProjectName] = React.useState("");

    const handleClickOpen = (e, row) => {
        e.stopPropagation();
        // console.log("value ",row.name);
        setOpen(true);
        setProjectName(row.name);
        setPrevProjectName(row.name);
        setProjectDescription(row.description);
        setProjectTags(row.tags);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEditClose = () => {
        console.log("Project Name ", projectName);
        console.log("Prev Project Name ", prevProjectName);
        axios({
            method: "put",
            url: "http://localhost:8080/api/projects/" + prevProjectName,
            withCredentials: true,
            data: {
                "name": projectName,
                "description": projectDescription,
                "tags": projectTags
            }
        })
            .then((response) => {
                console.log("Edited", response);
                const results = response.data;
                console.log(results)
                getTableData();
            })
            .catch((error) => {
                console.log("Error Failed", error);
            })
        setOpen(false);
    }

    const onOpenProject = (e, row) => {
        e.preventDefault();
        console.log("Open Project ", row.name);
        // window.open("http://localhost:3000/projects/" + row.name, "_blank");
    }

    const [tableData, setTableData] = useState([])

    const getTableData = () => {
        axios({
            method: "get",
            url: "http://localhost:8080/api/projects",
            withCredentials: true,
        })
            .then((response) => {
                console.log("Got Collection Success", response);
                const results = response.data;
                console.log(results)
                // setTableData({"id":1,"col1" :results[0].name,"col2" :results[0].lastModifiedAt});
                let tableData = []
                results.map((result, id) => {
                    return tableData.push({ "id": id, "name": result.name, "lastModifiedAt": result.lastModifiedAt, "description": result.description, "tags": result.tags });
                });
                setTableData(tableData);
            })
            .catch((error) => {
                console.log("Error Failed", error);
            })
    }

    const onButtonClick = (e, row) => {
        e.stopPropagation();
        axios({
            method: "delete",
            url: "http://localhost:8080/api/projects/" + row.name,
            withCredentials: true,
        })
            .then((response) => {
                console.log("Deleted", response);
                const results = response.data;
                console.log(results)
                getTableData();
            })
            .catch((error) => {
                console.log("Error Failed", error);
            })
    };

    const columns = [
        { field: 'name', headerName: 'Project Name', flex: 1 },
        { field: 'lastModifiedAt', headerName: 'Last modified', flex: 1 },
        {
            field: "deleteAndEditButton",
            headerName: "Actions",
            description: "Actions column.",
            sortable: false,
            width: 160,
            renderCell: (params) => {
                return (
                    <><IconButton size={"medium"} onClick={(e) => onButtonClick(e, params.row)} color={'warning'}>
                        <DeleteIcon />
                    </IconButton><Box sx={{ display: 'flex' }}>
                            <Button onClick={(e) => handleClickOpen(e, params.row)}>
                                <EditIcon />
                            </Button>
                            <Dialog open={open} onClose={handleClose}>
                                <DialogTitle>Edit Project details</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        To change the project details, please enter the fields given below.
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
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button onClick={handleEditClose}>Edit</Button>
                                </DialogActions>
                            </Dialog>
                        </Box>
                        <IconButton size={"medium"} onClick={(e) => onOpenProject(e, params.row)} color='primary'>
                            <OpenInNewIcon />
                        </IconButton><Box sx={{ display: 'flex' }}></Box></>
                );
            }
        }
    ];

    useEffect(() => {
        getTableData();
    },
        [])

    console.log(tableData)

    return (
        <Grid container spacing={2}>
            <Grid item xs={2}>
            </Grid>
            <Grid item xs={8}>
                <Box sx={{ height: 500, width: '100%', mt: 3 }}>
                    <DataGrid
                        sx={{
                            boxShadow: 2,
                            border: 2,
                            borderColor: 'warning.main',
                            '& .MuiDataGrid-cell:hover': {
                                color: 'primary.main',
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
            <Grid item xs={2}>
            </Grid>
        </Grid>

    )
}

export default DataDisp