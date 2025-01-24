import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

interface Player{
    email: string,
    score: number,
    createdAt: string
}

export default function LeaderBoard() {
    const [players, setPlayers] = useState<Player[]>([]);
    useEffect(() => {
        async function fetchData() {
          try {
            const response = await axios.get('http://localhost:5296/api/Quiz/users');
            setPlayers(response.data);
          }catch (error){
            console.error(error);
          }
        }
        fetchData();
      }, []);
    return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>Score</TableCell>
                <TableCell align="right">Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {players.slice(0,10).map((player, index) => (
                <TableRow
                  key={player.email}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 },
                   bgcolor:  index===0 ? "gold" :
                    index === 1 ? "silver" :
                    index === 2 ? "#FF5733" : ""}}
                >
                    <TableCell component="th" scope="row">
                    {player.email}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {player.score}
                  </TableCell>
                  <TableCell align="right">{player.createdAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
}