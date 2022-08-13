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
    const [isAdmin, setIsAdmin] = useState(false)

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
        }
        if (SharedWalletContractDeployed && currentAddress) initialMethods()

    }, [SharedWalletContractDeployed, currentAddress])


    const verifyIfIsAdmin = async () => {
        try {
            const owner = await SharedWalletContractDeployed.methods.owner().call()

            if (owner.toLowerCase() === currentAddress.toLowerCase()) {
                setIsAdmin(true)
            } else {
                setIsAdmin(false)
            }
        } catch (error) {
            console.log('Error in verify if user is admin => ', error)
        }
    }


    const changeCurrentAddress = async (web3InstanceParam) => {
        const address = await web3InstanceParam.eth.currentProvider.selectedAddress

        setCurrentAddress(address)
        if (SharedWalletContractDeployed) verifyIfIsAdmin()
    }

    const disconnectWallet = async () => {
        try {
            await web3Modal.clearCachedProvider()
            setIsLogged(false)
        } catch (error) {
            throw new Error(e)
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

            addListeners(provider, web3);

            await changeCurrentAddress(web3)

            // Use web3 to get the user's accounts.
            setAccounts(await web3.eth.getAccounts())

            // Get the contract instance.
            const networkId = await web3.eth.net.getId();

            setSharedWallet(new web3.eth.Contract(
                SharedWallet.abi,
                SharedWallet.networks[networkId] && SharedWallet.networks[networkId].address,
                {
                    from: web3.eth.currentProvider.selectedAddress
                }
            ))

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



    return (
        <Web3Context.Provider
            value={{
                web3Instance,
                isLogged,
                accounts,
                isLoading,
                SharedWalletContractDeployed,
                connectWallet,
                disconnectWallet,
                currentAddress,
                setIsLoading,
                isAdmin
            }}
        >
            {children}
        </Web3Context.Provider>
    );
}