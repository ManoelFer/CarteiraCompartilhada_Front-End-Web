import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { cryptoWalletAnimation } from 'assets'

import { Button, GlassCard, Header, Lottie } from 'components'

import { Web3Context } from 'context'

import { ContainerButton, TextCard, TitleCard, Container } from './styles'


export const Beneficiary = () => {
    const navigate = useNavigate()
    const { verifyIfIsBeneficiary, disconnectWallet, isLogged } = useContext(Web3Context)

    useEffect(() => {
        async function verifyAccess() {
            const isAdmin = await verifyIfIsBeneficiary()
            if (!isAdmin) {
                disconnectWallet()
                navigate('/login')
            }
        }

        if (isLogged) verifyAccess()
    }, [isLogged])

    return (
        <Container>

            <Header />
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
