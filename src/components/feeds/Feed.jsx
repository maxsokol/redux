import React from 'react';
import {connect} from 'react-redux';
import DelFeedDialog from '../feeds/DelFeedDialog';
import UpdateFeedDialog from '../feeds/UpdateFeedDialog';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles( theme => ({
  container: {
    margin:'6px 3px 0 0', background:'#f7f3f2', border:'1px solid #e2e0df', 
  },
  containerinner: {
    minHeight:'125px',
    [theme.breakpoints.down('sm')]: { minHeight:'135px', },
  },
  price: {
    fontWeight:'bold', color:'#189434', display:'inline-block', paddingLeft:'4px'
  },
  title: {
    [theme.breakpoints.down('sm')]: { marginBottom: 0, },
  },
  text: {
    [theme.breakpoints.down('sm')]: { fontSize:'.8em', },   
  },
  shelflife: {
    fontSize: '.8em', paddingTop: '5px'
  },
  button: {
    [theme.breakpoints.down('sm')]: {
      fontSize:'.5em', background:'#cae4d0', textAlign:'left', marginRight: '-10px'
    },
  }
}));

const Feed = ({ feed: { title, id, price, text, shelflife, category }, allCategories, products }) => {
  const classes = useStyles();

  const [openDeleteFeed, setOpenDelFeed] = React.useState(false);
  const [openUpdateFeed, setOpenUpdateFeed] = React.useState(false);
  const containerClasses = { root: classes.container };
  const containerinnerClasses = { root: classes.containerinner };
  const titleClasses = { root: classes.title };
  const shelflifeClasses = { root: classes.shelflife };
  const buttonClasses = { root: classes.button };
  const textClasses = { root: classes.text };

  let openDelFeedClick = () => setOpenDelFeed(true);   
  const closeDelFeedClick = () => setOpenDelFeed(false);  
  let openUpdateFeedClick = () => setOpenUpdateFeed(true);  
  const closeUpdateFeedClick = () => setOpenUpdateFeed(false);

 return (
    <Card key = {id} classes={containerClasses}>
      <CardContent  classes={containerinnerClasses}>
        <Typography gutterBottom variant="h5" component="h2" classes={titleClasses}>
          {title}
        </Typography>      
          <Typography color="textSecondary" variant="body2">Price: 
            <span className={classes.price}>{price} cents</span>
          </Typography>
          <Typography variant="body2" component="p" classes={textClasses}> 
            {text}
          </Typography>
          <Typography color="textSecondary" variant="body2" classes={shelflifeClasses}>
            Shelf life: {shelflife}
          </Typography>
      </CardContent>
    <CardActions>
      <Button size="small" color="primary"  onClick={openUpdateFeedClick} classes={buttonClasses}>
        Edit
      </Button>
      <UpdateFeedDialog categories={allCategories} currentFeed={title}
        currentCat={category} open={openUpdateFeed} onClose={closeUpdateFeedClick} products={products} />

      <Button size="small" color="primary" onClick={openDelFeedClick} classes={buttonClasses}>
        Delete
      </Button>
      <DelFeedDialog categories={allCategories} currentFeed={title}
        open={openDeleteFeed} onClose={closeDelFeedClick}/>

    </CardActions>
  </Card>)
}


const mapStateToProps = function(state) {
  return {
    allCategories: state.categoriesReducer.allCategories
  }
}

export default connect(mapStateToProps)(Feed);