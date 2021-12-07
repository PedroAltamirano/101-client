import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { baseAPI } from './config/api';

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

const Movies = () => {
  const [genres, setGenres] = useState()
  const [actors, setActors] = useState()
  const [movies, setMovies] = useState()
  const [loading, setLoading] = useState(true)

  const fetchGenres = async () => {
    const res = await fetch(`${baseAPI}genres`)
    const data = await res.json()
    setGenres(data)
    setLoading(false)
  }

  const fetchActors = async () => {
    const res = await fetch(`${baseAPI}actors`)
    const data = await res.json()
    setActors(data)
    setLoading(false)
  }

  const fetchMovies = async () => {
    const res = await fetch(`${baseAPI}movies`)
    const data = await res.json()
    setMovies(data)
    setLoading(false)
  }

  useEffect(() => {
    if (!genres || genres.length < 1) fetchGenres()
    if (!actors || actors.length < 1) fetchActors()
    if (!movies || movies.length < 1) fetchMovies()

    // return () => {
    //   cleanup
    // }
  }, [genres, actors, movies])

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
          {
            loading ?
              <TableRow>
                <TableCell align="center" colSpan={4}>
                  cargando...
                </TableCell>
              </TableRow> :
              movies && movies.length ?
                movies.map((movie) => (
                  <TableRow
                    key={movie.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {movie.name}
                    </TableCell>
                    <TableCell>{movie.duration}</TableCell>
                    <TableCell>{genres.filter(genre => genre.id === movie.genre_id)[0].name}</TableCell>
                    <TableCell>
                      <Stack spacing={2} direction="row">
                        <IconButton aria-label="ver película" onClick={() => openDetail(movie)}>
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton aria-label="editar película" onClick={() => openForm(movie)}>
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
        <Link to='/actores'><Button variant="outlined">Actores</Button></Link>
      </Stack>
      <MovieDetail data={data} actors={actors} open={detail} handleClose={closeDetail} />
      <MovieForm data={data} genres={genres} actors={actors} open={form} handleClose={closeForm} fetchMovies={fetchMovies} />
    </>
  )
}

export default Movies