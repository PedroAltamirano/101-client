import * as React from 'react';
import { useState, useEffect } from 'react';
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

const baseApi = 'http://127.0.0.1:3000/api/'

const Movies = () => {
  const [genres, setGenres] = useState()
  const [actors, setActors] = useState()
  const [movies, setMovies] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGenres = async () => {
      console.log('fetchin...')
      const res = await fetch(`${baseApi}genres`)
      const data = await res.json()
      setGenres(data)
    }

    const fetchActors = async () => {
      console.log('fetchin...')
      const res = await fetch(`${baseApi}actors`)
      const data = await res.json()
      setActors(data)
    }

    const fetchMovies = async () => {
      console.log('fetchin...')
      const res = await fetch(`${baseApi}movies`)
      const data = await res.json()
      setMovies(data)
      setLoading(false)
    }

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
              <p>cargando...</p> :
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
                    <TableCell>{movie.genre}</TableCell>
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
                <div>sin datos</div>
          }
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