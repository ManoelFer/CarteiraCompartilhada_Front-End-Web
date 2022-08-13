import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import BigNumber from 'bignumber.js'
import Swal from "sweetalert2"

import { addBeneficiary, addCoin, adminAnimation, isBeneficiaryIcon, modifyAllowance, pauseTransfers } from "assets"

import { GlassCard, Header, Lottie } from "components"
import { Web3Context } from "context"


import { Container, TitleCard, ContainerActions, ContentActions, CardActions, ImageActions, TitleActions } from "./styles"


export const Admin = () => {
    const navigate = useNavigate()
    const { isLogged, verifyIfIsAdmin, verifyIfIsBeneficiary, disconnectWallet, SharedWalletContractDeployed } = useContext(Web3Context)

    useEffect(() => {
        async function verifyAccess() {
            const isAdmin = await verifyIfIsAdmin()
            if (!isAdmin) {
                disconnectWallet()
                navigate('/login')
            }
        }

        if (isLogged) verifyAccess()
    }, [isLogged])

    const handleAddBeneficiary = async () => {
        const { value: beneficiary } = await Swal.fire({
            title: 'Adicione o endereço do beneficiário',
            input: 'text',
            inputLabel: 'Endereço do beneficiário',
            inputPlaceholder: '0x0000000000000000000000000000000000000000',
            heightAuto: false
        })

        const result = await SharedWalletContractDeployed.methods.setBeneficiary(beneficiary, true, new BigNumber(20000000000000000000)).send()
    }

    const handleVerifyBeneficiary = async () => {
        const { value: beneficiary } = await Swal.fire({
            title: 'Adicione o endereço do beneficiário',
            input: 'text',
            inputLabel: 'Endereço do beneficiário',
            inputPlaceholder: '0x0000000000000000000000000000000000000000',
            heightAuto: false
        })

        const isBeneficiary = await verifyIfIsBeneficiary(beneficiary)

        if (isBeneficiary) {
            Swal.fire({
                icon: 'success',
                title: 'Este endereço é de um beneficiário',
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
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Este endereço não é de um beneficiário',
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
        }
    }

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
                        <CardActions onClick={handleAddBeneficiary}>
                            <ImageActions src={addBeneficiary} />
                            <TitleActions>Adicionar Beneficiário</TitleActions>
                        </CardActions>
                        <CardActions onClick={handleVerifyBeneficiary}>
                            <ImageActions src={isBeneficiaryIcon} />

                            <TitleActions>Verificar se é um beneficiário</TitleActions>
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
