import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon, Typography
} from '@mui/material';
import { Search as SearchIcon } from '../../icons/search';
import { Upload as UploadIcon } from '../../icons/upload';
import { Download as DownloadIcon } from '../../icons/download';
import axios from "axios";

export const CustomerListToolbar = function (props) {

  async function exportPdf() {
    const baseURL = "https://5.161.71.7:8000/v1/GerarPdf"
    await axios.get(baseURL).then((response) => console.log(response));
  }

  return (
    <Box {...props}>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          m: -1
        }}
      >
        <Typography
          sx={{ m: 1 }}
          variant="h4"
        >
          Lista de membros
        </Typography>
        <Box sx={{ m: 1 }}>
          <a href='https://5.161.71.7:8000/v1/GerarPdf' target="_blank" style={{textDecoration: "none"}}>
            <Button
              startIcon={(<DownloadIcon fontSize="small" />)}
              sx={{ mr: 1 }}
            >
              Exportar
            </Button>
          </a>
         
          <a href="http://localhost:3000/cadastro">
            <Button
              color="primary"
              variant="contained"
            >
              Adicionar
            </Button>
          </a>
        </Box>
      </Box>
    </Box>
  );  
} 