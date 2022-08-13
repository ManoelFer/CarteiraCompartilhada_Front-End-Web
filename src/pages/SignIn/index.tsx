
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'

import { toast } from 'react-toastify'

import { femaleAvatarProfilePicAnimation, metamaskIcon } from 'assets'

import { Web3Context } from 'context'

import { GlassCard, Button, Lottie } from 'components'

import { Container, ContainerButton, TextCard, TitleCard } from './styles'


export const SignIn = () => {
    const navigate = useNavigate()
    const { connectWallet, isAdmin } = useContext(Web3Context)

    const handleNavigate = async () => {

        try {
            await connectWallet()

            toast.success('Sucesso ao conectar na carteira!', {
                position: "top-center",
            });

            if (isAdmin) navigate('/admin')

            // if (isBeneficiary) navigate('/beneficiary')

        } catch (error) {
            toast.error("Erro ao conectar na carteira! Verifique se já não tem um processo aberto no metamask ou analise o erro completo no console log do navegador.", {
                position: "top-center",
            })
            console.log('Error in connect wallet = ', error)
        }
    }

    return (
        <Container>
            <GlassCard>
                <Lottie
                    animationData={femaleAvatarProfilePicAnimation}
                    width={150}
                    height={150}
                />
                <TitleCard>Gerencie a mesada de seus filhos com Crypto Moedas!</TitleCard>
                <TextCard>Para desfrutar de todos benefícios da <b>Carteira Compartilhada</b>, faça vínculo com sua carteira de crypto moedas!</TextCard>

                <ContainerButton>
                    <Button title='Conectar Carteira' onClick={handleNavigate} icon={metamaskIcon} />
                </ContainerButton>
            </GlassCard>
        </Container>
    )
}
