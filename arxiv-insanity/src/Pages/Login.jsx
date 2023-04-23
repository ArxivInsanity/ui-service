import { Fragment } from "react";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";

import citationImage from "../assets/citationImage.png";
import treeImage from "../assets/ourlogo.jpeg";
import classes from "../components/Layout/Header.module.css";
import Header from "../components/Layout/Header"

const cardStyle = {
    display: "block",
    maxWidth: "40%"
  };

const getAuthGoogle = () => {
    console.log("getAuthGoogle");
    window.open("http://localhost:8080/auth/google?redirect_uri=http://localhost:3000/Dashboard","_self")
}

const Login = (props) => {
  return (
    <Fragment>
        <Header />
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
                            <Button variant="contained" startIcon={<GoogleIcon />} size="large" onClick={getAuthGoogle}>
                                Sign in
                            </Button>                
                    </CardActions>
                </Card>
            </div>
            
        </div>
    </Fragment>
  );
};

export default Login;
