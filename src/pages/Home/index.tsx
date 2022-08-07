


import { cryptoWalletAnimation } from 'assets'

import { Button, GlassCard, Lottie } from 'components'

import { ContainerButton, TextCard, TitleCard, Container } from './styles'



export const Home = () => {

    return (
        <Container>

            <GlassCard>
                <Lottie
                    animationData={cryptoWalletAnimation}
                    width={150}
                    height={200}
                />
                <TitleCard>Seu saldo atual é de: 25 Family Coins</TitleCard>
                <TextCard>Todo mês você está permitido a retirar x Family Coins, através do botão abaixo!</TextCard>

                <ContainerButton>
                    <Button title='Retirar mesada' />
                </ContainerButton>
            </GlassCard>

        </Container>
    )
}
