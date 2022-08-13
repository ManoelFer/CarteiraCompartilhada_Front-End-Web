import { useNavigate } from "react-router-dom"

import { backIcon, pageNotFoundAnimation } from "assets"
import { Lottie, Button } from "components"

import { Container, TitlePage, ContainerButton } from "./styles"


export const NotFound = () => {
    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate(-1)
    }

    return (
        <Container>
            <Lottie animationData={pageNotFoundAnimation} width={260} height={250} />
            <TitlePage>Tá perdido amigão? Ajudamos você encontrar o caminho de volta! 😉</TitlePage>

            <ContainerButton>
                <Button title="Voltar a página anterior" icon={backIcon} onClick={handleNavigate} />
            </ContainerButton>

        </Container>
    )
}
