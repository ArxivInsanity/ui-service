import { Fragment } from "react";
import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
// import axios from "axios";

import classes from "./Header.module.css";

const settings = ['Dashboard', 'Logout'];

function AppBar() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


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
        <h1>Arxiv Insanity</h1>
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
      </header>
    </Fragment>
  );
}

export default AppBar;
