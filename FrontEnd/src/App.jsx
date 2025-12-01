import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, CssBaseline, Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { DataProvider } from './contexts/DataContext';


import SearchBar from './components/SearchBar';
import ResultsDisplay from './components/ResultsDisplay';
import InsercaoPersonagem from './components/InsertPersonagem';
import Login from './components/Login';

const darkTheme = createTheme({
  palette: { mode: 'dark' },
});


const RotaPrivada = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};


const TelaBusca = () => {
  const navigate = useNavigate();

  
  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/login'); 
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      
      
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
         <Button onClick={handleLogout} color="error">
            Sair (Logout)
         </Button>
      </Box>

      <Typography variant="h2" component="h1" align="center" gutterBottom>
        Genshin Database
      </Typography>
      
      <Link to="/inserir" style={{ textDecoration: 'none', marginBottom: '20px' }}>
        <Button variant="outlined" color="secondary">
          + Cadastrar Novo Personagem
        </Button>
      </Link>

      <Box sx={{ width: '100%', maxWidth: 600 }}>
          <SearchBar />
      </Box>
      <Box sx={{ width: '100%', maxWidth: 600 }}>
          <ResultsDisplay />
      </Box>
    </Box>
  );
};

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          width: '100vw',
          padding: 2
        }}
      >
        <DataProvider>
          <Container maxWidth="md">
            <BrowserRouter>
              <Routes>
                
                <Route path="/login" element={<Login />} />

                
                <Route path="/" element={
                  <RotaPrivada>
                    <TelaBusca />
                  </RotaPrivada>
                } />
                
                <Route path="/inserir" element={
                  <RotaPrivada>
                    <InsercaoPersonagem />
                  </RotaPrivada>
                } />

              </Routes>
            </BrowserRouter>
          </Container>
        </DataProvider>
      </Box>
    </ThemeProvider>
  );
}

export default App;