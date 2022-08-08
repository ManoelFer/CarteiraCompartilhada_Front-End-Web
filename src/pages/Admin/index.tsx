import { addBeneficiary, addCoin, adminAnimation, modifyAllowance, pauseTransfers } from "assets"

import { GlassCard, Header, Lottie } from "components"

import { Container, TitleCard, ContainerActions, ContentActions, CardActions, ImageActions, TitleActions } from "./styles"


export const Admin = () => {
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
