import React from 'react'
import { connect } from 'react-redux';
import { addCategoryCreator } from '../../redux/categories-reducer';
import AddCategoryDialog from '../categories/AddCategoryDialog';
import Category from '../categories/Category';
import { Button, Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( theme => ({
  container: {
    paddingRight: '20px',    
  },
  menuitem: {
    background: '#f7f3f2', border: '1px solid #e2e0df', marginBottom: '-1px',
    [theme.breakpoints.down('sm')]: { minHeight: '28px', height: '28px' },
  },
  ahref: { 
    textDecoration: 'none', fontWeight: 'bold' 
  },
  menutitle: {
    [theme.breakpoints.down('sm')]: { display: 'none' },
  },
  addcategory: {
    textTransform: 'none', padding: '4px 16px', background: '#f7f3f2',
    [theme.breakpoints.down('sm')]: { padding: '2px 25px' },    
  }
}))

const CategoriesList = ({allCategories, addCategory}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const menuitemClasses = { root: classes.menuitem};
  const menutitleClasses = { root: classes.menutitle};
  const addcategoryClasses = { root: classes.addcategory };

  const handleClickOpen = () => setOpen(true);
  const handleClickClose = () => setOpen(false);  

  let CategoriesItem = allCategories.map( item =>  <Category item={item} key={item.id} category={item.category}/> );
    
  return (
    <Grid item xs={12} md={3} className={classes.container} >
      <Typography variant="h5" classes={menutitleClasses}>Категории</Typography>

      <MenuList>  
        <a href={`/#/`} className={classes.ahref}>      
          <MenuItem classes={menuitemClasses}>          
            Весь корм 
          </MenuItem>    
        </a>        
        {CategoriesItem}
      </MenuList>

      <Button onClick={handleClickOpen}  classes={addcategoryClasses}>
        Добавить категорию
      </Button>
      <AddCategoryDialog addCategory={addCategory} open={open} onClose={handleClickClose}/>
          
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesList);