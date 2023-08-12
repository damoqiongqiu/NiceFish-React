import { configureStore } from '@reduxjs/toolkit'
import sessionReducer from '../session';

/**
 * 全局 Redux Store
 */
export default configureStore({
    reducer: {
        session: sessionReducer,
    },
})