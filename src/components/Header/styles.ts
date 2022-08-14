import styled from "styled-components";

export const Container = styled.header`
    display: flex;

    position: absolute;
    background-color: transparent;
    width: 100%;
    height: 100%;
    color: white;
`

export const Content = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 40px;

    @media (max-width: 650px){
        flex-direction: column;
    }
`

export const CurrentBalance = styled.h2``