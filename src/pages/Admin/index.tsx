import { addBeneficiary, addCoin, adminAnimation, modifyAllowance, pauseTransfers } from "assets"

import { GlassCard, Header, Lottie } from "components"
import { Web3Context } from "context"
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { Container, TitleCard, ContainerActions, ContentActions, CardActions, ImageActions, TitleActions } from "./styles"


export const Admin = () => {
    const navigate = useNavigate()
    const { isAdmin, disconnectWallet } = useContext(Web3Context)

    useEffect(() => {
        if (!isAdmin) {
            disconnectWallet()
            navigate('/login')
        }
    }, [isAdmin])

    return (
        <Container>
            <Header />
            <GlassCard>
                <Lottie
                    animationData={adminAnimation}
                    width={225}
                    height={225}
                />

                <TitleCard>O que deseja para hoje?</TitleCard>

                <ContainerActions>
                    <ContentActions>
                        <CardActions>
                            <ImageActions src={addBeneficiary} />
                            <TitleActions>Adicionar Beneficiário</TitleActions>
                        </CardActions>
                        <CardActions>
                            <ImageActions src={addCoin} />

                            <TitleActions>Adicionar + Family Coins</TitleActions>
                        </CardActions>
                        <CardActions>
                            <ImageActions src={pauseTransfers} />

                            <TitleActions>Pausar Transferências</TitleActions>
                        </CardActions>
                        <CardActions>
                            <ImageActions src={modifyAllowance} />

                            <TitleActions>Modificar Mesada</TitleActions>
                        </CardActions>
                    </ContentActions>

                </ContainerActions>
            </GlassCard >
        </Container >
    )
}
