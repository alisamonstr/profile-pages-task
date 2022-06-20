import { useRouter } from 'next/router'
import styled from 'styled-components'

import { Card } from '../../components/Card'
import { Container } from '../../components/Container'
import { Input } from '../../components/Input'

const StyledContainer = styled(Container)`
  display: flex;
  //align-items: center;
  justify-content: center;
`
const StyledCard = styled(Card)`
  width: 100%;
  max-width: 800px;
`
const User = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <StyledContainer>
      <StyledCard>
        User: {id}
        <Input />
      </StyledCard>
    </StyledContainer>
  )
}

export default User
