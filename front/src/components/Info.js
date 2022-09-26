import React from "react";
import '../App.css';
// import infoimg from '../image/40.jpg';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

        const StyledBadge = styled(Badge)(({ theme }) => ({
            '& .MuiBadge-badge': {
            backgroundColor: '#44b700',
            color: '#44b700',
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            '&::after': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                animation: 'ripple 1.2s infinite ease-in-out',
                border: '1px solid currentColor',
                content: '""',
            },
            },
            '@keyframes ripple': {
            '0%': {
                transform: 'scale(.8)',
                opacity: 1,
            },
            '100%': {
                transform: 'scale(2.4)',
                opacity: 0,
            },
            },
        }));
        
        const SmallAvatar = styled(Avatar)(({ theme }) => ({
            width: 22,
            height: 22,
            border: `2px solid ${theme.palette.background.paper}`,
        }));

        
const Info=()=>{
    return(
        <div>
            {/* <img src={infoimg} alt='' style={{width:'250px'}}/> */}
            <br/><br/>
            <div className="na">비트캠프</div><br/>
            <div className="ME">010-4444-8888</div><br></br>
            <Stack direction="row" spacing={2}>
                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                >
                    {/* <Avatar alt="Remy Sharp" src="../image/36.jpg" /> */}
                </StyledBadge>
                
            </Stack>
        </div>
    )
}
export default Info;