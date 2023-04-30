import {
  CardContent,
  Chip,
  Grid,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import React, { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { DataGrid } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PaperDetailsModal from "../Components/PaperDetailsModal"
import axiosConfig from "../Util/AxiosConfig";

const SeedPaperCard = ({ seedPaperDetails }) => {
  const [seedPaperData, setSeedPaperData] = useState({});
  const [refData, setRefData] = useState({});
  const [openRead, setOpenRead] = React.useState(false);

  useEffect(() => {
    console.log("READING PANEL : ", seedPaperData);
    axiosConfig
      .get("/api/papers/" + seedPaperData.paperId)
      .then((response) => {
        console.log("Response : ", response);
        if (response?.data?.data !== null) {
          setRefData(response?.data?.data);
        }
      })
      .catch((error) => {
        console.log("Error Failed", error);
      });
  }, [seedPaperData]);

  const handleClose = () => {
    setOpenRead(false);
  };

  console.log("SEED : ", seedPaperDetails);

  const openReadPanel = (e, row) => {
    e.stopPropagation();
    console.log("Open Read Panel ", row);
    setSeedPaperData(row);
    setOpenRead(true);
  };

  const columns = [
    {
      field: "id",
      headerName: "#",
      flex: 0.1,
      minWidth: 20,
    },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      minWidth: 150,
      description: "Title of the paper",
    },
    {
      field: "view",
      headerName: "View",
      flex: 0.1,
      minWidth: 50,
      description: "View paper",
      renderCell: (params) => {
        return (
          <>
            <Box sx={{ display: "flex" }}>
              <IconButton
                size="small"
                onClick={(e) => openReadPanel(e, params.row)}
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
      <Card sx={{ mt: 2 }}>
        <CardContent>
          <Stack
            direction="row"
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: "bold",
              }}
              color="#8a2b06"
            >
              Seed Paper :
              <br />
              <Chip
                label={seedPaperDetails?.year}
                size="medium"
                sx={{ color: "#8a2b06", alignItems: "right" }}
              />
            </Typography>
            <a href={seedPaperDetails?.url} target="_blank">
              <OpenInNewIcon
                sx={{
                  color: "#8a2b06",
                }}
                fontSize="small"
              />
            </a>
          </Stack>

          <Typography sx={{ m: 1, fontSize: 14 }} color="text.secondary">
            {seedPaperDetails?.title}
          </Typography>
          <Divider />
          <Stack
            direction="row"
            sx={{
              mt: 1,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: "bold",
              }}
              color="#8a2b06"
            >
              Authors :
            </Typography>
          </Stack>
          <Grid
            sx={{ mb: 1, maxHeight: 80, overflowY: "scroll" }}
            container
            spacing={1}
          >
            {seedPaperDetails?.authors
              ?.map((authorName) => authorName.name)
              .map((authorName, id) => {
                return (
                  <Grid item xs={6} key={id + "authorGrid"}>
                    <Chip
                      icon={<AccountCircleIcon fontSize="small" />}
                      label={authorName}
                      size="medium"
                    />
                  </Grid>
                );
              })}
          </Grid>
          <Divider />
          <Stack
            direction="row"
            sx={{
              mt: 1,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: "bold",
              }}
              color="#8a2b06"
            >
              Abstract :
            </Typography>
          </Stack>
          <Typography
            sx={{
              m: 1,
              fontSize: 14,
              maxHeight: 80,
              overflowY: "scroll",
            }}
            color="text.secondary"
            variant="body2"
          >
            {seedPaperDetails?.abstract}
          </Typography>
          <Divider />
          <Stack
            direction="row"
            sx={{
              mt: 1,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: "bold",
              }}
              color="#8a2b06"
            >
              References :
            </Typography>
          </Stack>
          {/* {console.log(
            seedPaperDetails?.references?.map((v, id) => ({ ...v, id: id + 1 }))
          )} */}
          <Box sx={{ m: 1 }}>
            <div style={{ mt: 1, height: 250 }}>
              <DataGrid
                autoPageSize
                pagination
                rows={
                  seedPaperDetails?.references?.map((v, id) => ({
                    ...v,
                    id: id + 1,
                  })) ?? []
                }
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                rowHeight={25}
              ></DataGrid>
            </div>
          </Box>
        </CardContent>
      </Card>
      <PaperDetailsModal openRead={openRead} handleClose={handleClose} refData={refData}/>
    </>
  );
};

export default SeedPaperCard;
