import * as React from 'react';
import { useState, useEffect } from 'react';

import { baseAPI } from '../config/api'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const MovieForm = ({ data, genres, actors, open, handleClose, fetchMovies }) => {
  const initialState = { name: '', description: '', duration: '', genre_id: '', actors_id: [] }
  const [form, setForm] = useState(initialState)

  useEffect(() => {
    if (data) {
      setForm({ ...data, actors_id: data.actors_id.split(',') })
    } else {
      setForm(initialState)
    }
  }, [data])

  const handleInput = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
    return
  }

  const validateForm = () => {
    for (const key in form) {
      if (form[key] === '') return true
    }
    return false
  }

  const handleSubmit = () => {
    if (validateForm()) {
      alert('datos incompletos')
      return
    }

    let url = `${baseAPI}movie`
    const data = {
      ...form,
      actors_id: form.actors_id.join()
    }

    let send = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }

    if (data.id) {
      url = `${baseAPI}movie/${data.id || ''}`
      send = {
        ...send,
        method: 'PUT',
      }
    }

    fetch(url, send)
      .then(res => res.json())
      .then(data => {
        fetchMovies()
        setForm(initialState)
        handleClose()
      })
      .catch(err => console.log(err))
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h4" fontWeight='bold'>
          Nueva Película
        </Typography>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{ width: 1, mb: 2 }}
        >
          <TextField
            fullWidth
            multiline
            maxRows={4}
            id="nombre"
            name="name"
            label="Nombre"
            sx={{ my: 1 }}
            value={form.name}
            onChange={handleInput} />
          <TextField
            fullWidth
            id="duracion"
            name="duration"
            label="Duracion (minutos)"
            sx={{ my: 1 }}
            value={form.duration}
            onChange={handleInput} />
          <FormControl fullWidth>
            <InputLabel id="genre-label">Género</InputLabel>
            <Select
              id="genero"
              name="genre_id"
              labelId="genre-label"
              label="Género"
              value={form.genre_id}
              onChange={handleInput}
            >
              {
                genres &&
                genres.map(genre => (
                  <MenuItem key={genre.id} value={genre.id}>{genre.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
          <TextField
            fullWidth
            id="sinopsis"
            name="description"
            label="Sinopsis"
            sx={{ my: 1 }}
            value={form.description}
            onChange={handleInput} />
          <FormControl fullWidth>
            <InputLabel id="actors-label">Actores</InputLabel>
            <Select
              multiple
              id="actores"
              name="actors_id"
              labelId="actors-label"
              label="Actors"
              value={form.actors_id}
              onChange={handleInput}
            >
              {
                actors &&
                actors.map(actor => (
                  <MenuItem key={actor.id} value={actor.id}>{actor.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Box>
        <Stack direction='row-reverse' gap={2}>
          <Button variant='contained' color='primary' onClick={handleSubmit}>Guardar</Button>
          <Button variant='contained' color='error' onClick={handleClose}>Cancelar</Button>
        </Stack>
      </Box>
    </Modal>
  )
}

export default MovieForm