import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import axiosConfig from "../Util/AxiosConfig";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useState } from "react";

const SeedPaperList = ({
  seedPapers,
  setSeedPaperIdFunc,
  setProjectListFunc,
  projectName,
}) => {
  const [isDelete, setDelete] = useState(false);

  console.log("Called in Seed Papers List : ", seedPapers);

  const handleDeletePaper = (row) => {
    axiosConfig
      .delete("api/projects/" + projectName + "/seedPapers", {
        data: {
          id: row.id,
          name: row.name,
        },
      })
      .then((response) => {
        console.log("Deleted the seedPaper: ", response);
        axiosConfig
          .get("api/projects/" + projectName + "/seedPapers")
          .then((response) => {
            console.log("Fetched seed paper : ", response);
            setProjectListFunc(response?.data);
            setDelete(true);
          })
          .catch((error) => {
            console.log("Error Failed", error);
          });
      })
      .catch((error) => {
        console.log("Error Failed", error);
      });
  };

  const columns = [
    {
      field: "rowId",
      headerName: "#",
      flex: 0.1,
      minWidth: 20,
    },
    {
      field: "name",
      headerName: "Title",
      flex: 1,
      minWidth: 150,
      description: "Title of the paper",
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.2,
      minWidth: 50,
      description: "Delete paper",
      renderCell: (params) => {
        return (
          <>
            <Box sx={{ display: "flex" }}>
              <IconButton
                size="small"
                onClick={() => handleDeletePaper(params.row)}
                color="warning"
              >
                <DeleteIcon size="small" />
              </IconButton>
            </Box>
            <Box sx={{ display: "flex" }}>
              <IconButton
                size="small"
                onClick={() => setSeedPaperIdFunc(params.row.id)}
                color="info"
              >
                <VisibilityIcon size="small" />
              </IconButton>
            </Box>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Accordion
        sx={{
          mt: 1.5,
          ml: 1,
          mr: 1,
          mb: 1,
          p: 0,
          boxShadow: 6,
          borderRadius: 2,
          "&.Mui-expanded": {
            fontSize: 14,
            marginTop: 1.5,
            marginLeft: 1,
            marginRight: 1,
            marginBottom: 1,
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            height: 50,
            "&.Mui-expanded": {
              fontSize: 14,
              minHeight: 30,
              maxHeight: 50,
            },
          }}
        >
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: "bold",
            }}
            color="#8a2b06"
          >
            Seed Papers :
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ m: 1 }}>
            <div style={{ mt: 1, height: 200 }}>
              <DataGrid
                autoPageSize
                pagination
                rows={
                  seedPapers
                    ?.filter((refPaper) => refPaper?.id?.length > 0)
                    ?.map((v, id) => ({
                      ...v,
                      rowId: id + 1,
                    })) ?? []
                }
                getRowId={(row) => row.rowId}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                rowHeight={25}
              ></DataGrid>
            </div>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Snackbar
        open={isDelete}
        autoHideDuration={3000}
        onClose={() => setDelete(false)}
      >
        <Alert severity="error" variant="filled" elevation={6}>
          <strong>Alert - </strong> Seed Paper is Deleted !!
        </Alert>
      </Snackbar>
    </>
  );
};

export default SeedPaperList;
