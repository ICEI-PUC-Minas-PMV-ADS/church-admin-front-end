import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import InvertColorsOffIcon from '@mui/icons-material/InvertColorsOff';
import {useEffect, useState} from 'react';

export const NaoBatizados = function (props) {
  return (
    <Card {...props}>
      <CardContent>
        <Grid
          container
          spacing={3}
          sx={{ justifyContent: 'space-between' }}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="overline"
            >
              NÃO BATIZADOS
            </Typography>
            <Typography
              color="textPrimary"
              variant="h4"
            >
              {`${props.values}`}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: 'primary.main',
                height: 56,
                width: 56
              }}
            >
              <InvertColorsOffIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
