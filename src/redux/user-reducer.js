const IS_ADMIN = 'IS_ADMIN';

let initialState = {
    users:  [
        {
            id: "1",
            login: "client",
            password: "client",
            isAdmin: true,
        },     
    ],
    siteAdmin: true
};

const feedsReducer = (state = initialState, action) => {

    let stateCopy = {
        ...state,
        users: [...state.users]
    };

    switch(action.type) {
        case IS_ADMIN:
            let login = action.payload.login; 
            let password = action.payload.password; 
            stateCopy.siteAdmin = false;
            localStorage.setItem('siteAdmin', false);             
            for ( let i = 0; i < stateCopy.users.length; i++ ) {
                if (( stateCopy.users[i].login === login ) && 
                      ( stateCopy.users[i].password === password ) &&
                      ( stateCopy.users[i].isAdmin === true )) 
                    {                    
                    stateCopy.siteAdmin = true;
                    localStorage.setItem('siteAdmin', true);
                    localStorage.setItem('siteAdminName', login);
                } 
            }      
            return stateCopy;       
        default:
            return state; 
    }       
};

export const isAdminCreator = (login, password) => ({ type: IS_ADMIN, payload: {login, password} });

export default feedsReducer;