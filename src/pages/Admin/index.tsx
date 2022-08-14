import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import BigNumber from 'bignumber.js'
import Swal from "sweetalert2"

import { addBeneficiary, addCoin, adminAnimation, isBeneficiaryIcon, maxAllowedIcon, modifyAllowance, pauseTransfers, unpauseIcon } from "assets"

import { GlassCard, Header, Lottie } from "components"

import { Web3Context } from "context"

import { Container, TitleCard, ContainerActions, ContentActions, CardActions, ImageActions, TitleActions } from "./styles"

export const Admin = () => {
    const navigate = useNavigate()

    const {
        currentAddress,
        isLogged,
        verifyIfIsAdmin,
        getTotalSupply,
        isPaused,
        verifyIfIsBeneficiary,
        verifyIfIsPaused,
        disconnectWallet,
        SharedWalletContractDeployed,
        setIsLoading
    } = useContext(Web3Context)

    useEffect(() => {
        async function initFunctions() {
            const isAdmin = await verifyIfIsAdmin()
            await verifyIfIsPaused()

            if (!isAdmin) {
                disconnectWallet()
                navigate('/login')
            }
        }

        if (isLogged) initFunctions()
    }, [isLogged, isPaused])

    const handleBeneficiary = async () => {
        const { value: formValues } = await Swal.fire({
            title: 'Gerenciar Beneficiário',
            html:
                '<input id="beneficiary" class="swal2-input" placeholder="0x98bA764670D1AD97430E1E1e167ae0A379c4a6a3">' +
                '<input id="type" class="swal2-input" placeholder="true or false">' +
                '<input id="newValue" class="swal2-input" placeholder="1000000000000000000">',
            focusConfirm: false,
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            preConfirm: () => {
                //@ts-ignore
                return { beneficiary: document.getElementById('beneficiary').value, isActive: document.getElementById('type').value, balance: document.getElementById('newValue').value }
            },
            heightAuto: false
        })

        //@ts-ignore
        const { beneficiary, isActive, balance } = formValues

        //@ts-ignore
        if (formValues) {
            setIsLoading(true)

            try {
                //@ts-ignore
                await SharedWalletContractDeployed.methods.setBeneficiary(beneficiary, isActive, new BigNumber(balance)).send()

                setIsLoading(false)
                Swal.fire({
                    icon: 'success',
                    title: 'Beneficiário registrado com sucesso! ',
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
                Swal.fire({
                    icon: 'error',
                    title: 'Falha ao registrar beneficiário! ',
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

    }

    const handleVerifyBeneficiary = async () => {
        const { value: beneficiary } = await Swal.fire({
            title: 'Adicione o endereço do beneficiário',
            input: 'text',
            inputLabel: 'Endereço do beneficiário',
            inputPlaceholder: '0x0000000000000000000000000000000000000000',
            heightAuto: false,
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
        })

        if (beneficiary) {
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
    }

    const handleMaxFamilyCoins = async () => {
        const { value: valueInputMaxTokenAllowed } = await Swal.fire({
            title: 'Adicione a nova quantidade máxima de Family Coins permitida no contrato',
            input: 'text',
            inputLabel: 'Máximo de Family Coins em Wei',
            inputPlaceholder: '900000000000000000000',
            showCancelButton: true,
            heightAuto: false
        })

        if (valueInputMaxTokenAllowed) {
            setIsLoading(true)

            try {
                setIsLoading(false)
                //@ts-ignore
                await SharedWalletContractDeployed.methods.setMaxTokensAllowed(new BigNumber(valueInputMaxTokenAllowed)).send()
                Swal.fire({
                    icon: 'success',
                    title: 'Número máximo de FLs modificado com sucesso!',
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
                Swal.fire({
                    icon: 'error',
                    title: 'Falha ao modificar número máximo de FLs! ',
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
    }

    const handleAddFamilyCoins = async () => {
        const { value: amount } = await Swal.fire({
            title: 'Adicione a quantidade em wei de Family Coins',
            input: 'text',
            inputLabel: 'Valor de Family Coins em Wei',
            inputPlaceholder: '1000000000000000000',
            heightAuto: false,
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
        })

        if (amount) {
            setIsLoading(true)

            try {
                await SharedWalletContractDeployed.methods.addTokens(currentAddress, new BigNumber(amount)).send()

                await getTotalSupply()

                setIsLoading(false)
                Swal.fire({
                    icon: 'success',
                    title: 'Family Coins Adicionados com sucesso!',
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
                Swal.fire({
                    icon: 'error',
                    title: 'Falha ao adicionar family coins',
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
    }

    const handlePause = async () => {
        setIsLoading(true)
        try {
            //@ts-ignore
            await SharedWalletContractDeployed.methods.pause().send()

            await verifyIfIsPaused()

            setIsLoading(false)
            Swal.fire({
                icon: 'success',
                title: 'Transações pausadas!',
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
            Swal.fire({
                icon: 'error',
                title: 'Falha ao pausar as transações! ',
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

    const handleUnpause = async () => {
        setIsLoading(true)
        try {
            //@ts-ignore
            await SharedWalletContractDeployed.methods.unpause().send()

            await verifyIfIsPaused()

            setIsLoading(false)
            Swal.fire({
                icon: 'success',
                title: 'Transações despausadas!',
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
            Swal.fire({
                icon: 'error',
                title: 'Falha ao despausar transações!',
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
                        <CardActions onClick={handleBeneficiary}>
                            <ImageActions src={addBeneficiary} />
                            <TitleActions>Gerenciar Beneficiário</TitleActions>
                        </CardActions>
                        <CardActions onClick={handleVerifyBeneficiary}>
                            <ImageActions src={isBeneficiaryIcon} />

                            <TitleActions>Verificar se é um beneficiário</TitleActions>
                        </CardActions>
                        <CardActions onClick={handleMaxFamilyCoins}>
                            <ImageActions src={maxAllowedIcon} />

                            <TitleActions>Máximo de Family Coins</TitleActions>
                        </CardActions>
                        <CardActions onClick={handleAddFamilyCoins}>
                            <ImageActions src={addCoin} />

                            <TitleActions>Adicionar Family Coins</TitleActions>
                        </CardActions>
                        <CardActions onClick={isPaused ? handleUnpause : handlePause}>
                            <ImageActions src={isPaused ? unpauseIcon : pauseTransfers} />

                            <TitleActions>{isPaused ? "Despausar Transferências" : "Pausar Transferências"}</TitleActions>
                        </CardActions>
                    </ContentActions>

                </ContainerActions>
            </GlassCard >
        </Container >
    )
}
