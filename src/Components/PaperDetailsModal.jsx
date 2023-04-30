import { Chip, Box, Stack, Typography, Grid, Divider, Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const PaperDetailsModal = ({openRead, handleClose, refData}) => {
  return (
    <Dialog open={openRead} onClose={handleClose}>
      <DialogTitle
        sx={{
          fontSize: 20,
          fontWeight: 700,
          bgcolor: "#8a2b06",
        }}
        color="#ffffff"
      >
        {refData?.title}
        <br />
        <Chip
          label={refData?.year}
          size="medium"
          sx={{
            mt: 1,
            fontSize: 16,
            color: "#ffffff",
            border: 1,
            boxShadow: 10,
          }}
          variant="outlined"
        />
      </DialogTitle>
      <Box sx={{ background: "#8a2b06" }}>
        <DialogContent sx={{ m: 1, borderRadius: 1, boxShadow: 2, background: "#ffffff" }}>
          <Stack
            direction="row"
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                fontSize: 18,
                fontWeight: 600,
              }}
              color="#8a2b06"
            >
              Authors :
            </Typography>
          </Stack>
          <Grid sx={{ m: 1, maxHeight: 80, overflowY: "scroll" }} container spacing={1}>
            {refData?.authors
              ?.map((authorName) => authorName.name)
              .map((authorName, id) => {
                return (
                  <Grid item xs={4} key={id + "authorGrid"}>
                    <Chip icon={<AccountCircleIcon fontSize="small" />} label={authorName} size="medium" />
                  </Grid>
                );
              })}
          </Grid>
          <Divider sx={{ mt: 2, mb: 2 }} />
          <Stack
            direction="row"
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                fontSize: 18,
                fontWeight: 600,
              }}
              color="#8a2b06"
            >
              Abstract :
            </Typography>
          </Stack>
          <DialogContentText
            sx={{
              m: 1,
              fontSize: 16,
              maxHeight: 200,
              overflowY: "scroll",

              align: "justify",
            }}
            color="text.secondary"
            variant="body2"
          >
            <Box sx={{ m: 1 }}>{refData?.abstract}</Box>
          </DialogContentText>
        </DialogContent>
      </Box>
      <DialogActions sx={{ justifyContent: "center", bgcolor: "#8a2b06" }}>
        <Button
          onClick={() => window.open(refData?.url, "_blank", "noreferrer")}
          variant="outlined"
          size="medium"
          sx={{
            fontSize: 16,
            color: "#ffffff",
            border: 1,
            boxShadow: 10,
          }}
          startIcon={<OpenInNewIcon />}
        >
          Read More
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaperDetailsModal;
