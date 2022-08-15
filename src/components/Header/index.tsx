import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { toast } from "react-toastify"
import Web3 from "web3"

import { disconnectIcon } from "assets"

import { Button } from "components"

import { Container, Content, CurrentBalance } from "./styles"

import { Web3Context } from "context"


export const Header = () => {
    const [whoIsLogged, setWhoIsLogged] = useState("")
    const navigate = useNavigate()
    const { disconnectWallet, currentTotalSupply, verifyIfIsAdmin } = useContext(Web3Context)

    useEffect(() => {
        async function loadDataBalances() {
            const isAdmin = await verifyIfIsAdmin()

            if (isAdmin) {
                setWhoIsLogged("admin")
            }
            else {
                setWhoIsLogged("isBeneficiary")
            }
        }

        loadDataBalances()
    }, [])


    const handleNavigate = async () => {
        try {
            await disconnectWallet()

            toast.success('Sucesso ao desconectar da carteira!', {
                position: "top-center",
            });
            navigate('/')
        } catch (error) {
            toast.error("Erro ao desconectar da carteira! Verifique se já não tem um processo aberto no metamask ou analise o erro completo no console log do navegador.", {
                position: "top-center",
            })
            console.log('Error in disconnect wallet = ', error)
        }
    }


    return (
        <Container>
            <Content>
                {whoIsLogged === "admin"
                    ?
                    <CurrentBalance>
                        Saldo atual é de: {Web3.utils.fromWei(currentTotalSupply.toString(), "ether")} FLs🪙
                    </CurrentBalance>
                    :
                    <div></div>
                }
                <Button title="Desconectar Carteira" icon={disconnectIcon} onClick={handleNavigate} />
            </Content>
        </Container>
    )
}
