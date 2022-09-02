import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Web3 from 'web3'

import { cryptoWalletAnimation } from 'assets'

import { Button, GlassCard, Lottie, SwalAlertComponent } from 'components'

import { Web3Context } from 'context'

import { ContainerButton, TextCard, TitleCard, Container } from './styles'
import { handleErrosInContract } from 'shared/helpers'
import { toast } from 'react-toastify'


export const Beneficiary = () => {
    const navigate = useNavigate()
    const {
        contractAddress,
        verifyIfIsBeneficiary,
        getTotalBalance,
        disconnectWallet,
        isLogged,
        SharedWalletContractDeployed,
        setIsLoading,
        currentAddress,
        currentBalanceOf,
        tryConnectAgain
    } = useContext(Web3Context)

    useEffect(() => {
        async function verifyAccess() {
            const isAdmin = await verifyIfIsBeneficiary()
            if (!isAdmin) {
                disconnectWallet()
                navigate('/login')
            } else {
                toast.success('Bem-vindo beneficiário!', {
                    position: "top-center",
                });
            }
        }

        if (isLogged) verifyAccess()
    }, [isLogged, tryConnectAgain])

    const handleWithdrawAllowance = async () => {
        setIsLoading(true)

        try {
            await SharedWalletContractDeployed.methods.withdrawAllowance().send({ from: currentAddress })

            await getTotalBalance()

            setIsLoading(false)

            SwalAlertComponent({ icon: 'success', title: 'Os Family Coins referentes a sua mesada, foram movidos para sua carteira!' })

        } catch (error) {
            setIsLoading(false)
            SwalAlertComponent({ icon: 'error', title: 'Falha ao retirar mesada! Verifique o erro completo no console do navegador.' })
            console.log('Falha ao retirar mesada! Error: ', error)

            //TODO: Código para trazer erro específico, infelizmente não funciona com o infura, pois devemos trabalhar com web sockets
            //@ts-ignore
            // const errorMessageToJson = JSON.parse(error.message.replace('[ethjs-query] while formatting outputs from RPC', '').replace("'{", "{").replace("}'", "}").trim())
            // handleErrosInContract(errorMessageToJson.value.data.message)
        }
    }

    return (
        <Container>
            <GlassCard>
                <Lottie
                    animationData={cryptoWalletAnimation}
                    width={150}
                    height={200}
                />
                <TitleCard>Seu saldo atual é de: {Web3.utils.fromWei(currentBalanceOf.toString(), "ether")} Family Coins</TitleCard>

                <TextCard>
                    Todo mês você está permitido a retirar Family Coins, através do botão abaixo!
                    <br /> Para visualização dos tokens em sua carteira use a seguinte chave: <b>{contractAddress}</b>
                </TextCard>

                <ContainerButton>
                    <Button title='Retirar mesada' onClick={handleWithdrawAllowance} />
                </ContainerButton>
            </GlassCard>

        </Container>
    )
}
