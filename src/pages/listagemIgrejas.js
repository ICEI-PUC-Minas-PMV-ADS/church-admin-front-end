import Head from 'next/head';
import { Box, Container, Backdrop, CircularProgress } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { customers } from '../__mocks__/customers';
import {useEffect, useState} from 'react';
import axios from "axios";
import { CustomerListToolbarIgreja } from 'src/components/customer/customer-list-toolbar-igreja';
import { CustomerListResultsIgreja } from 'src/components/customer/customer-list-results-igreja';

const ListagemIgrejas = function () {

  const [igrejas, setIgrejas] = useState([])
  const [loading, setLoading] = useState(true)

  async function getIgrejas() {
    const baseURL = "https://localhost:5001/v1/ListarIgrejas"
    await axios.get(baseURL).then((response) => {
        setTimeout(() => setIgrejas(response.data), 300)
      });
    setLoading(false)
  }

  useEffect(() => {
    getIgrejas()
  }, []); 

  return (
    <>
    {!loading ? (
      <>
        <Head>
          <title>
            Listagem | Church Admin
          </title>
        </Head>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8
          }}
        >
          <Container maxWidth={false}>
            <CustomerListToolbarIgreja />
            <Box sx={{ mt: 3 }}>
              <CustomerListResultsIgreja customers={igrejas} />
            </Box>
          </Container>
        </Box>
      </>
    ) : (
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </>
  );
} 
ListagemIgrejas.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default ListagemIgrejas;
