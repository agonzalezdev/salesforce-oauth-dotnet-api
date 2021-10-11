import { Fingerprint } from '@material-ui/icons'
import { IconButton } from '@mui/material'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import styled from 'styled-components'
import { useAuth } from '../services/authContext'

const SignInText = styled.p`
    margin: 2px;
    font-size: 1.2rem;
`
const SignInButton = styled.p`
    border: 1px solid #a683a6;
    border-radius: 10px;
    padding: 0px 10px;
    max-width: 60%;
`
const AlreadySignedInText = styled.p`
    margin: 5px;
    color: green;
`

const Home = () => {
    const { user, checkLogin } = useAuth();

    useEffect(() => {
        checkLogin();
    }, [user, checkLogin])

    return (
        <>
            {!user ? (
                <SignInButton>
                    <IconButton aria-label="fingerprint" color="secondary" href="auth/signin">
                        <Fingerprint fontSize='large' />
                        <SignInText>SalesForce SignIn</SignInText>
                    </IconButton>
                </SignInButton>
            ) :
                (<>
                    <Fingerprint fontSize='large' />
                    <AlreadySignedInText>YOU'RE LOGGED IN</AlreadySignedInText>
                </>
                )}
        </>
    )
}

export default Home
