import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {connect} from 'react-redux';
import {updFeedCreator} from '../../redux/categories-reducer';

import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';


const UpdateFeedDialog = ({updFeed, open, onClose, categories, currentCat, currentFeed}) =>  {

  let categoryNumber = 0; //First category in initial

  let currentCategoryNumber = function(currentCategoryName) {
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].category == currentCategoryName) {
        return categoryNumber = i;     
      }
    }
  } 

  categoryNumber = currentCategoryNumber(currentCat);

  let currentCatIndex = categoryNumber;

  const handleChangeCategoryName = (e) => {
    currentCategoryNumber(e.target.value);     
  }; 
  
  // Begin For Array index calculate for Feed
  let arrFeedIndex;
  const arrFeedIndexCalc = (cat, item) => {   
    categories[cat].feeds.map(function (el, index) {
      if(el.title == item) {  
        return arrFeedIndex = index;        
      }
    }); 
  }
  // End For Array index calculate for Feed

  arrFeedIndexCalc(categoryNumber, currentFeed);

  let nameBefore = categories[categoryNumber].feeds[arrFeedIndex].title;
  let priceBefore = categories[categoryNumber].feeds[arrFeedIndex].price;
  let textBefore = categories[categoryNumber].feeds[arrFeedIndex].text;
  let feedShelflife = categories[categoryNumber].feeds[arrFeedIndex].shelflife;  

  let [feedName, setFeedName] = React.useState(nameBefore);
  let [feedPrice, setFeedPrice] = React.useState(priceBefore);
  let [feedDesc, setFeedDesc] = React.useState(textBefore);

  const handleChangeFeedName = (e) => {
    setFeedName(e.target.value);
  };
  const handleChangeFeedPrice = (e) => {
    setFeedPrice(e.target.value);
  };
  const handleChangeFeedDesc = (e) => {
    setFeedDesc(e.target.value);
  };
  const handleChangeFeedShelflife = (e) => {
    return feedShelflife = e.target.value;
  };  
  const handleClose = () => {
    onClose(false);
  };
  

  /* Begin Check Feed Name */
  let [checkFeedName, setCheckFeedName] = React.useState('');
  let [checkFeedNameFlag, setCheckFeedNameFlag] = React.useState(false);
  let checkFeedNameFunc = () => { 
    if ( feedName.length < 5 || feedName.length > 40 ) {
      checkFeedName = `Здесь ${feedName.length} cимволов. Можно от 5 до 40.`;
      checkFeedNameFlag = true;
    }
    if ( feedName.length >= 5 && feedName.length <= 40 ) {
      checkFeedName = `Здесь ${feedName.length} cимволов. Это норм.`
      checkFeedNameFlag = false;
    }
    if ( feedName == 'Noname' ) {
      checkFeedName = 'от 5 до 40 символов'
    }
    return checkFeedName; 
  }
  checkFeedNameFunc();
  /* End Check Feed Name */




  const handleSubmit = () => {    
    updFeed(feedName, feedPrice, feedDesc, feedShelflife, categoryNumber, arrFeedIndex, currentCatIndex);
    onClose(false);
  };


  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Изменить характеристики корма</DialogTitle>        

        <DialogContent>
          <TextField
            error={checkFeedNameFlag}
            helperText={checkFeedName}
            autoFocus
            label="Название"
            margin="dense"
            id="name"
            fullWidth
            defaultValue = {nameBefore}
            required
            onChange={handleChangeFeedName}
          />

        </DialogContent>

        <DialogContent>
          <TextField
            error={( feedPrice > 0 || feedPrice == 'none' ) ? false : true}
            helperText={( feedPrice > 0 || feedPrice == 'none' ) ? 'Больше нуля, естественно' : 'Цена должна быть больше нуля' }
            autoFocus
            label="Цена, руб"
            margin="dense"
            id="price"
            fullWidth
            defaultValue = {priceBefore}
            required
            type="number"            
            onChange={handleChangeFeedPrice}
          />
        </DialogContent>

        <DialogContent>
          <TextField
            autoFocus
            label="Описание"
            margin="dense"
            id="description"
            fullWidth
            defaultValue = {textBefore}
            required
            onChange={handleChangeFeedDesc}
          />
        </DialogContent>

        <DialogContent>
          <TextField
            id="date"
            label="Срок годности"
            type="date"
            defaultValue={feedShelflife}
            onChange={handleChangeFeedShelflife}
          />
        </DialogContent>

        <DialogContent>
          <FormControl>
            <InputLabel htmlFor="uncontrolled-native">Категория корма</InputLabel>
            <NativeSelect
              defaultValue={currentCat}
              onChange={handleChangeCategoryName}
            >
              {categories.map(option => (
              <option key={option.id} value={option.category}>
                {option.category}
              </option>
            ))}
            </NativeSelect>
            <FormHelperText>Выберите пожалуйста</FormHelperText>
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Закрыть
          </Button>

          { (checkFeedNameFlag || feedPrice < 0 ) ? (
            <Button color="primary">
              Заполните поля
            </Button> 
            ) : (
             <Button onClick={handleSubmit} color="primary">
             Редактировать
           </Button> )
          }

        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = function(state) {
  return {
    allCategories: state.categoriesReducer.allCategories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updFeed: (name, price, desc, shelflife, categoryNumber, feedNumber, currentCatIndex) => {
      dispatch(updFeedCreator(name, price, desc, shelflife, categoryNumber, feedNumber, currentCatIndex));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateFeedDialog);
