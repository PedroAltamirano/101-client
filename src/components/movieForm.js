import * as React from 'react';
import { useState, useEffect } from 'react';

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

const MovieForm = ({ data, genres, actors, open, handleClose }) => {
  const initialState = { name: '', description: '', duration: '', genre: '', actors: [] }
  const [form, setForm] = useState(initialState)

  useEffect(() => {
    if (data) setForm(data);
    else setForm(initialState)
  }, [data])

  const handleInput = event => {
    console.log(event.target)
    setForm({ ...form, [event.target.name]: event.target.value })
    return
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
              name="genre"
              labelId="genre-label"
              label="Género"
              value={form.genre}
              onChange={handleInput}
            >
              {
                genres && genres.map(genre => (
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
              name="actors"
              labelId="actors-label"
              label="Actors"
              value={form.actors}
              onChange={handleInput}
            >
              {
                actors && actors.map(actor => (
                  <MenuItem key={actor.id} value={actor.id}>{actor.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Box>
        <Stack direction='row-reverse' gap={2}>
          <Button variant='contained' color='primary'>Guardar</Button>
          <Button variant='contained' color='error'>Cancelar</Button>
        </Stack>
      </Box>
    </Modal>
  )
}

export default MovieForm