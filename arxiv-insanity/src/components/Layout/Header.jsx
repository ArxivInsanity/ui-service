import { Fragment } from "react";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";

import citationImage from "../../assets/citationImage.png";
import treeImage from "../../assets/ourlogo.jpeg";
import classes from "./Header.module.css";

const cardStyle = {
    display: "block",
    maxWidth: "40%"
  };

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Arxiv Insanity</h1>
      </header>
      <div className={classes['main-image']}>
        <img src = {citationImage} alt='Citation Network'/>
            <div align="center" className={classes['overlay']}>
                <Card style={cardStyle} variant="outlined">
                    <CardMedia
                        sx={{ minHeight: "150px", paddingtop: "56.25%", marginTop:"10px"  }}
                        image={treeImage}
                        title="Arxiv Insanity Card"
                    />
                    <CardContent sx={{ marginTop:"10px"}} >
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Please sign in with Google
                        </Typography>
                    </CardContent>
                    <CardActions style={{justifyContent: 'center', marginBottom: '10px'}}>                   
                            <Button variant="contained" startIcon={<GoogleIcon />} size="large">
                                Sign in
                            </Button>                
                    </CardActions>
                </Card>
            </div>
           
        </div>
    </Fragment>
  );
};

export default Header;
