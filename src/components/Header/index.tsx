import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

import { disconnectIcon } from "assets"

import { Button } from "components"


import { Container, Content } from "./styles"

import { Web3Context } from "context"

export const Header = () => {
    const navigate = useNavigate()
    const { disconnectWallet } = useContext(Web3Context)

    const handleNavigate = async () => {
        try {
            await disconnectWallet()

            toast.success('Sucesso ao desconectar da carteira!', {
                position: "top-center",
            });
            navigate('/')
        } catch (error) {
            toast.error("Erro ao desconectar da carteira! Verifique se já não tem um processo aberto no metamask ou analise o erro completo no console log do navegador.", {
                position: "top-center",
            })
            console.log('Error in disconnect wallet = ', error)
        }
    }


    return (
        <Container>
            <Content>
                <Button title="Desconectar Carteira" icon={disconnectIcon} onClick={handleNavigate} />
            </Content>
        </Container>
    )
}
