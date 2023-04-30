import { CardContent, Chip, Grid, Typography } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import React, { useCallback, useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";


const SeedPaperCard = ({ seedPaperDetails }) => {
  //   const [seedPaperData, setSeedPaperData] = useState({});

  console.log("SEED : ", seedPaperDetails);

  return (
    <>
      <Card sx={{ mt: 2, p: 1 }}>
        <CardContent sx={{ p: 1 }}>
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
              <Chip label={seedPaperDetails?.year} size="small" sx={{ alignItems: "right" }} />
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

          <Typography sx={{ m: 1, fontSize: 12 }} color="text.secondary">
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
          <Grid sx={{ mb: 1 }} container spacing={1}>
            {seedPaperDetails?.authors
              ?.map((authorName) => authorName.name)
              .map((authorName, id) => {
                return (
                  <Grid item xs={6} key={id + "authorGrid"}>
                    <Chip
                      icon={<AccountCircleIcon fontSize="small" />}
                      label={authorName}
                      size="small"
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
              fontSize: 12,
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
          {/* {seedPaperDetails?.references} */}
        </CardContent>
      </Card>
    </>
  );
};

export default SeedPaperCard;
