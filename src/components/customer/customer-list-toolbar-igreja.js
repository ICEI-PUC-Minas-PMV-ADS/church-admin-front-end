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

export const CustomerListToolbarIgreja = (props) => (
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
        Lista de igrejas
      </Typography>
      <Box sx={{ m: 1 }}>
        <Button
          startIcon={(<DownloadIcon fontSize="small" />)}
          sx={{ mr: 1 }}
        >
          Export
        </Button>
        <a href="http://localhost:3000/cadastroIgreja">
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
