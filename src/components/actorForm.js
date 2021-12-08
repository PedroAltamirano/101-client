import * as React from 'react';
import { useState, useEffect } from 'react';

import { baseURL, baseAPI } from '../config/api';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

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
  const initialState = { name: '', age: '', img: '', image: '', preview: '' }
  const [form, setForm] = useState(initialState)

  useEffect(() => {
    if (data) setForm(data);
    else setForm(initialState)
  }, [data])

  const close = () => {
    setForm(initialState)
    handleClose()
  }

  const handleInput = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
    return
  }

  const handleImage = event => {
    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onloadend = () => {
      setForm({
        ...form,
        img: '',
        image: file,
        preview: reader.result
      })
    }

    reader.readAsDataURL(file)
  }

  const validateForm = () => {
    for (const key in form) {
      if (key !== 'preview' && form.id) {
        if (key !== 'image') {
          if (form[key] === '') return true
        }
      } else {
        if (key !== 'img') {
          if (form[key] === '') return true
        }
      }
    }
    return false
  }

  const handleSubmit = () => {
    if (validateForm()) {
      alert('datos incompletos')
      return
    }

    let url = `${baseAPI}actor`

    let formData = new FormData();
    formData.append('image', form.image);
    formData.append("name", form.name);
    formData.append('age', form.age);
    formData.append('img', form.img);

    let send = {
      method: 'POST',
      body: formData
    }

    if (form.id) {
      url = `${baseAPI}actor/${form.id}`
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
      onClose={close}
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
          {/* <TextField
            fullWidth
            id="img"
            name="img"
            label="img"
            sx={{ my: 1 }}
            value={form.img}
            onChange={handleInput} /> */}
          {
            form.img &&
            <ImageList sx={{ width: '50%', height: 'auto', mx: 'auto' }} cols={1}>
              <ImageListItem>
                <img
                  src={form.img}
                  alt={form.name}
                  loading="lazy"
                />
              </ImageListItem>
            </ImageList>
          }
          {
            form.preview &&
            <ImageList sx={{ width: '50%', height: 'auto', mx: 'auto' }} cols={1}>
              <ImageListItem>
                <img
                  src={form.preview}
                  alt='image preview'
                  loading="lazy"
                />
              </ImageListItem>
            </ImageList>
          }
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleImage} />
        </Box>
        <Stack direction='row-reverse' gap={2}>
          <Button variant='contained' color='primary' onClick={handleSubmit}>Guardar</Button>
          <Button variant='contained' color='error' onClick={close}>Cancelar</Button>
        </Stack>
      </Box>
    </Modal>
  )
}

export default ActorForm