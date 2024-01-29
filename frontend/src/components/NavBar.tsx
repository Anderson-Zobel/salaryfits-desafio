import React, { useState } from "react";
import { useLocation  } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/system";
import { Box, Drawer, useMediaQuery } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import logo from '/dog_cat_pixel.png'
import Button, { ButtonProps } from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';


const StyledAppBar = styled(AppBar)({
    background: "#8AA9C1",
    height: 64,
});

const StyledButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.primary.contrastText && "#fff",
    backgroundColor: theme.palette.primary.main && "transparent",
    "&:hover": {
        backgroundColor: theme.palette.primary.main,
    },
    flex: 1,
    height: "100%",
}));



const NavBar: React.FC = () => {
    const navigate = useNavigate()
    const sizeMatch = useMediaQuery("(min-width:900px)");
    const [open, setOpen] = useState(false);

    const location = useLocation();

    const isButtonSelected = (route: string) => {
        return location.pathname === route;
    };

    return (
        <StyledAppBar position="static">
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'space-around',
                }}
            >
                {sizeMatch ? (
                    <>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column',
                                mt: '0.3rem',
                            }}
                        >
                            <Avatar
                                alt="Logo"
                                src={logo}
                                sx={{ width: 40, height: 40, marginRight: 1 }}
                            />
                            <Typography variant="h6" component="div">
                                PetShop SalaryFits
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                ml: '2rem',
                                height: '100%'
                            }}
                        >
                            <StyledButton
                                color="inherit"
                                sx={{ paddingX: '1rem', borderRadius: 0, backgroundColor: isButtonSelected('/') && "#1565c0"  } as  React.CSSProperties}
                                onClick={() => navigate('/')}
                            >
                                Agendamentos
                            </StyledButton>
                            <StyledButton
                                color="inherit"
                                sx={{ paddingX: '1rem', borderRadius: 0, backgroundColor: isButtonSelected('/clientes') && "#1565c0"  } as  React.CSSProperties}
                                onClick={() => navigate('/clientes')}

                            >
                                Clientes
                            </StyledButton>
                            <StyledButton
                                color="inherit"
                                sx={{ paddingX: '1rem', borderRadius: 0, backgroundColor: isButtonSelected('/pets') && "#1565c0"  } as  React.CSSProperties}
                                onClick={() => navigate('/pets')}
                            >
                                Pets
                            </StyledButton>
                        </Box>
                    </>
                ) : (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '100%'
                        }}
                    >
                        <Button
                            onClick={() => setOpen(true)}
                        >
                            <MenuIcon sx={{ fontSize: '50px' }} />
                        </Button>
                        <Drawer
                            open={open}
                            onClose={() => setOpen(false)}
                            PaperProps={{
                                sx: {
                                    width: 200,
                                    maxWidth: "100%",
                                    backgroundColor: '#8AA9C1',
                                },
                            }}
                        >
                            <StyledButton
                                color="inherit"
                                sx={{ paddingX: '1rem', borderRadius: 0, backgroundColor: isButtonSelected('/') && "#1565c0"  } as  React.CSSProperties}
                                onClick={() => {
                                    navigate('/')
                                    setOpen(false)
                                }}
                            >
                                Agendamentos
                            </StyledButton>
                            <StyledButton
                                color="inherit"
                                sx={{ paddingX: '1rem', borderRadius: 0, backgroundColor: isButtonSelected('/clientes') && "#1565c0"  } as  React.CSSProperties}
                                onClick={() => {
                                    setOpen(false)
                                    navigate('/clientes')
                                }}
                            >
                                Clientes
                            </StyledButton>
                            <StyledButton
                                color="inherit"
                                sx={{ paddingX: '1rem', borderRadius: 0, backgroundColor: isButtonSelected('/pets') && "#1565c0"  } as  React.CSSProperties}
                                onClick={() => {
                                    setOpen(false)
                                    navigate('/pets')
                                }}
                            >
                                Pets
                            </StyledButton>
                        </Drawer>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column',
                                m: '0.3rem',
                            }}
                        >
                            <Avatar
                                alt="Logo"
                                src={logo}
                                sx={{ width: 40, height: 40, marginRight: 1 }}
                            />
                            <Typography variant="h6" component="div">
                                PetShop SalaryFits
                            </Typography>
                        </Box>
                    </Box>
                )}
            </Toolbar>
        </StyledAppBar>
    );
};

export default NavBar;
