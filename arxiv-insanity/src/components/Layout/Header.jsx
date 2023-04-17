import { Fragment } from "react";

// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import Button from "@mui/material/Button";
// import GoogleIcon from "@mui/icons-material/Google";

// import citationImage from "../../assets/citationImage.png";
// import treeImage from "../../assets/ourlogo.jpeg";
import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Arxiv Insanity</h1>
      </header>
    </Fragment>
  );
};

export default Header;
