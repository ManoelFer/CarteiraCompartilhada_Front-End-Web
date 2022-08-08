import { useNavigate } from "react-router-dom"

import { disconnectIcon } from "assets"

import { Button } from "components"


import { Container, Content } from "./styles"


export const Header = () => {
    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate('/')
    }

    return (
        <Container>
            <Content>
                <Button title="Desconectar Carteira" icon={disconnectIcon} onClick={handleNavigate} />
            </Content>
        </Container>
    )
}
