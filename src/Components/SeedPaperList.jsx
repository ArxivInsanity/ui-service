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

const SeedPaperList = ({ seedPapers, setSeedPaperIdFunc }) => {
  console.log("Called in Seed Papers List : ", seedPapers);
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
                onClick={() => console.log("Delete Seed Paper")}
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
      <Accordion sx={{ mt: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            height: 50,
            "&.Mui-expanded": {
              minHeight: 30,
              maxHeight: 30,
            },
          }}
        >
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: "bold",
            }}
            color="#8a2b06"
          >
            Seed Papers
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
    </>
  );
};

export default SeedPaperList;
