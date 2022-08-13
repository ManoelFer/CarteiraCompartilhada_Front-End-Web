import { backIcon, pageForbiddenAnimation } from "assets"
import { Button, Lottie } from "components"
import { useNavigate } from "react-router-dom"
import { Container, ContainerButton, TitlePage } from "./styles"

export const NotAllowed = () => {
    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate('/')
    }



    return (
        <Container>
            <Lottie animationData={pageForbiddenAnimation} width={300} height={250} />
            <TitlePage>Opa! Você não tem permissão para acessar essa rota!</TitlePage>

            <ContainerButton>
                <Button title="Voltar ao início" icon={backIcon} onClick={handleNavigate} />
            </ContainerButton>

        </Container>
    )
}
