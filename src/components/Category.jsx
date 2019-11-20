import React from 'react'
import {connect} from 'react-redux';
import {delCategoryCreator} from '../redux/categories-reducer';
import DelCategoryDialog from '../components/DelCategoryDialog';
import UpdateCategoryDialog from '../components/UpdateCategoryDialog';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import MenuItem from '@material-ui/core/MenuItem';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( theme => ({
  menuitem: {
    background: '#f7f3f2', border: '1px solid #e2e0df', marginBottom: '-1px',
    [theme.breakpoints.down('sm')]: { minHeight: '28px', height: '28px' },
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
}))

const Category = ({allCategories, category}) => {
  const classes = useStyles();
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = React.useState(false);
  const [currentCategory,setCurrentCategory]  = React.useState('');
  const menuitemClasses = { root: classes.menuitem};
  const editbuttonClasses = { root: classes.editbutton};
  const deletebuttonClasses = { root: classes.deletebutton};

  const handleClickDeleteDialogClose = () => setDeleteDialogOpen(false);
  const handleClickUpdateClose = () => setUpdateDialogOpen(false);
  
  let handleClickUpdateDialogOpen = (currentCategoryName) => {
      setUpdateDialogOpen(true);
      setCurrentCategory(currentCategoryName);
  };
  const handleClickDeleteDialogOpen = (currentCategoryName, deleteCategory) => () => {
    setDeleteDialogOpen(true);
    setCurrentCategory(currentCategoryName);
  };

  return (
    <a href={`/#/${category}`} className={classes.ahref} >
      <MenuItem classes={menuitemClasses}>
        
        {category}  

        <div className={classes.buttons}>
            
          <IconButton aria-label="delete" className="notoutline" onClick={() => handleClickUpdateDialogOpen(category)}
            classes={editbuttonClasses}>
            <EditIcon />
          </IconButton>
          <UpdateCategoryDialog categories={allCategories} open={updateDialogOpen} onClose={handleClickUpdateClose} 
            currentCategory={currentCategory}/>

          <IconButton aria-label="delete" className="notoutline" onClick={handleClickDeleteDialogOpen(category)} // career finction
            classes={deletebuttonClasses} >
            <DeleteIcon />
          </IconButton>
          <DelCategoryDialog categories={allCategories} 
            open={deleteDialogOpen} onClose={handleClickDeleteDialogClose} currentCategory={currentCategory}/>

        </div>
      </MenuItem>
    </a>
  ) 
}

const mapStateToProps = function(state) {
  return {
    allCategories: state.categoriesReducer.allCategories,
  }
}

export default connect(mapStateToProps)(Category);