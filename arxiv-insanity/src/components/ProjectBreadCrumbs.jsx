import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export const ProjectBreadCrumbs = ({ projectName }) => {
  console.log(projectName);
  return (
    <Box m={2}>
          <Breadcrumbs aria-label="breadcrumb" separator={ <NavigateNextIcon fontsize='small'/>}>
        <Link underline="hover" href="/dashboard">
          Home
        </Link>
        <Typography color="text.primary">{projectName}</Typography>
      </Breadcrumbs>
    </Box>
  );
};
