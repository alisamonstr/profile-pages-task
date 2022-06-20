import { configureStore } from '@reduxjs/toolkit'

import userReducer from './state/user-state'
import usersReducer from './state/users-state'

const store = configureStore({
  reducer: {
    users: usersReducer,
    user: userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
