import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Feed from '../feeds/Feed'
import Info from '../Info'
import { connect } from 'react-redux';
import AddFeedDialog from '../feeds/AddFeedDialog';

import {addCategoryCreator} from '../../redux/categories-reducer';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles ( theme => ({
  container: {
    margin: '6px 3px 0 0', background: '#f7f3f2', border: '1px solid #e2e0df'
  },
  addbutton: {
    color: 'rgb(101, 199, 122)', padding: '5px'
  },
  addicon: {
    fontSize: '60px'  
  },
  wrapper: {
    [theme.breakpoints.down('sm')]: { marginTop:'20px', }, 
  },
  title: {
    [theme.breakpoints.down('sm')]: { paddingLeft:'16px', }, 
  }
}));

const FeedList = ({allCategories, feeds}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false); 
  const handleClickOpen = () => setOpen(true);
  const handleClickClose = () => setOpen(false);
  const containerClasses = { root: classes.container };
  const addbuttonClasses = { root: classes.addbutton };

  let products = feeds;

  const AddFeedListItem = (currentCategory) => 
  <Grid item xs={6} md={4}>
    <Card key={0} classes={containerClasses}>   
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          Добавить корм
          </Typography>
          <IconButton aria-label="add" classes={addbuttonClasses} onClick={handleClickOpen}>
            <AddCircleOutlineIcon className={classes.addicon} />
          </IconButton>
          <AddFeedDialog  products={products} 
            categories={allCategories} open={open} onClose={handleClickClose}
            currentCategory={currentCategory} /> 
        </CardContent>
    </Card>
  </Grid>;


  const FeedListItems = products.map(feed =>
    <>      
      <Switch key={feed.id}>
        <Route exact path = "/"> 
          <Grid item xs={6} md={4} key={feed.id} >
            <Feed feed={feed} key={feed.id} products={products} />            
          </Grid>          
        </Route>
        <Route path = {`/${feed.category}`} > 
          <Grid item xs={6} md={4} key={feed.id} >           
            <Feed feed={feed} key={feed.id} products={products} />            
          </Grid>           
        </Route>        
      </Switch>
    </>
  ); 
  
  const AddFeedListItemRoute = allCategories.map(cat =>    
      <Route path = {`/${cat.category}`} >
         {AddFeedListItem(cat.category)}   
      </Route>    
  );  

  const currentCategoryName = allCategories.map(cat =>
      <Route path = {`/${cat.category}`} > 
        <Grid key={cat.id} > 
          <Typography variant="h5" className={classes.title}>{cat.category}</Typography>    
        </Grid>    
      </Route>    
  ); 

  return (      
    <Grid item xs={12} md={9} container direction="row" className={classes.wrapper}>
      
        <Route exact path = "/"> 
          <Grid> 
            <Typography variant="h5" className={classes.title}>Весь корм</Typography>  
          </Grid>           
        </Route>

        {currentCategoryName}      

      <Grid container direction="row">       
        {FeedListItems} 
        {AddFeedListItemRoute}
        <Route exact path = "/"> 
          {AddFeedListItem('Для котов')}           
        </Route>
        <Route path = '/info' > 
            <Info />    
        </Route>
      </Grid>

    </Grid>
  )
}

const mapStateToProps = function(state) {
  return {
    allCategories: state.categoriesReducer.allCategories,
    feeds: state.feedsReducer.feeds,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addFeed: (name) => {
      dispatch(addCategoryCreator(name));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedList);