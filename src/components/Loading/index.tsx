
import { Lottie } from "../Lottie"

import { loadingWalletAnimation } from "assets"

import { Container } from "./styles"

interface ILoadingProps {
    isLoading: boolean;
}


export const Loading = ({ isLoading }: ILoadingProps) => {
    return (
        <Container isLoading={isLoading}>
            <Lottie animationData={loadingWalletAnimation} />

            <h1>Aguardando confirmação e mineração das transações na carteira...</h1>
            <h2>Isso pode levar alguns minutos, tenha paciência! 😉</h2>
        </Container>
    )
}
