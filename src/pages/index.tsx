import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import styles from '../../styles/Home.module.css'
import { UserItem } from '../components/UserItem'
import { useAppDispatch } from '../hooks/redux-hooks'
import { usersSelector } from '../selectors'
import { getAllUsers } from '../state/user-state'
import { RootState } from '../store'

const Home: NextPage = () => {
  const { users } = useSelector(usersSelector)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {users?.map((user) => (
        <UserItem user={user} key={user.id} />
      ))}
    </div>
  )
}

export default Home