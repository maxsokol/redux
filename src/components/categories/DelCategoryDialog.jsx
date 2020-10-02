import React from 'react';
import { connect } from 'react-redux';
import { delCategoryCreator } from '../../redux/categories-reducer';
import { delFeedCreator } from '../../redux/feeds-reducer';
import { transFeedFromDelCategoryCreator } from '../../redux/feeds-reducer';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const DelCategoryDialog = ({delCategory, delFeed, transFeedFromDelCategory, open, onClose, categories, currentCategory, feeds}) =>  {

  const [catForAddFeed, setCatForAddFeed] = React.useState('notselect'); 

  const handleClose = () => {
    onClose(false);
  };

  // Begin For Array index calculate for delete category

  let arrNumber = 0;

  const arrIndexCalc = (currentCategory) => {
    categories.map(function (el, index) {
      if(el.category === currentCategory) {
        return arrNumber = index;
      }
      return false;
    }); 
  }  
  
  // End For Array index calculate for delete category

  const handleSubmit = () => {
    arrIndexCalc(currentCategory); 
    if ( currentCategoryLength ) {
      if ( catForAddFeed !== 'notselect' ) {
        transFeedFromDelCategory(currentCategory, catForAddFeed);
      } 
      else if ( catForAddFeed === 'notselect' ) {
        for ( let index = feeds.length - 1; index >= 0; --index ) {
          if ( feeds[index].category === currentCategory ) { delFeed(index); }
        }
      }
      delCategory(arrNumber);
    } 
    if (!currentCategoryLength) {
      delCategory(arrNumber);
    }
    onClose(false);
  }; 

  let feedsFromDelCategory = [];  

  for ( const item of feeds ) {    
    if ( item && ( item.category === currentCategory ) ) {
      feedsFromDelCategory.push(item);
    }    
  } 


  let currentCategoryItems = feedsFromDelCategory;
  let currentCategoryLength = feedsFromDelCategory.length;  

  const changeCategoryName = (e) => {
    arrIndexCalc(e.target.value);     
    return setCatForAddFeed(e.target.value);    
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Delete category "{currentCategory}"?</DialogTitle> 

        {(() => {
        if ( categories.length === 1 ) {
          return (
            <DialogContent>
              <p>Sorry, you cannot delete the last category. But you can rename it.</p>
            </DialogContent>
          )
        } else if ( currentCategoryLength > 0 ) {
          return (
            <>
              <DialogContent>
                <p>This category contains food.</p> 
                <p>Number of species - {currentCategoryLength}: <br />
                  <>
                    {currentCategoryItems.map(feedsArr => (
                        <span key={feedsArr.id}>
                          {feedsArr.title} <br />
                        </span>
                    ))}
                  </>
                </p>
                <FormControl>
                  <InputLabel htmlFor="uncontrolled-native">Transfer to</InputLabel>
                  <NativeSelect
                    defaultValue={'Notselect'}
                    onChange={changeCategoryName}            >
                    <option key={0} value={'Notselect'}>
                      Just remove
                    </option>
                    {categories.filter(e => e.category !== currentCategory).map(option => (
                      <option key={option.id} value={option.category}>
                        {option.category}
                      </option>                
                    ))}
                  </NativeSelect>
                  <FormHelperText>Select a category</FormHelperText>
                </FormControl>
              </DialogContent>

              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                  Delete
                </Button>
              </DialogActions>
            </>
          )
        } else if ( currentCategoryLength === 0 ) {
          return (
            <DialogContent>
              Category is empty.

              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                  Delete
                </Button>
              </DialogActions>
            </DialogContent>
          )
        }
      })()}
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
    delCategory: (arrNumber) => {
      dispatch(delCategoryCreator(arrNumber)); 
    },
    delFeed: (arrNumber) => {
      dispatch(delFeedCreator(arrNumber)); 
    },
    transFeedFromDelCategory: (currentCategory, categoryInsted) => {
      dispatch(transFeedFromDelCategoryCreator(currentCategory, categoryInsted));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DelCategoryDialog);
