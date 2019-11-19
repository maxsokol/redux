import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default ({addCategory, open, onClose}) =>  {

  const [categoryName, setCategoryName] = React.useState('');

  const handleChangeCategoryName = (e) => {
    setCategoryName(e.target.value);
  };

  const handleClose = () => {
    onClose(false);
  };

  const handleSubmit = () => {
    addCategory(categoryName);
    onClose(false);
  }; 

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Введите название категории</DialogTitle>
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
            Добавить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
