import React from "react";
import '../App.css';
import { NavLink } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider, createTheme } from '@mui/material/styles';

function appBarLabel(label) {
  return (
    <Toolbar>
      <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
        {label}
      </Typography>
    </Toolbar>
  );
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

const Menu=()=>{
    
    return(
        <div className="divManu">
            
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              <ThemeProvider theme={darkTheme}>
                
                <AppBar position="static" float="left" color="primary">
                  {(<ul className='menu'  style={{listStyle:'none',float:'left',}}>

                <li> &nbsp;&nbsp;&nbsp;&nbsp;<NavLink to='/'>Home</NavLink>&nbsp;&nbsp;&nbsp;&nbsp;</li>
                <li><NavLink to='/memo'>Memo</NavLink>&nbsp;&nbsp;&nbsp;&nbsp;</li>
                <li><NavLink to='/login'>Login</NavLink>&nbsp;&nbsp;&nbsp;&nbsp;</li>
                <li><NavLink to='/member/form'>Member</NavLink>&nbsp;&nbsp;&nbsp;&nbsp;</li>
                <li><NavLink to='/shop/list'>Shop</NavLink>&nbsp;&nbsp;&nbsp;&nbsp;</li>
                <li><NavLink to='/board/list/1'>Board</NavLink>&nbsp;&nbsp;&nbsp;&nbsp;</li>
                
                <li><NavLink to='/about'>About</NavLink></li>
            </ul>)}
                </AppBar>
              </ThemeProvider>
            </Stack>    
      
            
          
    
        </div>
    )
}
export default Menu;