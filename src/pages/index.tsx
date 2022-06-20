import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { Card } from '../components/Card'
import { HeaderLayout } from '../components/HeaderLayout'
import { UserItem } from '../components/UserItem'
import { useAppDispatch } from '../hooks/redux-hooks'
import { usersSelector } from '../selectors'
import { getAllUsers } from '../state/users-state'

const Home: NextPage = () => {
  const { users, loading } = useSelector(usersSelector)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])

  return (
    <HeaderLayout>
      <Head>
        <title>Profiles Page</title>
      </Head>
      {loading === 'rejected' && <Card>Error</Card>}
      {users?.map((user) => (
        <UserItem user={user} key={user.id} />
      ))}
    </HeaderLayout>
  )
}

export default Home
