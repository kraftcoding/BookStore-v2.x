import { Box, Typography, CssBaseline } from '@mui/material';
import { FooterContainer } from './Footer.styles';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHook';
import { useEffect, useState } from 'react';
import { getVersion, setVersion } from '../../redux/reducers/authSlice';

const Footer = () => {
  const version = useAppSelector((state) => state.auth.version);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchVersion = async () => {
        try {              
          var res = await dispatch(getVersion());        
          if (res.payload != undefined) {  
                  dispatch(setVersion(res.payload));
          }    
        } catch (e) {
          console.log(e);
        }
      };
      fetchVersion();
    }, [dispatch]);
  
  return (
    <div>
      <FooterContainer maxWidth={false}>
        <Box sx={{ m: 1, p: 2 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
            }}
          >
            INFO
          </Typography>
          <CssBaseline />
          <Typography variant="body1">Contact us</Typography>        
          <Typography variant="body1">About eLoan</Typography>
          <Typography variant="body1">Careers</Typography>
          <Typography variant="body1">Privacy policy</Typography>
        </Box>
        <Box sx={{ m: 1, p: 2 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
            }}
          >
            FOR LOANS
          </Typography>  
          <Typography variant="body1">Returns</Typography>
          <Typography variant="body1">Terms and conditions</Typography>
          <Typography variant="body1">Frequently asked questions</Typography>
        </Box>{' '}
        <Box sx={{ m: 1, p: 2 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
            }}
          >
            SHORTCUTS
          </Typography>
          <CssBaseline />
          <Typography variant="body1">Log in</Typography>
          <Typography variant="body1">Search alert</Typography>
          <Typography variant="body1">Search </Typography>
        </Box>
        <Box sx={{ m: 1, p: 2 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
            }}
          >
            LOANS
          </Typography>
          <CssBaseline />
          <Typography variant="body1">Books</Typography>
          <Typography variant="body1">Articles</Typography>
        </Box>
        <Box sx={{ m: 1, p: 2 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
            }}
          >
            FOLLOW US
          </Typography>
          <CssBaseline />
          <Typography variant="body1">Instagram</Typography>
          <Typography variant="body1">Facebook</Typography>
          <Typography variant="body1">Twitter</Typography>
          <Typography variant="body1">Blog</Typography>
        </Box>
      </FooterContainer>
      <div style={{ textAlign: 'right', padding: '10px', backgroundColor: '#f5f5f5' }}>
        <Typography variant="body2" color="textSecondary">
          Front-end v0.7.2 - Back-end v{version || '?'}
        </Typography>
        </div>
    </div>
  );
};

export default Footer;
