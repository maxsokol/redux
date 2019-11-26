const ADD_CATEGORY = 'ADD_CATEGORY';
const DEL_CATEGORY = 'DEL_CATEGORY';
const CHANGE_WORTHY = 'CHANGE_WORTHY';
const UPDATE_CATEGORY = 'UPDATE_CATEGORY';

let initialState = {
    allCategories: [
        {
            id: "1",
            category: "Для котов", 
        },
        {
            id: "2",
            category: "Наврядли для котов",
        },
        {
            id: "3",
            category: "Секретная категория",
        }, 
    ],
    isWorthy: true,
};

const categoriesReducer = (state = initialState, action) => {

    let stateCopy = {
        ...state,
        allCategories: [...state.allCategories]
    };

    switch(action.type) {
        case DEL_CATEGORY: 
            stateCopy.allCategories.splice(action.payload, 1);         
            return stateCopy;
        case ADD_CATEGORY:
            const newCategory = {
                id: state.allCategories.length + 1,
                category: action.payload,
                feeds: [],
            };           
            stateCopy.allCategories.push(newCategory);
            return stateCopy;
        case UPDATE_CATEGORY:
            let updateCatIndex = action.payload.index;
            stateCopy.allCategories[updateCatIndex].category = action.payload.name;
            return stateCopy;
        case CHANGE_WORTHY: {
            stateCopy.isWorthy = !stateCopy.isWorthy;            
            return stateCopy;
        }
        default:
            return state; 
    }       
};

export const delCategoryCreator = (arrNumber) => ({ type: DEL_CATEGORY, payload: arrNumber });

export const addCategoryCreator = (name) => ({type: ADD_CATEGORY, payload: name});

export const updateCategoryCreator = (name, index) => ({ type: UPDATE_CATEGORY, payload: {name, index} });

export default categoriesReducer;