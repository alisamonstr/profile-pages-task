import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { fetchUserById, updateUser } from '../api'
import { RootState } from '../store'
import { User } from '../types/users-types'

export type UserLoadingStatus =
  | 'initial'
  | 'pending'
  | 'updating'
  | 'loaded'
  | 'rejected'

interface UserState {
  user: User
  loading: UserLoadingStatus
}

const initialState = {
  user: {},
  loading: 'initial',
} as UserState

export const getUserById = createAsyncThunk<User, number, { state: RootState }>(
  'user/getUserById',
  async (id, { getState }) => {
    const user = getState().users.users?.find((u) => u.id === id)
    if (user) {
      return user
    }
    const response = await fetchUserById(id)
    if (!response.ok) {
      return Promise.reject('Fetch Failed')
    }

    return response.json()
  },
  {
    condition: (userId, { getState }) => {
      const status = getState().user.loading
      return status !== 'pending'
    },
  },
)

export const userUpdate = createAsyncThunk<User, User, { state: RootState }>(
  'user/userUpdate',
  async (data) => {
    const response = await updateUser(data)

    if (!response.ok) {
      return Promise.reject('Update Failed')
    }

    return data
  },
  {
    condition: (userId, { getState }) => {
      const status = getState().user.loading
      return status !== 'updating'
    },
  },
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserById.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.user = action.payload
        state.loading = 'loaded'
      })
      .addCase(getUserById.rejected, (state) => {
        state.loading = 'rejected'
      })
      .addCase(userUpdate.pending, (state) => {
        state.loading = 'updating'
      })
      .addCase(userUpdate.fulfilled, (state, action) => {
        state.user = action.payload
        state.loading = 'loaded'
      })
      .addCase(userUpdate.rejected, (state) => {
        state.loading = 'rejected'
      })
  },
})

export default userSlice.reducer
