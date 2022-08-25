// @ts-nocheck
import { createContext, useState, useEffect } from "react";

import Web3Modal from "web3modal"
import Web3 from "web3"

import { IPropsEthereumContract, IWeb3ContextProps, IWeb3ContextProviderProps } from "./interface";

import SharedWallet from "contracts/SharedWalletContract.json"

import { providerOptions } from "shared/constants"

export const Web3Context = createContext<IWeb3ContextProps>(
    {} as IWeb3ContextProps
);

export function Web3ContextProvider({
    children,
}: IWeb3ContextProviderProps): JSX.Element {
    const [web3Instance, setWeb3Instance] = useState<any>()
    const [web3Modal, setWeb3Modal] = useState<any>()
    const [SharedWalletContractDeployed, setSharedWallet] = useState<IPropsEthereumContract>()
    const [accounts, setAccounts] = useState<any>()
    const [isLoading, setIsLoading] = useState(false)
    const [isLogged, setIsLogged] = useState(false)
    const [currentAddress, setCurrentAddress] = useState()
    const [tryConnectAgain, setTryConnectAgain] = useState(false)
    const [currentTotalSupply, setCurrentTotalSupply] = useState(0)
    const [currentBalanceOf, setCurrentBalanceOf] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const [contractAddress, setContractAddress] = useState("")

    useEffect(() => {
        const newWeb3Modal = new Web3Modal({
            cacheProvider: true, // very important
            providerOptions,
        });

        setWeb3Modal(newWeb3Modal)
    }, [])

    useEffect(() => {
        // connect automatically and without a popup if user is already connected
        if (web3Modal && web3Modal.cachedProvider) {
            connectWallet()
        }
    }, [web3Modal, currentAddress])


    useEffect(() => {
        async function initialMethods() {
            await verifyIfIsAdmin()
            await verifyIfIsBeneficiary()
            await getTotalSupply()
            await getTotalBalance()
        }
        if (SharedWalletContractDeployed && currentAddress) initialMethods()

    }, [SharedWalletContractDeployed, currentAddress])


    const verifyIfIsAdmin = async (): boolean => {
        try {
            const owner = await SharedWalletContractDeployed.methods.owner().call()

            if (owner.toLowerCase() === currentAddress.toLowerCase()) {
                return true
            } else {
                return false
            }
        } catch (error) {
            console.log('Error in verify if user is admin => ', error)
        }
    }

    const verifyIfIsBeneficiary = async (beneficiary?: string): boolean => {
        if (beneficiary || currentAddress) {
            try {
                const beneficiaryResult = await SharedWalletContractDeployed.methods.beneficiaries(beneficiary || currentAddress).call()

                if (beneficiaryResult.isAllowed) {
                    return true
                } else {
                    return false
                }
            } catch (error) {
                console.log('Error in verify if user is beneficiary => ', error)
            }
        }
    }

    const verifyIfIsPaused = async (): boolean => {
        try {
            const paused = await SharedWalletContractDeployed.methods.paused().call()

            setIsPaused(paused)
        } catch (error) {
            console.log('Error in verify if contracts to be paused => ', error)
        }
    }

    const changeCurrentAddress = async (web3InstanceParam) => {
        const address = await web3InstanceParam.eth.currentProvider.selectedAddress

        setCurrentAddress(address)

        setTryConnectAgain(!tryConnectAgain)

        if (SharedWalletContractDeployed) {
            verifyIfIsAdmin()
            verifyIfIsBeneficiary()
        }
    }

    const disconnectWallet = async () => {
        try {
            await web3Modal.clearCachedProvider()
            setCurrentAddress('')
            setIsLogged(false)
        } catch (error) {
            throw new Error(error)
        }
    }

    const connectWallet = async () => {
        let provider

        setIsLoading(true)

        try {
            provider = await web3Modal.connect();

            //Set web3 instance and address connected.
            const web3 = new Web3(provider)
            setWeb3Instance(web3)

            // Use web3 to get the user's accounts.
            setAccounts(await web3.eth.getAccounts())

            // Get the contract instance.
            const networkId = await web3.eth.net.getId();

            const contractAddressValue = SharedWallet.networks[networkId].address

            setContractAddress(contractAddressValue)

            setSharedWallet(new web3.eth.Contract(
                SharedWallet.abi,
                SharedWallet.networks[networkId] && contractAddressValue,
                {
                    from: web3.eth.currentProvider.selectedAddress
                }
            ))

            await changeCurrentAddress(web3)

            addListeners(provider, web3);

            setIsLoading(false)
            setIsLogged(true)
        } catch (e) {
            setIsLoading(false)
            throw new Error(e)
        }
    }

    async function addListeners(web3ModalProvider, web3InstanceParam) {

        // Subscribe to accounts change
        web3ModalProvider.on("accountsChanged", async () => {
            await changeCurrentAddress(web3InstanceParam)
        });

        // Subscribe to chainId change
        web3ModalProvider.on("chainChanged", (chainId) => {
            console.log('chainId :>> ', chainId);
        });

        // Subscribe to provider connection 
        web3ModalProvider.on("connect", (info: { chainId: number }) => {
            console.log('info :>> ', info);
        });

        // Subscribe to provider disconnection
        web3ModalProvider.on("disconnect", async (error: { code: number; message: string }) => {
            if (!error) await web3Modal.clearCachedProvider()
            console.log('error :>> ', error);
        });
    }

    async function getTotalSupply() {
        try {
            const totalSupply = await SharedWalletContractDeployed.methods.totalSupply().call()

            setCurrentTotalSupply(totalSupply)
        } catch (error) {
            console.log('Error in get total supply', error)
        }
    }

    async function getTotalBalance() {
        try {
            const balanceOf = await SharedWalletContractDeployed.methods.balanceOf(currentAddress).call()

            setCurrentBalanceOf(balanceOf)
        } catch (error) {
            console.log('Error in get balance of to current address', error)
        }
    }

    async function addMoreFLs() {
        return SharedWalletContractDeployed.methods.addTokens(currentAddress, new BigNumber(amount)).send()
    }

    return (
        <Web3Context.Provider
            value={{
                web3Instance,
                web3Modal,
                isLogged,
                accounts,
                isLoading,
                SharedWalletContractDeployed,
                connectWallet,
                disconnectWallet,
                currentAddress,
                setIsLoading,

                addMoreFLs,

                verifyIfIsAdmin,
                verifyIfIsBeneficiary,
                verifyIfIsPaused,
                isPaused,

                currentTotalSupply,
                getTotalSupply,

                currentBalanceOf,
                getTotalBalance,

                contractAddress,

                tryConnectAgain
            }}
        >
            {children}
        </Web3Context.Provider>
    );
}
