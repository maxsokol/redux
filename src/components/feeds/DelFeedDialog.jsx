import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import { delFeedCreator } from '../../redux/feeds-reducer';

const DelFeedDialog = ({delFeed, open, onClose, feeds, currentFeed}) =>  {

  const handleClose = () => {
    onClose(false);
  };

  // Begin For Array index calculate for Feed
  let feedIndex;
  const arrFeedIndexCalc = ( item ) => {   
    feeds.map(function ( el, index ) {
      if ( el.title === item ) { 
          return feedIndex = index;        
      }
      return false;
    }); 
  }  

  // End For Array index calculate for Feed


  const handleSubmit = () => {
      arrFeedIndexCalc(currentFeed);      
      delFeed(feedIndex);
      onClose(false);
    }; 

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Удалить корм "{currentFeed}"?</DialogTitle>        
        
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Отмена
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = function(state) {
  return {
    feeds: state.feedsReducer.feeds
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    delFeed: (feedIndex) => {
      dispatch(delFeedCreator(feedIndex)); 
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DelFeedDialog);
