import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Swal from 'sweetalert2'
import Web3 from 'web3'

import { cryptoWalletAnimation } from 'assets'

import { Button, GlassCard, Header, Lottie } from 'components'

import { Web3Context } from 'context'

import { ContainerButton, TextCard, TitleCard, Container } from './styles'


export const Beneficiary = () => {
    const navigate = useNavigate()
    const { verifyIfIsBeneficiary, getTotalBalance, disconnectWallet, isLogged, SharedWalletContractDeployed, setIsLoading, currentAddress, currentBalanceOf } = useContext(Web3Context)

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

    const handleWithdrawAllowance = async () => {
        setIsLoading(true)

        try {
            await SharedWalletContractDeployed.methods.withdrawAllowance().send({ from: currentAddress })

            await getTotalBalance()

            setIsLoading(false)
            Swal.fire({
                icon: 'success',
                title: 'Os Family Coins referentes a sua mesada, foram movidos para sua carteira!',
                showConfirmButton: false,
                timer: 3500,
                heightAuto: false,
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            })

        } catch (error) {
            setIsLoading(false)

            //@ts-ignore
            const newErrorMessage = JSON.parse(error.message.replace('[ethjs-query] while formatting outputs from RPC', '').replace("'{", "{").replace("}'", "}").trim())

            if (newErrorMessage.value.data.message === "VM Exception while processing transaction: revert You can only withdraw your allowance once every 30 days") {
                return Swal.fire({
                    icon: 'error',
                    title: 'Você só pode retirar Family Coins novamente daqui 30 dias!',
                    showConfirmButton: false,
                    timer: 4500,
                    heightAuto: false,
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                })
            } else if (newErrorMessage.value.data.message === "VM Exception while processing transaction: revert ERC20Pausable: token transfer while paused") {
                return Swal.fire({
                    icon: 'error',
                    title: 'Todas as transferências foram pausadas pelo administrador!',
                    showConfirmButton: false,
                    timer: 4500,
                    heightAuto: false,
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                })
            }

            Swal.fire({
                icon: 'error',
                title: 'Falha na retirada dos Family Coins!',
                showConfirmButton: false,
                timer: 4500,
                heightAuto: false,
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            })
        }
    }

    return (
        <Container>

            <Header />
            <GlassCard>
                <Lottie
                    animationData={cryptoWalletAnimation}
                    width={150}
                    height={200}
                />
                <TitleCard>Seu saldo atual é de: {Web3.utils.fromWei(currentBalanceOf.toString(), "ether")} Family Coins</TitleCard>
                <TextCard>Todo mês você está permitido a retirar x Family Coins, através do botão abaixo!</TextCard>

                <ContainerButton>
                    <Button title='Retirar mesada' onClick={handleWithdrawAllowance} />
                </ContainerButton>
            </GlassCard>

        </Container>
    )
}
