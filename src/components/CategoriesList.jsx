import React from 'react'
import {connect} from 'react-redux';
import {addCategoryCreator} from '../redux/categories-reducer';
import {delCategoryCreator} from '../redux/categories-reducer';
import { Button, Grid } from '@material-ui/core';
import AddCategoryDialog from '../components/AddCategoryDialog';
import DelCategoryDialog from '../components/DelCategoryDialog';
import UpdateCategoryDialog from '../components/UpdateCategoryDialog';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    paddingRight: '20px'
  },
  menuitem: {
    background: '#f7f3f2', border: '1px solid #e2e0df', marginBottom: '-1px'
  },
  ahref: { 
    textDecoration: 'none', fontWeight: 'bold' 
  },
  buttons: {
    display: 'flex', position: 'absolute', right: '2px'
  },
  editbutton: {
    color: 'rgb(101, 199, 122)', padding: '5px'
  },
  deletebutton: {
    color: 'rgb(199, 155, 101)', padding: '5px'
  },
  info: {
    marginTop: '20px'
  }
})

const CategoriesList = ({allCategories, addCategory, deleteCategory}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openDel, setOpenDel] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [currentCategory,setCurrentCategory]  = React.useState('');
  const menuitemClasses = { root: classes.menuitem};
  const editbuttonClasses = { root: classes.editbutton};
  const deletebuttonClasses = { root: classes.deletebutton};

  const handleClickCloseDel = () => setOpenDel(false);
  const handleClickCloseUpdate = (e) => setOpenUpdate(false);
  const handleClickOpen = () =>setOpen(true);
  const handleClickClose = () => setOpen(false);
  let handleClickOpenUpdate = (currentCategoryName) => {
    setOpenUpdate(true);
    setCurrentCategory(currentCategoryName);
  };
  const handleClickOpenDel = (currentCategoryName, deleteCategory) => () => {
    setOpenDel(true);
    setCurrentCategory(currentCategoryName);
  };

  let categories = allCategories;  

  let CategoriesItem = categories.map(item =>
    <a href={`/#/${item.category}`} className={classes.ahref} >
      <MenuItem classes={menuitemClasses}>
        
        {item.category}  

        <div className={classes.buttons}>
            
          <IconButton aria-label="delete" className="notoutline" onClick={() => handleClickOpenUpdate(item.category)}
            classes={editbuttonClasses}>
            <EditIcon />
          </IconButton>

          <UpdateCategoryDialog categories={categories} open={openUpdate} onClose={handleClickCloseUpdate} 
            currentCategory={currentCategory}/>

          <IconButton aria-label="delete" className="notoutline" onClick={handleClickOpenDel(item.category)} // career finction
            classes={deletebuttonClasses} >
            <DeleteIcon />
          </IconButton>

          <DelCategoryDialog deleteCategory={deleteCategory} categories={categories} 
            open={openDel} onClose={handleClickCloseDel} currentCategory={currentCategory}/>

        </div>
      </MenuItem>
    </a>
    );

  return (
    <Grid item xs={12} md={3} className={classes.container} >
      <Typography variant="h5">Категории</Typography>

      <MenuList>  
        <a href={`/#/`} className={classes.ahref}>      
          <MenuItem classes={menuitemClasses}>          
            Весь корм 
          </MenuItem>    
        </a>        
        {CategoriesItem}
      </MenuList>

      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Добавить категорию
      </Button>
      <AddCategoryDialog addCategory={addCategory} open={open} onClose={handleClickClose}/>

      <p className={classes.info}><a href="/#info">Описание задачи</a></p>    
    </Grid>

  ) 
}

const mapStateToProps = function(state) {
  return {
    allCategories: state.categoriesReducer.allCategories,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addCategory: (name) => {
      dispatch(addCategoryCreator(name));
    },
    deleteCategory: (categoriesFilter) => {
      dispatch(delCategoryCreator(categoriesFilter)); 
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesList);