import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HomeIcon from "@mui/icons-material/Home";

export const ProjectBreadCrumbs = ({ projectName }) => {
  console.log(projectName);
  return (
    <Box m={1}>
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{
          display: "flex",
          alignItems: "center",
        }}
        separator={<NavigateNextIcon fontSize="small" />}
      >
        <Link
          underline="hover"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          href="/dashboard"
        >
          <HomeIcon sx={{ mr: 0.1 }} fontSize="inherit" />
          <Typography fontSize="inherit">Home</Typography>
        </Link>
        <Typography color="text.primary">{projectName}</Typography>
      </Breadcrumbs>
    </Box>
  );
};
