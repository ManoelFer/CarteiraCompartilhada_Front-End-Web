
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { femaleAvatarProfilePicAnimation, metamaskIcon } from 'assets'

import { Web3Context } from 'context'

import { GlassCard, Button, Lottie, SwalAlertComponent } from 'components'

import { Container, ContainerButton, TextCard, TitleCard } from './styles'


export const SignIn = () => {
    const navigate = useNavigate()
    const { connectWallet, verifyIfIsBeneficiary, verifyIfIsAdmin, setIsLoading, currentAddress, tryConnectAgain } = useContext(Web3Context)

    useEffect(() => {
        async function updatedAccount() {
            const isAdmin = await verifyIfIsAdmin()
            const isBeneficiary = await verifyIfIsBeneficiary()


            setIsLoading(false)

            if (isAdmin) {
                toast.success('Bem-vindo administrador!', {
                    position: "top-center",
                });
                return navigate('/admin')
            }

            if (isBeneficiary) {
                toast.success('Bem-vindo beneficiário!', {
                    position: "top-center",
                });
                return navigate('/beneficiary')
            }

            if (currentAddress) SwalAlertComponent({ icon: 'warning', title: 'Falha no Login', text: 'Para logar é necessário um endereço de Administrador ou Beneficiário! Caso você tenha um endereço de Administrador ou Beneficiário, mude e tente conectar novamente!' })
        }

        if (currentAddress || tryConnectAgain) updatedAccount()
    }, [currentAddress, tryConnectAgain])

    const handleNavigate = async () => {
        setIsLoading(true)
        try {
            await connectWallet()
        } catch (error) {
            setIsLoading(false)
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
