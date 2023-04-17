


const messageItems = (state=[], action) =>{
    if(action === 'SET_MESSAGE'){
        return action.payload
    }
    return state
}

export default messageItems;