import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router";

const Header = () => {
    return (
        <div className="border-b border-gray-700 bg-gradient-to-t from-[#1a1a1a] to-[#111]">
            <AppBar position="static" sx={{ backgroundColor: "#1a1a1a", boxShadow: "none" }}>
                <Toolbar className="flex justify-between px-4 md:px-12">
                    {/* Logo / Brand */}
                    <Link to={"/"} className="flex items-center space-x-2">
                        <img src="/LOGO.png" alt="LOGO" width={100} />
                    </Link>

                    {/* Nav / Actions */}
                    <div className="hidden md:flex space-x-4">
                        <Link to={"/add-movie"}>
                            <Button color="warning" variant="text">Add Movie</Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Icon */}
                    <div className="md:hidden">
                        <IconButton edge="end" color="inherit" aria-label="menu">
                            <MenuIcon sx={{ color: "orange" }} />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;
