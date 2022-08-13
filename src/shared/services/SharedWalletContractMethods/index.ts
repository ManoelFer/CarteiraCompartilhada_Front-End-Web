import { useContext } from "react"

import { Web3Context } from "context"


const contractMethods = () => {
    const { SharedWalletContractDeployed, currentAddress } = useContext(Web3Context)

    async function withdrawAllowance() {
        return SharedWalletContractDeployed.methods.withdrawAllowance().send({ from: currentAddress })
    }

    return { withdrawAllowance }
}



export default contractMethods