import { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { Box, TextField, Button, Paper } from '@mui/material';
import api from '../api';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  
  const { dispatch } = useData();

  
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!searchTerm.trim()) {
      setError('Por favor, digite o nome de um personagem.');
      return;
    }
    setError('');

    
    try {
      
      dispatch({ type: 'FETCH_START' });

      
      const response = await api.get(`/personagens/busca?nome=${searchTerm}`);

      const result = response.data;

      
      dispatch({ type: 'FETCH_SUCCESS', payload: result });

    } catch (err) {

      const mensagemBackend =
      err.response?.data?.erro || "Erro ao buscar personagem";
      
      dispatch({ type: 'FETCH_ERROR', payload: mensagemBackend });
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: '16px', marginBottom: '32px' }}>
      <Box 
        component="form" 
        onSubmit={handleSubmit} 
        sx={{ display: 'flex', gap: '16px', alignItems: 'center' }}
      >
        <TextField
          fullWidth
          label="Buscar Personagem do Genshin"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          error={!!error}
          helperText={error}
        />
        <Button type="submit" variant="contained" size="large">
          Buscar
        </Button>
      </Box>
    </Paper>
  );
};

export default SearchBar;