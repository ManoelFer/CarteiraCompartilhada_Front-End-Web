
import { IGlassCard } from "./interfaces"

import { Container } from "./styles"

export const GlassCard = ({ children }: IGlassCard) => {

    return (
        <Container>
            {children}
        </Container>
    )
}