import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import Label from '@material-ui/icons/Label';
import MemoryIcon from '@material-ui/icons/Memory';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import QueueIcon from '@material-ui/icons/Queue';
import UpdateIcon from '@material-ui/icons/Update';
import PetsIcon from '@material-ui/icons/Pets';
import AssignmentIcon from '@material-ui/icons/Assignment';

const useTreeItemStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.text.secondary,
    '&:focus > $content': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
      color: 'var(--tree-view-color)',
    },
  },
  content: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '$expanded > &': {
      fontWeight: theme.typography.fontWeightRegular,
    },
  },
  group: {
    marginLeft: 0,
    '& $content': {
      paddingLeft: theme.spacing(2),
    },
  },
  expanded: {},
  label: {
    fontWeight: 'inherit',
    color: 'inherit',
  },
  labelRoot: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.5, 0),
  },
  labelIcon: {
    marginRight: theme.spacing(1),
  },
  labelText: {
    fontWeight: 'inherit',
    flexGrow: 1,
    paddingRight: '10px',
    paddingLeft: '10px',
    background: '#e2e0df',
    color: 'black',
    [theme.breakpoints.down('sm')]: {
      background: 'none',
    },
  },
  labelInfo: {
    width: '82%',
    paddingLeft: '10px',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));

function StyledTreeItem(props) {
  const classes = useTreeItemStyles();
  const { labelText, labelIcon: LabelIcon, labelInfo, color, bgColor, ...other } = props;

  return (
    <TreeItem
      label={
        <div className={classes.labelRoot}>
          <LabelIcon color="inherit" className={classes.labelIcon} />
          <Typography variant="body2" className={classes.labelText}>
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit" className={classes.labelInfo}>
            {labelInfo}
          </Typography>
        </div>
      }
      style={{
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor,
      }}
      classes={{
        root: classes.root,
        content: classes.content,
        expanded: classes.expanded,
        group: classes.group,
        label: classes.label,
      }}
      {...other}
    />
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};

const useStyles = makeStyles( theme => ({
  root: {
    flexGrow: 1,
    maxWidth: '100%',
  },
  block: {
    display: 'block',
  },
  green: {
    color: '#189434',
  },
}));

export default function GmailTreeView() {
  const classes = useStyles();

  return (
    <div className={classes.block}>
      <Typography variant="h5">Описание задачи</Typography>             
      <p>
        <a href="https://github.com/maxsokol/redux" target="_blank" rel="noopener noreferrer">https://github.com/maxsokol/redux</a>
      </p>
      <p><b>Схема проекта: </b></p>

    <TreeView
      className={classes.root}
      defaultExpanded={['3', '4']}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
    >
      <StyledTreeItem nodeId="1" 
        labelText="Redux"
        labelInfo="redux-store.js, categories-reducer.js"
        labelIcon={MemoryIcon} 
      /> 
      <StyledTreeItem nodeId="2" 
        labelText="App.js" 
        labelInfo="props"
        labelIcon={HomeWorkIcon} 
      />
      <StyledTreeItem nodeId="3" 
        labelText="CategoriesList.jsx" 
        labelIcon={Label}
        labelInfo="allCategories, addCategory"
      >
        <StyledTreeItem
          nodeId="5"
          labelText="Category.jsx"
          labelIcon={AssignmentIcon}
          labelInfo="allCategories, category"
          color="#1a73e8"
          bgColor="#e8f0fe"
        />
        <StyledTreeItem
          nodeId="5"
          labelText="AddCategoryDialog/"
          labelIcon={QueueIcon}
          labelInfo="addCategory"
          color="#1a73e8"
          bgColor="#e8f0fe"
        />
        <StyledTreeItem
          nodeId="6"
          labelText="UpdateCategoryDialog/"
          labelIcon={UpdateIcon}
          labelInfo="updateCategory, categories, currentCategory"
          color="#e3742f"
          bgColor="#fcefe3"
        />
        <StyledTreeItem
          nodeId="7"
          labelText="DelCategoryDialog/"
          labelIcon={DeleteIcon}
          labelInfo="deleteCategory, addFeedFromDelCategory, categories, currentCategory"
          color="#a250f5"
          bgColor="#f3e8fd"
        />
      </StyledTreeItem>
      <StyledTreeItem nodeId="4" labelText="FeedList/" labelIcon={Label}
        labelInfo="allCategories"
      >
        <StyledTreeItem
          nodeId="8"
          labelText="AddFeedDialog/"
          labelIcon={AddCircleOutlineIcon}
          labelInfo="addFeed, categories, products, currentCategory"
          color="#1a73e8"
          bgColor="#e8f0fe"
        />
        <StyledTreeItem
          nodeId="9"
          labelText="UpdateFeedDialog/"
          labelIcon={UpdateIcon}
          labelInfo="updFeed, categories, currentCat, currentFeed"
          color="#e3742f"
          bgColor="#fcefe3"
        />
        <StyledTreeItem
          nodeId="10"
          labelText="DelFeedDialog/"
          labelIcon={DeleteIcon}
          labelInfo="delFeed, categories, currentFeed, currentCat"
          color="#a250f5"
          bgColor="#f3e8fd"
        />
        <StyledTreeItem
          nodeId="11"
          labelText="Feed.jsx"
          labelIcon={PetsIcon}
          labelInfo="feed: { title, id, price, text, shelflife, category }, allCategories, products"
          color="#1a73e8"
          bgColor="#e8f0fe"
        />
      </StyledTreeItem>
    </TreeView>


<div className="card mx-auto">
<p><b>Задание: </b><br />
Написать приложение «каталог товаров», 
в котором должно быть минимум 3 окна: авторизация, список товаров, 
список категорий. </p>

<p>Frontend:<br />
Обязательно: Angular 4+/React/VueJS<br />
<i className={classes.green}>(Использовал React + Redux)</i></p>

<p>Желательно: <br />
  bootstrap/google material, LESS or SASS<br />
  <i className={classes.green}>(Использовал Material UI + makeStyles + Matherial Data Picker)</i></p>

<p>Backend: <br />
  По желанию. Можно использовать Fake Service, local storage 
или Node Express.<br />
<i className={classes.green}>(Пока не использовал)</i></p>

<p>Минимум 3 формы: авторизация, список товаров, список категорий.
Авторизацию можно сделать упрощённую (просто проставлять флаг является ли 
пользователь авторизованным).</p>

<p>Запретить доступ к списку товаров и категории для неавторизованных 
пользователей. </p>

<p>Список категорий: CRUD операции для категорий. При удалении категории можно 
проставить любую категорию для уже созданных товаров.</p>
<p>Список товаров:<br />
1)  Свойства товара:<br />
a.  Название (минимум 5 символов, максимум 40)<br />
b.  Цена (больше 0)<br />
c.  Срок годности (дата, больше чем сегодня).<br />
d.  Категория (выбирается из списка)<br />
2)  Возможности: CRUD операции.<br />
3)  Валидация: client-side валидация по условиям.<br />
4)  Редактирование/добавление сделать в отдельной компоненте (можно открывать 
в модале или через router, другие варианты так же рассматриваются).</p>

<div style={{ display: 'none' }}>
<p><b>Недочеты, которые здесь еще есть, но наврядли допущу на рабочем проекте: </b></p>
<ol>
  <li>Стоит добавить запрет на использование одинковых имен товаров и каталогв.</li>
  <li>Если во время заполнения форм нажать на фон, форма запомнит данные, но не покажет их при повторном открытии.</li>
  <li>После добавления товара форма помнит содержание все полей, хотя не показывает их. Т.е.
     при нажатии "Добавить" появится еще один такой же товар.</li>
</ol>
</div>

<p><b>Полезная инфа: </b></p>
<ol>
  <li>Material-UI Styling with CSS in JS. More information about the advantages of this method:
    <br /><a href="https://material-ui.com/styles/api/">material-ui.com</a>. 
    <br /><a href="https://www.youtube.com/watch?v=rEHvPiLWSbQ&list=PLVsgh6h4zk-L-OzWglEh-dBb3PrGcL96y&index=5">YouTube</a>
    <br /><a href="https://stackoverflow.com/questions/57220059/internal-implementation-of-makestyles-in-react-material-ui">stackoverflow.com</a></li>
  <li>Good <a href="https://material-ui-pickers.dev/getting-started/usage">Matherial UI data picker</a></li>
</ol>

</div>

</div>
  );
}
