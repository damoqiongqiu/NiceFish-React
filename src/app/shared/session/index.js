import { createSlice } from '@reduxjs/toolkit'

const currentUser = JSON.parse(localStorage.getItem("currentUser"));

export const sessionSlice = createSlice({
    name: 'session',
    initialState: { user: currentUser },
    reducers: {
        signIn: (state, action) => {
            state = {
                ...state,
                user: { ...action.payload }
            }
            localStorage.setItem("currentUser", JSON.stringify(state.user));
            return state;
        },
        signOut: (state, action) => {
            let newState = { ...state };
            delete newState.user;
            state = {
                ...newState
            }
            localStorage.removeItem("currentUser");
            return state;
        }
    },
})

export const { signIn, signOut } = sessionSlice.actions

export default sessionSlice.reducer