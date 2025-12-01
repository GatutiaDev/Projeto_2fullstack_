import { useState } from 'react';
import { Box, TextField, Button, Paper, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Login = () => {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      
      const response = await api.post('/auth/login', { nome, senha });
      
      
      localStorage.setItem('token', response.data.token);
      
      
      navigate('/'); 
    } catch (err) {
      setError(err.response?.data?.erro || 'Erro ao fazer login');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            🔐 Login Genshin
          </Typography>
          
          <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Nome de Usuário"
              autoFocus
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            
            {error && (
              <Typography color="error" variant="body2" align="center" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;