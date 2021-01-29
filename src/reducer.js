export const initialState={
    user: null,
};

export const actionTypes={
    SET_USER: "SET_USER",
};

const reducer = (state,action)=>{
    console.log(action);

    switch(action.type){
        case actionTypes.SET_USER:
            return {
                ...state,//keep the state same
                user:action.user,//change the user from state
            };
        default:
            return state;
    }
};

export default reducer;