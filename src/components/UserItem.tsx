import Link from 'next/link'
import styled from 'styled-components'

import { User } from '../types/users-types'
import { Button } from './Button'
import { Card } from './Card'

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`

const Avatar = styled.div<{ userId: number }>`
  min-height: 120px;
  min-width: 120px;
  background-image: url('https://api.lorem.space/image/face?w=120&h=120&hash=${(
    p,
  ) => p.userId}');
  background-size: cover;
  border-radius: 50%;
  margin: 10px;
  @media (max-width: 600px) {
    min-height: 80px;
    min-width: 80px;
  }
`

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

const Name = styled.div`
  padding-bottom: 10px;
  font-size: 16px;
  font-weight: 600;
`
const InfoItem = styled.div`
  padding-right: 10px;
  padding-bottom: 5px;
`

const StyledButton = styled(Button)`
  @media (max-width: 600px) {
    margin: 10px auto;
    flex: 0 0 50%;
  }
`

interface UserItemProps {
  user: User
}

export const UserItem = ({ user }: UserItemProps) => {
  return (
    <Card>
      <Content>
        <Avatar userId={user.id} />
        <InfoBox>
          <Name>{user.name}</Name>
          <div>
            <InfoItem>{user.email}</InfoItem>
            <InfoItem>{user.phone}</InfoItem>
            <InfoItem>
              {`${user.address.street} ${user.address.zipcode} ${user.address.city}`}
            </InfoItem>
          </div>
        </InfoBox>
        <Link href={`/user/${user.id}`}>
          <StyledButton> Edit </StyledButton>
        </Link>
      </Content>
    </Card>
  )
}
