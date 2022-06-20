import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { Button } from '../../components/Button'
import { Card } from '../../components/Card'
import { Container } from '../../components/Container'
import { Input } from '../../components/Input'
import { usersSelector } from '../../selectors'

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
`
const StyledCard = styled(Card)`
  width: 100%;
  max-width: 800px;
`
const StyledButton = styled(Button)`
  margin: 10px 0;
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
  const { id } = router.query
  const { users } = useSelector(usersSelector)
  const user = users?.find((u) => u.id === Number(id))

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>()
  const onSubmit: SubmitHandler<FormInputs> = (data) => console.log(data)

  return (
    <StyledContainer>
      <StyledCard>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input label="email" register={register} required />
          <Input label="phone" register={register} required />
          <Input label="street" register={register} required />
          <Input label="postalCode" register={register} required />
          <Input label="city" register={register} required />
          <StyledButton type="submit"> Save Changes </StyledButton>
        </form>
      </StyledCard>
    </StyledContainer>
  )
}

export default User
