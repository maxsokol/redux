import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {connect} from 'react-redux';
import {addFeedCreator} from '../../redux/feeds-reducer';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import DateFnsUtils from '@date-io/date-fns'; 
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

const useStyles = makeStyles({
  title: {
    padding: 0,
  },
  input: {
    display: 'block', margin: '25px 0',
  }
});

const AddFeedDialog = ({addFeed, open, onClose, categories, products, currentCategory}) =>  {
  const classes = useStyles();
  const [feedName, setFeedName] = React.useState('Noname');
  const [feedPrice, setFeedPrice] = React.useState('none');
  const [feedDesc, setFeedDesc] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState(currentCategory);
  let [feedShelflife, setFeedShelflife] = React.useState('notselect');  

  const changeFeedName = (e) => setFeedName(e.target.value);
  const changeFeedPrice = (e) => setFeedPrice(e.target.value);
  const changeFeedDesc = (e) => setFeedDesc(e.target.value);
  const handleClose = () => onClose(false);

  const titleClasses = { root: classes.title };
  const inputClasses = { root: classes.input };

  /* Begin Tomorrow day script */

  let today = new Date();
  let tomorrow = new Date(today.getTime() + (24 * 60 * 60 * 1000));
  let getTomorowDate = function(date){
    let dayTomorrow = tomorrow.getDate(); 
    let monthTomorrow = tomorrow.getMonth() + 1; //in js month begin from 0
    let yearTomorrow = tomorrow.getFullYear();   
    return yearTomorrow + '-' + ((monthTomorrow < 10) ? "0" + monthTomorrow : monthTomorrow) 
    + '-' + ((dayTomorrow < 10) ? "0" + dayTomorrow : dayTomorrow);  
  };

  if ( feedShelflife === 'notselect' ) { feedShelflife = getTomorowDate(today); }

  /* End Tomorrow day script */  

  const feedShelflifeChange = (date) => {
    let day = date.getDate();
    let month = date.getMonth() + 1; 
    let year = date.getFullYear();   
    date = year + '-' + ((month < 10) ? "0" + month : month) 
    + '-' + ((day < 10) ? "0" + day : day); 
    return setFeedShelflife(date); 
  };

  const changeCategoryName = (e) => {
    setSelectedCategory(e.target.value);     
  };   

  let productsLenght = products.length;

  const handleSubmit = () => {
    addFeed(feedName, feedPrice, feedDesc, feedShelflife, selectedCategory, productsLenght);
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
    if ( feedName === 'Noname' ) {
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
            onChange={changeFeedName}
          />

           <TextField
            error={( feedPrice > 0 || feedPrice === 'none' ) ? false : true}
            helperText={( feedPrice > 0 || feedPrice === 'none' ) ? 'Больше нуля, естественно' : 'Цена должна быть больше нуля' }
            autoFocus
            label="Цена, руб"
            margin="dense"
            id="price"
            fullWidth
            required
            type="number"            
            onChange={changeFeedPrice}
          />

          <TextField
            autoFocus
            label="Описание"
            margin="dense"
            id="description"
            fullWidth
            required
            onChange={changeFeedDesc}
          />

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker 
              classes={inputClasses}
              label="Срок годности"
              minDate={tomorrow} 
              format="MM/dd/yyyy"
              value={feedShelflife} 
              onChange={feedShelflifeChange}     
            />
          </MuiPickersUtilsProvider>

          <FormControl classes={inputClasses}>
            <InputLabel htmlFor="uncontrolled-native">Категория корма</InputLabel>
            <NativeSelect
              defaultValue={currentCategory}
              onChange={changeCategoryName}
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

            { (checkFeedNameFlag || feedName === 'Noname' || feedPrice < 0 || feedPrice === 'none' ) ? (
              <Button color="primary" disabled>
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
    addFeed: (name, price, desc, shelflife, category, productsLenght) => {
      dispatch(addFeedCreator(name, price, desc, shelflife, category, productsLenght));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddFeedDialog);
