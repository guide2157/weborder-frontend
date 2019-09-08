import * as React from 'react'
import styled from '../../utils/styled'

interface RootProps {
  className?: string
}

const Root: React.SFC<RootProps> = ({ children }) => (
  <Wrapper className="page-content-root">{children}</Wrapper>
)

export default Root

const Wrapper = styled('div')`
  
`
