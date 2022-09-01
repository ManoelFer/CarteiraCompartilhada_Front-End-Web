import styled from 'styled-components'

export const Container = styled.div`
    height: 100%;
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
`
export const TitleCard = styled.h1`
    color: ${({ theme }) => theme.colors.lettersWhite};
    font-weight: 700;
    line-height: 40px;
    letter-spacing: 3%;
`

export const TextCard = styled.h2`
    color: ${({ theme }) => theme.colors.lettersWhite};
    font-weight: 400;
    font-size: ${({ theme }) => theme.fontSizes.small};
    line-height: 40px;
    letter-spacing: 3%;
`

export const ContainerButton = styled.div`
    margin-top: 70px;
    justify-content: center;
    display: flex;
`