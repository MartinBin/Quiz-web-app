import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function Navbar(){

    let navigate = useNavigate();
    const takeQuiz = () => {
        navigate("/");
    }

    const results = () => {
        navigate("/results");
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Quiz taker
              </Typography>
              <Button onClick={takeQuiz} variant="contained" color="warning" >Take Quiz</Button>
              <Button onClick={results} color="inherit">LeaderBoard</Button>
            </Toolbar>
          </AppBar>
        </Box>
      );
}