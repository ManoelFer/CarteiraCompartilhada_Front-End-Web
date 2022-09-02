
import styled from "styled-components";

export const Container = styled.div`
    height: auto;
    width: 100%;

    margin-top: 5%;

    display: flex;
    justify-content: center;

    @media (max-width: 450px){
        h1, h3 {
            font-size: 1em;
        }
    }
    
`

export const TitleCard = styled.h1`
    color: ${({ theme }) => theme.colors.lettersWhite};
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
    margin-top: 20px;

    ::-webkit-scrollbar {
        width: 20px;
    }

    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px grey; 
        border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb {
        background: ${({ theme }) => theme.colors.backgroundCardActions}; 
        border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: ${({ theme }) => theme.colors.backgroundCardActionsHover}; 
    }

    @media (max-width: 1600px) {
        flex-direction: column;
        justify-content: start;
        align-items: center;
        overflow-y: scroll;
        overflow-x: hidden;
        height: 600px;
    }

    @media (max-width: 450px){
        height: 400px;
    }
`
export const CardActions = styled.div`
    min-width: 250px;
    background-color: ${({ theme }) => theme.colors.backgroundCardActions};
    color: ${({ theme }) => theme.colors.lettersWhite};
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

    @media (max-width: 1900px) {
        margin-bottom: 20px;
        :hover{
            transform: scale(1);
        }
    }

    @media (max-width: 450px){
        width: 170px;
        min-width: 0px;
    }
`

export const ImageActions = styled.img`
    width: 120px;
`
export const TitleActions = styled.h3``