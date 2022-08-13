import { useContext } from 'react'
import { Navigate } from 'react-router-dom'

import { Web3Context } from 'context'

import { IPrivateRoute } from './interfaces'



export const PrivateRoute = ({ children }: IPrivateRoute): JSX.Element => {
    const { isLogged } = useContext(Web3Context)

    return <> {isLogged ? children : <Navigate to="/forbidden" />} </>
}
