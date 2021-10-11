import React from 'react'
import styled from 'styled-components'


const NavigationWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    flex-wrap: nowrap;
    justify-content: center;
`

const Navigation = ({ children }) => {
    return (
        <NavigationWrapper>
            {children}
        </NavigationWrapper>
    )
}

export default Navigation
