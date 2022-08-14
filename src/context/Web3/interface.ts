import { ReactNode } from "react";

export interface IWeb3ContextProps {
    web3Instance: any;
    web3Modal: any;
    isLogged: boolean;
    accounts: any;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
    SharedWalletContractDeployed: any;
    connectWallet: () => void;
    disconnectWallet: () => void;
    currentAddress: string;

    verifyIfIsAdmin: (beneficiary?: string) => boolean;
    verifyIfIsBeneficiary: (beneficiary?: string) => boolean;
    verifyIfIsPaused: () => void;
    isPaused: boolean;

    currentTotalSupply: number;
    getTotalSupply: () => void;

    currentBalanceOf: number;
    getTotalBalance: () => void;
}

export interface IWeb3ContextProviderProps {
    children: ReactNode;
}