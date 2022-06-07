import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
`

export const Payment = styled.div`
  background: #ffffff;
  border-radius: 3px;
  padding: 1.6rem;
  width: 100%;

  & > * {
    width: 100%;
  }
`
