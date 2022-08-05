import { useGlobalState } from "../utilities/context";
import { Link, useNavigate } from "react-router-dom";

import { Box, Container } from "@mui/system";
import { AppBar, Avatar, Button, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { blue } from "@mui/material/colors";

const Navigation = () => {
    const navigate = useNavigate();

    const { store, dispatch } = useGlobalState();
    const { user } = store;

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const logout = (event) => {
        event.preventDefault();

        handleCloseUserMenu();

        dispatch({
            type: "setUser",
            data: null,
        });

        navigate("/");
    };

    return (
        <nav>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        {/* Desktop Logo */}
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: "none", md: "flex" },
                                fontFamily: "roboto",
                                fontWeight: 700,
                                letterSpacing: ".2rem",
                                color: "inherit",
                                textDecoration: "none",
                            }}>
                            APPETIZE YOU
                        </Typography>
                        {/* Desktop Menu */}
                        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                            <Button component={Link} to="/recipes" onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }}>
                                Recipes
                            </Button>
                            {user && (
                                <Button component={Link} to="/recipes/new" onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }}>
                                    Post new recipe
                                </Button>
                            )}
                        </Box>
                        {/* Mobile Menu */}
                        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                            <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: "block", md: "none" },
                                }}>
                                <MenuItem component={Link} to="/recipes" onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">Recipes</Typography>
                                </MenuItem>
                                <MenuItem component={Link} to="/recipes/new" onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">Post new recipe</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                        {/* Mobile Logo */}
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href=""
                            sx={{
                                mr: 2,
                                display: { xs: "flex", md: "none" },
                                flexGrow: 1,
                                fontFamily: "roboto",
                                fontWeight: 700,
                                letterSpacing: ".2rem",
                                color: "inherit",
                                textDecoration: "none",
                            }}>
                            APPETIZE YOU
                        </Typography>
                        {/* User Menu */}
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    {user ? <Avatar sx={{ bgcolor: blue[300] }}>{user.username[0]}</Avatar> : <Avatar sx={{ bgcolor: blue[300] }} />}
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: "45px" }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}>
                                {user && (
                                    <MenuItem component={Link} to="/auth/profile" onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">Profile ({user.username})</Typography>
                                    </MenuItem>
                                )}
                                {user && (
                                    <MenuItem component={Link} to="/recipes/mypost" onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">My posts</Typography>
                                    </MenuItem>
                                )}
                                {user && (
                                    <MenuItem component={Link} to="/" onClick={logout}>
                                        <Typography textAlign="center">Log out</Typography>
                                    </MenuItem>
                                )}
                                {!user && (
                                    <MenuItem component={Link} to="/auth/login" onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">Log in</Typography>
                                    </MenuItem>
                                )}
                                {!user && (
                                    <MenuItem component={Link} to="/auth/signup" onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">Sign up</Typography>
                                    </MenuItem>
                                )}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </nav>
    );
};

export default Navigation;
