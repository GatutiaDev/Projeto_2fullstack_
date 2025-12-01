import { useState } from 'react';
import { Box, TextField, Button, Paper, Typography, Grid, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const InsercaoPersonagem = () => {
  const navigate = useNavigate();
  

  const [form, setForm] = useState({
    name: '',
    title: '',
    vision: '',
    gender: '',
    weapon: '',
    nation: '',
    description: '',
    constellation: '',
    rarity: '',
    skillNormal: '',
    skillElemental: '',
    skillBurst: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        
        name: form.name,
        title: form.title,
        gender: form.gender,
        constellation: form.constellation,
        vision: form.vision,
        weapon: form.weapon,
        nation: form.nation,
        description: form.description,
        rarity: form.rarity,
        id: form.name.toLowerCase().replace(/ /g, '-'), 
        skillTalents: [
            { 
                name: form.skillNormal || "Ataque Normal", 
                type: "Normal Attack",
                description: "Realiza ataques basicos." 
            },
            { 
                name: form.skillElemental || "Habilidade Elemental", 
                type: "Elemental Skill",
                description: "Dispara uma habilidade elemental."
            },
            { 
                name: form.skillBurst || "Explosão Elemental", 
                type: "Elemental Burst",
                description: "Realiza sua super habilidade."
            }
        ]
      };

      console.log("Payload enviado:", payload);

      await api.post('/personagens', payload);
      alert('Personagem cadastrado com sucesso!');
      navigate('/'); 

    } catch (error) {
      console.error(error);
      alert('Erro ao salvar: ' + (error.response?.data?.erro || error.message));
    }
  };

    return (
    <Box 
      sx={{ 
        width: '100%', 
        display: 'flex', 
        justifyContent: 'center', 
        mt: 4, 
        mb: 6,
        px: 2
      }}
    >
      <Paper 
        elevation={4} 
        sx={{ 
          padding: 4, 
          width: '100%', 
          maxWidth: 900,
          borderRadius: 3
        }}
      >

        <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', mb: 3 }}>
          Novo Personagem
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>

            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Nome" name="name" value={form.name} onChange={handleChange} required />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Título" name="title" value={form.title} onChange={handleChange} required />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Visão" name="vision" value={form.vision} onChange={handleChange} required />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Gênero" name="gender" value={form.gender} onChange={handleChange} required />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Arma" name="weapon" value={form.weapon} onChange={handleChange} required />
            </Grid>

            
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Constelação" name="constellation" value={form.constellation} onChange={handleChange} required />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Raridade" name="rarity" type="number" value={form.rarity} onChange={handleChange} required />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Nação" name="nation" value={form.nation} onChange={handleChange} required />
            </Grid>

            
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                multiline 
                rows={3} 
                label="Descrição" 
                name="description" 
                value={form.description} 
                onChange={handleChange} 
                required
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Ataque Normal" name="skillNormal" value={form.skillNormal} onChange={handleChange} required />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Skill Elemental" name="skillElemental" value={form.skillElemental} onChange={handleChange} required />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Ultimate (Burst)" name="skillBurst" value={form.skillBurst} onChange={handleChange} required />
            </Grid>

            
            <Grid item xs={12}>
              <Box sx={{display: 'flex', gap: 5, mt: 4 }}>
                <Button variant="outlined" color="error" size="large" onClick={() => navigate('/')}>
                  Cancelar
                </Button>

                <Button type="submit" variant="contained" color="success" size="large">
                  Salvar
                </Button>
              </Box>
            </Grid>

          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default InsercaoPersonagem;