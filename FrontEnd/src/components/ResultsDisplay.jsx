import { useData } from '../contexts/DataContext';
import CharacterCard from './CharacterCard';
import { Grid, Box, CircularProgress, Alert, Typography } from '@mui/material';

const ResultsDisplay = () => {
  
  const { state } = useData();
  const { loading, error, data } = state;

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  
  if (!data) {
    return (
      <Typography variant="h6" color="text.white" textAlign="center">
        Faça uma busca para ver os resultados.
      </Typography>
    );
  }

  
  const characters = Array.isArray(data) ? data : [data];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        {characters.map((char) => (
          <CharacterCard key={char.name} character={char} />
        ))}
      </Grid>
    </Box>
  );
};

export default ResultsDisplay;