import * as React from 'react';
import { Link } from 'react-router-dom';

import './style/actors.css'

import { Typography, IconButton, Button } from '@mui/material';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Stack from '@mui/material/Stack';

import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

function createData(id, img, name, age) {
  return { id, img, name, age };
}

const rows = [
  createData(1, 'foto...', 'Nombre Apell 1', 30),
  createData(2, 'foto...', 'Nombre Apell 1', 30),
  createData(3, 'foto...', 'Nombre Apell 1', 30),
  createData(4, 'foto...', 'Nombre Apell 1', 30),
  createData(5, 'foto...', 'Nombre Apell 1', 30),
];

const Actors = () => {

  const openDetail = data => { console.log('detail') }
  const openNew = () => { console.log('new') }
  const openEdit = data => { console.log('edit') }

  return (
    <>
      <Stack spacing={2} direction="row" justifyContent="space-between">
        <Typography variant="h2" component='h2' mt={2}>Actores</Typography>
        <IconButton aria-label="nuevo actor" size="large" onClick={openNew}>
          <AddIcon fontSize="inherit" />
        </IconButton>
      </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Foto</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Edad</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.img}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.age}</TableCell>
                <TableCell>
                  <Stack spacing={2} direction="row">
                    <IconButton aria-label="editar actor" onClick={row => openEdit(row)}>
                      <EditIcon />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack direction='row-reverse' sx={{ mt: 2 }}>
        <Link to='/'><Button variant="outlined">Películas</Button></Link>
      </Stack>
    </>
  )
}

export default Actors