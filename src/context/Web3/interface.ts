import { ReactNode } from "react";

export interface IWeb3ContextProps {
    web3Instance: any;
    isLogged: boolean;
    accounts: any;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
    SharedWalletContractDeployed: any;
    connectWallet: () => void;
    disconnectWallet: () => void;
    currentAddress: string;
    isAdmin: boolean;
}

export interface IWeb3ContextProviderProps {
    children: ReactNode;
}