import {
  CardContent,
  Chip,
  Grid,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import React, { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { DataGrid } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PaperDetailsModal from "../Components/PaperDetailsModal";
import axiosConfig from "../Util/AxiosConfig";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const SeedPaperCard = ({
  seedPaperId,
  setProjectListFunc,
  projectName,
  seedPapers,
}) => {
  const [seedPaperDetails, setSeedPaperDetails] = useState({});
  const [seedPaperData, setSeedPaperData] = useState({});
  const [refData, setRefData] = useState({});
  const [openRead, setOpenRead] = React.useState(false);
  const [bookmark, setBookmark] = React.useState(false);
  const [savePaper, setSavePaper] = React.useState(false);

  useEffect(() => {
    console.log("set Seed Paper Card Data : ", seedPaperId);
    setBookmark(false);
    if (seedPaperId?.length > 0) {
      console.log("List of Seed Papers : ", seedPapers);
      if (seedPapers?.filter((val) => val.id === seedPaperId)?.length > 0) {
        console.log("Found");
        setBookmark(true);
      }
      axiosConfig
        .get("/api/papers/" + seedPaperId)
        .then((response) => {
          console.log("Card Response : ", response);
          if (response?.data?.data !== null) {
            setSeedPaperDetails(response?.data?.data);
          }
        })
        .catch((error) => {
          console.log("Error Failed", error);
        });
    }
  }, [seedPaperId, seedPapers]);

  useEffect(() => {
    console.log("READING PANEL : ", seedPaperData);
    if (seedPaperData?.paperId?.length > 0) {
      axiosConfig
        .get("/api/papers/" + seedPaperData.paperId)
        .then((response) => {
          console.log("References Response : ", response);
          if (response?.data?.data !== null) {
            setRefData(response?.data?.data);
          }
        })
        .catch((error) => {
          console.log("Error Failed", error);
        });
    }
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

  const handleSavePaper = () => {
    setBookmark(true);
    setSavePaper(true);
    axiosConfig
      .put("api/projects/" + projectName + "/seedPapers", {
        id: seedPaperId,
        name: seedPaperDetails.title,
      })
      .then((response) => {
        console.log("Added the seedPaper: ", response);
        axiosConfig
          .get("api/projects/" + projectName + "/seedPapers")
          .then((response) => {
            console.log("Fetched seed paper : ", response);
            setProjectListFunc(response?.data);
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
      <Card sx={{ mt: 1 }}>
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
                fontSize: 16,
                fontWeight: "bold",
              }}
              color="#8a2b06"
            >
              Title :
            </Typography>
            <Stack direction="row" spacing={2}>
              {bookmark === true ? (
                <BookmarkIcon
                  sx={{
                    color: "#8a2b06",
                  }}
                  fontSize="small"
                  // onClick={() => setBookmark(false)}
                />
              ) : (
                <BookmarkAddOutlinedIcon
                  sx={{
                    color: "#8a2b06",
                  }}
                  fontSize="small"
                  onClick={() => {
                    handleSavePaper();
                  }}
                />
              )}
              <a href={seedPaperDetails?.url} target="_blank">
                <OpenInNewIcon
                  sx={{
                    color: "#8a2b06",
                  }}
                  fontSize="small"
                />
              </a>
            </Stack>
          </Stack>

          <Typography
            sx={{ m: 1, fontSize: 14, fontWeight: "bold" }}
            color="text.primary"
          >
            {seedPaperDetails?.title}
          </Typography>
          <Chip
            label={"Year: " + seedPaperDetails?.year}
            size="medium"
            sx={{ mb: 1, fontWeight: "bold", color: "#8a2b06" }}
          />
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
                fontSize: 16,
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
                fontSize: 16,
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
              maxHeight: 120,
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
                fontSize: 16,
                fontWeight: "bold",
              }}
              color="#8a2b06"
            >
              References :
            </Typography>
          </Stack>
          <Box sx={{ m: 1 }}>
            <div style={{ mt: 1, height: 240 }}>
              <DataGrid
                autoPageSize
                pagination
                rows={
                  seedPaperDetails?.references
                    ?.filter((refPaper) => refPaper?.paperId?.length > 0)
                    .map((v, id) => ({
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
      <PaperDetailsModal
        openRead={openRead}
        handleClose={handleClose}
        refData={refData}
      />
      <Snackbar
        open={savePaper}
        autoHideDuration={3000}
        onClose={() => setSavePaper(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Seed Paper Added!
        </Alert>
      </Snackbar>
    </>
  );
};

export default SeedPaperCard;
