import { useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom'

import { Web3Context } from 'context'

import { IPrivateRoute } from './interfaces'

export const PrivateRoutes = ({ children }: IPrivateRoute): JSX.Element => {
    const { isLogged } = useContext(Web3Context)

    return <> {isLogged ? children : <Navigate to="/forbidden" />} </>
}
