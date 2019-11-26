import React from 'react';
import CategoriesList from "../components/categories/CategoriesList";
import FeedList from "../components/feeds/FeedList";
import cat from '../feed-the-cat.jpg';
import { connect } from 'react-redux';
import store from '../redux/redux-store.js';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( theme => ({
  container: {
    paddingTop: '20px',
    [theme.breakpoints.down('sm')]: { paddingTop: '8px' },
  },
  mainimage: {
    maxWidth: '100%',
  },
  sitetitle: {
    color: '#189434', marginTop: '20px', fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
      fontSize:'.7em', background:'#cae4d0', padding:'2px 5px', margin:'0',
    },
  },
  sitesubtitle: {
    [theme.breakpoints.down('sm')]: {
      fontSize:'1.4em', padding:'2px 5px', margin:'0',
    },
  },
  question: {
    display:'block', marginTop: '20px',
    [theme.breakpoints.down('sm')]: {
      fontSize:'.8em', padding:'2px 5px', margin:'0',
    },
  }, 
  inform: {
      marginTop: '50px',  textAlign: 'right', width:'100%'   
  }
}));

const App = (props) => { 
  const classes = useStyles();
  
  let handleClickWorthy = () => { store.dispatch( { type: 'CHANGE_WORTHY' } ); };

  return (
    <>
      <Grid container={true} direction="row"  className={classes.container}>

        <Grid item={true} xs={5} md={5}>
          <a href="/#/"><img src={cat} alt="cat" className={classes.mainimage} /></a>
        </Grid>  

        <Grid item={true} xs={7} md={7}>

          <Typography variant="h2" className={classes.sitetitle}>
            Feed the cat
          </Typography>

          <Typography variant="h4" className={classes.sitesubtitle}>Накормите кота</Typography>
          <Typography variant="body1" className={classes.question}>Вы достойны кормить кота?</Typography>
          <Switch            
            onChange={handleClickWorthy}
            value="false"
          />Нет, увы...

        </Grid> 

      </Grid>

      { (props.isWorthy) ? (
        <Grid container direction="row"  className={classes.container} alignItems="baseline"  key={0}>                   
          <CategoriesList />
          <FeedList key={0}/>                  
        </Grid>
       ) : (
        <Grid xs={12} md={12} container direction="row">
          <p>Извините, Вы не можете видеть каталог корма, 
          потому что <b>Вы не достойны кормить кота</b>.</p>
        </Grid>)      
      }

         <p  className={classes.inform}>Выполнил Максим Соколов. <a href="/#info">Описание</a>. </p>

    </>
  ) 
}

const mapStateToProps = function(state) {
  return {
    isWorthy: state.categoriesReducer.isWorthy
  }
}

export default connect(mapStateToProps)(App);