import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {connect} from 'react-redux';
import {addFeedCreator} from '../../redux/categories-reducer';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

const useStyles = makeStyles({
  title: {
    padding: 0,
  },
  input: {
    display: 'block',
    margin: '25px 0',
  }
});

const AddFeedDialog = ({addFeed, open, onClose, categories, products, currentCategory}) =>  {
  const classes = useStyles();

  const [feedName, setFeedName] = React.useState('Noname');
  const [feedPrice, setFeedPrice] = React.useState('none');
  const [feedDesc, setFeedDesc] = React.useState('');
  let [feedShelflife] = React.useState('');
  
  const handleChangeFeedName = (e) => setFeedName(e.target.value);
  const handleChangeFeedPrice = (e) => setFeedPrice(e.target.value);
  const handleChangeFeedDesc = (e) => setFeedDesc(e.target.value);
  const handleClose = () => onClose(false);

  const titleClasses = { root: classes.title };
  const inputClasses = { root: classes.input };

  /* Begin Tomorrow day script */
  let today = new Date();
  let getTomorowDate = function(date){
    let tomorrow = new Date(today.getTime() + (24 * 60 * 60 * 1000));
    let dayTomorrow = tomorrow.getDate(); 
    let monthTomorrow = tomorrow.getMonth() + 1; //in js month begin from 0
    let yearTomorrow = tomorrow.getFullYear();   
    return yearTomorrow + '-' + ((monthTomorrow < 10) ? "0" + monthTomorrow : monthTomorrow) 
    + '-' + ((dayTomorrow < 10) ? "0" + dayTomorrow : dayTomorrow);  
  };
  feedShelflife = getTomorowDate(today);  
  const handleChangeFeedShelflife = (e) => {
      return feedShelflife = e.target.value;
  };
  /* End Tomorrow day script */  

  let categoryNumber = 0; //First category in initial

  let currentCategoryNumber = function(currentCategoryName) {
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].category == currentCategoryName) {
        return categoryNumber = i;     
      }
    }
  } 
    
  categoryNumber = currentCategoryNumber(currentCategory);

  const handleChangeCategoryName = (e) => {
    currentCategoryNumber(e.target.value);     
  };   

  let productsLenght = products.length;

  const handleSubmit = () => {
    addFeed(feedName, feedPrice, feedDesc, feedShelflife, categoryNumber, productsLenght, categories);
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

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">              

        <DialogContent>

        <DialogTitle id="form-dialog-title" classes={titleClasses}>Добавить корм</DialogTitle> 

          <TextField
            error={checkFeedNameFlag}
            helperText={checkFeedName}
            autoFocus
            label="Название"
            margin="dense"
            id="name"
            fullWidth
            required
            onChange={handleChangeFeedName}
          />

           <TextField
            error={( feedPrice > 0 || feedPrice == 'none' ) ? false : true}
            helperText={( feedPrice > 0 || feedPrice == 'none' ) ? 'Больше нуля, естественно' : 'Цена должна быть больше нуля' }
            autoFocus
            label="Цена, руб"
            margin="dense"
            id="price"
            fullWidth
            required
            type="number"            
            onChange={handleChangeFeedPrice}
          />

          <TextField
            autoFocus
            label="Описание"
            margin="dense"
            id="description"
            fullWidth
            required
            onChange={handleChangeFeedDesc}
          />
   
          <TextField classes={inputClasses}
            id="date"
            label="Срок годности"
            type="date"
            defaultValue={feedShelflife}
            onChange={handleChangeFeedShelflife}
          />

          <FormControl classes={inputClasses}>
            <InputLabel htmlFor="uncontrolled-native">Категория корма</InputLabel>
            <NativeSelect
              defaultValue={currentCategory}
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


          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Закрыть
            </Button>

            { (checkFeedNameFlag || feedName == 'Noname' || feedPrice < 0 || feedPrice == 'none' ) ? (
              <Button color="primary">
                Заполните поля
              </Button> 
              ) : (
              <Button onClick={handleSubmit} color="primary">
              Добавить
            </Button> )
            }

          </DialogActions>

        </DialogContent>
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
    addFeed: (name, price, desc, shelflife, categoryNumber, productsLenght) => {
      dispatch(addFeedCreator(name, price, desc, shelflife, categoryNumber, productsLenght));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddFeedDialog);
