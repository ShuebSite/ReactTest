import React from 'react';
import { BrowserRouter as Router, Route, Link, BrowserRouter, Routes, useNavigate, useParams } from 'react-router-dom';
import { Button, Modal, Paper, TextField, Typography, Box, AppBar, Toolbar, IconButton, Container, Menu, MenuItem, Tooltip, Avatar } from '@mui/material';
// import { MenuIcon } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import { useAuth } from "react-oidc-context";

const pages = ['リスト', '投稿', '三目並べゲーム', 'メール送信', 'ログアウト'];

function Header() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const auth = useAuth();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (str) => {
    setAnchorElNav(null);
    switch (str) {
        // case 'ホーム':
        //     navigate(`/`)
        //     break;
        case 'リスト':
            navigate(`/list/`)
            break;
        case '投稿':
            navigate(`/form/`)
            break;
        case '三目並べゲーム':
            navigate(`/game/`)
            break;
        case 'メール送信':
            navigate(`/email/`)
            break;
        case 'ログアウト':
            localStorage.setItem('hasClickedLogin', 'false');  // ログイン不許可状態に設定
            auth.removeUser();
            navigate('/');
            break;
        default:
            break;
    }
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            WishList
          </Typography>

          {/* 認証済みの場合のみメニューを表示 */}
          {auth.isAuthenticated && (
            <>
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem 
                      key={page} 
                      onClick={() => {handleCloseNavMenu(page)}}
                      sx={page === 'ログアウト' ? {
                        borderTop: '1px solid #ddd',
                        marginTop: '8px',
                        paddingTop: '8px',
                        fontWeight: 'bold'
                      } : {}}
                    >
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </>
          )}
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            WishList
          </Typography>

          {/* 認証済みの場合のみメニューを表示 */}
          {auth.isAuthenticated && (
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => {handleCloseNavMenu(page)}}
                  sx={{ 
                    my: 2, 
                    color: 'white', 
                    display: 'block',
                    ...(page === 'ログアウト' && {
                      marginLeft: 'auto',  // 右端に配置
                      border: '1px solid white',
                      fontWeight: 'bold',
                      letterSpacing: '0.1em',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        borderColor: 'white'
                      }
                    })
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>
          )}

          <Box sx={{ flexGrow: 0 }}>
            {/* <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip> */}
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
              {/* {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))} */}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;