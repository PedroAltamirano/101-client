import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import './style/movies.css'
import BaseTable from './components/baseTable';
import MovieDetail from './components/movieDetail';
import MovieForm from './components/movieForm';

import { IconButton, Button } from '@mui/material';

import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Stack from '@mui/material/Stack';

import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';

function createData(id, name, description, duration, genre, actors) {
  return { id, name, description, duration, genre, actors };
}

const rows = [
  createData(1, 'Frozen yoghurt', 'Descripcion 1...', 120, 1, [1, 2]),
  createData(2, 'Ice cream sandwich', 'Descripcion 2...', 120, 2, [3, 2]),
  createData(3, 'Eclair', 'Descripcion 3..', 120, 3, [1, 2]),
  createData(4, 'Cupcake', 'Descripcion 4...', 120, 1, [3, 2]),
  createData(5, 'Gingerbread', 'Descripcion 5...', 120, 2, [1, 2]),
];

const Movies = () => {
  const [detail, setDetail] = useState(false)
  const [form, setForm] = useState(false)
  const [data, setData] = useState()

  const openDetail = data => {
    setData(data)
    setDetail(true)
  }
  const openForm = data => {
    setData(data)
    setForm(true)
  }

  const closeDetail = () => {
    setDetail(false)
    setData(null)
  }
  const closeForm = () => {
    setForm(false)
    setData(null)
  }

  return (
    <>
      <BaseTable title='Películas' addAction={openForm}>
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
                  <IconButton aria-label="ver película" onClick={() => openDetail(row)}>
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton aria-label="editar película" onClick={() => openForm(row)}>
                    <EditIcon />
                  </IconButton>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </BaseTable>
      <Stack direction='row-reverse' sx={{ mt: 2 }}>
        <Link to='/actores'><Button variant="outlined">Actores</Button></Link>
      </Stack>
      <MovieDetail data={data} open={detail} handleClose={closeDetail} />
      <MovieForm data={data} open={form} handleClose={closeForm} />
    </>
  )
}

export default Movies