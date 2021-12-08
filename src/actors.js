import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { baseURL, baseAPI } from './config/api'

import './style/actors.css'
import BaseTable from './components/baseTable';
import ActorForm from './components/actorForm';

import { IconButton, Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';

import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Stack from '@mui/material/Stack';

import EditIcon from '@mui/icons-material/Edit';

const getImageUrl = name => `${baseURL}uploads/${name}`

const Actors = () => {
  const [actors, setActors] = useState()
  const [loading, setLoading] = useState(true)

  const fetchActors = async () => {
    const res = await fetch(`${baseAPI}actors`)
    const data = await res.json()
    setActors(data)
    setLoading(false)
  }

  useEffect(() => {
    if (!actors || actors.length < 1) fetchActors()

    // return () => {
    //   cleanup
    // }
  }, [actors])

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
          {
            loading ?
              <TableRow>
                <TableCell align="center" colSpan={4}>
                  cargando...
                </TableCell>
              </TableRow> :
              actors && actors.length ?
                actors.map((actor) => (
                  <TableRow
                    key={actor.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Avatar alt={actor.name} src={getImageUrl(actor.img)} />
                    </TableCell>
                    <TableCell>{actor.name}</TableCell>
                    <TableCell>{actor.age}</TableCell>
                    <TableCell>
                      <Stack spacing={2} direction="row">
                        <IconButton aria-label="editar actor" onClick={() => openForm(actor)}>
                          <EditIcon />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                )) :
                <TableRow>
                  <TableCell align="center" colSpan={4}>
                    Sin datos...
                  </TableCell>
                </TableRow>
          }
        </TableBody>
      </BaseTable>
      <Stack direction='row-reverse' sx={{ mt: 2 }}>
        <Link to='/'><Button variant="outlined">Películas</Button></Link>
      </Stack>
      <ActorForm data={data} open={form} handleClose={closeForm} fetchActors={fetchActors} />
    </>
  )
}

export default Actors