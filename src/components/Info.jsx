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
  },
  labelInfo: {
    width: '82%',
    paddingLeft: '10px',
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

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: '100%',
  },
});

export default function GmailTreeView() {
  const classes = useStyles();

  return (
    <>
    <p>Выполняет Соколов Максим</p>
    <p><a href="https://github.com/maxsokol/redux" target="_blank">https://github.com/maxsokol/redux</a></p>
    <p><b>Схема проекта: </b><br /></p>

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
        labelInfo="allCategories, addCategory, deleteCategory"
      >
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


<div className="card mx-auto" >
<p><b>Задание: </b><br />
Написать приложение «каталог товаров», 
в котором должно быть минимум 3 окна: авторизация, список товаров, 
список категорий. </p>

<p>Frontend:<br />
Обязательно: Angular 4+/React/VueJS</p>

<p>Желательно: <br />
  bootstrap/google material, LESS or SASS</p>

<p>Backend: <br />
  По желанию. Можно использовать Fake Service, local storage 
или Node Express.</p>

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

<p><b>Недочеты: </b></p>
<ol>
  <li>Проект выполнен на JS, а не на TypeScript</li>
  <li>Pupup из меню выводится за раз столько, сколько пунктов в меню.</li>
  <li>При нажатии на заначек редактировать или удалить автоматически перемещаешься на этот пункт меню, наверно это плохо.</li>
  <li>При удалении пункта меню человек остается на том же адресе, на пустой странице.</li>
  <li>Стоит добавить запрет на удаление последней категории (т.е. если вообще все удалить, будет ошибка).</li>
  <li>Стоит добавить запрет на использование одинковых имен товаров и каталов.</li>
  <li>Если во время заполнения форм нажать на фон, форма запомнит данные, но не покажет их при повторном открытии.</li>
  <li>После добавления товара форма помнит содержание все полей, хотя не показывает их. Т.е.
     при нажатии "Добавить" появится еще один такой же товар.</li>
  <li>Дизайн минималистичный и плохо настроена адаптивная верстка, пока не стал тратить на это время.</li>
  <li>Еще не выполнен пункт Backend. Однко в задании сказано что он "по желанию".</li>
</ol>
</div>

<p><b>Полезная инфа: </b></p>
<ol>
  <li>Material-UI Styling with CSS in JS <a href="https://material-ui.com/styles/api/">material-ui.com</a>, 
  &nbsp;<a href="https://www.youtube.com/watch?v=rEHvPiLWSbQ&list=PLVsgh6h4zk-L-OzWglEh-dBb3PrGcL96y&index=5">YouTube</a></li>
</ol>

</>
  );
}
