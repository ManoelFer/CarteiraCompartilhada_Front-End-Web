import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { backIcon, pageForbiddenAnimation } from "assets"

import { Button, Lottie } from "components"

import { Web3Context } from "context"

import { Container, ContainerButton, TitlePage } from "./styles"

export const NotAllowed = () => {
    const { disconnectWallet, isLogged, verifyIfIsAdmin, verifyIfIsBeneficiary } = useContext(Web3Context)
    const navigate = useNavigate()

    useEffect(() => {

        async function verifyAccess() {
            const isAdmin = await verifyIfIsAdmin()
            const isBeneficiary = await verifyIfIsBeneficiary()

            if (isAdmin) {
                return navigate('/admin')
            }
            if (isBeneficiary) {
                return navigate('/beneficiary')
            }
        }

        if (isLogged) verifyAccess()
    }, [isLogged])

    const handleNavigate = () => {
        disconnectWallet()
        navigate('/')
    }

    return (
        <Container>
            <Lottie animationData={pageForbiddenAnimation} width={300} height={250} />
            <TitlePage>Opa! Você não tem permissão para acessar essa rota!</TitlePage>

            <ContainerButton>
                <Button title="Voltar ao início" icon={backIcon} onClick={handleNavigate} />
            </ContainerButton>

        </Container>
    )
}
