import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn : false,
    userData:{
        _id:null,
        email:null,
        username:null,
        accessToken:null
    }
}

export const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        logInUser:(state, action)=>{
            state.isLoggedIn = true            
            state.userData._id = action.payload._id
            state.userData.email = action.payload.email
            state.userData.username = action.payload.username
            state.userData.accessToken = action.payload.accessToken
        },
        logOutUser : (state)=>{
            state.isLoggedIn = false
            state.userData._id = null
            state.userData.email = null
            state.userData.username = null
            state.userData.accessToken = null
        }
    }
})

export const { logInUser, logOutUser } = userSlice.actions
export default userSlice.reducer