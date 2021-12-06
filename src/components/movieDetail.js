import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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

function createData(id, name, age) {
  return { id, name, age };
}

const rows = [
  createData(1, 'Nombre Apell 1', 30),
  createData(2, 'Nombre Apell 1', 30),
  createData(3, 'Nombre Apell 1', 30),
  createData(4, 'Nombre Apell 1', 30),
  createData(5, 'Nombre Apell 1', 30),
];

const ActorsTable = () => {
  return (
    <Table size='small' aria-label="actors table">
      <TableBody>
        {rows.map((row) => (
          <TableRow
            key={row.id}

          >
            <TableCell>{row.name}</TableCell>
            <TableCell align="right">{row.age}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

const MovieDetail = ({ data, open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
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
        <ActorsTable />
      </Box>
    </Modal>
  )
}

export default MovieDetail
