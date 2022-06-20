import { User } from '../types/users-types'

interface UserItemProps {
  user: User
}
export const UserItem = ({ user }: UserItemProps) => {
  return <div>{user.name}</div>
}
