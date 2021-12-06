import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import './style/actors.css'
import BaseTable from './components/baseTable';
import ActorForm from './components/actorForm';

import { IconButton, Button } from '@mui/material';

import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Stack from '@mui/material/Stack';

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
  const [form, setForm] = useState(false)
  const [data, setData] = useState()

  const openForm = data => {
    setData(data)
    setForm(true)
  }

  const closeForm = () => {
    setForm(false)
    setData(null)
  }

  return (
    <>
      <BaseTable title='Actores' addAction={openForm}>
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
                  <IconButton aria-label="editar actor" onClick={() => openForm(row)}>
                    <EditIcon />
                  </IconButton>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </BaseTable>
      <Stack direction='row-reverse' sx={{ mt: 2 }}>
        <Link to='/'><Button variant="outlined">Películas</Button></Link>
      </Stack>
      <ActorForm data={data} open={form} handleClose={closeForm} />
    </>
  )
}

export default Actors