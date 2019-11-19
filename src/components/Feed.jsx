import React from 'react';
import {connect} from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import DelFeedDialog from '../components/DelFeedDialog';
import UpdateFeedDialog from '../components/UpdateFeedDialog';

const useStyles = makeStyles({
  container: {
    margin: '6px 3px 0 0', background: '#f7f3f2', border: '1px solid #e2e0df',
  },
  price: {
    fontWeight: 'bold', color: '#189434', display: 'inline-block', paddingLeft: '4px'
  },
  shelflife: {
    fontSize: '.8em', paddingTop: '5px'
  }
})

const Feed = ({ feed: { title, id, price, text, shelflife, category }, allCategories, products }) => {
  const classes = useStyles();

  const [openDeleteFeed, setOpenDeleteFeed] = React.useState(false);
  const [openUpdateFeed, setOpenUpdateFeed] = React.useState(false);
  const containetClasses = { root: classes.container };
  const priceClasses =  { root: classes.price };
  const shelflifeClasses = { root: classes.shelflife };

  let handleClickOpenDelFeed = () => setOpenDeleteFeed(true);   
  const handleCloseDeleteFeedClick = () => setOpenDeleteFeed(false);  
  let handleOpenUpdateFeedClick = () => setOpenUpdateFeed(true);  
  const handleCloseUpdateFeedClick = () => setOpenUpdateFeed(false);

 return (
    <Card key = {id} classes={containetClasses}>
    <CardActionArea>
      <CardMedia title={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
        {title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">        
          <Typography color="textSecondary" variant="body2">Цена: 
            <Typography classes={priceClasses}>{price} руб.</Typography>
          </Typography>
          {text}
          <Typography color="textSecondary" variant="body2" classes={shelflifeClasses}>
            Срок годности: {shelflife}
          </Typography>
        </Typography>
      </CardContent>
    </CardActionArea>
    <CardActions>
      <Button size="small" color="primary"  onClick={handleOpenUpdateFeedClick}>
        Редактировать
      </Button>
      <UpdateFeedDialog categories={allCategories} currentFeed={title}
        currentCat={category} open={openUpdateFeed} onClose={handleCloseUpdateFeedClick} products={products} />

      <Button size="small" color="primary" onClick={handleClickOpenDelFeed}>
        Удалить
      </Button>
      <DelFeedDialog categories={allCategories} currentFeed={title}
        currentCat={category} open={openDeleteFeed} onClose={handleCloseDeleteFeedClick}/>

    </CardActions>
  </Card>)
}


const mapStateToProps = function(state) {
  return {
    allCategories: state.categoriesReducer.allCategories
  }
}

export default connect(mapStateToProps)(Feed);