import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default ({addCategory, open, onClose}) =>  {

  let [categoryName, setCategoryName] = React.useState('');

  const changeCategoryName = (e) => { 
    setCategoryName(e.target.value); 
  } 

  const handleClose = () => onClose(false);

  const handleSubmit = () => {  
    categoryName = categoryName.split(' ').filter(n => n).join(' ');
    addCategory(categoryName);
    onClose(false);
  }; 

  /* Begin. Check Category Name */
  let [checkCategoryName, setCheckCategoryName] = React.useState('');
  let [checkCategoryNameFlag, setCheckCategoryNameFlag] = React.useState(false);
  let checkCategoryNameFunc = () => { 

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
  checkCategoryNameFunc();
  /* End. Check Category Name */

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Введите название категории</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            helperText={checkCategoryName}
            error={checkCategoryNameFlag}
            margin="dense"
            id="name"
            type="text"
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
                Добавить
            </Button> )
            }
        </DialogActions>

      </Dialog>
    </div>
  );
}
