import WalletConnectProvider from "@walletconnect/web3-provider";

export const providerOptions = {
    walletconnect: {
        package: WalletConnectProvider, // required
        options: {
            infuraId: process.env.INFURA_API_KEY // required
        }
    }
};