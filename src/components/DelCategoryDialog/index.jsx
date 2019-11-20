import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {connect} from 'react-redux';
import {delCategoryCreator} from '../../redux/categories-reducer';
import {addFeedFromDelCategoryCreator} from '../../redux/categories-reducer';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';


const DelCategoryDialog = ({deleteCategory, addFeedFromDelCategory, open, onClose, categories, currentCategory}) =>  {

  const [catForAddFeed, setCatForAddFeed] = React.useState('Notselect'); 
  let [catForAddFeedIndex, setCatForAddFeedIndex] = React.useState('notSelected');

  const handleClose = () => {
    onClose(false);
  };

  React.useEffect(() =>{

  })

  // Begin For Array index calculate (from 0 to end) for delete category

  let arrNumber = 0;

  const ArrIndexCalc = (currentCategory) => {
    categories.map(function (el, index) {
      if(el.category === currentCategory) {
        return arrNumber = index;
      }
      return false;
    }); 
  }  
  
  // End For Array index calculate (from 0 to end) for delete category

  const handleSubmit = () => {
    ArrIndexCalc(currentCategory); 
    if (currentCategoryLength) {
      let feeds = currentCategoryItems;
      if (catForAddFeedIndex !== 'notSelected') {
        feeds.forEach( o => { o.category = catForAddFeed; } );
        addFeedFromDelCategory(feeds, catForAddFeedIndex);
      }
      deleteCategory(arrNumber);
    } 
    if (!currentCategoryLength) {
      deleteCategory(arrNumber);
    }
    onClose(false);
  }; 

  ArrIndexCalc(currentCategory);

  let currentCategoryItems = categories[arrNumber].feeds;
  let currentCategoryLength = categories[arrNumber].feeds.length;  

  const handleChangeCategoryName = (e) => {
    ArrIndexCalc(e.target.value);     
    return setCatForAddFeed(e.target.value);    
  };

  // Begin For Array index calculate for Add Feed from deleted category

  const arrIndexCalcForAddFeed = (cat) => {
    categories.map(function (el, index) {
      if(el.category === cat) {
        return catForAddFeedIndex = index;
      }
      return false;
    });   
  }  

  React.useEffect(() => {
    arrIndexCalcForAddFeed(catForAddFeed)
  }, [catForAddFeed]);
 

 // End For Array index calculate for Add Feed from deleted category 
  

 



  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Удалить категорию "{currentCategory}"?</DialogTitle>        
        
        { ( currentCategoryLength > 0 ) ? (
          <DialogContent>
          <p>Эта категория содержит корм.</p> 
          <p>Количество видов - {currentCategoryLength}: <br />
            <>
              {currentCategoryItems.map(feeds => (
                  <span key={feeds.id}>
                    {feeds.title} <br />
                  </span>
              ))}
            </>
          </p>
          <FormControl>
            <InputLabel htmlFor="uncontrolled-native">Перенести в</InputLabel>
            <NativeSelect
              defaultValue={'Notselect'}
              onChange={handleChangeCategoryName}            >
              <option key={0} value={'Notselect'}>
                Просто удалить
              </option>
              {categories.filter(e => e.category !== currentCategory).map(option => (
                <option key={option.id} value={option.category}>
                  {option.category}
                </option>                
              ))}
            </NativeSelect>
            <FormHelperText>Выберите категорию</FormHelperText>
          </FormControl>
        </DialogContent>
        ) : ( 
          <DialogContent>Категория пустая.</DialogContent>
        )}

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
    deleteCategory: (arrNumber) => {
      dispatch(delCategoryCreator(arrNumber)); 
    },
    addFeedFromDelCategory: (feeds, categoryInstedNumber) => {
      dispatch(addFeedFromDelCategoryCreator(feeds, categoryInstedNumber));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DelCategoryDialog);
