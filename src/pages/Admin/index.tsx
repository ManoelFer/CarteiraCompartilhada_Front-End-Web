// @ts-nocheck
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import Swal from "sweetalert2"
import withReactContent from 'sweetalert2-react-content'
import { Formik, Form, Field, FormikProps, FormikBag, FormikErrors } from 'formik'
import Web3 from "web3"

import { addBeneficiary, addCoin, adminAnimation, isBeneficiaryIcon, maxAllowedIcon, pauseTransfers, unpauseIcon } from "assets"

import { GlassCard, Lottie, SwalAlertComponent } from "components"

import { Web3Context } from "context"

import { Container, TitleCard, ContainerActions, ContentActions, CardActions, ImageActions, TitleActions } from "./styles"
import { toast } from "react-toastify"

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
        setIsLoading,
        tryConnectAgain
    } = useContext(Web3Context)

    useEffect(() => {
        async function initFunctions() {
            const isAdmin = await verifyIfIsAdmin()
            await verifyIfIsPaused()

            if (!isAdmin) {
                disconnectWallet()
                navigate('/login')
            } else {
                toast.success('Bem-vindo administrador!', {
                    position: "top-center",
                });
            }
        }

        if (isLogged) initFunctions()
    }, [isLogged, isPaused, tryConnectAgain])

    const handleBeneficiary = async () => {
        const ReactSwal = withReactContent(Swal)

        type FormValues = { beneficiary: string, balance: string, status: string }
        let formikRef: FormikProps<FormValues>

        await ReactSwal.fire({
            title: 'Gerenciar Beneficiário',
            heightAuto: false,
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Salvar',
            html: (
                <Formik<FormValues>
                    innerRef={(ref) => (formikRef = ref)}
                    initialValues={{ beneficiary: '', balance: '', status: '' }}
                    validate={(values) => {
                        const errors: FormikErrors<FormValues> = {}
                        if (!Web3.utils.isAddress(values.beneficiary)) {
                            errors.beneficiary = 'Inválido'
                        }
                        if (!values.balance) {
                            errors.balance = 'Obrigatório'
                        }
                        if (isNaN(values.balance)) {
                            errors.balance = 'Numérico'
                        }

                        if (!values.status) {
                            errors.status = 'Obrigatório'
                        }
                        return errors
                    }}
                    onSubmit={() => { }}
                >
                    <Form>
                        <Field
                            type="text"
                            className="swal2-input"
                            name="beneficiary"
                            placeholder="Endereço do beneficiário"
                            onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) =>
                                event.key === 'Enter' && ReactSwal.clickConfirm()
                            }
                        />
                        <Field
                            type="text"
                            className="swal2-input"
                            name="balance"
                            placeholder="Adicionar saldo"
                            onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) =>
                                event.key === 'Enter' && ReactSwal.clickConfirm()
                            }
                        />
                        <Field
                            as="select"
                            name="status"
                            className="swal2-input"
                            onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) =>
                                event.key === 'Enter' && ReactSwal.clickConfirm()
                            }
                        >
                            <option value="">Status do beneficiário</option>
                            <option value="active">Ativado</option>
                            <option value="desativado">Desativado</option>
                        </Field>
                    </Form>
                </Formik>
            ),
            didOpen: () => {
                Swal.getPopup().querySelector('input')?.focus()
            },
            preConfirm: async () => {
                await formikRef.submitForm()
                if (formikRef.isValid) {
                    return formikRef.values
                } else {
                    Swal.showValidationMessage(JSON.stringify(formikRef.errors))
                }
            },
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                sendBeneficiaryToRegister(result.value);
            } else if (result.isDismissed) {
                return Swal.fire({ title: 'As alterações não foram salvas', icon: 'info', heightAuto: false })
            }
        })

        async function sendBeneficiaryToRegister({ beneficiary, balance, status }) {
            setIsLoading(true)

            //Convert values before send
            status = status === "active" ? true : false
            balance = Web3.utils.toWei(balance, 'ether')

            try {
                await SharedWalletContractDeployed.methods.setBeneficiary(beneficiary, status, Web3.utils.toBN(balance)).send()

                setIsLoading(false)
                SwalAlertComponent({ icon: 'success', title: 'Beneficiário registrado com sucesso!' })

            } catch (error) {
                setIsLoading(false)

                SwalAlertComponent({ icon: 'error', title: 'Transação recusada ou falha ao registrar beneficiário!' })
                console.log('Falha ao registrar beneficiário error: ', error)
            }
        }
    }

    const handleVerifyBeneficiary = async () => {
        async function sendBeneficiaryToVerify(beneficiary) {
            try {
                const isBeneficiary = await verifyIfIsBeneficiary(beneficiary)

                if (isBeneficiary) {
                    return SwalAlertComponent({ icon: 'success', title: 'Este endereço é de um beneficiário' })
                } else {
                    return SwalAlertComponent({ icon: 'error', title: 'Este endereço não é de um beneficiário' })
                }
            } catch (error) {
                SwalAlertComponent({ icon: 'error', title: 'Falha ao verificar endereço do beneficiário!' })
                console.log('Falha ao verificar endereço do beneficiário! error: ', error)
            }
        }


        await Swal.fire({
            title: 'Adicione o endereço do beneficiário',
            input: 'text',
            inputLabel: 'Endereço do beneficiário',
            inputPlaceholder: '0x0000000000000000000000000000000000000000',
            heightAuto: false,
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            inputValidator: (value) => {
                if (!value) {
                    return 'O campo do beneficiário é obrigatório!'
                } else if (!Web3.utils.isAddress(value)) {
                    return 'O endereço da carteira do beneficiário deve ser válido!'
                }
            }
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                sendBeneficiaryToVerify(result.value)
            } else if (result.isDismissed) {
                return Swal.fire({ title: 'As alterações não foram salvas', icon: 'info', heightAuto: false })
            }
        })
    }

    const handleMaxFamilyCoins = async () => {
        async function sendMaxFamilyCoins(valueInputMaxTokenAllowed) {
            //Convert values before send
            valueInputMaxTokenAllowed = Web3.utils.toWei(valueInputMaxTokenAllowed, 'ether')

            if (valueInputMaxTokenAllowed) {
                setIsLoading(true)

                try {
                    await SharedWalletContractDeployed.methods.setMaxTokensAllowed(Web3.utils.toBN(valueInputMaxTokenAllowed)).send()

                    setIsLoading(false)

                    return SwalAlertComponent({ icon: 'success', title: 'Número máximo de FLs modificado com sucesso!' })
                } catch (error) {
                    setIsLoading(false)

                    return SwalAlertComponent({ icon: 'error', title: 'Transação recusada ou falha ao modificar número máximo de FLs!' })
                }
            }
        }

        await Swal.fire({
            title: 'Adicione a nova quantidade máxima de Family Coins permitida no contrato',
            input: 'text',
            inputLabel: 'Máximo de Family Coins permitidos no contrato',
            inputPlaceholder: '900',
            showCancelButton: true,
            heightAuto: false,
            inputValidator: (value) => {
                if (!value) {
                    return 'O input é obrigatório!'
                }
                if (isNaN(value)) {
                    return 'O input deve conter um valor numérico!'
                }
            }
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                sendMaxFamilyCoins(result.value)
            } else if (result.isDismissed) {
                return Swal.fire({ title: 'As alterações não foram salvas', icon: 'info', heightAuto: false })
            }
        })
    }

    const handleAddFamilyCoins = async () => {

        async function sendFamilyCoins(amount) {
            //Convert values before send
            amount = Web3.utils.toWei(amount, 'ether')

            setIsLoading(true)

            try {
                await SharedWalletContractDeployed.methods.addTokens(currentAddress, Web3.utils.toBN(amount)).send()

                await getTotalSupply()

                setIsLoading(false)

                return SwalAlertComponent({ icon: 'success', title: 'Family Coins Adicionados com sucesso!' })
            } catch (error) {
                setIsLoading(false)
                return SwalAlertComponent({ icon: 'error', title: 'Transação recusada ou Falha ao adicionar family coins!' })
            }
        }

        await Swal.fire({
            title: 'Adicionar Family Coins',
            input: 'text',
            inputLabel: 'Valor de Family Coins',
            inputPlaceholder: '100',
            heightAuto: false,
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            inputValidator: (value) => {
                if (!value) {
                    return 'O input é obrigatório!'
                }
                if (isNaN(value)) {
                    return 'O input deve conter um valor numérico!'
                }

            }
        }).then((result) => {
            if (result.isConfirmed) {
                sendFamilyCoins(result.value)
            } else if (result.isDismissed) {
                return Swal.fire({ title: 'As alterações não foram salvas', icon: 'info', heightAuto: false })
            }
        })
    }

    const handlePause = async () => {
        setIsLoading(true)
        try {
            await SharedWalletContractDeployed.methods.pause().send()

            await verifyIfIsPaused()

            setIsLoading(false)
            return SwalAlertComponent({ icon: 'success', title: 'Transações pausadas!' })
        } catch (error) {
            setIsLoading(false)
            return SwalAlertComponent({ icon: 'error', title: 'Transação recusada ou falha ao pausar as transações!' })
        }
    }

    const handleUnpause = async () => {
        setIsLoading(true)
        try {
            await SharedWalletContractDeployed.methods.unpause().send()

            await verifyIfIsPaused()

            setIsLoading(false)

            return SwalAlertComponent({ icon: 'success', title: 'Transações despausadas!' })
        } catch (error) {
            setIsLoading(false)
            return SwalAlertComponent({ icon: 'error', title: 'Transação recusada ou falha ao despausar as transações!' })
        }
    }

    return (
        <Container>
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
