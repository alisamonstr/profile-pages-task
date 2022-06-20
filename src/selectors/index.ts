import { RootState } from '../store'

export const usersSelector = (state: RootState) => state.users

export const userSelector = (state: RootState) => state.user
