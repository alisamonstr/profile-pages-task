import { User } from './types/users-types'

const baseUrl = 'https://jsonplaceholder.typicode.com'

export const fetchUsers = () => fetch(`${baseUrl}/users`)
export const fetchUserById = (id: number) => fetch(`${baseUrl}/users/${id}`)
export const updateUser = (user: User) =>
  fetch(`${baseUrl}/users/${user.id}`, {
    method: 'PUT',
    body: JSON.stringify(user),
  })
