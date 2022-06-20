import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { fetchUsers } from '../api'
import { RootState } from '../store'
import { User } from '../types/users-types'
import { userUpdate } from './user-state'

interface UsersState {
  users: User[]
  loading: 'initial' | 'pending' | 'loaded' | 'rejected'
}

const initialState = {
  users: [],
  loading: 'initial',
} as UsersState

export const getAllUsers = createAsyncThunk<User[], void, { state: RootState }>(
  'users/fetchAll',
  async (_) => {
    const response = await fetchUsers()
    if (!response.ok) {
      return Promise.reject('Fetch Failed')
    }

    return response.json()
  },
  {
    condition: (userId, { getState }) => {
      const status = getState().users.loading
      return status !== 'pending' && status !== 'loaded'
    },
  },
)

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.users = action.payload
        state.loading = 'loaded'
      })
      .addCase(getAllUsers.rejected, (state) => {
        state.loading = 'rejected'
      })
      .addCase(userUpdate.fulfilled, (state, action) => {
        const updatedUser = action.payload
        const userIndex = state.users.findIndex((u) => updatedUser?.id === u.id)

        if (userIndex === -1) {
          state.users.push(updatedUser)
        } else {
          state.users[userIndex] = updatedUser
        }
      })
  },
})

export default usersSlice.reducer
