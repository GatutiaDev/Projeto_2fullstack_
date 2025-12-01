import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';

const CharacterCard = ({ character }) => {
  const imageUrl = `https://genshin.jmp.blue/characters/${character.id}/card`;
  
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} width="100%">
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardMedia
          component="img"
          alt={character.name}
          image={imageUrl}
          sx={{ 
            height: 200, 
            objectFit: 'contain',
            paddingTop: '16px',
            paddingBottom: '10px',
            backgroundColor: '#f0f0f0'
          }} 
        />
        <CardContent>
          <Typography variant="h3" component="div" textAlign="center">
            {character.name}
          </Typography>
          <Typography gutterBottom variant="h5" color="info" textAlign="center">
            {character.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="justify">
            Vision: {character.vision}
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="justify">
            Weapon: {character.weapon}
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="justify">
            Gender: {character.gender}
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="justify">
            Nation: {character.nation}
          </Typography>
          <Typography variant="body2" color="warning" textAlign="justify">
            Rarity: {character.rarity}
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="justify">
            Constellation: {character.constellation}
          </Typography>
          <Typography gutterBottom variant="body2" color="info" textAlign="justify">
            Description: {character.description}
          </Typography>
          <Typography gutterBottom variant="body2" color="info" textAlign="justify">
            Skills:
          </Typography>
          <Typography gutterBottom variant="body2" color="white" textAlign="justify">
            Normal Attack: {character.skillTalents[0].name}
          </Typography>
          <Typography gutterBottom variant="body2" color="success" textAlign="justify">
            Elemental Skill: {character.skillTalents[1].name}
          </Typography>
          <Typography gutterBottom variant="body2" color="warning" textAlign="justify">
            Elemental Burst: {character.skillTalents[2].name}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CharacterCard;