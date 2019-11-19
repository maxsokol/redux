import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {connect} from 'react-redux';
import {updateCategoryCreator} from '../../redux/categories-reducer';
import TextField from '@material-ui/core/TextField';

const UpdateCategoryDialog = ({updateCategory, open, onClose, categories, currentCategory}) =>  {

  const [categoryName, setCategoryName] = React.useState('');

  const handleClose = () => {
    onClose(false);
  };

  // Begin For Array index calculate (from 0 to end) for update name category

  let arrNumber;

  const ArrIndexCalc = (currentCategory) => {
    categories.map(function (el, index) {
      if(el.category == currentCategory) {
        return arrNumber = index;
      }
    }); 
  }  
  
  // End For Array index calculate (from 0 to end) for update name category

  
  const handleSubmit = (e) => {
    ArrIndexCalc(currentCategory);
    const feeds = categories[arrNumber].feeds;         
    feeds.forEach( o => { o.category = categoryName; } );    
    updateCategory(categoryName, arrNumber);
    onClose(false);
  }; 

  ArrIndexCalc(currentCategory);

   const handleChangeCategoryName = (e) => {
    ArrIndexCalc(e.target.value);   
    setCategoryName(e.target.value);  
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Переименовать категорию "{currentCategory}"</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="email"
            fullWidth
            onChange={handleChangeCategoryName}
          />          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Закрыть
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Переименовать
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
    updateCategory: (name, index) => {
      dispatch(updateCategoryCreator(name, index)); 
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateCategoryDialog);
