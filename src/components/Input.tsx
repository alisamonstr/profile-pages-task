import { Path, UseFormRegister } from 'react-hook-form'
import { RegisterOptions } from 'react-hook-form/dist/types/validator'
import styled from 'styled-components'

import { FormInputs } from '../pages/user/[id]'

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
`
const StyledInput = styled.input`
  height: 30px;
  width: 500px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #d0d0d0;
  outline: 0;
  &:focus {
    border: 1px solid #31d679;
  }
  @media (max-width: 600px) {
    width: 300px;
  }
`
const InputName = styled.label`
  padding: 2px 0;
  font-size: 10px;
  font-weight: 600;
  color: #aaaaaa;
  text-transform: uppercase;
`
const Error = styled.div`
  color: red;
  font-size: 12px;
`

type InputProps = {
  label: Path<FormInputs>
  register: UseFormRegister<FormInputs>
  options: RegisterOptions<FormInputs>
  error?: string
}

export const Input = ({ label, register, options, error }: InputProps) => {
  return (
    <InputContainer>
      <InputName>{label}</InputName>
      <StyledInput {...register(label, options)} />
      {error && <Error>{error}</Error>}
    </InputContainer>
  )
}
