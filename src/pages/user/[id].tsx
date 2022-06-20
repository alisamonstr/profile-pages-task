import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { Card } from '../../components/Card'
import { EditUserForm } from '../../components/EditUserForm'
import { HeaderLayout } from '../../components/HeaderLayout'
import { useAppDispatch } from '../../hooks/redux-hooks'
import { userSelector } from '../../selectors'
import { getUserById } from '../../state/user-state'

const Content = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`
const StyledCard = styled(Card)`
  width: 100%;
  max-width: 800px;
`
const Title = styled.div`
  font-size: 24px;
  padding: 20px 0;
`

export interface FormInputs {
  email: string
  phone: string
  street: string
  postalCode: string
  city: string
}

const User = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { id } = router.query
  const { user, loading } = useSelector(userSelector)

  useEffect(() => {
    if (id) {
      dispatch(getUserById(Number(id)))
    }
  }, [dispatch, id])

  return (
    <HeaderLayout>
      <Head>
        <title>Edit Profile</title>
      </Head>
      <Content>
        <Title>Edit your profile</Title>
        <StyledCard>
          {(loading === 'loaded' || loading === 'updating') && (
            <EditUserForm loading={loading} user={user} />
          )}
          {(loading === 'initial' || loading === 'pending') && (
            <div>Loading...</div>
          )}
          {loading === 'rejected' && <div>Error</div>}
        </StyledCard>
      </Content>
    </HeaderLayout>
  )
}

export default User
