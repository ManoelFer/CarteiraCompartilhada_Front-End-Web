import styled from 'styled-components'

import { IButtonStyledProps } from './interfaces'

export const ButtonStyled = styled.button<IButtonStyledProps>`
    width: 230px;
    height: 63px;

    border-radius: 20px;
    border: none;
    background-image:${({ theme }) => theme.colors.colorGradientButton} ;
    color:${({ theme }) => theme.colors.lettersWithe};

    font-weight: 400;
    font-size:${({ theme }) => theme.fontSizes.small};
    cursor: pointer;

    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 30px;
`

export const IconButton = styled.img` 
    width: 30px;
`