import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Feed from '../Feed.jsx'
import Info from '../Info.jsx'
import {connect} from 'react-redux';
import AddFeedDialog from '../AddFeedDialog';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {addCategoryCreator} from '../../redux/categories-reducer';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles ({
  container: {
    margin: '6px 3px 0 0', background: '#f7f3f2', border: '1px solid #e2e0df'
  },
  addbutton: {
    color: 'rgb(101, 199, 122)', padding: '5px'
  },
  addicon: {
    fontSize: '60px'  
  }
})

const FeedList = ({allCategories}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false); 
  const handleClickOpen = () => setOpen(true);
  const handleClickClose = () => setOpen(false);
  const containerClasses = { root: classes.container };
  const addbuttonClasses = { root: classes.addbutton };

  let products = [];

  for (const cat of allCategories) {
    if (cat.feeds && cat.feeds.length) {
      products.push(...cat.feeds);
    }    
  }

  const AddFeedListItem = (currentCategory) => 
  <Card key = '0' classes={containerClasses}>
    <CardActionArea>
      <CardMedia title='Добавить корм' />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
        Добавить корм
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          <IconButton aria-label="add" className="notoutline" classes={addbuttonClasses}>
            <AddCircleOutlineIcon className={classes.addicon}  onClick={handleClickOpen}/>
          </IconButton>
          <AddFeedDialog  products={products} 
            categories={allCategories} open={open} onClose={handleClickClose}
            currentCategory={currentCategory} /> 
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>;


  const FeedListItems = products.map(feed =>
    <>      
      <Switch>
        <Route exact path = "/"> 
          <Grid item xs={6} md={4}>
            <Feed feed={feed} key={feed.id} products={products} />            
          </Grid>          
        </Route>
        <Route path = {`/${feed.category}`} > 
          <Grid item xs={6} md={4}>           
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
        <Typography variant="h5">{cat.category}</Typography>        
      </Route>    
  ); 

  return (      
    <Grid item xs={12} md={9} container direction="row">
      <Grid xs={12} md={12}> 
        <Route exact path = "/"> 
          <Typography variant="h5">Весь корм</Typography>             
        </Route>
        {currentCategoryName}
      </Grid>

      <Grid xs={12} md={12} container direction="row">       
        {FeedListItems} 
        {AddFeedListItemRoute}
        <Route exact path = "/"> 
          {AddFeedListItem('Для котов')}           
        </Route>
        <Route path = '/info' > 
          <div className="col-md-12">
            <Info />
          </div>
        </Route>
      </Grid>

    </Grid>
  )
}

const mapStateToProps = function(state) {
  return {
    allCategories: state.categoriesReducer.allCategories
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