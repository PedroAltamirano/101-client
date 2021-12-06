import * as React from 'react';

import './style/movies.css'

import { Typography, IconButton } from '@mui/material';

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

function createData(id, name, description, duration, genre) {
  return { id, name, description, duration, genre };
}

const rows = [
  createData(1, 'Frozen yoghurt', 'Descripcion 1...', 120, 'genero 1'),
  createData(2, 'Ice cream sandwich', 'Descripcion 2...', 120, 'genero 2'),
  createData(3, 'Eclair', 'Descripcion 3..', 120, 'genero 3'),
  createData(4, 'Cupcake', 'Descripcion 4...', 120, 'genero 1'),
  createData(5, 'Gingerbread', 'Descripcion 5...', 120, 'genero 2'),
];

const Movies = () => {

  const openDetail = data => { console.log('detail') }
  const openNew = () => { console.log('new') }
  const openEdit = data => { console.log('edit') }

  return (
    <>
      <Stack spacing={2} direction="row" justifyContent="space-between">
        <Typography variant="h2" component='h2' mt={2}>Películas</Typography>
        <IconButton aria-label="nueva película" size="large" onClick={openNew}>
          <AddIcon fontSize="inherit" />
        </IconButton>
      </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Duración (minutos)</TableCell>
              <TableCell>Género</TableCell>
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
                  {row.name}
                </TableCell>
                <TableCell>{row.duration}</TableCell>
                <TableCell>{row.genre}</TableCell>
                <TableCell>
                  <Stack spacing={2} direction="row">
                    <IconButton aria-label="ver película" onClick={row => openDetail(row)}>
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton aria-label="editar película" onClick={row => openEdit(row)}>
                      <EditIcon />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Movies