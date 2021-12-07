import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

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

const ActorsTable = actors => (
  <Table size='small' aria-label="actors table">
    <TableBody>
      {
        actors &&
        actors.map((actor) => (
          <TableRow key={actor.id}>
            <TableCell>{actor.name}</TableCell>
            <TableCell align="right">{actor.age}</TableCell>
          </TableRow>
        ))
      }
    </TableBody>
  </Table>
)

const MovieDetail = ({ data, actors, open, handleClose }) => {
  const [filtered, setFiltered] = useState([])
  const actors_id = data?.actors_id || []
  if (data && actors_id.length > 0 && filtered.length < 1) setFiltered(actors.filter(actor => actors_id.includes(actor.id)))

  const close = () => {
    setFiltered([])
    handleClose()
    return
  }

  return (
    <Modal
      open={open}
      onClose={close}
      aria-labelledby="modal-detail-movie-title"
      aria-describedby="modal-detail-movie-description"
    >
      <Box sx={style}>
        <Typography id="modal-detail-movie-title" variant="h4" fontWeight='bold'>
          {data?.name}
        </Typography>
        <Typography id="modal-detail-movie-duration" variant="body2" color='text.secondary'>
          {data?.duration} minutos
        </Typography>
        <Typography id="modal-detail-movie-description-label" variant='h6' fontWeight='bold' sx={{ mt: 2 }}>
          Sinopsis
        </Typography>
        <Typography id="modal-detail-movie-description" variant='body1' sx={{ mt: 2 }}>
          {data?.description}
        </Typography>
        <Typography id="modal-detail-movie-actors-label" variant='h6' fontWeight='bold' sx={{ mt: 2 }}>
          Actores
        </Typography>
        {ActorsTable(filtered)}
      </Box>
    </Modal>
  )
}

export default MovieDetail
