import React from 'react';
import { connect } from 'react-redux';
import { updateCategoryCreator } from '../../redux/categories-reducer';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

const UpdateCategoryDialog = ({updateCategory, open, onClose, categories, feeds, currentCategory}) =>  {

  let [categoryName, setCategoryName] = React.useState('Noname');

  const handleClose = () => {
    setCategoryName('Noname');
    onClose(false);
  }

  // Begin For Array index calculate for update name category

  let arrNumber;

  const arrIndexCalc = (currentCategory) => {
    categories.map(function (el, index) {
      if(el.category === currentCategory) {
        return arrNumber = index;
      }
      return false;
    }); 
  }  
  
  // End For Array index calculate for update name category
  
  const handleSubmit = (e) => {
    categoryName = categoryName.split(' ').filter(n => n).join(' ');  
    arrIndexCalc(currentCategory);   
    feeds.forEach( o => { 
      if ( o.category === currentCategory ) {
        o.category = categoryName;
      }
    } );       
    updateCategory(categoryName, arrNumber);
    onClose(false);
  }; 

  arrIndexCalc(currentCategory);

   const changeCategoryName = (e) => {
    arrIndexCalc(e.target.value);   
    setCategoryName(e.target.value);  
  };


    /* Begin. Check Category Name */
    let [checkCategoryName, setCheckCategoryName] = React.useState('');
    let [checkCategoryNameFlag, setCheckCategoryNameFlag] = React.useState(false);
    let checkFeedNameFunc = () => { 
      if ( categoryName.length < 5 || categoryName.length > 40 ) {
        checkCategoryName = `Здесь ${categoryName.length} cимволов. Можно от 5 до 40.`;
        checkCategoryNameFlag = true;
      }
      if ( categoryName.length >= 5 && categoryName.length <= 40 ) {
        checkCategoryName = `Здесь ${categoryName.length} cимволов. Это норм.`
        checkCategoryNameFlag = false;
      }
      if ( categoryName === 'Noname' ) {
        checkCategoryName = 'от 5 до 40 символов'
        checkCategoryNameFlag = false;
      }
      return checkCategoryName; 
    }
    checkFeedNameFunc();
    /* End. Check Category Name */

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Переименовать категорию "{currentCategory}"</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            helperText={checkCategoryName}
            error={checkCategoryNameFlag}
            margin="dense"
            id="name"
            type="email"
            fullWidth
            onChange={changeCategoryName}            
          />          
        </DialogContent>

        <DialogActions>
            <Button onClick={handleClose} color="primary">
              Закрыть
            </Button>

            { (checkCategoryNameFlag || categoryName === 'Noname' ) ? (
              <Button color="primary" disabled>
                Введите название
              </Button> 
              ) : (
              <Button onClick={handleSubmit} color="primary">
                Переименовать
            </Button> )
            }
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
    updateCategory: (name, index) => {
      dispatch(updateCategoryCreator(name, index)); 
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateCategoryDialog);
