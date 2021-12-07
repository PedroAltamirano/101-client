import * as React from 'react';
import { useState, useEffect } from 'react';

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

const ActorForm = ({ data, open, handleClose }) => {
  const initialState = { name: '', age: '', img: '' }
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

  const handleSubmit = () => {
    console.log(form)
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