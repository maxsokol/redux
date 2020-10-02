const ADD_FEED = 'ADD_FEED';
const TRANSFER_FEED_FROM_DEL_CATEGORY = 'TRANSFER_FEED_FROM_DEL_CATEGORY';
const DEL_FEED = 'DEL_FEED';
const UPD_FEED = 'UPD_FEED';

let initialState = {
    feeds:  [
        {
            id: "1",
            category: "For cats",
            title: "Whiskas",
            text: "Quite normal food",
            price: 19,
            shelflife: "2021-01-18",
        },
        {
            id: "2",
            category: "For cats",
            title: "Flex",
            text: "Like norms feed",
            price: 14,
            shelflife: "2021-10-18",
        },
        {
            id: "3",
            category: "For cats",
            title: "Kitecat",
            text: "Also feed norms",
            price: 15,
            shelflife: "2019-07-10",
        }, 
        {
            id: "4",
            category: "For cats",
            title: "HappyCat",
            text: "Good feed",
            price: 15,
            shelflife: "2019-04-18",
        }, 
        {
            id: "5",
            category: "Maybe for cats",
            title: "Chappi",
            text: "Are you sure you want to feed this cat?",
            price: 15,
            shelflife: "2019-10-18",
        },
        {
            id: "6",
            category: "Maybe for cats",
            title: "Pedigre",
            text: "The cat won't like it. Bad choice.",
            price: 17,
            shelflife: "2019-10-28",   
        }, 
        {
            id: "7",
            category: "Secret category",
            title: "Valerian",
            text: "Be careful, your cat can become a drug addict.",
            price: 100,
            shelflife: "2020-10-18",
        },
    ]
};

const feedsReducer = (state = initialState, action) => {

    let stateCopy = {
        ...state,
        feeds: [...state.feeds]
    };

    switch(action.type) {
        case ADD_FEED:
            const newFeed = {
                id: action.payload.productsLenght + 1,
                title: action.payload.name,
                price: action.payload.price,
                text: action.payload.desc,
                category: action.payload.category,                
                shelflife: action.payload.shelflife
            }; 
            stateCopy.feeds.push(newFeed);
            return stateCopy;
        case UPD_FEED:
            let feedNumberUpd = action.payload.feedNumber; 
            let updFeed = stateCopy.feeds[feedNumberUpd];              
            updFeed.title = action.payload.name;
            updFeed.price = action.payload.price;
            updFeed.text = action.payload.desc;                          
            updFeed.shelflife = action.payload.shelflife;
            updFeed.category = action.payload.newCat;
            return stateCopy;
        case DEL_FEED: 
            let feedIndex = action.payload.feedIndex;
            stateCopy.feeds.splice(feedIndex, 1);
            return stateCopy;
        case TRANSFER_FEED_FROM_DEL_CATEGORY:
            const categoryInsted = action.payload.categoryInsted;
            const currentCategory = action.payload.currentCategory;
            for ( let i = 0; i < stateCopy.feeds.length; i++ ) {
                if ( stateCopy.feeds[i].category === currentCategory ) {
                    stateCopy.feeds[i].category = categoryInsted;
                }
            }
            return stateCopy;
        default:
            return state; 
    }       
};

export const delFeedCreator = (feedIndex) => ({ type: DEL_FEED, payload: {feedIndex} });

export const addFeedCreator = (name, price, desc, shelflife, category, productsLenght) => 
({ type: ADD_FEED, payload: {name, price, desc, shelflife, category, productsLenght} });

export const updFeedCreator = (name, price, desc, shelflife, feedNumber, newCat) => 
({ type: UPD_FEED, payload: {name, price, desc, shelflife, feedNumber, newCat} });

export const transFeedFromDelCategoryCreator = (currentCategory, categoryInsted) => 
({ type: TRANSFER_FEED_FROM_DEL_CATEGORY, payload: {currentCategory, categoryInsted} });

export default feedsReducer;