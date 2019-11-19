const ADD_CATEGORY = 'ADD_CATEGORY';
const ADD_FEED = 'ADD_FEED';
const DEL_CATEGORY = 'DEL_CATEGORY';
const CHANGE_WORTHY = 'CHANGE_WORTHY';
const ADD_FEED_FROM_DEL_CATEGORY = 'ADD_FEED_FROM_DEL_CATEGORY';
const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
const DEL_FEED = 'DEL_FEED';
const UPD_FEED = 'UPD_FEED';

let initialState = {
    allCategories: [
        {
            id: "1",
            category: "Для котов", 
            feeds:  [
                {
                    id: "1",
                    category: "Для котов",
                    title: "Whiskas",
                    text: "Вполне нормальный корм.",
                    price: 19,
                    shelflife: "2021-01-18",
                },
                {
                    id: "6",
                    category: "Для котов",
                    title: "Flex",
                    text: "Вроде норм корм",
                    price: 14,
                    shelflife: "2021-10-18",
                },
                {
                    id: "4",
                    category: "Для котов",
                    title: "Kitecat",
                    text: "Тоже норм корм",
                    price: 15,
                    shelflife: "2019-07-10",
                }, 
                {
                    id: "3",
                    category: "Для котов",
                    title: "HappyCat",
                    text: "Годный корм",
                    price: 15,
                    shelflife: "2019-04-18",
                }, 
            ],
        },
        {
            id: "2",
            category: "Наврядли для котов",
            feeds: [
                {
                    id: "2",
                    category: "Наврядли для котов",
                    title: "Chappi",
                    text: "Ты уверен, что хочешь накормить этим кота?",
                    price: 15,
                    shelflife: "2019-10-18",
                },
                {
                    id: "5",
                    category: "Наврядли для котов",
                    title: "Pedigre",
                    text: "Ты уверен, что хочешь накормить этим кота... хорошо подумал?",
                    price: 17,
                    shelflife: "2019-10-28",   
                }, 
            ]
        },
        {
            id: "3",
            category: "Секретная категория",
            feeds: [
                {
                    id: "7",
                    category: "Секретная категория",
                    title: "Валерьянка",
                    text: "Be careful, your cat can become a drug addict.",
                    price: 100,
                    shelflife: "2020-10-18",
                },
            ]
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
            stateCopy.allCategories.splice(action.payload, 1);  // use filter       
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
        case ADD_FEED:
            let categoryNumber = action.payload.categoryNumber;
            const newFeed = {
                id: action.payload.productsLenght + 1,
                title: action.payload.name,
                price: action.payload.price,
                text: action.payload.desc,
                category: stateCopy.allCategories[categoryNumber].category,                
                shelflife: action.payload.shelflife
            }; 
            stateCopy.allCategories[categoryNumber].feeds.push(newFeed);
            return stateCopy;
        case UPD_FEED:
            let categoryNumberUpdBefore = action.payload.currentCatIndex;
            let categoryNumberUpd = action.payload.categoryNumber;
            let feedNumberUpd = action.payload.feedNumber; 
            let updFeed = stateCopy.allCategories[categoryNumberUpdBefore].feeds[feedNumberUpd];
            if ( categoryNumberUpdBefore == categoryNumberUpd ) {                               
                updFeed.title = action.payload.name;
                updFeed.price = action.payload.price;
                updFeed.text = action.payload.desc;                          
                updFeed.shelflife = action.payload.shelflife;
            }
            if ( categoryNumberUpdBefore !== categoryNumberUpd ) {
                const newFeedUpd = {
                    id: updFeed.id,
                    title: action.payload.name,
                    price: action.payload.price,
                    text: action.payload.desc,
                    category: stateCopy.allCategories[categoryNumberUpd].category,                
                    shelflife: action.payload.shelflife                   
                }; 
                stateCopy.allCategories[categoryNumberUpd].feeds.push(newFeedUpd);
                stateCopy.allCategories[categoryNumberUpdBefore].feeds.splice(feedNumberUpd, 1); 
                console.log('Pereneseno i udaleno');
            }
            return stateCopy;
        case DEL_FEED: 
            let catDelFeedIndex = action.payload.catIndex;
            let feedDelFeedIndex = action.payload.feedIndex;
            stateCopy.allCategories[catDelFeedIndex].feeds.splice(feedDelFeedIndex, 1);   // use filter
            return stateCopy;
        case ADD_FEED_FROM_DEL_CATEGORY:
            let categoryInstedNumber = action.payload.categoryInstedNumber;
            const feedsInInsted = action.payload.feeds; 
            for (let i = 0; i < feedsInInsted.length; i++) {
                stateCopy.allCategories[categoryInstedNumber].feeds.push(feedsInInsted[i]);
            }
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

export const delFeedCreator = (catIndex, feedIndex) => ({ type: DEL_FEED, payload: {catIndex, feedIndex} });

export const addFeedCreator = (name, price, desc, shelflife, categoryNumber, productsLenght) => 
({ type: ADD_FEED, payload: {name, price, desc, shelflife, categoryNumber, productsLenght} });

export const updFeedCreator = (name, price, desc, shelflife, categoryNumber, feedNumber, currentCatIndex) => 
({ type: UPD_FEED, payload: {name, price, desc, shelflife, categoryNumber, feedNumber, currentCatIndex} });

export const addFeedFromDelCategoryCreator = (feeds, categoryInstedNumber) => 
({ type: ADD_FEED_FROM_DEL_CATEGORY, payload: {feeds, categoryInstedNumber} });

export default categoriesReducer;