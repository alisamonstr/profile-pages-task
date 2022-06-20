import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'

import { Container } from './Container'

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
`

interface HeaderLayoutProps {
  children: React.ReactNode
}

export const HeaderLayout = ({ children }: HeaderLayoutProps) => {
  return (
    <>
      <Header>
        <Link href="/">
          <a>
            <Image alt="logo" src="/logo.png" width={100} height={100} />
          </a>
        </Link>
      </Header>
      <Container>{children}</Container>
    </>
  )
}
