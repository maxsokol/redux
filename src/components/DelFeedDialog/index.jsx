import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import {connect} from 'react-redux';
import {delFeedCreator} from '../../redux/categories-reducer';

const DelFeedDialog = ({delFeed, open, onClose, categories, currentFeed, currentCat}) =>  {

  const handleClose = () => {
    onClose(false);
  };

  // Begin For Array index calculate (from 0 to end) for category
  let arrCatIndex;
  const arrCatIndexCalc = (item) => {
    categories.map(function (el, index) {
      if(el.category == item) {
        return arrCatIndex = index;        
      }
    }); 
  }
  // End For Array index calculate (from 0 to end) for category


  // Begin For Array index calculate (from 0 to end) for Feed
  let arrFeedIndex;
  const arrFeedIndexCalc = (cat, item) => {   
    categories[cat].feeds.map(function (el, index) {
      if(el.title == item) {  
        return arrFeedIndex = index;        
      }
    }); 
  }
  // End For Array index calculate (from 0 to end) for Feed


  const handleSubmit = () => {
      arrCatIndexCalc(currentCat); 
      arrFeedIndexCalc(arrCatIndex, currentFeed);
      delFeed(arrCatIndex, arrFeedIndex);
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
    // allCategories: state.categoriesReducer.allCategories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    delFeed: (catIndex, feedIndex) => {
      dispatch(delFeedCreator(catIndex, feedIndex)); 
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DelFeedDialog);
