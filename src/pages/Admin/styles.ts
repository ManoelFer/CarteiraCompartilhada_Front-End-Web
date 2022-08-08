
import styled from "styled-components";

import { backgroundAdmin } from "assets";

export const Container = styled.div`
    height: 100%;
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;


    background-image: url(${backgroundAdmin});
    background-repeat: round;
    background-size: cover;
`

export const TitleCard = styled.h1`
    color: ${({ theme }) => theme.colors.lettersWithe};
    font-weight: 700;
    line-height: 40px;
    letter-spacing: 3%;
`

export const ContainerActions = styled.div`
    display: flex;
    width: 100%;
`
export const ContentActions = styled.div`
    width: 100%;
    justify-content: space-around;
    display: flex;

    @media (max-width: 1024px) {
        flex-direction: column;
    }
`
export const CardActions = styled.div`
    background-color: ${({ theme }) => theme.colors.backgroundCardActions};
    color: ${({ theme }) => theme.colors.lettersWithe};
    display: flex; 
    align-items: center;
    flex-direction: column; 
    justify-content: center;

    border-radius: 20px; 
    padding: 20px; 
    cursor: pointer;
    

    :hover{
        transform: scale(1.1);
        box-shadow: 0 8px 32px 0 rgba(0,0,0,0.37);
        background-color: ${({ theme }) => theme.colors.backgroundCardActionsHover};
    }

    @media (max-width: 1024px) {
        margin-bottom: 20px;
    }
`

export const ImageActions = styled.img`
    width: 120px;
`
export const TitleActions = styled.h3``