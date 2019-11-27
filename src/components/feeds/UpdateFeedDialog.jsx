import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {connect} from 'react-redux';
import {updFeedCreator} from '../../redux/feeds-reducer';
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
    display: 'block',
    margin: '25px 0',
  }
});

const UpdateFeedDialog = ({updFeed, open, onClose, categories, feeds, currentCat, currentFeed}) =>  {

  const classes = useStyles();
  const titleClasses = { root: classes.title };
  const inputClasses = { root: classes.input };
  const [newCat, setNewCat] = React.useState(currentCat); 

  const changeCategoryName = (e) => setNewCat(e.target.value); 
  
  // Begin. For Array index calculate for Feed
  let arrFeedIndex;
  const arrFeedIndexCalc = (item) => {   
    feeds.map(function (el, index) {
      if(el.title === item) {  
        return arrFeedIndex = index;        
      }
      return false;
    }); 
  }
  // End. For Array index calculate for Feed

  arrFeedIndexCalc(currentFeed);

  let nameBefore = feeds[arrFeedIndex].title;
  let priceBefore = feeds[arrFeedIndex].price;
  let textBefore = feeds[arrFeedIndex].text;  
  let dateOfFeed = feeds[arrFeedIndex].shelflife;  
  let [feedShelflife, setFeedShelflife] = React.useState(dateOfFeed);

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


  const handleFeedShelflifeChange = (date) => {
    let day = date.getDate();
    let month = date.getMonth() + 1; 
    let year = date.getFullYear();   
    date = year + '-' + ((month < 10) ? "0" + month : month) 
    + '-' + ((day < 10) ? "0" + day : day); 
    return setFeedShelflife(date); 
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
    if ( feedName === 'Noname' ) {
      checkFeedName = 'от 5 до 40 символов'
    }
    return checkFeedName; 
  }
  checkFeedNameFunc();
  /* End Check Feed Name */




  const handleSubmit = () => {  
    feedName = feedName.split(' ').filter(n => n).join(' ');
    feedDesc = feedDesc.split(' ').filter(n => n).join(' ');  
    updFeed(feedName, feedPrice, feedDesc, feedShelflife, arrFeedIndex, newCat);
    onClose(false);
  };


  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">          

        <DialogContent>
          <DialogTitle id="form-dialog-title" classes={titleClasses}>Изменить корм</DialogTitle>  

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

          <TextField
            error={( feedPrice > 0 || feedPrice === 'none' ) ? false : true}
            helperText={( feedPrice > 0 || feedPrice === 'none' ) ? 'Больше нуля, естественно' : 'Цена должна быть больше нуля' }
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

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker 
              classes={inputClasses}
              label="Срок годности"
              value={feedShelflife} 
              format="MM/dd/yyyy"
              onChange={handleFeedShelflifeChange}
            />
          </MuiPickersUtilsProvider>

          <FormControl classes={inputClasses}>
            <InputLabel htmlFor="uncontrolled-native">Категория корма</InputLabel>
            <NativeSelect
              defaultValue={currentCat}
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
        </DialogContent>
      </Dialog>
    </div>
  );
}

const mapStateToProps = function(state) {
  return {
    allCategories: state.categoriesReducer.allCategories,
    feeds: state.feedsReducer.feeds,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updFeed: (name, price, desc, shelflife, feedNumber, newCat) => {
      dispatch(updFeedCreator(name, price, desc, shelflife, feedNumber, newCat));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateFeedDialog);
