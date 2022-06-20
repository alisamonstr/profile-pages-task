import styled from 'styled-components'

const StyledInput = styled.input`
  height: 30px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #d0d0d0;
`
export const Input = () => {
  return (
    <div>
      <StyledInput />
    </div>
  )
}
