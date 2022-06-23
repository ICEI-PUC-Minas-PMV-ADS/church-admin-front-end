import Head from 'next/head';
import { Box, Container, Grid, TextField, Backdrop, CircularProgress } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { useEffect, useState } from 'react';

const SettingsIgreja = () => {
  const [userData, setUserData] = useState({})
  const [loading, setLoading] = useState(true)

  async function getStorageInformations() {
    let igreja = JSON.parse(await localStorage.getItem("selected"))
      setUserData({
        nomeIgreja: igreja.nomeIgreja,
        razaoSocial: igreja.razaoSocial,
        cnpj: igreja.cnpj,
        cep: igreja.cep,
        endereco: igreja.endereco,
        numero: igreja.numero,
        complemento: igreja.complemento,
        bairro: igreja.bairro,
        municipio: igreja.municipio,
        estado: igreja.estado,
        fone1: igreja.fone1,
        fone2: igreja.fone2,
        categoria: igreja.categoria,
        dataCadastro: igreja.dataCadastro,
        dataFundacao: igreja.dataFundacao,
        email: igreja.email
      })
      setTimeout(() => setLoading(false), 500)
  }

  useEffect(() => {
    getStorageInformations()
  }, []);

  return (
    <>
      {loading ? (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <>
          <Head>
            <title>
              Products | Material Kit
            </title>
          </Head>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              py: 8
            }}
          >
            <Container maxWidth={true}>
              <h1 style={{ marginBottom: 30 }}>{userData.nomeIgreja}</h1>

              <Grid container spacing={2} >
                <Grid item xs={6} style={{ borderTopColor: "#000000", borderTopStyle: "solid", borderTopWidth: 5 }}>
                  <h2 style={{ marginBottom: 25 }}>Informações da Igreja</h2>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Nome da Igreja"
                    variant="outlined"
                    style={{ marginBottom: 25 }}
                    name="nomeIgreja"
                    value={userData.nomeIgreja || ""}
                    ReadOnly
                  />

                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Razão Social"
                    variant="outlined"
                    style={{ marginBottom: 25 }}
                    name="razaoSocial"
                    value={userData.razaoSocial || ""}
                    ReadOnly
                  />

                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="CNPJ"
                    variant="outlined"
                    style={{ marginBottom: 25 }}
                    name="cnpj"
                    value={userData.cnpj || ""}
                    ReadOnly
                  />

                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Categoria"
                    variant="outlined"
                    style={{ marginBottom: 25 }}
                    name="categoria"
                    value={userData.categoria || ""}
                    ReadOnly
                  />

                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="E-mail"
                    variant="outlined"
                    style={{ marginBottom: 25 }}
                    name="email"
                    value={userData.email || ""}
                    ReadOnly
                  />

                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Celular"
                    variant="outlined"
                    style={{ marginBottom: 25 }}
                    name="fone1"
                    value={userData.fone1 || ""}
                    ReadOnly
                  />

                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Telefone"
                    variant="outlined"
                    style={{ marginBottom: 25 }}
                    name="fone2"
                    value={userData.fone2 || ""}
                    ReadOnly
                  />

                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Data de Cadastro"
                    variant="outlined"
                    style={{ marginBottom: 25 }}
                    name="dataCadastro"
                    value={userData.dataCadastro || ""}
                    ReadOnly
                  />

                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Data de Fundação"
                    variant="outlined"
                    style={{ marginBottom: 25 }}
                    name="dataFundacao"
                    value={userData.dataFundacao || ""}
                    ReadOnly
                  />
                </Grid>

                <Grid item xs={6} style={{ borderTopColor: "#000000", borderTopStyle: "solid", borderTopWidth: 5 }}>
                  <h2 style={{ marginBottom: 25 }}>Localização</h2>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="CEP"
                    variant="outlined"
                    style={{ marginBottom: 25 }}
                    name="cep"
                    value={userData.cep || ""}
                  />
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Estado"
                    variant="outlined"
                    style={{ marginBottom: 25 }}
                    name="estado"
                    value={userData.estado || ""}
                    ReadOnly
                  />

                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Município"
                    variant="outlined"
                    style={{ marginBottom: 25 }}
                    name="municipio"
                    value={userData.municipio || ""}
                    ReadOnly
                  />

                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Bairro"
                    variant="outlined"
                    style={{ marginBottom: 25 }}
                    name="bairro"
                    value={userData.bairro || ""}
                    ReadOnly
                  />

                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Endereço"
                    variant="outlined"
                    style={{ marginBottom: 25 }}
                    name="endereco"
                    value={userData.endereco || ""}
                    ReadOnly
                  />

                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Número"
                    variant="outlined"
                    style={{ marginBottom: 25 }}
                    name="numero"
                    value={userData.numero || ""}
                    ReadOnly
                  />

                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Complemento"
                    variant="outlined"
                    style={{ marginBottom: 25 }}
                    name="complemento"
                    value={userData.complemento || ""}
                    ReadOnly
                  />        
                </Grid>
              </Grid>
            </Container>
          </Box>
        </>
      )}
    </>
  );
}

SettingsIgreja.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default SettingsIgreja;
