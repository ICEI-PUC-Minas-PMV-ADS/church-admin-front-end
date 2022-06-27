import * as React from 'react';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Box, Container, OutlinedInput, Grid, TextField, FormControl, RadioGroup, FormLabel, FormControlLabel, Radio, InputLabel, Select, MenuItem, Button, Backdrop, CircularProgress } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import InputMask from "react-input-mask";
import axios from "axios";
import { parse } from 'date-fns';

const CadastroIgreja = function () {
    const [loading, setLoading] = useState(true)
    const [updateMode, setUpdateMode] = useState(false)
    const [formValue, setFormValue] = useState({
        nomeIgreja: null,
        razaoSocial: null,
        cnpj: null,
        cep: null,
        endereco: null,
        numero: null,
        complemento: "",
        bairro: null,
        municipio: null,
        estado: null,
        fone1: null,
        fone2: "",
        categoria: null,
        dataCadastro: null,
        dataFundacao: null,
        email: null
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        value = name === "numero" ? parseInt(value) : value;
        console.log(value)
        setFormValue((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    };

    async function getStorageInformations() {
        let igreja = JSON.parse(await localStorage.getItem("current"))
        if (igreja) {
            setFormValue({
                id: igreja.id,
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
            setUpdateMode(true)
            localStorage.removeItem("current");
        }
        setTimeout(() => setLoading(false), 500)
    }

    useEffect(() => {
        getStorageInformations()
    }, []);

    async function save() {
        setLoading(true)
        const baseURL = "https://5.161.71.7:8000/v1/CadastrarIgreja"
        const baseURL_UPDATE = "https://5.161.71.7:8000/v1/AtualizarIgreja"
        const headers = {
            "access-control-allow-credentials": true,
            "access-control-allow-headers": "*",
            "access-control-allow-methods": "*",
            "access-control-allow-origin": "https://5.161.71.7:8000",
            "access-control-expose-headers": "*",
            "content-type": "application/problem+json"
        };

        const invalid = Object.values(formValue).includes(null)

        if (!invalid) {
            try {
                if (updateMode) {
                    await axios.put(baseURL_UPDATE, formValue, { headers })
                        .then(response => { console.log(response.data) });
                    document.location.reload(true)
                    alert('Atualização realizada com sucesso!')
                } else {
                    await axios.post(baseURL, formValue, { headers })
                        .then((response) => { console.log(response.data) });
                    setTimeout(() => setLoading(false), 500)
                    document.location.reload(true)
                    alert('Cadastro realizado com sucesso!')
                }

            } catch (e) {
                alert('Falha ao gravar no banco de dados')
                console.log("ERRO: ", e)
                setLoading(false)
            }
        } else {
            alert('Por favor, preencha todos os campos necessários. (*)')
            setLoading(false)
        }
    }

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
                            Cadastro | Church Admin
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
                            <h1 style={{ marginBottom: 30 }}>Cadastrar</h1>

                            <Grid container spacing={2} >
                                <Grid item xs={6} style={{ borderTopColor: "#000000", borderTopStyle: "solid", borderTopWidth: 5 }}>
                                    <h2 style={{ marginBottom: 25 }}>Informações da Igreja</h2>
                                    <TextField
                                        fullWidth
                                        required
                                        id="outlined-required"
                                        label="Nome da Igreja"
                                        variant="outlined"
                                        style={{ marginBottom: 25 }}
                                        name="nomeIgreja"
                                        value={formValue.nomeIgreja}
                                        onChange={handleChange}
                                        error={formValue.nomeIgreja === ""}
                                        helperText={formValue.nomeIgreja === "" ? "Por favor, preencha este campo." : " "}
                                    />

                                    <TextField
                                        fullWidth
                                        required
                                        id="outlined-required"
                                        label="Razão Social"
                                        variant="outlined"
                                        style={{ marginBottom: 25 }}
                                        name="razaoSocial"
                                        value={formValue.razaoSocial}
                                        onChange={handleChange}
                                        error={formValue.razaoSocial === ""}
                                        helperText={formValue.razaoSocial === "" ? "Por favor, preencha este campo." : " "}
                                    />

                                    <InputMask
                                        mask="99.999.999/9999-99"
                                        value={formValue.cnpj}
                                        disabled={false}
                                        maskChar=" "
                                        onChange={handleChange}
                                    >
                                        {() =>
                                            <TextField
                                                fullWidth
                                                required
                                                id="outlined-basic"
                                                label="CNPJ"
                                                variant="outlined"
                                                style={{ marginBottom: 25 }}
                                                name="cnpj"
                                                error={formValue.cnpj === ""}
                                                helperText={formValue.cnpj === "" ? "Por favor, preencha este campo." : " "}
                                            />
                                        }
                                    </InputMask>

                                    <TextField
                                        fullWidth
                                        required
                                        id="outlined-required"
                                        label="Categoria"
                                        variant="outlined"
                                        style={{ marginBottom: 25 }}
                                        name="categoria"
                                        value={formValue.categoria}
                                        onChange={handleChange}
                                        error={formValue.categoria === ""}
                                        helperText={formValue.categoria === "" ? "Por favor, preencha este campo." : " "}
                                    />

                                    <TextField
                                        fullWidth
                                        required
                                        id="outlined-basic"
                                        label="E-mail"
                                        variant="outlined"
                                        style={{ marginBottom: 25 }}
                                        name="email"
                                        value={formValue.email}
                                        onChange={handleChange}
                                        error={formValue.email === ""}
                                        helperText={formValue.email === "" ? "Por favor, preencha este campo." : " "}
                                    />

                                    <InputMask
                                        mask="(99) 9 9999-9999"
                                        value={formValue.fone1}
                                        disabled={false}
                                        maskChar=" "
                                        onChange={handleChange}
                                    >
                                        {() =>
                                            <TextField
                                                fullWidth
                                                required
                                                id="outlined-basic"
                                                label="Celular"
                                                variant="outlined"
                                                style={{ marginBottom: 25 }}
                                                name="fone1"
                                                error={formValue.fone1 === ""}
                                                helperText={formValue.fone1 === "" ? "Por favor, preencha este campo." : " "}
                                            />
                                        }
                                    </InputMask>

                                    <InputMask
                                        mask="(99) 9999-9999"
                                        value={formValue.fone2}
                                        disabled={false}
                                        maskChar=" "
                                        onChange={handleChange}
                                    >
                                        {() =>
                                            <TextField
                                                fullWidth
                                                id="outlined-basic"
                                                label="Telefone"
                                                variant="outlined"
                                                style={{ marginBottom: 45 }}
                                                name="fone2"
                                            />
                                        }
                                    </InputMask>

                                    <TextField
                                        fullWidth
                                        type="date"
                                        required
                                        InputLabelProps={{ shrink: true }}
                                        id="outlined-basic"
                                        label="Data de Cadastro"
                                        variant="outlined"
                                        style={{ marginBottom: 25 }}
                                        name="dataCadastro"
                                        value={formValue.dataCadastro}
                                        onChange={handleChange}
                                        error={formValue.dataCadastro === ""}
                                        helperText={formValue.dataCadastro === "" ? "Por favor, preencha este campo." : " "}
                                    />

                                    <TextField
                                        fullWidth
                                        type="date"
                                        required
                                        InputLabelProps={{ shrink: true }}
                                        id="outlined-basic"
                                        label="Data de Fundação"
                                        variant="outlined"
                                        style={{ marginBottom: 25 }}
                                        name="dataFundacao"
                                        value={formValue.dataFundacao}
                                        onChange={handleChange}
                                        error={formValue.dataFundacao === ""}
                                        helperText={formValue.dataFundacao === "" ? "Por favor, preencha este campo." : " "}
                                    />
                                </Grid>

                                <Grid item xs={6} style={{ borderTopColor: "#000000", borderTopStyle: "solid", borderTopWidth: 5 }}>
                                    <h2 style={{ marginBottom: 25 }}>Localização</h2>

                                    <InputMask
                                        mask="99999-999"
                                        value={formValue.cep}
                                        disabled={false}
                                        maskChar=" "
                                        onChange={handleChange}
                                    >
                                        {() =>
                                            <TextField
                                                required
                                                fullWidth
                                                id="outlined-basic"
                                                label="CEP"
                                                variant="outlined"
                                                style={{ marginBottom: 25 }}
                                                name="cep"
                                                error={formValue.cep === ""}
                                                helperText={formValue.cep === "" ? "Por favor, preencha este campo." : " "}
                                            />
                                        }
                                    </InputMask>

                                    <TextField
                                        fullWidth
                                        required
                                        id="outlined-required"
                                        label="Estado"
                                        variant="outlined"
                                        style={{ marginBottom: 25 }}
                                        name="estado"
                                        value={formValue.estado}
                                        onChange={handleChange}
                                        error={formValue.estado === ""}
                                        helperText={formValue.estado === "" ? "Por favor, preencha este campo." : " "}
                                    />

                                    <TextField
                                        fullWidth
                                        required
                                        id="outlined-required"
                                        label="Município"
                                        variant="outlined"
                                        style={{ marginBottom: 25 }}
                                        name="municipio"
                                        value={formValue.municipio}
                                        onChange={handleChange}
                                        error={formValue.municipio === ""}
                                        helperText={formValue.municipio === "" ? "Por favor, preencha este campo." : " "}
                                    />

                                    <TextField
                                        fullWidth
                                        required
                                        id="outlined-required"
                                        label="Bairro"
                                        variant="outlined"
                                        style={{ marginBottom: 25 }}
                                        name="bairro"
                                        value={formValue.bairro}
                                        onChange={handleChange}
                                        error={formValue.bairro === ""}
                                        helperText={formValue.bairro === "" ? "Por favor, preencha este campo." : " "}
                                    />

                                    <TextField
                                        required
                                        fullWidth
                                        id="outlined-basic"
                                        label="Endereço"
                                        variant="outlined"
                                        name="endereco"
                                        onChange={handleChange}
                                        style={{ marginBottom: 25 }}
                                        value={formValue.endereco}
                                        error={formValue.endereco === ""}
                                        helperText={formValue.endereco === "" ? "Por favor, preencha este campo." : " "}
                                    />

                                    <InputMask
                                        mask="9999999999"
                                        value={parseInt(formValue.numero)}
                                        disabled={false}
                                        maskChar=" "
                                        onChange={handleChange}
                                    >
                                        {() =>
                                            <TextField
                                                required
                                                fullWidth
                                                id="outlined-basic"
                                                label="Número"
                                                variant="outlined"
                                                style={{ marginBottom: 25 }}
                                                name="numero"
                                                error={formValue.numero === ""}
                                                helperText={formValue.numero === "" ? "Por favor, preencha este campo." : " "}
                                            />
                                        }
                                    </InputMask>

                                    <TextField
                                        fullWidth
                                        id="outlined-basic"
                                        label="Complemento"
                                        variant="outlined"
                                        style={{ marginBottom: 48 }}
                                        name="complemento"
                                        value={formValue.complemento}
                                        onChange={handleChange}
                                    />

                                    <Grid item xs={12} style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", flexDirection: "row", marginTop: 120 }}>
                                        {updateMode ?
                                            <Button onClick={save} variant="contained" size="large"> Atualizar </Button>
                                            :
                                            <Button onClick={save} variant="contained" size="large"> Cadastrar </Button>
                                        }
                                    </Grid>

                                </Grid>
                            </Grid>
                        </Container>
                    </Box>
                </>
            )}
        </>
    );
}

CadastroIgreja.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default CadastroIgreja;