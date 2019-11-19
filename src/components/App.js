import React from 'react';
import CategoriesList from "./CategoriesList.jsx";
import FeedList from "./FeedList/index.jsx";
import cat from '../feed-the-cat.jpg';
import {connect} from 'react-redux';
import store from '../redux/redux-store.js';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    paddingTop: '20px',
  },
  image: {
    maxWidth: '100%'
  },
  sitetitle: {
    color: '#189434', marginTop: '20px', fontWeight: 'bold'
  }
})

const App = (props) => { 
  const classes = useStyles();
  
  let handleClickWorthy = () => { store.dispatch( { type: 'CHANGE_WORTHY' } ); };

  return (
    <>
      <Grid xs={12} md={12} container direction="row"  className={classes.container}>

        <Grid item xs={12} md={5}>
          <a href="/#/"><img src={cat} alt="cat" className={classes.image} /></a>
        </Grid>  

        <Grid item xs={12} md={7}>

          <Typography variant="h2" className={classes.sitetitle}>
            Feed the cat
          </Typography>

          <Typography variant="h4">Накормите кота</Typography>
          <p>Вы достойны кормить кота?</p>
          <Switch            
            onChange={handleClickWorthy}
            value="false"
          />Нет, увы...

        </Grid> 

      </Grid>

      { (props.isWorthy) ? (
        <Grid xs={12} md={12} container direction="row"  className={classes.container} alignItems="baseline">                   
          <CategoriesList />
          <FeedList />                  
        </Grid>
       ) : (
        <Grid xs={12} md={12} container direction="row">
          <p>Извините, Вы не можете видеть каталог корма, 
          потому что <b>Вы не достойны кормить кота</b>.</p>
        </Grid>)      
      }
    </>
  ) 
}

const mapStateToProps = function(state) {
  return {
    isWorthy: state.categoriesReducer.isWorthy
  }
}

export default connect(mapStateToProps)(App);