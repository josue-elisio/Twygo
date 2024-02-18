import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { width } from '@mui/system';

let dataArray = [];

export const AccountProfileDetails = ({ onSubmit }) =>{
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const handleChange = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      onSubmit(values);
    },
    [onSubmit, values]
  );

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit} >
      <Card>
        <CardHeader subheader="As informações podem ser editadas" title="Cadastro de Cursos" />
        <CardContent sx={{ width: '100%', pt: 0 }}>
          <Grid container spacing={3}>
            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                helperText="Por favor especifique o Nome/Titulo"
                label="Nome/Titulo"
                name="firstName"
                onChange={handleChange}
                required
                value={values.firstName}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                label="Descrição"
                name="lastName"
                onChange={handleChange}
                required
                value={values.lastName}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button type="submit" variant="contained">Salvar</Button>
        </CardActions>
      </Card>
    </form>
  );
};

AccountProfileDetails.propTypes = {
  onSubmit: PropTypes.func.isRequired
};