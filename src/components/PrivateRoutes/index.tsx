import { useContext } from 'react'
import { Navigate } from 'react-router-dom'

import { Web3Context } from 'context'

import { IPrivateRoute } from './interfaces'
import { Header } from 'components/Header'
import { Container } from './styles'

export const PrivateRoutes = ({ children }: IPrivateRoute): JSX.Element => {
    const { isLogged } = useContext(Web3Context)

    return (
        <Container>
            {
                isLogged ?
                    <>
                        <Header />
                        {children}
                    </>
                    :
                    <Navigate to="/forbidden" />

            }
        </Container>
    )
}
