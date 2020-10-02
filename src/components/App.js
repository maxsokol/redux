import React from 'react';
import CategoriesList from "../components/categories/CategoriesList";
import FeedList from "../components/feeds/FeedList";
import cat from '../feed-the-cat.jpg';
import { connect } from 'react-redux';
import store from '../redux/redux-store.js';
import { isAdminCreator } from '../../src/redux/user-reducer';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { addMinutes } from 'date-fns';

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
  auth: {
    margin:'10px 2% 0 0', width:'46%', display:'block',
    [theme.breakpoints.down('sm')]: {
      margin:'0 2% 0 0', display:'inline-block',
    },
  }, 
  inform: {
      marginTop: '50px',  textAlign: 'right', width:'100%'   
  },
  submit: {
    margin: '5px auto 0 0'   
  },
  loginForm: {
    padding: 0
  }
}));

const App = ({siteAdmin, isAdmin}) => { 
  const classes = useStyles(); 

  const [login, setLogin] = React.useState(null);
  const [password, setPassword] = React.useState(null);

  const changeLogin = (e) => setLogin(e.target.value);
  const changePassword = (e) => setPassword(e.target.value);

  const handleSubmit = () => {
    isAdmin(login, password);    
  };

  const handleLogout = () => {
    isAdmin('false', 'false');    
  };

  let localStorageSiteAdmin = localStorage.getItem('siteAdmin');
  let localStorageSiteAdminName = localStorage.getItem('siteAdminName');

  if ( localStorageSiteAdmin == 'true' || localStorageSiteAdmin == true ) { 
    isAdmin('client', 'client');
  };

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

          <Typography variant="h4" className={classes.sitesubtitle}>Online store</Typography>
          
          <DialogContent  className={classes.loginForm}>

            { ( siteAdmin == false ) ? (
              <>
                <TextField
                  className={classes.auth}
                  label="Login"
                  margin="dense"
                  id="name"
                  type="search"
                  fullWidth
                  onChange={changeLogin}
                />   

                <TextField
                  className={classes.auth}
                  label="Password"
                  margin="dense"
                  id="name"
                  type="password"
                  fullWidth
                  onChange={changePassword}
                />

                <DialogActions>
                  <Button onClick={handleSubmit} 
                    className={classes.submit} 
                    color="primary">
                      Log in
                  </Button>               
                </DialogActions>
              </>
            ) : (
              <>
                <Typography>We're glad to see you, {localStorageSiteAdminName}</Typography>
                <DialogActions>
                  <Button onClick={handleLogout} 
                    className={classes.submit} 
                    color="primary">
                      Log out
                  </Button>               
                </DialogActions>
              </>
            )}

          </DialogContent>  
 

        </Grid> 

      </Grid>

      { ( siteAdmin ) ? (
        <Grid container direction="row"  className={classes.container} alignItems="baseline"  key={0}>                   
          <CategoriesList />
          <FeedList key={0}/>                  
        </Grid>
       ) : (
        <Grid xs={12} md={12} container direction="row">
          <p>Sorry, you cannot see the feed catalog
          until you enter your login <b>client</b> and pass <b>client</b>.</p>
        </Grid>)      
      }

         <p  className={classes.inform}>Designed by Max Sokolov. <a href="/#info">Description</a>. </p>

    </>
  ) 
}

const mapStateToProps = function(state) {
  return {
    siteAdmin: state.usersReducer.siteAdmin
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    isAdmin: (login, password) => {
      dispatch(isAdminCreator(login, password));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);


