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
      <Typography variant="h5">Description of the task</Typography>             
      <p>
        <a href="https://github.com/maxsokol/redux" target="_blank" rel="noopener noreferrer">https://github.com/maxsokol/redux</a>
      </p>
      <p><b>Project outline: </b></p>

    <TreeView
      className={classes.root}
      defaultExpanded={['3', '4']}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
    >
      <StyledTreeItem nodeId="1" 
        labelText="Redux"
        labelInfo="store and reducers: categories, feeds, users"
        labelIcon={MemoryIcon} 
      /> 
      <StyledTreeItem nodeId="2" 
        labelText="App.js" 
        labelInfo="siteAdmin, isAdmin"
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
<p><b>This SPA was made for a test task: </b></p>
<p>Write an application "product catalog"
which must have at least 3 windows: authorization, list of goods,
list of categories. </p>

<p>Frontend:<br />
Required: Angular 4+/React/VueJS<br />
<i className={classes.green}>(I used React + Redux)</i></p>

<p>Желательно: <br />
  bootstrap/google material, LESS or SASS<br />
  <i className={classes.green}>(I used Material UI + makeStyles + Matherial Data Picker)</i></p>

<p>Backend: <br />
Optional. You can use Fake Service, local storage
or Node Express.<br />
<i className={classes.green}>(So far, only local storage for login has had time)</i></p>

<p>At least 3 forms: authorization, list of products, list of categories.
Authorization can be simplified (just check the flag is
user authorized).</p>

<p>Deny access to the list of products and categories for unauthorized
users. </p>

<p>List of categories: CRUD operations for categories. When deleting a category, you can
put any category for already created products.</p>
<p>List of goods:<br />
1)  Product properties:<br />
a.  Name (minimum 5 characters, maximum 40)<br />
b.  Price (more than 0))<br />
c.  Expiration date (date greater than today).<br />
d.  Category (selected from the list)<br />
2)  Features: CRUD operations.<br />
3)  Validation: client-side validation based on conditions.<br />
4)  Editing / adding should be done in a separate component (you can open
in a modal or via router, other options are also considered).</p>

<p><b>Useful info: </b></p>
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
