import { Fragment, useCallback } from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import treeImage from "../Assets/arxivinsanitylogo.png";
import classes from "../Components/Layout/Header.module.css";
import Header from "../Components/Layout/Header";
import { getBaseUrl } from "../api/ApiConstants";
import { loadFull } from "tsparticles";
import Particles from "react-particles";

const cardStyle = {
  display: "block",
  minWidth: "30%",
  boxShadow: "0px 4px 5px -2px rgba(0,0,0,0.2), 0px 7px 10px 1px rgba(0,0,0,0.14), 0px 2px 16px 1px rgba(0,0,0,0.12)",
};

const getAuthGoogle = () => {
  console.log("getAuthGoogle");
  const ui_base_url = window.location.origin;
  window.open(getBaseUrl() + "/auth/google?redirect_uri=" + ui_base_url + "/auth", "_self");
};

const Login = (props) => {
  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);

  return (
    <Fragment>
      <Header />
      <div style={{ position: "fixed", zIndex: "-1" }}>
        <Particles
          style={{ position: "fixed", zIndex: "-1"}}
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            background: {
              color: {
                value: "#ffffff",
              },
            },
            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
                resize: true,
              },
              modes: {
                push: {
                  quantity: 4,
                },
                repulse: {
                  distance: 200,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: {
                value: "#8a2b06",
              },
              links: {
                color: "#8a2b06",
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1,
              },
              collisions: {
                enable: true,
              },
              move: {
                directions: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: false,
                speed: 3,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 80,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 5 },
              },
            },
            detectRetina: true,
          }}
        />
      </div>
      <div align="center" className={classes["overlay"]}>
        <Card style={cardStyle} variant="outlined">
          <CardMedia
            sx={{ height: 200, paddingtop: "56.25%", marginTop: "10px", objectFit: "cover" }}
            image={treeImage}
          />
          <CardContent sx={{ marginTop: "10px" }}>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Please sign in with Google
            </Typography>
          </CardContent>
          <CardActions style={{ justifyContent: "center", marginBottom: "10px" }}>
            <Button
              variant="outlined"
              sx={{ boxShadow: 7 }}
              startIcon={<GoogleIcon />}
              size="large"
              onClick={getAuthGoogle}
            >
              Sign in
            </Button>
          </CardActions>
        </Card>
      </div>
      {/* <div className={classes['main-image']}>
        <img src = {citationImage} alt='Citation Network' style={{height: "100%", overflowY: "hidden"}} />
            <div align="center" className={classes['overlay']}>
                <Card style={cardStyle} variant="outlined">
                    <CardMedia
                        sx={{ paddingtop: "56.25%", marginTop:"10px"  }}
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
            
  </div> */}
    </Fragment>
  );
};

export default Login;
