import './assets/css/App.css';
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Input } from '@material-ui/core';
import React,{ useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';

//Importar componentes


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  inputRoot: {
    marginLeft: 30,
    color: 'primary',
  },
  inputInput: {
    padding: theme.spacing(6, 4, 1, 0),
    // vertical padding + font size from searchIcon
    //paddingRight: `calc(1em + ${theme.spacing(0)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(0),
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
}));


export default function ButtonAppBar() {
  const classes = useStyles();
  const [campo, setCampo] = useState('');
  //const [historial, setHistorial] = useState([]);
  const [consultaNews, setConsultaNews] = useState([]);
  const [consultaEstado, setConsultaEstado] = useState([]);

  async function prueba(){
    const data = await fetch('https://localhost:44396/api/EstadoTiempo?city='+campo);
            const estadotiempo = await data.json()
            console.log(estadotiempo)
            setConsultaNews(estadotiempo.article)
            setConsultaEstado(estadotiempo.weather)
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs>
        </Grid>
        <Grid item xs={8}>
        <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Noticias Y Estado Del Tiempo
          </Typography>
        </Toolbar>
      </AppBar>
      <Paper component="form" className={classes.root}>
      <Input
      onChange={
        ({ target: { value } }) => {
          setCampo(value);
        }
      }
      type="text"
      value={campo}
      variant= 'contained'
      color='primary'
      placeholder="Ciudad"
      
      classes={{
        root: classes.inputRoot,
        input: classes.inputInput,
      }}
      inputProps={{ 'aria-label': 'search' }}
    />
<Button onClick={prueba} variant="contained" color="primary">
  Buscar
</Button>
    </Paper>
    <Paper className={classes.mainFeaturedPost} style={{ backgroundImage: `url(${consultaNews.urlToImage})` }}>
      {/* Increase the priority of the hero background image */}
      {<img style={{ display: 'none' }} src={consultaNews.image} alt={consultaNews.imageText} />}
      <div className={classes.overlay} />
      <Grid container>
        <Grid item md={6}>
          <div className={classes.mainFeaturedPostContent}>
          {consultaNews && consultaNews.source &&
          <>
            <Typography component="h1" variant="h3" color="secondary" gutterBottom>
              {consultaNews.source.name}
            </Typography>
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
              {consultaNews.title}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              Author: {consultaNews.author}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              {consultaNews.description}
            </Typography>
            </>
            }
          </div>
        </Grid>
      </Grid>
    </Paper>
    <CardActions>
    <Link variant="subtitle1" href={consultaNews.url}>
              Continuar leyendo...
            </Link>
            <Typography variant="subtitle1" color="textSecondary" component="p">
            Publicado: {consultaNews.publishedAt}
            </Typography>
            </CardActions>
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          //alt="Contemplative Reptile"
          height="140"
          image={consultaNews.urlToImage}
          //title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          {consultaNews.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {consultaNews.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Link variant="subtitle1" href={consultaNews.url}>
              Continuar leyendo...
            </Link>
            <Typography variant="subtitle1" color="textSecondary" component="p">
            Publicado: {consultaNews.publishedAt}
            </Typography>
      </CardActions>
    </Card>
        </Grid>
        <Grid item xs>
        </Grid>
      </Grid>
      
      <div className={classes.search} >
  </div>

  <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
      <h2>Estado del Tiempo En:  <Typography variant="h1" color="primary" component="p">
          {campo}
          </Typography> </h2>
        <div style={{ backgroundColor: '#cfe8fc', height: '50vh' }}>
          {consultaEstado && consultaEstado.weather &&
          <>
          <h1>Clima: {consultaEstado.weather[0].main}</h1>
          <h1>Descripcion: {consultaEstado.weather[0].description}</h1>
          <h1>Temperatura: {consultaEstado.main.temp}</h1>
          </>
          } 
        </div>

      </Container>
    </React.Fragment>
       </div>
  );
}

      
