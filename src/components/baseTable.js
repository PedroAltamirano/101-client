import { Typography, IconButton } from '@mui/material';

import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';

import Stack from '@mui/material/Stack';

import AddIcon from '@mui/icons-material/Add';

const BaseTable = ({ children, title, addAction }) => {
  return (
    <>
      <Stack spacing={2} direction="row" justifyContent="space-between">
        <Typography variant="h2" component='h2' mt={2}>{title}</Typography>
        <IconButton aria-label="nueva" size="large" onClick={() => addAction(null)}>
          <AddIcon fontSize="inherit" />
        </IconButton>
      </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          {children}
        </Table>
      </TableContainer>
    </>
  )
}

export default BaseTable