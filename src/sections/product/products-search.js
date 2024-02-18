import React, { useState } from 'react';
import { Typography, TextField } from '@mui/material';

export const ProductsSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Pesquisar Cursos
      </Typography>
      <TextField
        label="Buscar"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
};
