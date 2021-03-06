import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Button
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import axios from "axios";


export const CustomerListResultsIgreja = ({ customers, ...rest }) => {

  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState({})

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = customers.map((customer) => customer.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  async function deleteIgreja() {
    const baseURL = `http://5.161.71.7:8000/v1/DeletarIgreja/${selected.id}`
    axios.delete(baseURL).then(() => document.location.reload(true));
    setSelected({})
    setOpen(false);
  }

  async function editarIgreja(igreja) {
    await localStorage.setItem("current", JSON.stringify(igreja));
  }

  async function verIgreja(igreja) {
    await localStorage.setItem("selected", JSON.stringify(igreja));
  }

  const handleClickOpen = (igreja) => {
    setSelected(igreja)
    setOpen(true);
  };

  const handleClose = () => {
    setSelected({})
    setOpen(false);
  };


  return (
    <Card {...rest}>
       <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Aten????o!!!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deseja realmente excluir este igreja?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteIgreja}>Sim</Button>
          <Button onClick={handleClose} autoFocus>
            N??o
          </Button>
        </DialogActions>
      </Dialog>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === customers.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0
                      && selectedCustomerIds.length < customers.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Nome da Igreja
                </TableCell>
                <TableCell>
                  E-mail
                </TableCell>
                <TableCell>
                  Localiza????o
                </TableCell>
                <TableCell>
                  Telefone
                </TableCell>
                <TableCell>
                  A????es
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((customer) => (
                <TableRow
                  hover
                  key={customer.id}
                  selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.indexOf(customer.id) !== -1}
                      onChange={(event) => handleSelectOne(event, customer.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <div style={{
                          height: 45,
                          width: 45,
                          borderRadius: 30,
                          backgroundColor: '#F3F4F6',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginRight: 10,
                          fontWeight: 'bold',
                        }}>
                        <p style={{fontSize: 16}}>
                          {customer.nomeIgreja[0]}
                        </p>
                      </div>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {customer.nomeIgreja}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {customer.email}
                  </TableCell>
                  <TableCell>
                    {`${customer.bairro}, ${customer.municipio}, ${customer.estado}`}
                  </TableCell>
                  <TableCell>
                    {customer.fone1}
                  </TableCell>
                  <TableCell>
                    <div style={{display: 'flex'}}>
                    <div style={{
                            height: 26,
                            width: 26,
                            backgroundColor: '#62D883',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontWeight: 'bold',
                            borderRadius: 5,
                            marginRight: 10,
                          }}
                          onClick={() => verIgreja(customer)} 
                          >
                            <a
                              style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
                            href="http://churchadmin.ddns.net:3000/settingsIgreja">
                              <RemoveRedEyeIcon style={{color: 'white', width: 18}}/>
                            </a>
                      </div>

                      <div style={{
                            height: 26,
                            width: 26,
                            backgroundColor: '#34B7D3',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontWeight: 'bold',
                            marginRight: 10,
                            borderRadius: 5
                          }}
                          onClick={() => editarIgreja(customer)}  
                        >
                          <a 
                             style={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              }}
                            href="http://churchadmin.ddns.net:3000/cadastroIgreja">
                            <EditIcon style={{color: 'white', width: 18}} />
                          </a>
                      </div>

                      <div style={{
                            height: 26,
                            width: 26,
                            backgroundColor: '#EB0202',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontWeight: 'bold',
                            borderRadius: 5
                          }}
                          onClick={() => handleClickOpen(customer)}  
                        >
                          <DeleteForeverIcon style={{color: 'white', width: 18}} />
                      </div>

                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={customers.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

CustomerListResultsIgreja.propTypes = {
  customers: PropTypes.array.isRequired
};
