import styled, { css } from "styled-components";

interface IContainerProps {
    isLoading: boolean;
}

export const Container = styled.div<IContainerProps>`
    display: ${({ isLoading }) => isLoading ? 'flex' : 'none'};
    justify-content: center;
    flex-direction: column;
    text-align: center;
    align-items: center;
    height: 100%;
    color: ${({ theme }) => theme.colors.lettersWhite};

    ${({ isLoading }) => (isLoading && css`
        position: absolute;
        width: 100%;
        background-color: #261863;
        z-index: 1;
    `)}

`