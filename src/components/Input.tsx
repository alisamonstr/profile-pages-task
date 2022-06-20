import { Path, SubmitHandler, UseFormRegister, useForm } from 'react-hook-form'
import styled from 'styled-components'

import { FormInputs } from '../pages/user/[id]'

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
`
const StyledInput = styled.input`
  height: 30px;
  max-width: 500px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #d0d0d0;
  outline: 0;
`
const InputName = styled.label`
  padding: 2px 0;
  font-size: 10px;
  font-weight: 600;
  color: #aaaaaa;
  text-transform: uppercase;
`
type InputProps = {
  label: Path<FormInputs>
  register: UseFormRegister<FormInputs>
  required: boolean
}

export const Input = ({ label, register, required }: InputProps) => {
  return (
    <InputContainer>
      <InputName>{label}</InputName>
      <StyledInput {...register(label, { required })} />
    </InputContainer>
  )
}
