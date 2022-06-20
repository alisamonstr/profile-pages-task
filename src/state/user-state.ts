import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { fetchUsers } from '../api'
import { RootState } from '../store'
import { User } from '../types/users-types'

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
  async (_, { getState }) => {
    const response = await fetchUsers()
    return response.json()
  },
  {
    condition: (userId, { getState, extra }) => {
      const status = getState().users.loading
      return status !== 'pending'
    },
  }
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
        // console.log(action.payload)
        state.loading = 'loaded'
      })
      .addCase(getAllUsers.rejected, (state) => {
        state.loading = 'rejected'
        // state.error = action.error
      })
  },
})

export default usersSlice.reducer
