import * as React from 'react';
import { useState, useEffect } from 'react';

import { baseAPI } from '../config/api';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Stack } from '@mui/material';
import TextField from '@mui/material/TextField';

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

const ActorForm = ({ data, open, handleClose, fetchActors }) => {
  const initialState = { name: '', age: '', img: '' }
  const [form, setForm] = useState(initialState)

  useEffect(() => {
    if (data) setForm(data);
    else setForm(initialState)
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

    let url = `${baseAPI}actor`
    const data = {
      ...form,
      // img: form.actors_id.join()
    }

    let send = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }

    if (data.id) {
      url = `${baseAPI}actor/${data.id || ''}`
      send = {
        ...send,
        method: 'PUT',
      }
    }

    fetch(url, send)
      .then(res => res.json())
      .then(data => {
        fetchActors()
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
            id="edad"
            name="age"
            label="Edad"
            sx={{ my: 1 }}
            value={form.age}
            onChange={handleInput} />
          <TextField
            fullWidth
            id="img"
            name="img"
            label="img"
            sx={{ my: 1 }}
            value={form.img}
            onChange={handleInput} />
        </Box>
        <Stack direction='row-reverse' gap={2}>
          <Button variant='contained' color='primary' onClick={handleSubmit}>Guardar</Button>
          <Button variant='contained' color='error' onClick={handleClose}>Cancelar</Button>
        </Stack>
      </Box>
    </Modal>
  )
}

export default ActorForm