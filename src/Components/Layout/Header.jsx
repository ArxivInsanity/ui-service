import { Fragment } from "react";
import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import axios from "axios";
import { useEffect } from 'react';

import classes from "./Header.module.css";
import axiosConfig from "../../Util/AxiosConfig";

const settings = ['Logout'];

function AppBar() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = (event) => {
    // TODO logout , clear cookies here or local storage if we are passing token instead of cookies
  };

  const [isUserLoggedIn, setIsUserLoggedIn] = React.useState(false);
  const [userDetails, setUserDetails] = React.useState({});
  useEffect(() => {
    axiosConfig.get("/auth/getUserInfo")
      .then((response) => {
        console.log("Got user info", response);
        if (response === "User not logged in") {
          setIsUserLoggedIn(false);
        } else {
          setIsUserLoggedIn(true);
          setUserDetails(response);
        }
      })
      .catch((error) => {
        console.log("Error Failed", error);
      });
  }, []);

  // const checkIfUserLoggedIn = () => {
  //   axios({
  //     method: "get",
  //     url: "http://localhost:8080/auth/isLoggedIn",
  //     params: {
  //       userName: "Erlic Bachman"
  //     }
  //   })
  //   .then((response) => {
  //     console.log("Got Collection Success", response);
  //     this.setState({collections: response.data})
  //   })
  //   .catch((error) => {
  //     console.log("Error Failed", error);
  //   });
  // }

  return (
    <Fragment>
      <header className={classes.header}>
        <h1 style={{ margin: '0px' }}>Arxiv Insanity</h1>
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              {isUserLoggedIn ? <Avatar alt="Remy Sharp" src={userDetails.data.profilePic} imgProps={{ referrerPolicy: "no-referrer" }} /> :
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />}
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center" onClick={(e) => { handleLogout(e) }}>{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </header>
    </Fragment>
  );
}

export default AppBar;
