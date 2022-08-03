import { createSlice } from '@reduxjs/toolkit'

const initialState = null
var timeOut = 0

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        createNotification(state, action) {
            clearTimeout(timeOut)
            return action.payload
        },
        deleteNotification(state, action) {
            return null
        }
    }

})

export const {createNotification, deleteNotification} = notificationSlice.actions

export const setNotification = ( content, time ) => {
    return async dispatch => {

        dispatch(createNotification(content))
        timeOut = setTimeout(() => {
            dispatch(deleteNotification())
        }, time * 1000)
}
}

export default notificationSlice.reducer