import styled from "styled-components";

import { backgroundNotAllowed } from "assets";

export const Container = styled.div`
    height: 100%;
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    background-image: url(${backgroundNotAllowed});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`

export const TitlePage = styled.h2`
    color: ${({ theme }) => theme.colors.lettersWhite};
`

export const ContainerButton = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    margin-top: 10%;
`