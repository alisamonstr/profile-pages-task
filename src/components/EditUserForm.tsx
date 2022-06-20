import { SubmitHandler, useForm } from 'react-hook-form'
import styled from 'styled-components'

import { useAppDispatch } from '../hooks/redux-hooks'
import { UserLoadingStatus, userUpdate } from '../state/user-state'
import { User } from '../types/users-types'
import { Button } from './Button'
import { Input } from './Input'

const EMAIL_PATTERN =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const StyledButton = styled(Button)`
  margin: 10px 0;
`
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;
`

export interface FormInputs {
  email: string
  phone: string
  street: string
  postalCode: string
  city: string
}

export interface EditUserFormProps {
  user: User
  loading: UserLoadingStatus
}

export const EditUserForm = ({ user, loading }: EditUserFormProps) => {
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      email: user.email,
      city: user.address.city,
      postalCode: user.address.zipcode,
      phone: user.phone,
      street: user.address.street,
    },
  })

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    const newUser = {
      ...user,
      address: {
        ...user.address,
        city: data.city,
        street: data.street,
        zipcode: data.postalCode,
      },
      email: data.email,
      phone: data.phone,
    }
    dispatch(userUpdate(newUser))
  }

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="email"
        register={register}
        options={{
          required: 'Email is required',
          pattern: {
            value: EMAIL_PATTERN,
            message: 'Please type an a valid email address',
          },
        }}
        error={errors.email?.message}
      />
      <Input
        label="phone"
        register={register}
        options={{
          required: 'Phone is required',
          minLength: {
            value: 5,
            message: 'Phone number should be more than 5 numbers',
          },
        }}
      />
      <Input
        label="street"
        register={register}
        options={{ required: 'Street is required' }}
      />
      <Input
        label="postalCode"
        register={register}
        options={{ required: 'Postal code is required' }}
      />
      <Input
        label="city"
        register={register}
        options={{ required: 'City is required' }}
      />
      <StyledButton type="submit" disabled={loading === 'updating'}>
        Save Changes
      </StyledButton>
    </StyledForm>
  )
}
