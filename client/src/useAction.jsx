import { useState, useReducer } from "react"

function reducer(state, action) {
    switch (action.type) {
        case 'add': {
            //update in db provide feedback 
        }
        case 'delete': {
            //update in db
        }

    }
    throw Error('unknown action' + action.type)
}
function UseAction() {
    const [state, dispatch] = useReducer(reducer, null)


    return dispatch
}

export default UseAction